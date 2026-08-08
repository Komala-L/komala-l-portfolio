import { VIGNETTE_STRENGTH } from '../constants/auroraConfig';

export function Vignette() {
  const inner = Math.round(VIGNETTE_STRENGTH * 100) / 100;
  const outer = Math.round(Math.min(VIGNETTE_STRENGTH * 1.35, 0.85) * 100) / 100;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        background: `radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 55%, rgba(0,0,0,${inner}) 85%, rgba(0,0,0,${outer}) 100%)`,
      }}
    />
  );
}
