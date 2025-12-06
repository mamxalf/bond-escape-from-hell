import { useNavigate } from 'react-router';
import { ArrowLeft, Volume2, VolumeX, Music, Trash2, Skull } from 'lucide-react';
import { useGame } from '~/components/game/GameProvider';
import { audioManager } from '~/utils/audio';

export default function Settings() {
  const navigate = useNavigate();
  const { settings, setSettings, resetProgress, totalDeaths } = useGame();

  const toggleSound = () => {
    const newValue = !settings.soundEnabled;
    setSettings({ ...settings, soundEnabled: newValue });
    audioManager.soundEnabled = newValue;
    if (newValue) {
      audioManager.playClick();
    }
  };

  const toggleMusic = () => {
    const newValue = !settings.musicEnabled;
    setSettings({ ...settings, musicEnabled: newValue });
    audioManager.musicEnabled = newValue;
  };

  const handleReset = () => {
    if (window.confirm('Reset all progress? This cannot be undone!')) {
      resetProgress();
      audioManager.playDeath();
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-bg-dark bg-grid scanlines relative overflow-hidden p-6 md:p-8">
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-2 h-2 bg-lena rounded-full animate-float opacity-30" style={{ top: '15%', left: '25%' }} />
        <div className="absolute w-3 h-3 bg-kai rounded-full animate-float opacity-20" style={{ top: '45%', left: '85%', animationDelay: '1s' }} />
        <div className="absolute w-2 h-2 bg-accent rounded-full animate-float opacity-25" style={{ top: '75%', left: '15%', animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <button
        onClick={() => {
          audioManager.playClick();
          navigate('/');
        }}
        className="mb-8 hud-item hover:bg-bg-light transition-all duration-200 flex items-center gap-2 z-10 relative"
      >
        <ArrowLeft size={20} className="text-lena" />
        <span className="hidden md:inline">Back</span>
      </button>

      <div className="max-w-2xl mx-auto z-10 relative">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
          <span className="text-white">SETT</span>
          <span className="text-accent animate-neon-lena">INGS</span>
        </h1>

        <div className="card-brutalist border-concrete p-8 space-y-8">
          {/* Sound Effects Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {settings.soundEnabled ? (
                <Volume2 size={28} className="text-lena" />
              ) : (
                <VolumeX size={28} className="text-concrete" />
              )}
              <span className="text-white text-lg font-medium">Sound Effects</span>
            </div>
            <button
              onClick={toggleSound}
              className={`w-16 h-8 rounded-full transition-all duration-300 ${
                settings.soundEnabled 
                  ? 'bg-lena shadow-[0_0_15px_rgba(0,212,255,0.5)]' 
                  : 'bg-concrete'
              }`}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full transition-transform duration-300 transform ${
                  settings.soundEnabled ? 'translate-x-9' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Music Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Music size={28} className={settings.musicEnabled ? 'text-kai' : 'text-concrete'} />
              <span className="text-white text-lg font-medium">Background Music</span>
            </div>
            <button
              onClick={toggleMusic}
              className={`w-16 h-8 rounded-full transition-all duration-300 ${
                settings.musicEnabled 
                  ? 'bg-kai shadow-[0_0_15px_rgba(255,149,0,0.5)]' 
                  : 'bg-concrete'
              }`}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full transition-transform duration-300 transform ${
                  settings.musicEnabled ? 'translate-x-9' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <hr className="border-concrete" />

          {/* Stats */}
          <div className="text-center py-4">
            <div className="flex items-center justify-center gap-2 text-gray-400">
              <Skull size={20} className="text-danger" />
              <span>Total Deaths:</span>
              <span className="text-danger font-bold text-xl">{totalDeaths}</span>
            </div>
          </div>

          <hr className="border-concrete" />

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="w-full py-4 rounded-lg font-bold text-white bg-danger/20 border-2 border-danger hover:bg-danger/30 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Trash2 size={20} />
            Reset All Progress
          </button>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600 text-sm">
          <p className="text-accent">BOND: Escape from Hell to Paradise</p>
          <p className="mt-1">v2.0.0 • Made with ❤️ in React</p>
        </div>
      </div>
    </div>
  );
}

