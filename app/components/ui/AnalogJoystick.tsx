import { useRef, useEffect, useCallback } from 'react';

interface AnalogJoystickProps {
  onMove: (direction: { left: boolean; right: boolean; jump: boolean }) => void;
  color: string;
  label: string;
  side: 'left' | 'right';
}

export function AnalogJoystick({ onMove, color, label, side }: AnalogJoystickProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickRef = useRef<HTMLDivElement>(null);
  const isActiveRef = useRef(false);
  const startPosRef = useRef({ x: 0, y: 0 });

  const handleInput = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current || !stickRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const maxDistance = rect.width / 2 - 20;

    let deltaX = clientX - centerX;
    let deltaY = clientY - centerY;

    // Limit to circle
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    if (distance > maxDistance) {
      deltaX = (deltaX / distance) * maxDistance;
      deltaY = (deltaY / distance) * maxDistance;
    }

    // Move stick visual
    stickRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

    // Calculate direction
    const threshold = maxDistance * 0.3;
    const direction = {
      left: deltaX < -threshold,
      right: deltaX > threshold,
      jump: deltaY < -threshold,
    };

    onMove(direction);
  }, [onMove]);

  const handleStart = useCallback((clientX: number, clientY: number) => {
    isActiveRef.current = true;
    startPosRef.current = { x: clientX, y: clientY };
    handleInput(clientX, clientY);
  }, [handleInput]);

  const handleEnd = useCallback(() => {
    isActiveRef.current = false;
    if (stickRef.current) {
      stickRef.current.style.transform = 'translate(0, 0)';
    }
    onMove({ left: false, right: false, jump: false });
  }, [onMove]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Touch events
    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      handleStart(touch.clientX, touch.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (!isActiveRef.current) return;
      const touch = e.touches[0];
      handleInput(touch.clientX, touch.clientY);
    };

    const onTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      handleEnd();
    };

    container.addEventListener('touchstart', onTouchStart, { passive: false });
    container.addEventListener('touchmove', onTouchMove, { passive: false });
    container.addEventListener('touchend', onTouchEnd, { passive: false });
    container.addEventListener('touchcancel', onTouchEnd, { passive: false });

    return () => {
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
      container.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [handleStart, handleInput, handleEnd]);

  return (
    <div
      className={`flex flex-col items-center gap-1 analog-joystick`}
    >
      <div
        ref={containerRef}
        className="relative w-20 h-20 rounded-full border-2 flex items-center justify-center touch-none"
        style={{
          borderColor: color,
          background: `radial-gradient(circle, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.8) 100%)`,
          boxShadow: `0 0 15px ${color}40, inset 0 0 15px ${color}20`,
        }}
      >
        {/* Direction indicators */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 text-sm opacity-40" style={{ color }}>↑</div>
        <div className="absolute left-1 top-1/2 -translate-y-1/2 text-sm opacity-40" style={{ color }}>←</div>
        <div className="absolute right-1 top-1/2 -translate-y-1/2 text-sm opacity-40" style={{ color }}>→</div>
        
        {/* Center stick */}
        <div
          ref={stickRef}
          className="w-8 h-8 rounded-full transition-transform duration-75"
          style={{
            background: `linear-gradient(135deg, ${color} 0%, ${color}80 100%)`,
            boxShadow: `0 0 10px ${color}80`,
          }}
        />
      </div>
      <span className="text-xs font-bold" style={{ color }}>{label}</span>
    </div>
  );
}
