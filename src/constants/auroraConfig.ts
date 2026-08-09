export const AURORA_COLORS = [
  '#1e1b4b',
  '#4338ca',
  '#6d28d9',
  '#0891b2',
  '#22d3ee',
  '#38bdf8',
] as const;

export const AURORA_BLOB_COUNT = 6;
export const AURORA_MIN_SIZE = 380;
export const AURORA_MAX_SIZE = 680;
export const AURORA_BLUR_PX = 90;
export const AURORA_DRIFT_DURATION_MIN = 42;
export const AURORA_DRIFT_DURATION_MAX = 72;
export const AURORA_BASE_OPACITY = 0.5;
export const AURORA_POS_TOP_MIN = -15;
export const AURORA_POS_TOP_MAX = 75;
export const AURORA_POS_LEFT_MIN = -20;
export const AURORA_POS_LEFT_MAX = 85;
export const AURORA_DRIFT_ANIMATION_NAMES = ['driftA', 'driftB', 'driftC', 'driftD'] as const;
export type AuroraDriftName = typeof AURORA_DRIFT_ANIMATION_NAMES[number];

export const BREATHING_CYCLE_MS = 8000;
export const BREATHING_DEPTH = 0.25;

export type DeviceTier = 'high' | 'low';

export const PARTICLE_COUNTS: Record<DeviceTier, number> = {
  high: 100,
  low: 50,
};

export const NETWORK_DISTANCE: Record<DeviceTier, number> = {
  high: 128,
  low: 88,
};

export const PARTICLE_BASE_RADIUS = 1.7;
export const PARTICLE_BASE_RADIUS_MIN_MULT = 0.7;
export const PARTICLE_BASE_RADIUS_MAX_MULT = 1.3;
export const PARTICLE_REPULSE_RADIUS = 150;
export const PARTICLE_REPULSE_STRENGTH = 0.9;
export const PARTICLE_REPULSE_FORCE_MULT = 0.6;
export const PARTICLE_BASE_ALPHA = 0.46;
export const PARTICLE_CURSOR_ALPHA_BOOST = 0.42;
export const PARTICLE_CURSOR_RADIUS_MULT = 1.2;
export const PARTICLE_DRIFT_SPEED = 0.35;
export const PARTICLE_INITIAL_SPEED_MULT = 0.4;
export const PARTICLE_PHASE_SPEED_MIN = 0.00032;
export const PARTICLE_PHASE_SPEED_MAX = 0.0011;
export const PARTICLE_WANDER_SPEED_MIN = 0.0006;
export const PARTICLE_WANDER_SPEED_MAX = 0.0019;
export const PARTICLE_AMPLITUDE_MIN = 10;
export const PARTICLE_AMPLITUDE_MAX = 26;
export const PARTICLE_DRIFT_X_MULT = 0.0018;
export const PARTICLE_DRIFT_Y_MULT = 0.0018;
export const PARTICLE_HARMONIC_Y = 0.8;
export const PARTICLE_WANDER_STRENGTH = 0.012;
export const PARTICLE_VELOCITY_LERP = 0.014;
export const PARTICLE_DAMPING = 0.988;
export const PARTICLE_WRAP_MARGIN = 50;
export const PARTICLE_LINE_MAX_ALPHA = 0.22;
export const PARTICLE_LINE_BASE_WIDTH = 0.5;
export const PARTICLE_LINE_WIDTH_BOOST = 0.45;
export const PARTICLE_LINE_FADE_EXPONENT = 2.2;
export const PARTICLE_LINE_GLOW_SHADOW_BLUR = 3.5;
export const PARTICLE_LINE_GLOW_SHADOW_ALPHA_MULT = 0.32;
export const PARTICLE_GLOW_THRESHOLD_ALPHA = 0.7;
export const PARTICLE_GLOW_RADIUS_MULT = 2.6;
export const PARTICLE_GLOW_ALPHA_MULT = 0.32;
export const PARTICLE_RESIZE_DEBOUNCE_MS = 150;
export const PARTICLE_UPWARD_SPEED = 0.8;

export const PARTICLE_CORE_PALETTE: ReadonlyArray<{ r: number; g: number; b: number }> = [
  { r: 191, g: 219, b: 254 },
  { r: 165, g: 180, b: 252 },
  { r: 186, g: 230, b: 253 },
  { r: 205, g: 220, b: 255 },
];

export const PARTICLE_GLOW_COLOR = 'rgba(125, 211, 252,';
export const PARTICLE_LINE_COLOR = 'rgba(159, 193, 236,';
export const PARTICLE_LINE_GLOW_COLOR = 'rgba(125, 196, 252,';

export const SPOTLIGHT_RADIUS_PX = 380;
export const SPOTLIGHT_BASE_OPACITY = 0.19;
export const SPOTLIGHT_INACTIVE_OPACITY_MULTIPLIER = 0.45;
export const SPOTLIGHT_MOUSE_SMOOTHING = 0.08;
export const SPOTLIGHT_REDUCED_MOTION_SMOOTHING = 1;
export const SPOTLIGHT_LOW_TIER_RADIUS_MULTIPLIER = 0.75;
export const SPOTLIGHT_PRIMARY_COLOR = 'rgba(56, 189, 248,';
export const SPOTLIGHT_SECONDARY_COLOR = 'rgba(139, 92, 246,';
export const SPOTLIGHT_SECONDARY_STOP = 45;
export const SPOTLIGHT_FADE_STOP = 70;
export const SPOTLIGHT_SECONDARY_OPACITY_MULTIPLIER = 0.5;

export const VIGNETTE_STRENGTH = 0.58;

export const BASE_BACKGROUND_CSS =
  'linear-gradient(180deg, #080a1a 0%, #0b1028 45%, #0d1435 100%)';