import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { storage } from '~/utils/storage';
import type { GameSettings } from '~/types/game';

interface GameContextValue {
  totalDeaths: number;
  unlockedLevels: number[];
  settings: GameSettings;
  unlockLevel: (levelId: number) => void;
  incrementDeaths: () => void;
  resetProgress: () => void;
  setSettings: (settings: GameSettings) => void;
}

const GameContext = createContext<GameContextValue | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [totalDeaths, setTotalDeaths] = useState(() => storage.getTotalDeaths());
  const [unlockedLevels, setUnlockedLevels] = useState(() => storage.getUnlockedLevels());
  const [settings, setSettingsState] = useState<GameSettings>(() => ({
    soundEnabled: storage.getSoundEnabled(),
    musicEnabled: storage.getMusicEnabled(),
  }));

  useEffect(() => {
    storage.setTotalDeaths(totalDeaths);
  }, [totalDeaths]);

  useEffect(() => {
    storage.setUnlockedLevels(unlockedLevels);
  }, [unlockedLevels]);

  useEffect(() => {
    storage.setSoundEnabled(settings.soundEnabled);
    storage.setMusicEnabled(settings.musicEnabled);
  }, [settings]);

  const unlockLevel = (levelId: number) => {
    setUnlockedLevels(prev => {
      if (!prev.includes(levelId)) {
        return [...prev, levelId];
      }
      return prev;
    });
  };

  const incrementDeaths = () => {
    setTotalDeaths(prev => prev + 1);
  };

  const resetProgress = () => {
    setTotalDeaths(0);
    setUnlockedLevels([0]);
    storage.clear();
  };

  const setSettings = (newSettings: GameSettings) => {
    setSettingsState(newSettings);
  };

  return (
    <GameContext.Provider
      value={{
        totalDeaths,
        unlockedLevels,
        settings,
        unlockLevel,
        incrementDeaths,
        resetProgress,
        setSettings,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}

