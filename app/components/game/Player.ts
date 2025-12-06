import type { Player, Keys, TouchButtons } from '~/types/game';
import { GRAVITY, JUMP_FORCE, MOVE_SPEED, PLAYER_WIDTH, PLAYER_HEIGHT } from '~/utils/constants';

export function createPlayer(x: number, y: number, color: string): Player {
  return {
    x,
    y,
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
    vx: 0,
    vy: 0,
    grounded: false,
    color,
  };
}

export function updatePlayerMovement(
  player: Player,
  keys: Keys,
  touchButtons: TouchButtons,
  leftKeys: string[],
  rightKeys: string[],
  jumpKeys: string[]
): void {
  let moving = false;

  // Check left movement
  const leftPressed = leftKeys.some(key => keys[key]) || touchButtons.left;
  if (leftPressed) {
    player.vx = -MOVE_SPEED;
    moving = true;
  }

  // Check right movement
  const rightPressed = rightKeys.some(key => keys[key]) || touchButtons.right;
  if (rightPressed) {
    player.vx = MOVE_SPEED;
    moving = true;
  }

  // Apply friction if not moving
  if (!moving) {
    player.vx *= 0.8;
  }

  // Check jump
  const jumpPressed = jumpKeys.some(key => keys[key]) || touchButtons.jump;
  if (jumpPressed && player.grounded) {
    player.vy = JUMP_FORCE;
    player.grounded = false;
  }
}

export function applyGravity(player: Player): void {
  player.vy += GRAVITY;
}

export function updatePlayerPosition(player: Player, canvasWidth: number, canvasHeight: number): void {
  player.x += player.vx;
  player.y += player.vy;

  // Boundary collision
  if (player.x < 0) player.x = 0;
  if (player.x > canvasWidth - player.width) player.x = canvasWidth - player.width;

  player.grounded = false;
}

