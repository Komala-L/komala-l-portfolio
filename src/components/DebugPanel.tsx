import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  DEV_AURORA_OPACITY_MAX,
  DEV_AURORA_OPACITY_MIN,
  DEV_BREATHING_CYCLE_MAX,
  DEV_BREATHING_CYCLE_MIN,
  DEV_BREATHING_DEPTH_MAX,
  DEV_BREATHING_DEPTH_MIN,
  DEV_CURSOR_REPULSE_MAX,
  DEV_CURSOR_REPULSE_MIN,
  DEV_GLOW_INTENSITY_MAX,
  DEV_GLOW_INTENSITY_MIN,
  DEV_PARTICLE_COUNT_MAX,
  DEV_PARTICLE_COUNT_MIN,
  getEffectiveAuroraOpacity,
  getEffectiveParticleCount,
  useAuroraDevStore,
} from '@/constants/auroraDevStore';
import { useDeviceTier } from '@/hooks/useDeviceTier';
import {
  ChevronDown,
  ChevronUp,
  GripVertical,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface SliderControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  displayValue?: string;
  onChange: (v: number) => void;
}

function SliderControl({
  label,
  value,
  min,
  max,
  step,
  unit = '',
  displayValue,
  onChange,
}: SliderControlProps) {
  const display = displayValue ?? `${value.toFixed(step < 1 ? 2 : 0)}${unit}`;
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <div className="mb-1 flex items-center justify-between text-[11px] font-medium text-slate-300">
        <span>{label}</span>
        <span className="tabular-nums text-cyan-300">{display}</span>
      </div>
      <div className="relative h-1.5 w-full rounded-full bg-white/10">
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-cyan-400/90 to-violet-500/90"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent opacity-0"
        />
      </div>
    </label>
  );
}

