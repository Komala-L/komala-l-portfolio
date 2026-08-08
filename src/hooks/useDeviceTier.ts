import { useEffect, useState } from 'react';
import type { DeviceTier } from '../constants/auroraConfig';

export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>(() => evaluateTier());

  useEffect(() => {
    const onResize = () => setTier(evaluateTier());
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return tier;
}

function evaluateTier(): DeviceTier {
  if (typeof window === 'undefined') return 'high';
  const smallScreen = window.innerWidth < 768;
  const cpu = (navigator as Navigator & { hardwareConcurrency?: number })
    .hardwareConcurrency;
  const weakCpu = typeof cpu === 'number' && cpu <= 4;
  return smallScreen || weakCpu ? 'low' : 'high';
}
