import { useEffect, useMemo, useRef } from 'react';
import {
  AURORA_BASE_OPACITY,
  AURORA_BLOB_COUNT,
  AURORA_BLUR_PX,
  AURORA_COLORS,
  AURORA_DRIFT_ANIMATION_NAMES,
  AURORA_DRIFT_DURATION_MAX,
  AURORA_DRIFT_DURATION_MIN,
  AURORA_MAX_SIZE,
  AURORA_MIN_SIZE,
  AURORA_POS_LEFT_MAX,
  AURORA_POS_LEFT_MIN,
  AURORA_POS_TOP_MAX,
  AURORA_POS_TOP_MIN,
  type AuroraDriftName,
} from '../constants/auroraConfig';
import {
  getEffectiveAuroraOpacity,
  useAuroraDevStore,
} from '../constants/auroraDevStore';
import { getBreathingPhase, randRange } from '../utils/math';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface BlobSeed {
  top: string;
  left: string;
  size: number;
  color: string;
  animationName: AuroraDriftName;
  duration: number;
  delay: number;
}

export function AuroraLayer() {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  const blobs = useMemo<BlobSeed[]>(() => {
    const seeds: BlobSeed[] = [];
    const driftNames: readonly AuroraDriftName[] = AURORA_DRIFT_ANIMATION_NAMES;
    for (let i = 0; i < AURORA_BLOB_COUNT; i++) {
      seeds.push({
        top: `${randRange(AURORA_POS_TOP_MIN, AURORA_POS_TOP_MAX)}%`,
        left: `${randRange(AURORA_POS_LEFT_MIN, AURORA_POS_LEFT_MAX)}%`,
        size: Math.floor(randRange(AURORA_MIN_SIZE, AURORA_MAX_SIZE)),
        color: AURORA_COLORS[i % AURORA_COLORS.length],
        animationName: driftNames[i % driftNames.length],
        duration: Math.floor(
          randRange(AURORA_DRIFT_DURATION_MIN, AURORA_DRIFT_DURATION_MAX)
        ),
        delay: -Math.floor(randRange(0, AURORA_DRIFT_DURATION_MIN)),
      });
    }
    return seeds;
  }, []);

  const blobRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const dev = useAuroraDevStore.getState();
      const baseOpacity = getEffectiveAuroraOpacity(dev.auroraOpacityMult);
      const phase = reducedMotion
        ? 1
        : getBreathingPhase(dev.breathingCycleMs, dev.breathingDepth);
      const opacity = baseOpacity * phase;
      const items = blobRefs.current;
      for (let i = 0; i < items.length; i++) {
        const el = items[i];
        if (el) {
          el.style.opacity = String(opacity);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${
        reducedMotion ? 'aurora-reduced-motion' : ''
      }`}
    >
      {blobs.map((b, i) => (
        <div
          key={i}
          ref={(el) => {
            blobRefs.current[i] = el;
          }}
          className="aurora-blob absolute rounded-full"
          style={{
            top: b.top,
            left: b.left,
            width: `${b.size}px`,
            height: `${b.size}px`,
            backgroundColor: b.color,
            filter: `blur(${AURORA_BLUR_PX}px)`,
            opacity: AURORA_BASE_OPACITY,
            animation: `${b.animationName} ${b.duration}s ease-in-out ${b.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
