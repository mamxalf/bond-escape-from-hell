const STORAGE_KEYS = {
  TOTAL_DEATHS: 'bond_totalDeaths',
  UNLOCKED_LEVELS: 'bond_unlockedLevels',
  SOUND_ENABLED: 'bond_soundEnabled',
  MUSIC_ENABLED: 'bond_musicEnabled',
} as const;

export const storage = {
  getTotalDeaths(): number {
    const value = localStorage.getItem(STORAGE_KEYS.TOTAL_DEATHS);
    return value ? parseInt(value, 10) : 0;
  },

  setTotalDeaths(deaths: number): void {
    localStorage.setItem(STORAGE_KEYS.TOTAL_DEATHS, deaths.toString());
  },

  getUnlockedLevels(): number[] {
    const value = localStorage.getItem(STORAGE_KEYS.UNLOCKED_LEVELS);
    try {
      return value ? JSON.parse(value) : [0];
    } catch {
      return [0];
    }
  },

  setUnlockedLevels(levels: number[]): void {
    localStorage.setItem(STORAGE_KEYS.UNLOCKED_LEVELS, JSON.stringify(levels));
  },

  getSoundEnabled(): boolean {
    const value = localStorage.getItem(STORAGE_KEYS.SOUND_ENABLED);
    return value !== 'false';
  },

  setSoundEnabled(enabled: boolean): void {
    localStorage.setItem(STORAGE_KEYS.SOUND_ENABLED, enabled.toString());
  },

  getMusicEnabled(): boolean {
    const value = localStorage.getItem(STORAGE_KEYS.MUSIC_ENABLED);
    return value !== 'false';
  },

  setMusicEnabled(enabled: boolean): void {
    localStorage.setItem(STORAGE_KEYS.MUSIC_ENABLED, enabled.toString());
  },

  clear(): void {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
};


