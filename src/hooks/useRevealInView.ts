import { useEffect, useRef, useState } from 'react';
import {
  REVEAL_INTERSECTION_THRESHOLD,
  REVEAL_ROOT_MARGIN_BOTTOM,
  REVEAL_ROOT_MARGIN_TOP,
} from '../constants/portfolio';

interface UseRevealOptions {
  readonly once?: boolean;
  readonly threshold?: number;
  readonly disabled?: boolean;
}

export function useRevealInView<T extends HTMLElement = HTMLDivElement>(
  options: UseRevealOptions = {}
): {
  readonly ref: React.RefCallback<T>;
  readonly revealed: boolean;
} {
  const {
    once = true,
    threshold = REVEAL_INTERSECTION_THRESHOLD,
    disabled = false,
  } = options;

  const [revealed, setRevealed] = useState<boolean>(disabled);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const observedRef = useRef<T | null>(null);
  const didFireRef = useRef<boolean>(false);

  useEffect(() => {
    if (disabled) {
      setRevealed(true);
      didFireRef.current = true;
      return;
    }
    didFireRef.current = false;
    setRevealed(false);
  }, [disabled]);

  const ref = (node: T | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    observedRef.current = node;

    if (!node || disabled) {
      setRevealed(true);
      didFireRef.current = true;
      return;
    }

    if (once && didFireRef.current) {
      setRevealed(true);
      return;
    }

    const rootMargin = `${REVEAL_ROOT_MARGIN_TOP} 0px ${REVEAL_ROOT_MARGIN_BOTTOM} 0px`;
    observerRef.current = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            didFireRef.current = true;
            if (once) {
              obs.unobserve(entry.target);
            }
          } else if (!once) {
            setRevealed(false);
          }
        }
      },
      {
        rootMargin,
        threshold,
      }
    );
    observerRef.current.observe(node);
  };

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  return { ref, revealed } as const;
}
