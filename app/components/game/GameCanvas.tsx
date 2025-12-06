import { useEffect, useRef, useState } from 'react';
import type { Player, Level } from '~/types/game';
import { calculateSharedCamera } from './Camera';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '~/utils/constants';

interface GameCanvasProps {
  player1: Player;
  player2: Player | null;
  level: Level;
  camera: { x: number; y: number; width: number; height: number };
  gameRef?: { current: { player1: Player; player2: Player | null; level: Level } };
  isSinglePlayer?: boolean;
}

export function GameCanvas({ player1, player2, level, camera, gameRef, isSinglePlayer = false }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const [canvasScale, setCanvasScale] = useState(1);

  // Handle responsive sizing
  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight || window.innerHeight * 0.6;
      
      // Calculate scale to fit canvas in container while maintaining aspect ratio
      const scaleX = containerWidth / CANVAS_WIDTH;
      const scaleY = containerHeight / CANVAS_HEIGHT;
      const scale = Math.min(scaleX, scaleY, 1); // Don't scale up, only down
      
      setCanvasScale(scale);
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    window.addEventListener('orientationchange', updateScale);
    
    // Delay to ensure container is properly sized
    const timeout = setTimeout(updateScale, 100);

    return () => {
      window.removeEventListener('resize', updateScale);
      window.removeEventListener('orientationchange', updateScale);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      // Get current player positions from ref if available, otherwise use props
      const currentP1 = gameRef?.current?.player1 || player1;
      const currentP2 = gameRef?.current?.player2 || player2;
      const currentLevel = gameRef?.current?.level || level;

      // Calculate current camera
      const currentCamera = gameRef?.current && currentP2
        ? calculateSharedCamera(currentP1, currentP2, CANVAS_WIDTH, CANVAS_HEIGHT)
        : { x: Math.max(0, currentP1.x - CANVAS_WIDTH / 2), y: 0, width: CANVAS_WIDTH, height: CANVAS_HEIGHT };

      // Clear canvas with dark background
      ctx.fillStyle = '#0a0a0f';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Draw grid background
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.08)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = -currentCamera.x % gridSize; x < CANVAS_WIDTH; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, CANVAS_HEIGHT);
        ctx.stroke();
      }
      for (let y = -currentCamera.y % gridSize; y < CANVAS_HEIGHT; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(CANVAS_WIDTH, y);
        ctx.stroke();
      }

      // Render game view (single shared view for both players)
      ctx.save();
      ctx.translate(-currentCamera.x, -currentCamera.y);
      renderGameView(ctx, currentP1, currentP2, currentLevel, isSinglePlayer);
      ctx.restore();

      // Add scanlines effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
      for (let y = 0; y < CANVAS_HEIGHT; y += 2) {
        ctx.fillRect(0, y, CANVAS_WIDTH, 1);
      }
    };

    const animate = () => {
      render();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [player1, player2, level, camera, isSinglePlayer]);

  return (
    <div 
      ref={containerRef}
      className="w-full max-w-4xl flex items-center justify-center game-canvas-container"
      style={{ 
        maxHeight: 'calc(100vh - 180px)',
        minHeight: '200px'
      }}
    >
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="border-2 border-lena rounded-lg shadow-[0_0_30px_rgba(0,212,255,0.3)]"
        style={{
          width: CANVAS_WIDTH * canvasScale,
          height: CANVAS_HEIGHT * canvasScale,
          imageRendering: 'pixelated'
        }}
      />
    </div>
  );
}

