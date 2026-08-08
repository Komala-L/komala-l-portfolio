import {
  BREATHING_CYCLE_MS,
  BREATHING_DEPTH,
} from '../constants/auroraConfig';

export function getBreathingPhase(
  cycleMs: number = BREATHING_CYCLE_MS,
  depth: number = BREATHING_DEPTH,
  now: number = typeof performance !== 'undefined' ? performance.now() : Date.now()
): number {
  const t = (now % cycleMs) / cycleMs;
  const sine = Math.sin(t * Math.PI * 2);
  const base = 1;
  return base + sine * depth;
}

export function dist(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

export function distSq(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return dx * dx + dy * dy;
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function clamp(v: number, min: number, max: number): number {
  return Math.min(Math.max(v, min), max);
}

export function randRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}
