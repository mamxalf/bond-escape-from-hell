import { useNavigate, useSearchParams } from 'react-router';
import { ArrowLeft, Lock, Star, CheckCircle } from 'lucide-react';
import { useGame } from '~/components/game/GameProvider';
import { LEVELS } from '~/utils/constants';

export default function LevelSelect() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { unlockedLevels } = useGame();
  
  const mode = searchParams.get('mode') || '2p';

  return (
    <div className="min-h-screen bg-bg-dark bg-grid scanlines relative overflow-hidden p-4 md:p-6 lg:p-8">
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-2 h-2 bg-lena rounded-full animate-float opacity-30" style={{ top: '15%', left: '10%' }} />
        <div className="absolute w-3 h-3 bg-kai rounded-full animate-float opacity-20" style={{ top: '25%', left: '90%', animationDelay: '1s' }} />
        <div className="absolute w-2 h-2 bg-accent rounded-full animate-float opacity-25" style={{ top: '80%', left: '20%', animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6 md:mb-8 z-10 relative">
        <button
          onClick={() => navigate('/mode-select')}
          className="hud-item hover:bg-bg-light transition-all duration-200 flex items-center gap-2 min-h-[44px]"
        >
          <ArrowLeft size={20} className="md:w-5 md:h-5 text-lena" />
          <span className="hidden md:inline">Back</span>
        </button>
        
        <div className="hud-item min-h-[44px]">
          <span className={`text-sm md:text-base ${mode === '1p' ? 'text-kai' : 'text-lena'}`}>{mode === '1p' ? '1 Player' : '2 Players'}</span>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 z-10 relative px-4">
        <span className="text-white">SELECT </span>
        <span className="text-lena animate-neon-lena">LEVEL</span>
      </h1>

      {/* Level Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 max-w-5xl mx-auto z-10 relative px-4">
        {LEVELS.map((level, index) => {
          const isUnlocked = unlockedLevels.includes(index);
          const isCompleted = unlockedLevels.includes(index + 1); // Completed if next level is unlocked
          
          return (
            <button
              key={index}
              onClick={() => isUnlocked && navigate(`/game/${index}?mode=${mode}`)}
              disabled={!isUnlocked}
              className={`
                aspect-square rounded-xl p-3 md:p-4 lg:p-6 flex flex-col items-center justify-center 
                transform transition-all duration-300 relative overflow-hidden min-h-[44px]
                ${isUnlocked 
                  ? 'card-brutalist border-lena hover:border-kai cursor-pointer' 
                  : 'bg-bg-medium cursor-not-allowed opacity-50 border-2 border-concrete'
                }
              `}
            >
              {/* Glow effect for unlocked */}
              {isUnlocked && (
                <div className="absolute inset-0 bg-gradient-to-br from-lena/10 to-kai/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              )}
              
              {isUnlocked ? (
                <>
                  {/* Completed badge */}
                  {isCompleted && (
                    <div className="absolute top-1 right-1 md:top-2 md:right-2">
                      <CheckCircle size={16} className="md:w-5 md:h-5 text-success" />
                    </div>
                  )}
                  
                  {/* Level number */}
                  <div className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-1 md:mb-2 relative z-10">
                    {index + 1}
                  </div>
                  
                  {/* Level name */}
                  <div className="text-[10px] md:text-xs lg:text-sm text-gray-300 text-center relative z-10 px-1">
                    {level.name}
                  </div>
                  
                  {/* Stars placeholder */}
                  <div className="flex gap-0.5 md:gap-1 mt-1 md:mt-2">
                    {[1, 2, 3].map((star) => (
                      <Star 
                        key={star} 
                        size={12} 
                        className={`md:w-3.5 md:h-3.5 ${isCompleted ? 'text-warning fill-warning' : 'text-concrete'}`} 
                      />
                    ))}
                  </div>
                </>
              ) : (
                <Lock size={32} className="md:w-10 md:h-10 text-concrete" />
              )}
            </button>
          );
        })}
      </div>

      {/* Footer hint */}
      <p className="text-center text-gray-600 text-xs md:text-sm mt-8 md:mt-12 z-10 relative px-4">
        Complete levels to unlock more challenges
      </p>
    </div>
  );
}

