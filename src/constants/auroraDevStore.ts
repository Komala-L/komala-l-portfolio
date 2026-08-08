import { create } from 'zustand';
import {
  AURORA_BASE_OPACITY,
  BREATHING_CYCLE_MS,
  BREATHING_DEPTH,
  PARTICLE_COUNTS,
  PARTICLE_GLOW_ALPHA_MULT,
  PARTICLE_GLOW_RADIUS_MULT,
  PARTICLE_LINE_GLOW_SHADOW_BLUR,
  PARTICLE_REPULSE_STRENGTH,
  type DeviceTier,
} from './auroraConfig';

export interface AuroraDevParamsState {
  readonly particleCountOverride: number | null;
  readonly auroraOpacityMult: number;
  readonly breathingCycleMs: number;
  readonly breathingDepth: number;
  readonly glowIntensityMult: number;
  readonly cursorRepulseMult: number;
  readonly particleNonce: number;
}

export interface AuroraDevParamsActions {
  setParticleCountOverride: (value: number | null) => void;
  setAuroraOpacityMult: (value: number) => void;
  setBreathingCycleMs: (value: number) => void;
  setBreathingDepth: (value: number) => void;
  setGlowIntensityMult: (value: number) => void;
  setCursorRepulseMult: (value: number) => void;
  forceReinitParticles: () => void;
  resetDefaults: () => void;
}

export type AuroraDevStore = AuroraDevParamsState & AuroraDevParamsActions;

const DEFAULTS: AuroraDevParamsState = {
  particleCountOverride: null,
  auroraOpacityMult: 1,
  breathingCycleMs: BREATHING_CYCLE_MS,
  breathingDepth: BREATHING_DEPTH,
  glowIntensityMult: 1,
  cursorRepulseMult: 1,
  particleNonce: 0,
};

export const useAuroraDevStore = create<AuroraDevStore>((set) => ({
  ...DEFAULTS,

  setParticleCountOverride: (value) =>
    set((s) => ({
      particleCountOverride: value,
      particleNonce: s.particleNonce + 1,
    })),

  setAuroraOpacityMult: (value) => set({ auroraOpacityMult: value }),
  setBreathingCycleMs: (value) => set({ breathingCycleMs: value }),
  setBreathingDepth: (value) => set({ breathingDepth: value }),
  setGlowIntensityMult: (value) => set({ glowIntensityMult: value }),
  setCursorRepulseMult: (value) => set({ cursorRepulseMult: value }),

  forceReinitParticles: () =>
    set((s) => ({ particleNonce: s.particleNonce + 1 })),

  resetDefaults: () => set({ ...DEFAULTS, particleNonce: Date.now() % 1e9 }),
}));

export function getEffectiveParticleCount(
  override: number | null,
  tier: DeviceTier
): number {
  const base = PARTICLE_COUNTS[tier];
  if (override == null) return base;
  return Math.max(5, Math.min(220, Math.round(override)));
}

export function getEffectiveAuroraOpacity(mult: number): number {
  return Math.max(0, Math.min(0.9, AURORA_BASE_OPACITY * mult));
}

export function getEffectiveCursorRepulseStrength(mult: number): number {
  return PARTICLE_REPULSE_STRENGTH * Math.max(0, mult);
}

export function getEffectiveGlowRadiusMult(mult: number): number {
  return PARTICLE_GLOW_RADIUS_MULT * Math.max(0, mult);
}

export function getEffectiveGlowAlphaMult(mult: number): number {
  return PARTICLE_GLOW_ALPHA_MULT * Math.max(0, Math.min(2.5, mult));
}

export function getEffectiveLineGlowBlur(mult: number): number {
  return PARTICLE_LINE_GLOW_SHADOW_BLUR * Math.max(0, Math.min(3, mult));
}

export const DEV_PARTICLE_COUNT_MIN = 5;
export const DEV_PARTICLE_COUNT_MAX = 200;
export const DEV_AURORA_OPACITY_MIN = 0;
export const DEV_AURORA_OPACITY_MAX = 2.2;
export const DEV_BREATHING_CYCLE_MIN = 1800;
export const DEV_BREATHING_CYCLE_MAX = 18000;
export const DEV_BREATHING_DEPTH_MIN = 0;
export const DEV_BREATHING_DEPTH_MAX = 0.7;
export const DEV_GLOW_INTENSITY_MIN = 0;
export const DEV_GLOW_INTENSITY_MAX = 2.5;
export const DEV_CURSOR_REPULSE_MIN = 0;
export const DEV_CURSOR_REPULSE_MAX = 3;
