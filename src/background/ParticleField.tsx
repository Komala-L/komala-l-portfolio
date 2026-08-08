import { useEffect, useRef } from 'react';
import type { MutableRefObject } from 'react';
import {
  NETWORK_DISTANCE,
  PARTICLE_AMPLITUDE_MAX,
  PARTICLE_AMPLITUDE_MIN,
  PARTICLE_BASE_ALPHA,
  PARTICLE_BASE_RADIUS,
  PARTICLE_BASE_RADIUS_MAX_MULT,
  PARTICLE_BASE_RADIUS_MIN_MULT,
  PARTICLE_CORE_PALETTE,
  PARTICLE_CURSOR_ALPHA_BOOST,
  PARTICLE_CURSOR_RADIUS_MULT,
  PARTICLE_DAMPING,
  PARTICLE_DRIFT_SPEED,
  PARTICLE_DRIFT_X_MULT,
  PARTICLE_DRIFT_Y_MULT,
  PARTICLE_GLOW_COLOR,
  PARTICLE_GLOW_THRESHOLD_ALPHA,
  PARTICLE_HARMONIC_Y,
  PARTICLE_INITIAL_SPEED_MULT,
  PARTICLE_LINE_BASE_WIDTH,
  PARTICLE_LINE_COLOR,
  PARTICLE_LINE_FADE_EXPONENT,
  PARTICLE_LINE_GLOW_COLOR,
  PARTICLE_LINE_GLOW_SHADOW_ALPHA_MULT,
  PARTICLE_LINE_MAX_ALPHA,
  PARTICLE_LINE_WIDTH_BOOST,
  PARTICLE_PHASE_SPEED_MAX,
  PARTICLE_PHASE_SPEED_MIN,
  PARTICLE_REPULSE_FORCE_MULT,
  PARTICLE_REPULSE_RADIUS,
  PARTICLE_RESIZE_DEBOUNCE_MS,
  PARTICLE_VELOCITY_LERP,
  PARTICLE_WANDER_SPEED_MAX,
  PARTICLE_WANDER_SPEED_MIN,
  PARTICLE_WANDER_STRENGTH,
  PARTICLE_WRAP_MARGIN,
  PARTICLE_UPWARD_SPEED,
  type DeviceTier,
} from '../constants/auroraConfig';
import {
  getEffectiveCursorRepulseStrength,
  getEffectiveGlowAlphaMult,
  getEffectiveGlowRadiusMult,
  getEffectiveLineGlowBlur,
  getEffectiveParticleCount,
  useAuroraDevStore,
} from '../constants/auroraDevStore';
import type { MousePos } from '../hooks/useMousePosition';
import {
  clamp,
  distSq,
  getBreathingPhase,
  lerp,
  randRange,
} from '../utils/math';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseR: number;
  phase: number;
  phaseSpeed: number;
  ampX: number;
  ampY: number;
  wanderAngle: number;
  wanderSpeed: number;
  colorIndex: number;
}

interface ParticleFieldProps {
  mouseRef: MutableRefObject<MousePos>;
  tier: DeviceTier;
  reducedMotion: boolean;
}

const PARTICLE_RADIUS_BREATH_MULT = 0.18;