function renderGameView(
  ctx: CanvasRenderingContext2D,
  player1: Player,
  player2: Player | null,
  level: Level,
  isSinglePlayer: boolean
) {
  // Render platforms with gradient
  level.platforms.forEach(platform => {
    const gradient = ctx.createLinearGradient(platform.x, platform.y, platform.x, platform.y + platform.height);
    gradient.addColorStop(0, '#4a4a5a');
    gradient.addColorStop(1, '#2d2d44');
    ctx.fillStyle = gradient;
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    
    // Platform top highlight
    ctx.fillStyle = '#5a5a6a';
    ctx.fillRect(platform.x, platform.y, platform.width, 3);
  });

  // Render disappearing platforms
  level.disappearingPlatforms.forEach(platform => {
    if (platform.visible) {
      const color = platform.triggered ? '#ff6b6b' : '#6b8aff';
      const glowColor = platform.triggered ? 'rgba(255, 107, 107, 0.5)' : 'rgba(107, 138, 255, 0.5)';
      
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 15;
      ctx.fillStyle = color;
      ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
      ctx.shadowBlur = 0;
    }
  });

  // Render buttons (cooperative mechanic)
  if (level.buttons) {
    level.buttons.forEach(button => {
      const pressed = button.pressed;
      ctx.fillStyle = pressed ? '#00ff88' : '#ff9500';
      ctx.shadowColor = pressed ? 'rgba(0, 255, 136, 0.5)' : 'rgba(255, 149, 0, 0.5)';
      ctx.shadowBlur = 10;
      ctx.fillRect(button.x, button.y, button.width, button.height);
      ctx.shadowBlur = 0;
      
      // Button symbol
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(pressed ? '✓' : '⬇', button.x + button.width / 2, button.y + button.height / 2 + 4);
    });
  }

  // Render bridges (cooperative mechanic)
  if (level.bridges) {
    level.bridges.forEach(bridge => {
      if (bridge.open) {
        ctx.fillStyle = '#00ff88';
        ctx.shadowColor = 'rgba(0, 255, 136, 0.3)';
        ctx.shadowBlur = 10;
        ctx.fillRect(bridge.x, bridge.y, bridge.width, bridge.height);
        ctx.shadowBlur = 0;
      } else {
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.3)';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(bridge.x, bridge.y, bridge.width, bridge.height);
        ctx.setLineDash([]);
      }
    });
  }

  // Render spikes with glow
  ctx.shadowColor = 'rgba(255, 71, 87, 0.5)';
  ctx.shadowBlur = 10;
  ctx.fillStyle = '#ff4757';
  level.spikes.forEach(spike => {
    for (let i = 0; i < spike.width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(spike.x + i, spike.y + spike.height);
      ctx.lineTo(spike.x + i + 10, spike.y);
      ctx.lineTo(spike.x + i + 20, spike.y + spike.height);
      ctx.closePath();
      ctx.fill();
    }
  });
  ctx.shadowBlur = 0;

  // Render surprises (spikes)
  if (level.surprises) {
    level.surprises.forEach(surprise => {
      if (surprise.type === 'spike' && surprise.active && surprise.width && surprise.height) {
        ctx.shadowColor = 'rgba(255, 71, 87, 0.5)';
        ctx.shadowBlur = 10;
        ctx.fillStyle = '#ff4757';
        for (let i = 0; i < surprise.width; i += 20) {
          ctx.beginPath();
          ctx.moveTo(surprise.x + i, surprise.y + surprise.height);
          ctx.lineTo(surprise.x + i + 10, surprise.y);
          ctx.lineTo(surprise.x + i + 20, surprise.y + surprise.height);
          ctx.closePath();
          ctx.fill();
        }
        ctx.shadowBlur = 0;
      }
    });
  }

  // Render door with glow effect
  ctx.shadowColor = 'rgba(0, 255, 136, 0.5)';
  ctx.shadowBlur = 20;
  const doorGradient = ctx.createLinearGradient(level.door.x, level.door.y, level.door.x, level.door.y + level.door.height);
  doorGradient.addColorStop(0, '#00ff88');
  doorGradient.addColorStop(1, '#00cc6a');
  ctx.fillStyle = doorGradient;
  ctx.fillRect(level.door.x, level.door.y, level.door.width, level.door.height);
  ctx.shadowBlur = 0;
  
  // Door inner detail
  ctx.fillStyle = '#00aa55';
  ctx.fillRect(
    level.door.x + 5,
    level.door.y + 5,
    level.door.width - 10,
    level.door.height - 10
  );
  
  // Door handle
  ctx.fillStyle = '#ffd700';
  ctx.beginPath();
  ctx.arc(level.door.x + level.door.width - 12, level.door.y + level.door.height / 2, 4, 0, Math.PI * 2);
  ctx.fill();

  // Render Player 1 (Kai - Orange/Amber)
  renderPlayer(ctx, player1, '#ff9500', 'P1');

  // Render Player 2 (Lena - Cyan) if in 2P mode
  if (!isSinglePlayer && player2) {
    renderPlayer(ctx, player2, '#00d4ff', 'P2');
  }
}

function renderPlayer(ctx: CanvasRenderingContext2D, player: Player, color: string, label: string) {
  // Player glow
  ctx.shadowColor = color;
  ctx.shadowBlur = 15;
  
  // Player body
  ctx.fillStyle = color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
  ctx.shadowBlur = 0;
  
  // Inner body gradient
  const innerGradient = ctx.createLinearGradient(player.x, player.y, player.x, player.y + player.height);
  innerGradient.addColorStop(0, 'rgba(255,255,255,0.3)');
  innerGradient.addColorStop(1, 'rgba(0,0,0,0.2)');
  ctx.fillStyle = innerGradient;
  ctx.fillRect(player.x + 2, player.y + 2, player.width - 4, player.height - 4);
  
  // Eyes
  ctx.fillStyle = '#fff';
  ctx.fillRect(player.x + 6, player.y + 8, 6, 6);
  ctx.fillRect(player.x + 18, player.y + 8, 6, 6);
  
  // Pupils
  ctx.fillStyle = '#000';
  ctx.fillRect(player.x + 8, player.y + 10, 3, 3);
  ctx.fillRect(player.x + 20, player.y + 10, 3, 3);
  
  // Player label
  ctx.fillStyle = color;
  ctx.font = 'bold 10px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(label, player.x + player.width / 2, player.y - 5);
}
