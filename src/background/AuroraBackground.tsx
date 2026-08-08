import { useEffect, useRef } from 'react';
import { AuroraLayer } from './AuroraLayer';
import { ParticleField } from './ParticleField';
import { Vignette } from './Vignette';
import {
  BASE_BACKGROUND_CSS,
  SPOTLIGHT_BASE_OPACITY,
  SPOTLIGHT_RADIUS_PX,
  SPOTLIGHT_INACTIVE_OPACITY_MULTIPLIER,
  SPOTLIGHT_MOUSE_SMOOTHING,
  SPOTLIGHT_REDUCED_MOTION_SMOOTHING,
  SPOTLIGHT_LOW_TIER_RADIUS_MULTIPLIER,
  SPOTLIGHT_PRIMARY_COLOR,
  SPOTLIGHT_SECONDARY_COLOR,
  SPOTLIGHT_SECONDARY_STOP,
  SPOTLIGHT_FADE_STOP,
  SPOTLIGHT_SECONDARY_OPACITY_MULTIPLIER,
} from '../constants/auroraConfig';
import { useAuroraDevStore } from '../constants/auroraDevStore';
import { getBreathingPhase, lerp } from '../utils/math';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useDeviceTier } from '../hooks/useDeviceTier';
import { useMousePosition } from '../hooks/useMousePosition';

export function AuroraBackground() {
  const reducedMotion = useReducedMotion();
  const tier = useDeviceTier();
  const mouseRef = useMousePosition();

  const spotlightRef = useRef<HTMLDivElement>(null);
  const smoothedMouse = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
  });

  useEffect(() => {
    const el = spotlightRef.current;
    if (!el) return;
    let raf = 0;
    const radiusMultiplier = tier === 'low' ? SPOTLIGHT_LOW_TIER_RADIUS_MULTIPLIER : 1;
    const radius = SPOTLIGHT_RADIUS_PX * radiusMultiplier;
    const smoothing = reducedMotion ? SPOTLIGHT_REDUCED_MOTION_SMOOTHING : SPOTLIGHT_MOUSE_SMOOTHING;
    const tick = () => {
      const m = mouseRef.current;
      const s = smoothedMouse.current;
      s.x = lerp(s.x, m.x, smoothing);
      s.y = lerp(s.y, m.y, smoothing);
      const dev = useAuroraDevStore.getState();
      const breath = reducedMotion
        ? 1
        : getBreathingPhase(dev.breathingCycleMs, dev.breathingDepth);
      const baseOpacity = SPOTLIGHT_BASE_OPACITY * breath;
      const opacity = m.active
        ? baseOpacity
        : baseOpacity * SPOTLIGHT_INACTIVE_OPACITY_MULTIPLIER;
      const secondaryOpacity = opacity * SPOTLIGHT_SECONDARY_OPACITY_MULTIPLIER;
      const grad = `radial-gradient(${radius}px at ${s.x}px ${s.y}px, ${SPOTLIGHT_PRIMARY_COLOR}${opacity}) 0%, ${SPOTLIGHT_SECONDARY_COLOR}${secondaryOpacity}) ${SPOTLIGHT_SECONDARY_STOP}%, ${SPOTLIGHT_PRIMARY_COLOR}0) ${SPOTLIGHT_FADE_STOP}%)`;
      el.style.background = grad;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion, tier, mouseRef]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{ background: BASE_BACKGROUND_CSS }}
      />
      <AuroraLayer />
      <ParticleField
        mouseRef={mouseRef}
        tier={tier}
        reducedMotion={reducedMotion}
      />
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      />
      <Vignette />
    </div>
  );
}