export function ParticleField({
  mouseRef,
  tier,
  reducedMotion,
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });
  const lastNonceRef = useRef<number>(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const palette = PARTICLE_CORE_PALETTE;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      sizeRef.current = { w, h, dpr };
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initParticles = (count: number) => {
      const { w, h } = sizeRef.current;
      const arr = particlesRef.current;
      if (arr.length !== count) {
        arr.length = 0;
        for (let i = 0; i < count; i++) {
          arr.push({
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            baseR: 0,
            phase: 0,
            phaseSpeed: 0,
            ampX: 0,
            ampY: 0,
            wanderAngle: 0,
            wanderSpeed: 0,
            colorIndex: 0,
          });
        }
      }
      for (let i = 0; i < count; i++) {
        const p = arr[i];
        const x = randRange(0, w);
        const y = randRange(0, h);
        p.x = x;
        p.y = y;
        p.vx =
          randRange(-PARTICLE_DRIFT_SPEED, PARTICLE_DRIFT_SPEED) *
          PARTICLE_INITIAL_SPEED_MULT;
        p.vy =
          randRange(-PARTICLE_DRIFT_SPEED, PARTICLE_DRIFT_SPEED) *
          PARTICLE_INITIAL_SPEED_MULT;
        p.baseR = randRange(
          PARTICLE_BASE_RADIUS * PARTICLE_BASE_RADIUS_MIN_MULT,
          PARTICLE_BASE_RADIUS * PARTICLE_BASE_RADIUS_MAX_MULT
        );
        p.phase = randRange(0, Math.PI * 2);
        p.phaseSpeed = randRange(
          PARTICLE_PHASE_SPEED_MIN,
          PARTICLE_PHASE_SPEED_MAX
        );
        p.ampX = randRange(PARTICLE_AMPLITUDE_MIN, PARTICLE_AMPLITUDE_MAX);
        p.ampY = randRange(PARTICLE_AMPLITUDE_MIN, PARTICLE_AMPLITUDE_MAX);
        p.wanderAngle = randRange(0, Math.PI * 2);
        p.wanderSpeed = randRange(
          PARTICLE_WANDER_SPEED_MIN,
          PARTICLE_WANDER_SPEED_MAX
        );
        p.colorIndex = i % palette.length;
      }
    };

    resize();
    {
      const dev = useAuroraDevStore.getState();
      const initialCount = getEffectiveParticleCount(
        dev.particleCountOverride,
        tier
      );
      initParticles(initialCount);
      lastNonceRef.current = dev.particleNonce;
    }

    let resizeTimer = 0;
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        resize();
        const dev = useAuroraDevStore.getState();
        initParticles(
          getEffectiveParticleCount(dev.particleCountOverride, tier)
        );
      }, PARTICLE_RESIZE_DEBOUNCE_MS);
    };
    window.addEventListener('resize', onResize, { passive: true });

    let raf = 0;

    const updateParticles = (
      pts: Particle[],
      w: number,
      h: number,
      mouse: MousePos,
      cursorRepulseStrength: number
    ) => {
      const margin = PARTICLE_WRAP_MARGIN;
      const damping = PARTICLE_DAMPING;
      const velLerp = PARTICLE_VELOCITY_LERP;
      const repulseRadiusSq =
        PARTICLE_REPULSE_RADIUS * PARTICLE_REPULSE_RADIUS;

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];

        p.phase += p.phaseSpeed;
        p.wanderAngle += p.wanderSpeed;

        const driftX =
          Math.sin(p.phase) * p.ampX * PARTICLE_DRIFT_X_MULT;
        const driftY =
          Math.cos(p.phase * PARTICLE_HARMONIC_Y) *
          p.ampY *
          PARTICLE_DRIFT_Y_MULT;
        const wanderX = Math.cos(p.wanderAngle) * PARTICLE_WANDER_STRENGTH;
        const wanderY = Math.sin(p.wanderAngle) * PARTICLE_WANDER_STRENGTH;
        const desiredVx = driftX + wanderX;
        const desiredVy = driftY + wanderY - PARTICLE_UPWARD_SPEED;

        p.vx = lerp(p.vx, desiredVx, velLerp);
        p.vy = lerp(p.vy, desiredVy, velLerp);

        if (mouse.active && cursorRepulseStrength > 0) {
          const dSq = distSq(p.x, p.y, mouse.x, mouse.y);
          if (dSq < repulseRadiusSq) {
            const d = Math.sqrt(dSq);
            if (d > 0.0001) {
              const falloff = 1 - d / PARTICLE_REPULSE_RADIUS;
              const strength =
                falloff * falloff * cursorRepulseStrength;
              const nx = (p.x - mouse.x) / d;
              const ny = (p.y - mouse.y) / d;
              p.vx += nx * strength * PARTICLE_REPULSE_FORCE_MULT;
              p.vy += ny * strength * PARTICLE_REPULSE_FORCE_MULT;
            }
          }
        }

        p.x += p.vx;
        p.y += p.vy - PARTICLE_UPWARD_SPEED;
        p.vx = lerp(p.vx, desiredVx, velLerp);
        p.vy = lerp(p.vy, desiredVy, velLerp);

        p.vx *= damping;
        p.vy *= damping;

        if (p.x < -margin) {
          p.x = w + margin;
        } else if (p.x > w + margin) {
          p.x = -margin;
        }
        if (p.y < -margin) {
          p.y = h + margin;
        } else if (p.y > h + margin) {
          p.y = -margin;
        }
      }
    };

    const drawParticles = (
      c: CanvasRenderingContext2D,
      pts: Particle[],
      mouse: MousePos,
      breath: number,
      glowRadiusMult: number,
      glowAlphaMult: number
    ) => {
      const repulseRadiusSq =
        PARTICLE_REPULSE_RADIUS * PARTICLE_REPULSE_RADIUS;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const col = palette[p.colorIndex];
        let alpha = PARTICLE_BASE_ALPHA * breath;
        let radius = p.baseR * (1 + (breath - 1) * PARTICLE_RADIUS_BREATH_MULT);

        if (mouse.active) {
          const dSq = distSq(p.x, p.y, mouse.x, mouse.y);
          if (dSq < repulseRadiusSq) {
            const d = Math.sqrt(dSq);
            const k = 1 - d / PARTICLE_REPULSE_RADIUS;
            alpha = clamp(alpha + k * PARTICLE_CURSOR_ALPHA_BOOST, 0, 1);
            radius = p.baseR * (1 + k * PARTICLE_CURSOR_RADIUS_MULT);
          }
        }

        const fade = 1 - alpha;
        const r = Math.floor(col.r - fade * 22);
        const g = Math.floor(col.g - fade * 22);
        const b = Math.floor(col.b - fade * 18);
        c.beginPath();
        c.arc(p.x, p.y, radius, 0, Math.PI * 2);
        c.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        c.fill();

        if (alpha > PARTICLE_GLOW_THRESHOLD_ALPHA && glowRadiusMult > 0 && glowAlphaMult > 0) {
          const glowR = radius * glowRadiusMult;
          c.beginPath();
          c.arc(p.x, p.y, glowR, 0, Math.PI * 2);
          const grad = c.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            glowR
          );
          grad.addColorStop(
            0,
            `${PARTICLE_GLOW_COLOR}${alpha * glowAlphaMult})`
          );
          grad.addColorStop(1, `${PARTICLE_GLOW_COLOR}0)`);
          c.fillStyle = grad;
          c.fill();
        }
      }
    };

    const drawNetwork = (
      c: CanvasRenderingContext2D,
      pts: Particle[],
      maxDist: number,
      maxDistSq: number,
      breath: number,
      lineGlowBlur: number
    ) => {
      const len = pts.length;
      const fadeExp = PARTICLE_LINE_FADE_EXPONENT;
      const lineMaxAlpha = PARTICLE_LINE_MAX_ALPHA;
      const baseWidth = PARTICLE_LINE_BASE_WIDTH;
      const widthBoost = PARTICLE_LINE_WIDTH_BOOST;
      const shadowAlpha = lineMaxAlpha * PARTICLE_LINE_GLOW_SHADOW_ALPHA_MULT;

      c.lineCap = 'butt';
      c.shadowBlur = lineGlowBlur;
      if (lineGlowBlur > 0 && shadowAlpha > 0) {
        c.shadowColor = `${PARTICLE_LINE_GLOW_COLOR}${shadowAlpha})`;
      } else {
        c.shadowColor = 'transparent';
      }

      for (let i = 0; i < len; i++) {
        const a = pts[i];
        for (let j = i + 1; j < len; j++) {
          const b = pts[j];
          const dSq = distSq(a.x, a.y, b.x, b.y);
          if (dSq >= maxDistSq) continue;
          const d = Math.sqrt(dSq);
          const k = 1 - d / maxDist;
          const kFaded = Math.pow(k, fadeExp);
          const alpha = lineMaxAlpha * kFaded * breath;
          const width = baseWidth + kFaded * widthBoost;

          c.lineWidth = width;
          c.strokeStyle = `${PARTICLE_LINE_COLOR}${alpha})`;
          c.beginPath();
          c.moveTo(a.x, a.y);
          c.lineTo(b.x, b.y);
          c.stroke();
        }
      }

      c.shadowBlur = 0;
      c.shadowColor = 'transparent';
    };

    const tick = () => {
      const dev = useAuroraDevStore.getState();

      if (dev.particleNonce !== lastNonceRef.current) {
        lastNonceRef.current = dev.particleNonce;
        const count = getEffectiveParticleCount(
          dev.particleCountOverride,
          tier
        );
        initParticles(count);
      }

      const { w, h } = sizeRef.current;
      const mouse = mouseRef.current;
      const breath = reducedMotion
        ? 1
        : getBreathingPhase(dev.breathingCycleMs, dev.breathingDepth);

      const cursorRepulseStrength = getEffectiveCursorRepulseStrength(
        dev.cursorRepulseMult
      );
      const glowRadiusMult = getEffectiveGlowRadiusMult(dev.glowIntensityMult);
      const glowAlphaMult = getEffectiveGlowAlphaMult(dev.glowIntensityMult);
      const lineGlowBlur = getEffectiveLineGlowBlur(dev.glowIntensityMult);

      if (!reducedMotion) {
        updateParticles(
          particlesRef.current,
          w,
          h,
          mouse,
          cursorRepulseStrength
        );
      }

      const networkDistance = NETWORK_DISTANCE[tier];
      const networkDistanceSq = networkDistance * networkDistance;

      ctx.clearRect(0, 0, w, h);
      drawNetwork(
        ctx,
        particlesRef.current,
        networkDistance,
        networkDistanceSq,
        breath,
        lineGlowBlur
      );
      drawParticles(
        ctx,
        particlesRef.current,
        mouse,
        breath,
        glowRadiusMult,
        glowAlphaMult
      );

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
    };
  }, [tier, reducedMotion, mouseRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}