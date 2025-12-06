import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { Home, RotateCcw, Trophy, Play, RotateCw } from 'lucide-react';
import { useGame } from '~/components/game/GameProvider';
import { GameCanvas } from '~/components/game/GameCanvas';
import { TouchControls } from '~/components/ui/TouchControls';
import { createPlayer, updatePlayerMovement, applyGravity, updatePlayerPosition } from '~/components/game/Player';
import { checkLevelCollisions, resetLevel, checkButtonCollisions } from '~/components/game/GamePhysics';
import { calculateSharedCamera } from '~/components/game/Camera';
import { LEVELS, CANVAS_WIDTH, CANVAS_HEIGHT, PLAYER_1_COLOR, PLAYER_2_COLOR } from '~/utils/constants';
import { audioManager } from '~/utils/audio';
import type { GameStatus, Keys, TouchButtons, Level, GameMode } from '~/types/game';

export default function Game() {
  const { levelId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { incrementDeaths, unlockLevel, settings } = useGame();

  const mode = (searchParams.get('mode') as GameMode) || '2p';
  const isSinglePlayer = mode === '1p';

  const [gameState, setGameState] = useState<GameStatus>('playing');
  const [currentLevel, setCurrentLevel] = useState(() => parseInt(levelId || '0', 10));
  const [levelDeaths, setLevelDeaths] = useState(0);
  const [isPortrait, setIsPortrait] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect touch device
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 ||
        window.innerHeight < 500 // Landscape mobile typically has height < 500
      );
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  // Check orientation
  useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  // Get initial level data
  const getInitialLevel = () => {
    const levelIdNum = parseInt(levelId || '0', 10);
    return LEVELS[levelIdNum];
  };

  const gameRef = useRef<{
    player1: ReturnType<typeof createPlayer>;
    player2: ReturnType<typeof createPlayer> | null;
    keys: Keys;
    player1Touch: TouchButtons;
    player2Touch: TouchButtons;
    level: Level;
  }>({
    player1: createPlayer(getInitialLevel().spawn1.x, getInitialLevel().spawn1.y, PLAYER_1_COLOR),
    player2: isSinglePlayer ? null : createPlayer(getInitialLevel().spawn2.x, getInitialLevel().spawn2.y, PLAYER_2_COLOR),
    keys: {},
    player1Touch: { left: false, right: false, jump: false },
    player2Touch: { left: false, right: false, jump: false },
    level: JSON.parse(JSON.stringify(LEVELS[parseInt(levelId || '0', 10)])),
  });

  // Sync audio settings
  useEffect(() => {
    audioManager.soundEnabled = settings.soundEnabled;
    audioManager.musicEnabled = settings.musicEnabled;
  }, [settings.soundEnabled, settings.musicEnabled]);

  // Start background music when entering game
  useEffect(() => {
    if (settings.musicEnabled) {
      audioManager.startBgm();
    }
    return () => {
      audioManager.stopBgm();
    };
  }, [settings.musicEnabled]);

  useEffect(() => {
    const levelIdNum = parseInt(levelId || '0', 10);
    const levelData = LEVELS[levelIdNum];
    setCurrentLevel(levelIdNum);
    setGameState('playing');
    setLevelDeaths(0);

    // Deep clone level to avoid mutations
    gameRef.current.level = JSON.parse(JSON.stringify(levelData));
    // Use level spawn positions
    gameRef.current.player1 = createPlayer(levelData.spawn1.x, levelData.spawn1.y, PLAYER_1_COLOR);
    gameRef.current.player2 = isSinglePlayer ? null : createPlayer(levelData.spawn2.x, levelData.spawn2.y, PLAYER_2_COLOR);
    resetLevel(gameRef.current.level);
  }, [levelId, isSinglePlayer]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      gameRef.current.keys[e.key.toLowerCase()] = true;
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') {
        e.preventDefault();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      gameRef.current.keys[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameLoop = () => {
      const { player1, player2, keys, player1Touch, player2Touch, level } = gameRef.current;

      // Track initial velocity for jump sound detection
      const p1VyBefore = player1.vy;
      const p2VyBefore = player2?.vy ?? 0;

      // Update Player 1 movement (Arrow keys)
      updatePlayerMovement(
        player1,
        keys,
        player1Touch,
        ['arrowleft'],
        ['arrowright'],
        ['arrowup', ' ']
      );
      applyGravity(player1);
      updatePlayerPosition(player1, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Play jump sound for P1 only when jump is initiated (velocity goes negative from 0 or positive)
      if (p1VyBefore >= 0 && player1.vy < 0) {
        audioManager.playJump();
      }

      // Update Player 2 movement (WASD) - only in 2P mode
      if (!isSinglePlayer && player2) {
        updatePlayerMovement(
          player2,
          keys,
          player2Touch,
          ['a'],
          ['d'],
          ['w']
        );
        applyGravity(player2);
        updatePlayerPosition(player2, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Play jump sound for P2 only when jump is initiated
        if (p2VyBefore >= 0 && player2.vy < 0) {
          audioManager.playJump();
        }
      }

      // Track button states for audio
      const prevButtonStates = level.buttons?.map(b => b.pressed) ?? [];

      // Check button collisions (cooperative mechanic)
      checkButtonCollisions(player1, level, isSinglePlayer);
      if (!isSinglePlayer && player2) {
        checkButtonCollisions(player2, level, false);
      }

      // Play sound if button state changed
      level.buttons?.forEach((button, i) => {
        if (button.pressed !== prevButtonStates[i]) {
          audioManager.playButtonPress();
          audioManager.playBridgeToggle();
        }
      });

      // Check collisions for Player 1
      const p1Result = checkLevelCollisions(
        player1,
        level,
        () => {
          audioManager.playDeath();
          setGameState('dead');
          setLevelDeaths(prev => prev + 1);
          incrementDeaths();
        }
      );

      // Check collisions for Player 2 (only in 2P mode)
      let p2Result = { hitSpike: false, atDoor: true }; // Default to atDoor true for 1P mode
      if (!isSinglePlayer && player2) {
        p2Result = checkLevelCollisions(
          player2,
          level,
          () => {
            audioManager.playDeath();
            setGameState('dead');
            setLevelDeaths(prev => prev + 1);
            incrementDeaths();
          }
        );
      }

      // Check win condition
      // 1P mode: only player 1 needs to reach door
      // 2P mode: both players must reach door
      const winCondition = isSinglePlayer ? p1Result.atDoor : (p1Result.atDoor && p2Result.atDoor);
      
      if (winCondition) {
        audioManager.playLevelComplete();
        if (currentLevel < LEVELS.length - 1) {
          setGameState('levelComplete');
          unlockLevel(currentLevel + 1);
        } else {
          setGameState('won');
        }
      }
    };

    const interval = setInterval(gameLoop, 16); // ~60fps

    return () => clearInterval(interval);
  }, [gameState, currentLevel, incrementDeaths, unlockLevel, isSinglePlayer]);

  const handleRestart = () => {
    const levelData = LEVELS[currentLevel];
    const level = JSON.parse(JSON.stringify(levelData));
    gameRef.current.level = level;
    // Use level spawn positions
    gameRef.current.player1 = createPlayer(levelData.spawn1.x, levelData.spawn1.y, PLAYER_1_COLOR);
    gameRef.current.player2 = isSinglePlayer ? null : createPlayer(levelData.spawn2.x, levelData.spawn2.y, PLAYER_2_COLOR);
    resetLevel(gameRef.current.level);
    setGameState('playing');
  };

  const handleNextLevel = () => {
    navigate(`/game/${currentLevel + 1}?mode=${mode}`);
  };

  const handlePlayer1Touch = (button: keyof TouchButtons, pressed: boolean) => {
    gameRef.current.player1Touch[button] = pressed;
  };

  const handlePlayer2Touch = (button: keyof TouchButtons, pressed: boolean) => {
    gameRef.current.player2Touch[button] = pressed;
  };

  // Calculate camera for rendering (using current ref values)
  const camera = gameRef.current.player2 
    ? calculateSharedCamera(
        gameRef.current.player1,
        gameRef.current.player2,
        CANVAS_WIDTH,
        CANVAS_HEIGHT
      )
    : { x: 0, y: 0, width: CANVAS_WIDTH, height: CANVAS_HEIGHT };

  const level = LEVELS[currentLevel];

  // Show portrait overlay on mobile portrait mode
  if (isPortrait && window.innerWidth < 768) {
    return (
      <div className="min-h-screen bg-bg-dark flex flex-col items-center justify-center p-8 text-center">
        <RotateCw size={64} className="text-lena mb-6 animate-pulse" />
        <h2 className="text-2xl font-bold text-white mb-2">Rotate Your Device</h2>
        <p className="text-gray-400 mb-4">Please rotate to landscape mode to play</p>
        <div className="text-sm text-lena">↻ Landscape Only</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen h-screen bg-bg-dark bg-grid scanlines relative overflow-hidden flex flex-col">
      {/* Compact HUD Header */}
      <div className="flex justify-between items-center px-2 py-1 z-10 shrink-0">
        <button
          onClick={() => navigate('/')}
          className="hud-item p-2"
        >
          <Home size={18} className="text-lena" />
        </button>
        
        <div className="hud-item text-center px-3 py-1">
          <div className="text-sm font-bold text-white">{level.name}</div>
          <div className="text-xs text-gray-400 flex items-center justify-center gap-2">
            <span className="text-lena">Lv.{currentLevel + 1}</span>
            <span className="text-danger">💀{levelDeaths}</span>
            <span className={isSinglePlayer ? 'text-kai' : 'text-accent'}>{isSinglePlayer ? '1P' : '2P'}</span>
          </div>
        </div>
        
        <button
          onClick={handleRestart}
          className="hud-item p-2"
        >
          <RotateCcw size={18} className="text-kai" />
        </button>
      </div>

      {/* Main Game Area - Horizontal Layout */}
      <div className="flex-1 flex items-center justify-center gap-2 px-2 pb-2">
        {/* Left Control - Player 1 */}
        {isTouchDevice && (
          <div className="w-24 shrink-0 h-full flex items-center">
            <TouchControls
              player1Controls={gameRef.current.player1Touch}
              player2Controls={gameRef.current.player2Touch}
              onPlayer1Touch={handlePlayer1Touch}
              onPlayer2Touch={handlePlayer2Touch}
              isSinglePlayer={isSinglePlayer}
              position="left"
            />
          </div>
        )}

        {/* Game Canvas - Center */}
        <div className="relative flex-1 flex items-center justify-center h-full">
          <GameCanvas
            player1={gameRef.current.player1}
            player2={gameRef.current.player2}
            level={gameRef.current.level}
            camera={camera}
            gameRef={gameRef}
            isSinglePlayer={isSinglePlayer}
          />

          {/* Death Overlay */}
          {gameState === 'dead' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm rounded-lg z-20">
              <div className="text-center animate-fade-in-up">
                <h2 className="text-3xl md:text-5xl font-bold text-danger mb-2 animate-glitch">WASTED!</h2>
                <button
                  onClick={handleRestart}
                  className="btn-secondary flex items-center gap-2 mx-auto text-sm"
                >
                  <RotateCcw size={16} />
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Level Complete Overlay */}
          {gameState === 'levelComplete' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm rounded-lg z-20">
              <div className="text-center animate-fade-in-up">
                <h2 className="text-3xl md:text-5xl font-bold text-success mb-2">Complete!</h2>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={handleRestart}
                    className="btn-ghost flex items-center gap-1 text-sm px-3 py-1"
                  >
                    <RotateCcw size={14} />
                    Replay
                  </button>
                  <button
                    onClick={handleNextLevel}
                    className="btn-primary flex items-center gap-1 text-sm px-3 py-1"
                  >
                    <Play size={14} />
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Victory Overlay */}
          {gameState === 'won' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm rounded-lg z-20">
              <div className="text-center animate-fade-in-up">
                <Trophy className="w-12 h-12 text-warning mx-auto mb-2 animate-float" />
                <h2 className="text-3xl md:text-5xl font-bold text-warning mb-2">VICTORY!</h2>
                <button
                  onClick={() => navigate('/')}
                  className="btn-secondary flex items-center gap-2 mx-auto text-sm"
                >
                  <Home size={16} />
                  Menu
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Control - Player 2 */}
        {isTouchDevice && (
          <div className="w-24 shrink-0 h-full flex items-center">
            <TouchControls
              player1Controls={gameRef.current.player1Touch}
              player2Controls={gameRef.current.player2Touch}
              onPlayer1Touch={handlePlayer1Touch}
              onPlayer2Touch={handlePlayer2Touch}
              isSinglePlayer={isSinglePlayer}
              position="right"
            />
          </div>
        )}
      </div>

      {/* Controls info for PC */}
      {!isTouchDevice && (
        <div className="pb-2 z-10">
          <div className="hud-item text-xs text-gray-400 flex gap-4 justify-center mx-auto w-fit">
            <span className="text-kai">P1: ← → ↑</span>
            {!isSinglePlayer && <span className="text-lena">P2: A D W</span>}
          </div>
        </div>
      )}
    </div>
  );
}
