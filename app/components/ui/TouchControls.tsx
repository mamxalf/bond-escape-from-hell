import type { TouchButtons } from '~/types/game';
import { AnalogJoystick } from './AnalogJoystick';

interface TouchControlsProps {
  player1Controls: TouchButtons;
  player2Controls: TouchButtons;
  onPlayer1Touch: (button: keyof TouchButtons, pressed: boolean) => void;
  onPlayer2Touch: (button: keyof TouchButtons, pressed: boolean) => void;
  isSinglePlayer?: boolean;
  position: 'left' | 'right';
}

export function TouchControls({
  onPlayer1Touch,
  onPlayer2Touch,
  isSinglePlayer = false,
  position,
}: TouchControlsProps) {
  const handlePlayer1Move = (direction: { left: boolean; right: boolean; jump: boolean }) => {
    onPlayer1Touch('left', direction.left);
    onPlayer1Touch('right', direction.right);
    onPlayer1Touch('jump', direction.jump);
  };

  const handlePlayer2Move = (direction: { left: boolean; right: boolean; jump: boolean }) => {
    onPlayer2Touch('left', direction.left);
    onPlayer2Touch('right', direction.right);
    onPlayer2Touch('jump', direction.jump);
  };

  // Left side control - always Player 1
  if (position === 'left') {
    return (
      <div className="flex items-center justify-center h-full">
        <AnalogJoystick
          onMove={handlePlayer1Move}
          color="#ff9500"
          label="P1"
          side="left"
        />
      </div>
    );
  }

  // Right side control - Player 2 in 2P mode, or nothing in 1P mode
  if (position === 'right') {
    if (isSinglePlayer) {
      // Show empty placeholder in 1P mode (or could show P1 jump button)
      return (
        <div className="flex items-center justify-center h-full opacity-30">
          <div className="w-20 h-20 rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center">
            <span className="text-gray-600 text-xs">1P</span>
          </div>
        </div>
      );
    }
    
    return (
      <div className="flex items-center justify-center h-full">
        <AnalogJoystick
          onMove={handlePlayer2Move}
          color="#00d4ff"
          label="P2"
          side="right"
        />
      </div>
    );
  }

  return null;
}
