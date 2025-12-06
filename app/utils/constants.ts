import type { Level } from '~/types/game';

export const GRAVITY = 0.8;
export const JUMP_FORCE = -15;
export const MOVE_SPEED = 5;
export const PLAYER_WIDTH = 30;
export const PLAYER_HEIGHT = 30;
export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;

export const PLAYER_1_COLOR = '#ff9500'; // Kai - Orange/Amber
export const PLAYER_2_COLOR = '#00d4ff'; // Lena - Cyan

export const LEVELS: Level[] = [
  // ===== CHAPTER 1: TUTORIAL (Levels 1-5) =====
  {
    name: "First Steps",
    platforms: [
      { x: 0, y: 550, width: 800, height: 50 },
    ],
    spikes: [],
    disappearingPlatforms: [],
    door: { x: 700, y: 490, width: 40, height: 60 },
    surprises: [],
    buttons: [],
    bridges: [],
    spawn1: { x: 50, y: 500 },
    spawn2: { x: 120, y: 500 }
  },
  {
    name: "First Jump",
    platforms: [
      { x: 0, y: 550, width: 300, height: 50 },
      { x: 400, y: 550, width: 400, height: 50 },
    ],
    spikes: [],
    disappearingPlatforms: [],
    door: { x: 700, y: 490, width: 40, height: 60 },
    surprises: [],
    buttons: [],
    bridges: [],
    spawn1: { x: 50, y: 500 },
    spawn2: { x: 120, y: 500 }
  },
  {
    name: "Danger Below",
    platforms: [
      { x: 0, y: 550, width: 250, height: 50 },
      { x: 350, y: 550, width: 450, height: 50 },
    ],
    spikes: [{ x: 250, y: 530, width: 100, height: 20 }],
    disappearingPlatforms: [],
    door: { x: 700, y: 490, width: 40, height: 60 },
    surprises: [],
    buttons: [],
    bridges: [],
    spawn1: { x: 50, y: 500 },
    spawn2: { x: 120, y: 500 }
  },
  {
    name: "Climbing Up",
    platforms: [
      { x: 0, y: 550, width: 200, height: 50 },
      { x: 250, y: 450, width: 150, height: 20 },
      { x: 450, y: 350, width: 150, height: 20 },
      { x: 600, y: 450, width: 200, height: 20 },
    ],
    spikes: [{ x: 350, y: 530, width: 50, height: 20 }],
    disappearingPlatforms: [],
    door: { x: 700, y: 390, width: 40, height: 60 },
    surprises: [],
    buttons: [],
    bridges: [],
    spawn1: { x: 50, y: 500 },
    spawn2: { x: 120, y: 500 }
  },
  {
    name: "Tutorial Complete",
    platforms: [
      { x: 0, y: 550, width: 150, height: 50 },
      { x: 200, y: 480, width: 100, height: 20 },
      { x: 350, y: 400, width: 100, height: 20 },
      { x: 500, y: 320, width: 100, height: 20 },
      { x: 650, y: 400, width: 150, height: 20 },
    ],
    spikes: [
      { x: 150, y: 530, width: 50, height: 20 },
      { x: 550, y: 530, width: 100, height: 20 }
    ],
    disappearingPlatforms: [],
    door: { x: 720, y: 340, width: 40, height: 60 },
    surprises: [],
    buttons: [],
    bridges: [],
    spawn1: { x: 50, y: 500 },
    spawn2: { x: 100, y: 500 }
  },

  // ===== CHAPTER 2: INTRODUCTION TO MECHANICS (Levels 6-10) =====
  {
    name: "Vanishing Act",
    platforms: [
      { x: 0, y: 550, width: 200, height: 50 },
      { x: 300, y: 480, width: 150, height: 20 },
      { x: 550, y: 400, width: 250, height: 20 },
    ],
    spikes: [{ x: 200, y: 530, width: 100, height: 20 }],
    disappearingPlatforms: [
      { x: 300, y: 480, width: 150, height: 20, disappearTime: 2500, visible: true, triggered: false }
    ],
    door: { x: 700, y: 340, width: 40, height: 60 },
    surprises: [],
    buttons: [],
    bridges: [],
    spawn1: { x: 50, y: 500 },
    spawn2: { x: 120, y: 500 }
  },
  {
    name: "Quick Reflexes",
    platforms: [
      { x: 0, y: 550, width: 150, height: 50 },
      { x: 200, y: 500, width: 100, height: 20 },
      { x: 350, y: 440, width: 100, height: 20 },
      { x: 500, y: 380, width: 100, height: 20 },
      { x: 650, y: 450, width: 150, height: 20 },
    ],
    spikes: [
      { x: 150, y: 530, width: 50, height: 20 },
      { x: 550, y: 530, width: 100, height: 20 }
    ],
    disappearingPlatforms: [
      { x: 200, y: 500, width: 100, height: 20, disappearTime: 2000, visible: true, triggered: false },
      { x: 350, y: 440, width: 100, height: 20, disappearTime: 2000, visible: true, triggered: false }
    ],
    door: { x: 700, y: 390, width: 40, height: 60 },
    surprises: [],
    buttons: [],
    bridges: [],
    spawn1: { x: 50, y: 500 },
    spawn2: { x: 100, y: 500 }
  },
  {
    name: "First Switch",
    platforms: [
      { x: 0, y: 550, width: 200, height: 50 },
      { x: 100, y: 420, width: 80, height: 20 },
      { x: 350, y: 550, width: 200, height: 50 },
      { x: 600, y: 450, width: 200, height: 20 },
    ],
    spikes: [{ x: 200, y: 530, width: 150, height: 20 }],
    disappearingPlatforms: [],
    door: { x: 700, y: 390, width: 40, height: 60 },
    surprises: [],
    buttons: [
      { x: 110, y: 400, width: 60, height: 20, linkedBridgeId: 1, pressed: false }
    ],
    bridges: [
      { id: 1, x: 200, y: 480, width: 150, height: 15, open: false }
    ],
    spawn1: { x: 50, y: 500 },
    spawn2: { x: 380, y: 500 }
  },
  {
    name: "The Betrayal",
    platforms: [
      { x: 0, y: 550, width: 200, height: 50 },
      { x: 250, y: 450, width: 150, height: 20 },
      { x: 500, y: 350, width: 150, height: 20 },
      { x: 700, y: 450, width: 100, height: 20 },
    ],
    spikes: [{ x: 400, y: 530, width: 100, height: 20 }],
    disappearingPlatforms: [
      { x: 250, y: 450, width: 150, height: 20, disappearTime: 3000, visible: true, triggered: false }
    ],
    door: { x: 730, y: 390, width: 40, height: 60 },
    surprises: [
      { type: 'spike', x: 550, y: 330, width: 40, height: 20, triggerX: 500, active: false }
    ],
    buttons: [],
    bridges: [],
    spawn1: { x: 30, y: 500 },
    spawn2: { x: 100, y: 500 }
  },
  {
    name: "Level Devil",
    platforms: [
      { x: 0, y: 550, width: 150, height: 50 },
      { x: 200, y: 480, width: 100, height: 20 },
      { x: 350, y: 400, width: 100, height: 20 },
      { x: 500, y: 320, width: 100, height: 20 },
      { x: 650, y: 450, width: 150, height: 20 },
    ],
    spikes: [
      { x: 300, y: 530, width: 80, height: 20 },
      { x: 600, y: 530, width: 100, height: 20 }
    ],
    disappearingPlatforms: [
      { x: 350, y: 400, width: 100, height: 20, disappearTime: 2000, visible: true, triggered: false }
    ],
    door: { x: 720, y: 390, width: 40, height: 60 },
    surprises: [
      { type: 'spike', x: 450, y: 300, width: 40, height: 20, triggerX: 500, active: false }
    ],
    buttons: [],
    bridges: [],
    spawn1: { x: 30, y: 500 },
    spawn2: { x: 90, y: 500 }
  },

  // ===== CHAPTER 3: COOPERATION (Levels 11-15) =====
  {
    name: "Partnership",
    platforms: [
      { x: 0, y: 550, width: 250, height: 50 },
      { x: 350, y: 550, width: 150, height: 50 },
      { x: 600, y: 550, width: 200, height: 50 },
      { x: 150, y: 420, width: 100, height: 20 },
      { x: 600, y: 350, width: 150, height: 20 },
    ],
    spikes: [
      { x: 250, y: 530, width: 100, height: 20 },
      { x: 500, y: 530, width: 100, height: 20 }
    ],
    disappearingPlatforms: [],
    door: { x: 700, y: 290, width: 40, height: 60 },
    surprises: [],
    buttons: [
      { x: 170, y: 400, width: 60, height: 20, linkedBridgeId: 1, pressed: false }
    ],
    bridges: [
      { id: 1, x: 350, y: 420, width: 150, height: 15, open: false }
    ],
    spawn1: { x: 50, y: 500 },
    spawn2: { x: 380, y: 500 }
  },
  {
    name: "Two Switches",
    platforms: [
      { x: 0, y: 550, width: 150, height: 50 },
      { x: 50, y: 400, width: 80, height: 20 },
      { x: 250, y: 550, width: 150, height: 50 },
      { x: 500, y: 550, width: 150, height: 50 },
      { x: 700, y: 400, width: 100, height: 20 },
    ],
    spikes: [
      { x: 150, y: 530, width: 100, height: 20 },
      { x: 400, y: 530, width: 100, height: 20 }
    ],
    disappearingPlatforms: [],
    door: { x: 720, y: 340, width: 40, height: 60 },
    surprises: [],
    buttons: [
      { x: 65, y: 380, width: 50, height: 20, linkedBridgeId: 1, pressed: false },
      { x: 520, y: 530, width: 50, height: 20, linkedBridgeId: 2, pressed: false }
    ],
    bridges: [
      { id: 1, x: 150, y: 480, width: 100, height: 15, open: false },
      { id: 2, x: 650, y: 480, width: 50, height: 15, open: false }
    ],
    spawn1: { x: 50, y: 500 },
    spawn2: { x: 280, y: 500 }
  },
  {
    name: "Leap of Faith",
    platforms: [
      { x: 0, y: 550, width: 150, height: 50 },
      { x: 300, y: 550, width: 100, height: 50 },
      { x: 550, y: 550, width: 100, height: 50 },
      { x: 700, y: 400, width: 100, height: 20 },
      { x: 50, y: 350, width: 100, height: 20 },
    ],
    spikes: [
      { x: 150, y: 530, width: 150, height: 20 },
      { x: 400, y: 530, width: 150, height: 20 }
    ],
    disappearingPlatforms: [],
    door: { x: 720, y: 340, width: 40, height: 60 },
    surprises: [],
    buttons: [
      { x: 70, y: 330, width: 60, height: 20, linkedBridgeId: 1, pressed: false },
      { x: 710, y: 380, width: 60, height: 20, linkedBridgeId: 2, pressed: false }
    ],
    bridges: [
      { id: 1, x: 150, y: 450, width: 150, height: 15, open: false },
      { id: 2, x: 400, y: 450, width: 150, height: 15, open: false }
    ],
    spawn1: { x: 50, y: 500 },
    spawn2: { x: 570, y: 500 }
  },
  {
    name: "Chain Reaction",
    platforms: [
      { x: 0, y: 550, width: 100, height: 50 },
      { x: 200, y: 500, width: 80, height: 20 },
      { x: 400, y: 450, width: 80, height: 20 },
      { x: 600, y: 400, width: 200, height: 20 },
    ],
    spikes: [
      { x: 100, y: 530, width: 100, height: 20 },
      { x: 280, y: 530, width: 120, height: 20 },
      { x: 480, y: 530, width: 120, height: 20 }
    ],
    disappearingPlatforms: [],
    door: { x: 720, y: 340, width: 40, height: 60 },
    surprises: [],
    buttons: [
      { x: 210, y: 480, width: 60, height: 20, linkedBridgeId: 1, pressed: false },
      { x: 410, y: 430, width: 60, height: 20, linkedBridgeId: 2, pressed: false }
    ],
    bridges: [
      { id: 1, x: 100, y: 480, width: 100, height: 15, open: false },
      { id: 2, x: 280, y: 430, width: 120, height: 15, open: false }
    ],
    spawn1: { x: 30, y: 500 },
    spawn2: { x: 620, y: 350 }
  },
  {
    name: "Together",
    platforms: [
      { x: 0, y: 550, width: 200, height: 50 },
      { x: 250, y: 450, width: 80, height: 20 },
      { x: 400, y: 550, width: 100, height: 50 },
      { x: 550, y: 400, width: 80, height: 20 },
      { x: 680, y: 300, width: 120, height: 20 },
    ],
    spikes: [
      { x: 200, y: 530, width: 50, height: 20 },
      { x: 500, y: 530, width: 50, height: 20 }
    ],
    disappearingPlatforms: [
      { x: 250, y: 450, width: 80, height: 20, disappearTime: 2500, visible: true, triggered: false }
    ],
    door: { x: 720, y: 240, width: 40, height: 60 },
    surprises: [
      { type: 'spike', x: 620, y: 280, width: 40, height: 20, triggerX: 600, active: false }
    ],
    buttons: [
      { x: 420, y: 530, width: 60, height: 20, linkedBridgeId: 1, pressed: false }
    ],
    bridges: [
      { id: 1, x: 330, y: 380, width: 120, height: 15, open: false }
    ],
    spawn1: { x: 30, y: 500 },
    spawn2: { x: 420, y: 500 }
  },

  // ===== CHAPTER 4: CHALLENGE (Levels 16-20) =====
  {
    name: "Spike Gauntlet",
    platforms: [
      { x: 0, y: 550, width: 100, height: 50 },
      { x: 150, y: 500, width: 80, height: 20 },
      { x: 280, y: 450, width: 80, height: 20 },
      { x: 410, y: 400, width: 80, height: 20 },
      { x: 540, y: 350, width: 80, height: 20 },
      { x: 670, y: 400, width: 130, height: 20 },
    ],
    spikes: [
      { x: 100, y: 530, width: 50, height: 20 },
      { x: 230, y: 530, width: 50, height: 20 },
      { x: 360, y: 530, width: 50, height: 20 },
      { x: 490, y: 530, width: 50, height: 20 },
      { x: 620, y: 530, width: 50, height: 20 }
    ],
    disappearingPlatforms: [],
    door: { x: 730, y: 340, width: 40, height: 60 },
    surprises: [],
    buttons: [],
    bridges: [],
    spawn1: { x: 30, y: 500 },
    spawn2: { x: 60, y: 500 }
  },
  {
    name: "Falling Sky",
    platforms: [
      { x: 0, y: 550, width: 150, height: 50 },
      { x: 200, y: 480, width: 100, height: 20 },
      { x: 350, y: 410, width: 100, height: 20 },
      { x: 500, y: 340, width: 100, height: 20 },
      { x: 650, y: 270, width: 150, height: 20 },
    ],
    spikes: [
      { x: 150, y: 530, width: 50, height: 20 },
      { x: 600, y: 530, width: 200, height: 20 }
    ],
    disappearingPlatforms: [
      { x: 200, y: 480, width: 100, height: 20, disappearTime: 1500, visible: true, triggered: false },
      { x: 350, y: 410, width: 100, height: 20, disappearTime: 1500, visible: true, triggered: false },
      { x: 500, y: 340, width: 100, height: 20, disappearTime: 1500, visible: true, triggered: false }
    ],
    door: { x: 720, y: 210, width: 40, height: 60 },
    surprises: [],
    buttons: [],
    bridges: [],
    spawn1: { x: 30, y: 500 },
    spawn2: { x: 80, y: 500 }
  },
  {
    name: "Surprise Attack",
    platforms: [
      { x: 0, y: 550, width: 200, height: 50 },
      { x: 250, y: 470, width: 100, height: 20 },
      { x: 400, y: 390, width: 100, height: 20 },
      { x: 550, y: 310, width: 100, height: 20 },
      { x: 700, y: 400, width: 100, height: 20 },
    ],
    spikes: [
      { x: 200, y: 530, width: 50, height: 20 },
      { x: 650, y: 530, width: 150, height: 20 }
    ],
    disappearingPlatforms: [],
    door: { x: 720, y: 340, width: 40, height: 60 },
    surprises: [
      { type: 'spike', x: 300, y: 450, width: 40, height: 20, triggerX: 280, active: false },
      { type: 'spike', x: 450, y: 370, width: 40, height: 20, triggerX: 430, active: false },
      { type: 'spike', x: 600, y: 290, width: 40, height: 20, triggerX: 580, active: false }
    ],
    buttons: [],
    bridges: [],
    spawn1: { x: 30, y: 500 },
    spawn2: { x: 100, y: 500 }
  },
  {
    name: "Bridge Master",
    platforms: [
      { x: 0, y: 550, width: 100, height: 50 },
      { x: 0, y: 350, width: 80, height: 20 },
      { x: 300, y: 550, width: 100, height: 50 },
      { x: 500, y: 400, width: 80, height: 20 },
      { x: 700, y: 300, width: 100, height: 20 },
    ],
    spikes: [
      { x: 100, y: 530, width: 200, height: 20 },
      { x: 400, y: 530, width: 100, height: 20 },
      { x: 580, y: 530, width: 120, height: 20 }
    ],
    disappearingPlatforms: [],
    door: { x: 720, y: 240, width: 40, height: 60 },
    surprises: [],
    buttons: [
      { x: 20, y: 330, width: 50, height: 20, linkedBridgeId: 1, pressed: false },
      { x: 320, y: 530, width: 50, height: 20, linkedBridgeId: 2, pressed: false },
      { x: 510, y: 380, width: 50, height: 20, linkedBridgeId: 3, pressed: false }
    ],
    bridges: [
      { id: 1, x: 100, y: 450, width: 200, height: 15, open: false },
      { id: 2, x: 400, y: 450, width: 100, height: 15, open: false },
      { id: 3, x: 580, y: 350, width: 120, height: 15, open: false }
    ],
    spawn1: { x: 30, y: 500 },
    spawn2: { x: 320, y: 500 }
  },
  {
    name: "Speed Run",
    platforms: [
      { x: 0, y: 550, width: 80, height: 50 },
      { x: 130, y: 500, width: 60, height: 20 },
      { x: 240, y: 450, width: 60, height: 20 },
      { x: 350, y: 400, width: 60, height: 20 },
      { x: 460, y: 350, width: 60, height: 20 },
      { x: 570, y: 300, width: 60, height: 20 },
      { x: 680, y: 350, width: 120, height: 20 },
    ],
    spikes: [
      { x: 80, y: 530, width: 50, height: 20 },
      { x: 190, y: 530, width: 50, height: 20 },
      { x: 300, y: 530, width: 50, height: 20 },
      { x: 410, y: 530, width: 50, height: 20 },
      { x: 520, y: 530, width: 50, height: 20 },
      { x: 630, y: 530, width: 50, height: 20 }
    ],
    disappearingPlatforms: [
      { x: 130, y: 500, width: 60, height: 20, disappearTime: 1000, visible: true, triggered: false },
      { x: 240, y: 450, width: 60, height: 20, disappearTime: 1000, visible: true, triggered: false },
      { x: 350, y: 400, width: 60, height: 20, disappearTime: 1000, visible: true, triggered: false },
      { x: 460, y: 350, width: 60, height: 20, disappearTime: 1000, visible: true, triggered: false },
      { x: 570, y: 300, width: 60, height: 20, disappearTime: 1000, visible: true, triggered: false }
    ],
    door: { x: 730, y: 290, width: 40, height: 60 },
    surprises: [],
    buttons: [],
    bridges: [],
    spawn1: { x: 20, y: 500 },
    spawn2: { x: 50, y: 500 }
  },

  // ===== CHAPTER 5: MASTERY (Levels 21-25) =====
  {
    name: "The Maze",
    platforms: [
      { x: 0, y: 550, width: 100, height: 50 },
      { x: 150, y: 480, width: 100, height: 20 },
      { x: 0, y: 380, width: 100, height: 20 },
      { x: 150, y: 280, width: 100, height: 20 },
      { x: 300, y: 380, width: 100, height: 20 },
      { x: 450, y: 280, width: 100, height: 20 },
      { x: 600, y: 380, width: 100, height: 20 },
      { x: 700, y: 280, width: 100, height: 20 },
    ],
    spikes: [
      { x: 100, y: 530, width: 50, height: 20 },
      { x: 250, y: 530, width: 50, height: 20 },
      { x: 400, y: 530, width: 50, height: 20 },
      { x: 550, y: 530, width: 50, height: 20 }
    ],
    disappearingPlatforms: [],
    door: { x: 720, y: 220, width: 40, height: 60 },
    surprises: [],
    buttons: [
      { x: 165, y: 260, width: 50, height: 20, linkedBridgeId: 1, pressed: false }
    ],
    bridges: [
      { id: 1, x: 250, y: 340, width: 50, height: 15, open: false }
    ],
    spawn1: { x: 30, y: 500 },
    spawn2: { x: 620, y: 330 }
  },
  {
    name: "Trapfall",
    platforms: [
      { x: 0, y: 550, width: 120, height: 50 },
      { x: 180, y: 480, width: 80, height: 20 },
      { x: 320, y: 410, width: 80, height: 20 },
      { x: 460, y: 340, width: 80, height: 20 },
      { x: 600, y: 270, width: 80, height: 20 },
      { x: 700, y: 350, width: 100, height: 20 },
    ],
    spikes: [
      { x: 120, y: 530, width: 60, height: 20 },
      { x: 260, y: 530, width: 60, height: 20 },
      { x: 400, y: 530, width: 60, height: 20 },
      { x: 540, y: 530, width: 60, height: 20 },
      { x: 680, y: 530, width: 120, height: 20 }
    ],
    disappearingPlatforms: [
      { x: 180, y: 480, width: 80, height: 20, disappearTime: 1200, visible: true, triggered: false },
      { x: 320, y: 410, width: 80, height: 20, disappearTime: 1200, visible: true, triggered: false },
      { x: 460, y: 340, width: 80, height: 20, disappearTime: 1200, visible: true, triggered: false }
    ],
    door: { x: 720, y: 290, width: 40, height: 60 },
    surprises: [
      { type: 'spike', x: 240, y: 460, width: 30, height: 20, triggerX: 200, active: false },
      { type: 'spike', x: 380, y: 390, width: 30, height: 20, triggerX: 340, active: false },
      { type: 'spike', x: 520, y: 320, width: 30, height: 20, triggerX: 480, active: false }
    ],
    buttons: [],
    bridges: [],
    spawn1: { x: 30, y: 500 },
    spawn2: { x: 70, y: 500 }
  },
  {
    name: "Double Trouble",
    platforms: [
      { x: 0, y: 550, width: 100, height: 50 },
      { x: 0, y: 350, width: 80, height: 20 },
      { x: 250, y: 450, width: 80, height: 20 },
      { x: 400, y: 350, width: 80, height: 20 },
      { x: 550, y: 250, width: 80, height: 20 },
      { x: 700, y: 350, width: 100, height: 20 },
    ],
    spikes: [
      { x: 100, y: 530, width: 150, height: 20 },
      { x: 330, y: 530, width: 70, height: 20 },
      { x: 480, y: 530, width: 70, height: 20 },
      { x: 630, y: 530, width: 70, height: 20 }
    ],
    disappearingPlatforms: [
      { x: 250, y: 450, width: 80, height: 20, disappearTime: 1500, visible: true, triggered: false },
      { x: 400, y: 350, width: 80, height: 20, disappearTime: 1500, visible: true, triggered: false }
    ],
    door: { x: 720, y: 290, width: 40, height: 60 },
    surprises: [],
    buttons: [
      { x: 20, y: 330, width: 50, height: 20, linkedBridgeId: 1, pressed: false },
      { x: 560, y: 230, width: 50, height: 20, linkedBridgeId: 2, pressed: false }
    ],
    bridges: [
      { id: 1, x: 100, y: 420, width: 150, height: 15, open: false },
      { id: 2, x: 630, y: 300, width: 70, height: 15, open: false }
    ],
    spawn1: { x: 30, y: 500 },
    spawn2: { x: 720, y: 300 }
  },
  {
    name: "Almost There",
    platforms: [
      { x: 0, y: 550, width: 80, height: 50 },
      { x: 130, y: 490, width: 50, height: 20 },
      { x: 230, y: 430, width: 50, height: 20 },
      { x: 330, y: 370, width: 50, height: 20 },
      { x: 430, y: 310, width: 50, height: 20 },
      { x: 530, y: 250, width: 50, height: 20 },
      { x: 630, y: 190, width: 50, height: 20 },
      { x: 700, y: 250, width: 100, height: 20 },
    ],
    spikes: [
      { x: 80, y: 530, width: 50, height: 20 },
      { x: 180, y: 530, width: 50, height: 20 },
      { x: 280, y: 530, width: 50, height: 20 },
      { x: 380, y: 530, width: 50, height: 20 },
      { x: 480, y: 530, width: 50, height: 20 },
      { x: 580, y: 530, width: 50, height: 20 },
      { x: 680, y: 530, width: 120, height: 20 }
    ],
    disappearingPlatforms: [
      { x: 130, y: 490, width: 50, height: 20, disappearTime: 800, visible: true, triggered: false },
      { x: 230, y: 430, width: 50, height: 20, disappearTime: 800, visible: true, triggered: false },
      { x: 330, y: 370, width: 50, height: 20, disappearTime: 800, visible: true, triggered: false },
      { x: 430, y: 310, width: 50, height: 20, disappearTime: 800, visible: true, triggered: false },
      { x: 530, y: 250, width: 50, height: 20, disappearTime: 800, visible: true, triggered: false },
      { x: 630, y: 190, width: 50, height: 20, disappearTime: 800, visible: true, triggered: false }
    ],
    door: { x: 730, y: 190, width: 40, height: 60 },
    surprises: [
      { type: 'spike', x: 160, y: 470, width: 20, height: 20, triggerX: 140, active: false },
      { type: 'spike', x: 260, y: 410, width: 20, height: 20, triggerX: 240, active: false },
      { type: 'spike', x: 360, y: 350, width: 20, height: 20, triggerX: 340, active: false }
    ],
    buttons: [],
    bridges: [],
    spawn1: { x: 20, y: 500 },
    spawn2: { x: 50, y: 500 }
  },
  {
    name: "FINAL ESCAPE",
    platforms: [
      { x: 0, y: 550, width: 80, height: 50 },
      { x: 120, y: 500, width: 50, height: 20 },
      { x: 0, y: 400, width: 60, height: 20 },
      { x: 200, y: 350, width: 60, height: 20 },
      { x: 350, y: 280, width: 60, height: 20 },
      { x: 500, y: 350, width: 60, height: 20 },
      { x: 650, y: 280, width: 60, height: 20 },
      { x: 720, y: 180, width: 80, height: 20 },
    ],
    spikes: [
      { x: 80, y: 530, width: 40, height: 20 },
      { x: 170, y: 530, width: 30, height: 20 },
      { x: 260, y: 530, width: 90, height: 20 },
      { x: 410, y: 530, width: 90, height: 20 },
      { x: 560, y: 530, width: 90, height: 20 },
      { x: 710, y: 530, width: 90, height: 20 }
    ],
    disappearingPlatforms: [
      { x: 120, y: 500, width: 50, height: 20, disappearTime: 700, visible: true, triggered: false },
      { x: 200, y: 350, width: 60, height: 20, disappearTime: 1000, visible: true, triggered: false },
      { x: 350, y: 280, width: 60, height: 20, disappearTime: 1000, visible: true, triggered: false },
      { x: 500, y: 350, width: 60, height: 20, disappearTime: 1000, visible: true, triggered: false },
      { x: 650, y: 280, width: 60, height: 20, disappearTime: 1000, visible: true, triggered: false }
    ],
    door: { x: 740, y: 120, width: 40, height: 60 },
    surprises: [
      { type: 'spike', x: 60, y: 380, width: 30, height: 20, triggerX: 30, active: false },
      { type: 'spike', x: 240, y: 330, width: 30, height: 20, triggerX: 220, active: false },
      { type: 'spike', x: 390, y: 260, width: 30, height: 20, triggerX: 370, active: false },
      { type: 'spike', x: 540, y: 330, width: 30, height: 20, triggerX: 520, active: false }
    ],
    buttons: [
      { x: 20, y: 380, width: 40, height: 20, linkedBridgeId: 1, pressed: false }
    ],
    bridges: [
      { id: 1, x: 60, y: 450, width: 60, height: 15, open: false }
    ],
    spawn1: { x: 20, y: 500 },
    spawn2: { x: 50, y: 500 }
  }
];
