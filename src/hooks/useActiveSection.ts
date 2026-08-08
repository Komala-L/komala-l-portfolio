import { useEffect, useState } from 'react';
import {
  NAV_ACTIVE_INTERSECTION_ROOT_MARGIN_TOP,
  NAV_ACTIVE_INTERSECTION_THRESHOLD,
  type SectionId,
} from '../constants/portfolio';

export function useActiveSection(
  sectionIds: readonly SectionId[],
  fallback: SectionId = sectionIds[0]
): SectionId {
  const [active, setActive] = useState<SectionId>(fallback);

  useEffect(() => {
    const rootMargin = `${NAV_ACTIVE_INTERSECTION_ROOT_MARGIN_TOP} 0px 55% 0px`;
    const options: IntersectionObserverInit = {
      rootMargin,
      threshold: [NAV_ACTIVE_INTERSECTION_THRESHOLD, 0.35, 0.7],
    };

    const ratios = new Map<SectionId, number>();

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const id = entry.target.id as SectionId;
        ratios.set(id, entry.intersectionRatio);
      }

      let bestId: SectionId = fallback;
      let bestRatio = -1;
      for (const id of sectionIds) {
        const ratio = ratios.get(id) ?? -1;
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      }
      if (bestRatio > 0.05) {
        setActive((curr) => (curr === bestId ? curr : bestId));
      }
    }, options);

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el != null);

    for (const el of elements) observer.observe(el);

    return () => {
      observer.disconnect();
      ratios.clear();
    };
  }, [sectionIds, fallback]);

  return active;
}
