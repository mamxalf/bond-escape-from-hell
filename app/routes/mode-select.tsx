import { useNavigate } from 'react-router';
import { ArrowLeft, User, Users } from 'lucide-react';

export default function ModeSelect() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg-dark bg-grid scanlines relative overflow-hidden flex flex-col items-center justify-center p-4 md:p-6">
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-2 h-2 bg-lena rounded-full animate-float opacity-30" style={{ top: '20%', left: '15%' }} />
        <div className="absolute w-3 h-3 bg-kai rounded-full animate-float opacity-20" style={{ top: '40%', left: '85%', animationDelay: '1s' }} />
        <div className="absolute w-2 h-2 bg-accent rounded-full animate-float opacity-25" style={{ top: '75%', left: '25%', animationDelay: '2s' }} />
        <div className="absolute w-2 h-2 bg-lena rounded-full animate-float opacity-30" style={{ top: '55%', left: '75%', animationDelay: '0.5s' }} />
      </div>

      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 hud-item hover:bg-bg-light transition-all duration-200 flex items-center gap-2 z-10"
      >
        <ArrowLeft size={20} className="text-lena" />
        <span className="hidden md:inline">Back</span>
      </button>

      {/* Title */}
      <div className="text-center mb-8 md:mb-12 z-10 px-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 animate-glitch">
          SELECT MODE
        </h1>
        <p className="text-gray-400 text-sm md:text-base">Choose your path through the abyss</p>
      </div>

      {/* Mode Selection Cards */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 z-10 w-full max-w-2xl px-4">
        {/* Single Player Card */}
        <button
          onClick={() => navigate('/level-select?mode=1p')}
          className="group card-brutalist p-6 md:p-8 w-full max-w-sm md:w-72 text-center border-kai hover:border-kai transition-all duration-300 min-h-[44px]"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 rounded-full bg-kai/20 flex items-center justify-center group-hover:bg-kai/30 transition-all duration-300">
            <User size={32} className="md:w-10 md:h-10 text-kai" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-kai mb-2">1 PLAYER</h2>
          <p className="text-gray-400 text-xs md:text-sm mb-3 md:mb-4">Solo adventure through the depths</p>
          
          <div className="text-xs text-gray-500 space-y-1">
            <p className="flex items-center justify-center gap-2">
              <span className="px-2 py-1 bg-bg-dark rounded text-xs">→ ← ↑</span>
              <span>Arrow Keys</span>
            </p>
            <p className="text-kai/70">or Mobile Joystick</p>
          </div>
        </button>

        {/* Two Player Card */}
        <button
          onClick={() => navigate('/level-select?mode=2p')}
          className="group card-brutalist p-6 md:p-8 w-full max-w-sm md:w-72 text-center border-lena hover:border-lena transition-all duration-300 min-h-[44px]"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 rounded-full bg-lena/20 flex items-center justify-center group-hover:bg-lena/30 transition-all duration-300">
            <Users size={32} className="md:w-10 md:h-10 text-lena" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-lena mb-2">2 PLAYERS</h2>
          <p className="text-gray-400 text-xs md:text-sm mb-3 md:mb-4">Cooperate to escape together</p>
          
          <div className="text-xs text-gray-500 space-y-1">
            <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
              <p className="flex items-center gap-1">
                <span className="text-kai">P1:</span>
                <span className="px-2 py-1 bg-bg-dark rounded text-xs">Arrows</span>
              </p>
              <p className="flex items-center gap-1">
                <span className="text-lena">P2:</span>
                <span className="px-2 py-1 bg-bg-dark rounded text-xs">WASD</span>
              </p>
            </div>
            <p className="text-accent/70">or Dual Mobile Joysticks</p>
          </div>
        </button>
      </div>

      {/* Footer hint */}
      <p className="text-gray-600 text-xs md:text-sm mt-8 md:mt-12 z-10 px-4 text-center">
        Press the button above to continue...
      </p>
    </div>
  );
}
