export interface Vector2D {
  x: number;
  y: number;
}

export interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  vx: number;
  vy: number;
  grounded: boolean;
  color: string;
}

export interface Platform {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DisappearingPlatform extends Platform {
  disappearTime: number;
  visible: boolean;
  triggered: boolean;
}

export interface Spike {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Surprise {
  type: 'spike' | 'falling';
  x: number;
  y: number;
  width?: number;
  height?: number;
  triggerX: number;
  active?: boolean;
  triggered?: boolean;
  fallSpeed?: number;
}

export interface Door {
  x: number;
  y: number;
  width: number;
  height: number;
}

// Cooperative mechanics
export interface Button {
  x: number;
  y: number;
  width: number;
  height: number;
  linkedBridgeId: number;
  pressed: boolean;
  wasPressed?: boolean; // For toggle detection in 1P mode
}

export interface Bridge {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  open: boolean;
}

export interface Level {
  name: string;
  platforms: Platform[];
  spikes: Spike[];
  disappearingPlatforms: DisappearingPlatform[];
  door: Door;
  surprises: Surprise[];
  buttons?: Button[];
  bridges?: Bridge[];
  spawn1: { x: number; y: number }; // Player 1 spawn position
  spawn2: { x: number; y: number }; // Player 2 spawn position
}

export interface GameSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
}

export interface GameState {
  totalDeaths: number;
  unlockedLevels: number[];
  settings: GameSettings;
}

export interface Keys {
  [key: string]: boolean;
}

export interface TouchButtons {
  left: boolean;
  right: boolean;
  jump: boolean;
}

export interface PlayerControls {
  keys: Keys;
  touchButtons: TouchButtons;
}

export type GameStatus = 'playing' | 'dead' | 'levelComplete' | 'won' | 'paused';

export type GameMode = '1p' | '2p';

