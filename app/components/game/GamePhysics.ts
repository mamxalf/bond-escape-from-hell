import type { Player, Platform, DisappearingPlatform, Spike, Surprise, Door, Level, Button, Bridge } from '~/types/game';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '~/utils/constants';

export function checkPlatformCollision(player: Player, platform: Platform): boolean {
  if (
    player.x + player.width > platform.x &&
    player.x < platform.x + platform.width &&
    player.y + player.height > platform.y &&
    player.y + player.height < platform.y + 20 &&
    player.vy > 0
  ) {
    player.y = platform.y - player.height;
    player.vy = 0;
    player.grounded = true;
    return true;
  }
  return false;
}

export function checkDisappearingPlatformCollision(
  player: Player,
  platform: DisappearingPlatform
): boolean {
  if (!platform.visible) return false;

  if (
    player.x + player.width > platform.x &&
    player.x < platform.x + platform.width &&
    player.y + player.height > platform.y &&
    player.y + player.height < platform.y + 20 &&
    player.vy > 0
  ) {
    player.y = platform.y - player.height;
    player.vy = 0;
    player.grounded = true;

    if (!platform.triggered) {
      platform.triggered = true;
      setTimeout(() => {
        platform.visible = false;
      }, platform.disappearTime);
    }
    return true;
  }
  return false;
}

export function checkBridgeCollision(player: Player, bridge: Bridge): boolean {
  if (!bridge.open) return false;

  if (
    player.x + player.width > bridge.x &&
    player.x < bridge.x + bridge.width &&
    player.y + player.height > bridge.y &&
    player.y + player.height < bridge.y + 20 &&
    player.vy > 0
  ) {
    player.y = bridge.y - player.height;
    player.vy = 0;
    player.grounded = true;
    return true;
  }
  return false;
}

export function checkSpikeCollision(player: Player, spike: Spike): boolean {
  return (
    player.x + player.width > spike.x &&
    player.x < spike.x + spike.width &&
    player.y + player.height > spike.y &&
    player.y < spike.y + spike.height
  );
}

export function checkDoorCollision(player: Player, door: Door): boolean {
  return (
    player.x + player.width > door.x &&
    player.x < door.x + door.width &&
    player.y + player.height > door.y &&
    player.y < door.y + door.height
  );
}

export function checkButtonCollision(player: Player, button: Button): boolean {
  return (
    player.x + player.width > button.x &&
    player.x < button.x + button.width &&
    player.y + player.height > button.y &&
    player.y < button.y + button.height
  );
}

export function checkButtonCollisions(player: Player, level: Level, isSinglePlayer: boolean = false): void {
  if (!level.buttons || !level.bridges) return;

  level.buttons.forEach(button => {
    const isOnButton = checkButtonCollision(player, button);

    if (isSinglePlayer) {
      // 1P MODE: Toggle on step (only toggle when entering button area)
      if (isOnButton && !button.wasPressed) {
        button.pressed = !button.pressed; // Toggle state
        const linkedBridge = level.bridges?.find(b => b.id === button.linkedBridgeId);
        if (linkedBridge) {
          linkedBridge.open = button.pressed;
        }
      }
      button.wasPressed = isOnButton;
    } else {
      // 2P MODE: Must hold button
      const wasPressed = button.pressed;
      button.pressed = isOnButton;

      if (button.pressed !== wasPressed) {
        const linkedBridge = level.bridges?.find(b => b.id === button.linkedBridgeId);
        if (linkedBridge) {
          linkedBridge.open = button.pressed;
        }
      }
    }
  });
}

export function checkLevelCollisions(
  player: Player,
  level: Level,
  onDeath?: () => void,
  onSurpriseTrigger?: (surprise: Surprise) => void
): { hitSpike: boolean; atDoor: boolean } {
  // Check spikes
  for (const spike of level.spikes) {
    if (checkSpikeCollision(player, spike)) {
      if (onDeath) onDeath();
      return { hitSpike: true, atDoor: false };
    }
  }

  // Check surprises
  if (level.surprises) {
    for (const surprise of level.surprises) {
      // Trigger surprise
      if (!surprise.active && !surprise.triggered && player.x > surprise.triggerX) {
        if (surprise.type === 'spike') {
          surprise.active = true;
        } else if (surprise.type === 'falling') {
          surprise.triggered = true;
        }
        if (onSurpriseTrigger) onSurpriseTrigger(surprise);
      }

      // Check spike surprise collision
      if (surprise.type === 'spike' && surprise.active && surprise.width && surprise.height) {
        if (
          player.x + player.width > surprise.x &&
          player.x < surprise.x + surprise.width &&
          player.y + player.height > surprise.y &&
          player.y < surprise.y + surprise.height
        ) {
          if (onDeath) onDeath();
          return { hitSpike: true, atDoor: false };
        }
      }
    }
  }

  // Check falling platforms
  if (level.surprises) {
    for (const surprise of level.surprises) {
      if (surprise.type === 'falling' && surprise.triggered && surprise.fallSpeed !== undefined) {
        surprise.fallSpeed += 0.5;
        const platform = level.platforms.find(plat => plat.x === surprise.x);
        if (platform) {
          platform.y += surprise.fallSpeed;
        }
      }
    }
  }

  // Check platform collisions
  for (const platform of level.platforms) {
    checkPlatformCollision(player, platform);
  }

  // Check disappearing platforms
  for (const platform of level.disappearingPlatforms) {
    checkDisappearingPlatformCollision(player, platform);
  }

  // Check bridge collisions
  if (level.bridges) {
    for (const bridge of level.bridges) {
      checkBridgeCollision(player, bridge);
    }
  }

  // Check door
  const atDoor = checkDoorCollision(player, level.door);

  // Check fall out of bounds
  if (player.y > CANVAS_HEIGHT) {
    if (onDeath) onDeath();
    return { hitSpike: true, atDoor: false };
  }

  return { hitSpike: false, atDoor };
}

export function resetLevel(level: Level): void {
  level.disappearingPlatforms.forEach(p => {
    p.visible = true;
    p.triggered = false;
  });
  level.surprises.forEach(s => {
    s.active = false;
    s.triggered = false;
    if (s.fallSpeed !== undefined) s.fallSpeed = 0;
  });
  // Reset buttons and bridges
  if (level.buttons) {
    level.buttons.forEach(b => {
      b.pressed = false;
    });
  }
  if (level.bridges) {
    level.bridges.forEach(b => {
      b.open = false;
    });
  }
}
