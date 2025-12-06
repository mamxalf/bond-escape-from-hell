import { useNavigate } from 'react-router';
import { Play, Trophy, Settings, Skull } from 'lucide-react';
import { useGame } from '~/components/game/GameProvider';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "BOND: Escape from Hell to Paradise" },
    { name: "description", content: "A challenging cooperative platformer - escape the abyss together!" },
  ];
}

export default function Home() {
  const navigate = useNavigate();
  const { totalDeaths } = useGame();

  return (
    <div className="min-h-screen bg-bg-dark bg-grid scanlines relative overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-2 h-2 bg-lena rounded-full animate-float opacity-30" style={{ top: '10%', left: '20%' }} />
        <div className="absolute w-3 h-3 bg-kai rounded-full animate-float opacity-20" style={{ top: '30%', left: '80%', animationDelay: '1s' }} />
        <div className="absolute w-2 h-2 bg-accent rounded-full animate-float opacity-25" style={{ top: '70%', left: '10%', animationDelay: '2s' }} />
        <div className="absolute w-4 h-4 bg-danger rounded-full animate-float opacity-15" style={{ top: '50%', left: '60%', animationDelay: '1.5s' }} />
        <div className="absolute w-2 h-2 bg-lena rounded-full animate-float opacity-30" style={{ top: '85%', left: '40%', animationDelay: '0.5s' }} />
      </div>

      {/* Main content */}
      <div className="text-center z-10">
        {/* Logo/Title */}
        <div className="mb-8">
          <h1 className="text-7xl md:text-8xl font-black mb-2 animate-glitch">
            <span className="text-kai">B</span>
            <span className="text-white">O</span>
            <span className="text-lena">N</span>
            <span className="text-white">D</span>
          </h1>
          <div className="h-1 w-48 mx-auto bg-gradient-to-r from-kai via-accent to-lena rounded-full mb-4" />
          <h2 className="text-xl md:text-2xl font-semibold text-gray-300 tracking-widest animate-fade-in-up">
            ESCAPE FROM HELL
          </h2>
          <p className="text-gray-500 mt-2 text-sm">A cooperative platformer adventure</p>
        </div>

        {/* Menu buttons */}
        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <button
            onClick={() => navigate('/mode-select')}
            className="w-72 btn-primary flex items-center justify-center gap-3 mx-auto"
          >
            <Play size={24} />
            PLAY GAME
          </button>
          
          <button
            onClick={() => navigate('/level-select')}
            className="w-72 btn-ghost border-lena hover:bg-lena/10 flex items-center justify-center gap-3 mx-auto"
          >
            <Trophy size={24} className="text-lena" />
            <span className="text-lena">LEVEL SELECT</span>
          </button>
          
          <button
            onClick={() => navigate('/settings')}
            className="w-72 btn-ghost flex items-center justify-center gap-3 mx-auto"
          >
            <Settings size={24} />
            SETTINGS
          </button>
        </div>

        {/* Death counter */}
        <div className="mt-12 flex items-center justify-center gap-2 text-gray-500 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Skull size={16} className="text-danger" />
          <span>Total Deaths: <span className="text-danger font-bold">{totalDeaths}</span></span>
        </div>

        {/* Controls hint */}
        <div className="mt-8 text-xs text-gray-600 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <p className="mb-1">PC Controls</p>
          <div className="flex items-center justify-center gap-4">
            <span className="text-kai">P1: Arrow Keys</span>
            <span className="text-gray-700">|</span>
            <span className="text-lena">P2: WASD</span>
          </div>
        </div>
      </div>

      {/* Version tag */}
      <div className="absolute bottom-4 right-4 text-xs text-gray-700">
        v2.0.0
      </div>
    </div>
  );
}