export function DebugPanel() {
  const tier = useDeviceTier();

  const particleCountOverride = useAuroraDevStore(
    (s) => s.particleCountOverride
  );
  const auroraOpacityMult = useAuroraDevStore((s) => s.auroraOpacityMult);
  const breathingCycleMs = useAuroraDevStore((s) => s.breathingCycleMs);
  const breathingDepth = useAuroraDevStore((s) => s.breathingDepth);
  const glowIntensityMult = useAuroraDevStore((s) => s.glowIntensityMult);
  const cursorRepulseMult = useAuroraDevStore((s) => s.cursorRepulseMult);
  const particleNonce = useAuroraDevStore((s) => s.particleNonce);

  const setParticleCountOverride = useAuroraDevStore(
    (s) => s.setParticleCountOverride
  );
  const setAuroraOpacityMult = useAuroraDevStore(
    (s) => s.setAuroraOpacityMult
  );
  const setBreathingCycleMs = useAuroraDevStore(
    (s) => s.setBreathingCycleMs
  );
  const setBreathingDepth = useAuroraDevStore((s) => s.setBreathingDepth);
  const setGlowIntensityMult = useAuroraDevStore(
    (s) => s.setGlowIntensityMult
  );
  const setCursorRepulseMult = useAuroraDevStore(
    (s) => s.setCursorRepulseMult
  );
  const resetDefaults = useAuroraDevStore((s) => s.resetDefaults);
  const forceReinitParticles = useAuroraDevStore(
    (s) => s.forceReinitParticles
  );

  const panelRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const [position, setPosition] = useState<{
    bottom: number;
    right: number;
    x: number;
    y: number;
  } | null>(null);
  const [open, setOpen] = useState(true);

  const tierCount = getEffectiveParticleCount(null, tier);
  const currentCount =
    particleCountOverride != null ? particleCountOverride : tierCount;
  const currentAuroraOpacity = getEffectiveAuroraOpacity(auroraOpacityMult);

  const onHeaderMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest('[data-nodrag]')) return;
      const rect = panelRef.current?.getBoundingClientRect();
      if (!rect) return;
      dragRef.current = true;
      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      setPosition((prev) =>
        prev ?? {
          bottom: window.innerHeight - rect.bottom,
          right: window.innerWidth - rect.right,
          x: rect.left,
          y: rect.top,
        }
      );
    },
    []
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragRef.current) return;
      setPosition((prev) => {
        if (!prev) return prev;
        const nextX = e.clientX - dragOffset.current.x;
        const nextY = e.clientY - dragOffset.current.y;
        return {
          ...prev,
          x: Math.max(
            0,
            Math.min(window.innerWidth - (panelRef.current?.offsetWidth ?? 0), nextX)
          ),
          y: Math.max(
            0,
            Math.min(
              window.innerHeight - (panelRef.current?.offsetHeight ?? 0),
              nextY
            )
          ),
          bottom: -1,
          right: -1,
        };
      });
    };
    const onUp = () => {
      dragRef.current = false;
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  const panelPos: React.CSSProperties =
    position && (position.x >= 0 && position.y >= 0)
      ? { left: position.x, top: position.y, right: 'auto', bottom: 'auto' }
      : { bottom: 24, right: 24 };

  return (
    <div
      ref={panelRef}
      style={panelPos}
      className="fixed z-[100] w-[320px] select-none overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 text-slate-100 shadow-2xl backdrop-blur-xl"
    >
      <div
        onMouseDown={onHeaderMouseDown}
        className="flex cursor-grab items-center justify-between gap-3 border-b border-white/10 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 px-4 py-2.5 active:cursor-grabbing"
      >
        <div className="flex items-center gap-2">
          <GripVertical
            data-nodrag
            className="h-3.5 w-3.5 shrink-0 text-slate-400"
          />
          <Sparkles className="h-3.5 w-3.5 shrink-0 text-cyan-300" />
          <span className="text-xs font-semibold tracking-wide text-slate-100">
            Aurora Dev Panel
          </span>
          <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-medium text-cyan-200">
            nonce:{particleNonce}
          </span>
        </div>
        <div className="flex items-center gap-1" data-nodrag>
          <button
            onClick={() => resetDefaults()}
            title="Reset defaults"
            className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-slate-100"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            title={open ? 'Collapse panel' : 'Expand panel'}
            className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-slate-100"
          >
            {open ? (
              <ChevronDown className="h-3.5 w-3.5" />
            ) : (
              <ChevronUp className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="space-y-4 p-4">
          <div className="space-y-3">
            <SliderControl
              label="Particle count"
              value={currentCount}
              min={DEV_PARTICLE_COUNT_MIN}
              max={DEV_PARTICLE_COUNT_MAX}
              step={1}
              displayValue={`${currentCount}${
                particleCountOverride == null
                  ? ` (${tier}:${tierCount} default)`
                  : ''
              }`}
              onChange={(v) => setParticleCountOverride(v)}
            />
            <div className="-mt-2 flex items-center justify-between gap-2">
              <button
                onClick={() => setParticleCountOverride(null)}
                className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-medium text-slate-300 transition hover:border-white/20 hover:text-slate-100"
              >
                Use default ({tierCount})
              </button>
              <button
                onClick={() => forceReinitParticles()}
                className="rounded-md border border-cyan-400/20 bg-cyan-400/10 px-2 py-1 text-[10px] font-medium text-cyan-200 transition hover:border-cyan-400/40 hover:text-cyan-100"
              >
                Re-initialise
              </button>
            </div>
          </div>

          <SliderControl
            label="Aurora opacity"
            value={auroraOpacityMult}
            min={DEV_AURORA_OPACITY_MIN}
            max={DEV_AURORA_OPACITY_MAX}
            step={0.01}
            displayValue={`${currentAuroraOpacity.toFixed(2)} (×${auroraOpacityMult.toFixed(2)})`}
            onChange={setAuroraOpacityMult}
          />

          <SliderControl
            label="Breathing speed"
            value={breathingCycleMs}
            min={DEV_BREATHING_CYCLE_MIN}
            max={DEV_BREATHING_CYCLE_MAX}
            step={100}
            unit="ms"
            onChange={setBreathingCycleMs}
          />

          <SliderControl
            label="Breathing depth"
            value={breathingDepth}
            min={DEV_BREATHING_DEPTH_MIN}
            max={DEV_BREATHING_DEPTH_MAX}
            step={0.01}
            onChange={setBreathingDepth}
          />

          <SliderControl
            label="Glow intensity"
            value={glowIntensityMult}
            min={DEV_GLOW_INTENSITY_MIN}
            max={DEV_GLOW_INTENSITY_MAX}
            step={0.01}
            unit="×"
            onChange={setGlowIntensityMult}
          />

          <SliderControl
            label="Cursor interaction"
            value={cursorRepulseMult}
            min={DEV_CURSOR_REPULSE_MIN}
            max={DEV_CURSOR_REPULSE_MAX}
            step={0.01}
            unit="×"
            onChange={setCursorRepulseMult}
          />

          <div
            className={cn(
              'pointer-events-none mt-1 flex items-center justify-between rounded-lg border px-3 py-2 text-[10px]',
              particleCountOverride == null
                ? 'border-white/5 bg-white/[0.03] text-slate-400'
                : 'border-cyan-400/20 bg-cyan-400/[0.04] text-cyan-200'
            )}
          >
            <span className="font-medium">
              {particleCountOverride == null
                ? 'Using production defaults'
                : 'Override active'}
            </span>
            <span className="tabular-nums">
              Device tier: <span className="font-semibold text-slate-100">{tier.toUpperCase()}</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
