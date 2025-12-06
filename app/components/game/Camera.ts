import type { Player } from '~/types/game';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '~/utils/constants';

export interface Camera {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function calculateSharedCamera(
  player1: Player,
  player2: Player,
  levelWidth: number,
  levelHeight: number
): Camera {
  // Calculate midpoint between players
  const midpointX = (player1.x + player2.x) / 2;
  const midpointY = (player1.y + player2.y) / 2;

  // Calculate distance between players
  const distanceX = Math.abs(player1.x - player2.x);
  const distanceY = Math.abs(player1.y - player2.y);

  // Camera follows midpoint with padding
  const padding = 100;
  let cameraX = midpointX - CANVAS_WIDTH / 2;
  let cameraY = midpointY - CANVAS_HEIGHT / 2;

  // Keep camera within level bounds
  cameraX = Math.max(0, Math.min(cameraX, levelWidth - CANVAS_WIDTH));
  cameraY = Math.max(0, Math.min(cameraY, levelHeight - CANVAS_HEIGHT));

  // Adjust zoom if players are too far apart (optional - could implement zoom feature)
  const minZoom = 1;
  const maxZoom = 1.5;
  const zoomFactor = Math.min(
    maxZoom,
    Math.max(minZoom, 1 + (distanceX + distanceY) / (CANVAS_WIDTH + CANVAS_HEIGHT))
  );

  return {
    x: cameraX,
    y: cameraY,
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
  };
}

export function worldToScreenX(worldX: number, camera: Camera, splitSide: 'left' | 'right'): number {
  const screenX = worldX - camera.x;
  const splitWidth = CANVAS_WIDTH / 2;
  if (splitSide === 'left') {
    return screenX;
  } else {
    return screenX;
  }
}

export function worldToScreenY(worldY: number, camera: Camera): number {
  return worldY - camera.y;
}

