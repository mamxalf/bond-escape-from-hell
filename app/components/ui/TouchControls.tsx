import type { TouchButtons } from '~/types/game';
import { AnalogJoystick } from './AnalogJoystick';

interface TouchControlsProps {
  player1Controls: TouchButtons;
  player2Controls: TouchButtons;
  onPlayer1Touch: (button: keyof TouchButtons, pressed: boolean) => void;
  onPlayer2Touch: (button: keyof TouchButtons, pressed: boolean) => void;
  isSinglePlayer?: boolean;
}

export function TouchControls({
  onPlayer1Touch,
  onPlayer2Touch,
  isSinglePlayer = false,
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

  if (isSinglePlayer) {
    // Single player: one large joystick centered at bottom
    return (
      <div className="fixed bottom-4 left-0 right-0 flex justify-center px-4">
        <AnalogJoystick
          onMove={handlePlayer1Move}
          color="#ff9500"
          label="Player 1"
          side="left"
        />
      </div>
    );
  }

  // Two player: joysticks on left and right sides
  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-between px-4">
      <AnalogJoystick
        onMove={handlePlayer1Move}
        color="#ff9500"
        label="Player 1"
        side="left"
      />
      <AnalogJoystick
        onMove={handlePlayer2Move}
        color="#00d4ff"
        label="Player 2"
        side="right"
      />
    </div>
  );
}
