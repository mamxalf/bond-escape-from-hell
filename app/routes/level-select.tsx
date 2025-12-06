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
    <div className="min-h-screen bg-bg-dark bg-grid scanlines relative overflow-hidden p-6 md:p-8">
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-2 h-2 bg-lena rounded-full animate-float opacity-30" style={{ top: '15%', left: '10%' }} />
        <div className="absolute w-3 h-3 bg-kai rounded-full animate-float opacity-20" style={{ top: '25%', left: '90%', animationDelay: '1s' }} />
        <div className="absolute w-2 h-2 bg-accent rounded-full animate-float opacity-25" style={{ top: '80%', left: '20%', animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8 z-10 relative">
        <button
          onClick={() => navigate('/mode-select')}
          className="hud-item hover:bg-bg-light transition-all duration-200 flex items-center gap-2"
        >
          <ArrowLeft size={20} className="text-lena" />
          <span className="hidden md:inline">Back</span>
        </button>
        
        <div className="hud-item">
          <span className={mode === '1p' ? 'text-kai' : 'text-lena'}>{mode === '1p' ? '1 Player' : '2 Players'}</span>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 z-10 relative">
        <span className="text-white">SELECT </span>
        <span className="text-lena animate-neon-lena">LEVEL</span>
      </h1>

      {/* Level Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto z-10 relative">
        {LEVELS.map((level, index) => {
          const isUnlocked = unlockedLevels.includes(index);
          const isCompleted = unlockedLevels.includes(index + 1); // Completed if next level is unlocked
          
          return (
            <button
              key={index}
              onClick={() => isUnlocked && navigate(`/game/${index}?mode=${mode}`)}
              disabled={!isUnlocked}
              className={`
                aspect-square rounded-xl p-4 md:p-6 flex flex-col items-center justify-center 
                transform transition-all duration-300 relative overflow-hidden
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
                    <div className="absolute top-2 right-2">
                      <CheckCircle size={20} className="text-success" />
                    </div>
                  )}
                  
                  {/* Level number */}
                  <div className="text-4xl md:text-5xl font-black text-white mb-2 relative z-10">
                    {index + 1}
                  </div>
                  
                  {/* Level name */}
                  <div className="text-xs md:text-sm text-gray-300 text-center relative z-10">
                    {level.name}
                  </div>
                  
                  {/* Stars placeholder */}
                  <div className="flex gap-1 mt-2">
                    {[1, 2, 3].map((star) => (
                      <Star 
                        key={star} 
                        size={14} 
                        className={isCompleted ? 'text-warning fill-warning' : 'text-concrete'} 
                      />
                    ))}
                  </div>
                </>
              ) : (
                <Lock size={40} className="text-concrete" />
              )}
            </button>
          );
        })}
      </div>

      {/* Footer hint */}
      <p className="text-center text-gray-600 text-sm mt-12 z-10 relative">
        Complete levels to unlock more challenges
      </p>
    </div>
  );
}

