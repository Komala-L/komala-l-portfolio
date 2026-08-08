import { useEffect, useRef } from 'react';

export interface MousePos {
  x: number;
  y: number;
  active: boolean;
}

export function useMousePosition() {
  const ref = useRef<MousePos>({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
    active: false,
  });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      ref.current.x = e.clientX;
      ref.current.y = e.clientY;
      ref.current.active = true;
    };

    const onTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        ref.current.x = e.touches[0].clientX;
        ref.current.y = e.touches[0].clientY;
        ref.current.active = true;
      }
    };

    const onLeave = () => {
      ref.current.active = false;
    };

    const onTouchEnd = () => {
      ref.current.active = false;
    };

    const onBlur = () => {
      ref.current.active = false;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('touchcancel', onTouchEnd);
    window.addEventListener('blur', onBlur);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
      window.removeEventListener('blur', onBlur);
    };
  }, []);

  return ref;
}
