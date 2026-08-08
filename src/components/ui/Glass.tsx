import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { useRevealInView } from '@/hooks/useRevealInView';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useDeviceTier } from '@/hooks/useDeviceTier';

type GlassSectionProps = HTMLAttributes<HTMLElement> & {
  readonly id: string;
  readonly innerClassName?: string;
  readonly disableReveal?: boolean;
  readonly revealOffsetY?: number;
  readonly minimal?: boolean;
};

const GlassSection = forwardRef<HTMLElement, GlassSectionProps>(function GlassSection(
  {
    id,
    className,
    innerClassName,
    disableReveal,
    revealOffsetY,
    minimal = false,
    children,
    ...rest
  },
  _ref
) {
  const reducedMotion = useReducedMotion();
  const tier = useDeviceTier();
  const disabled =
    disableReveal || reducedMotion || tier === 'low';
  const { ref, revealed } = useRevealInView<HTMLElement>({
    once: true,
    disabled,
  });

  const defaultOffset = revealOffsetY ?? 20;

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        'relative',
        minimal ? 'py-10 md:py-16' : 'py-20 md:py-28',
        className
      )}
      style={{
        scrollMarginTop: '96px',
        opacity: revealed ? 1 : 0,
        transform: revealed
          ? 'translateY(0)'
          : `translateY(${defaultOffset}px)`,
        transition: revealed
          ? disabled
            ? 'none'
            : 'opacity 900ms cubic-bezier(0.2, 0.8, 0.2, 1) 120ms, transform 900ms cubic-bezier(0.2, 0.8, 0.2, 1) 120ms'
          : 'none',
      }}
      {...rest}
    >
      <div
        className={cn(
          'mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8',
          innerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
});

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  readonly glow?: boolean;
  readonly interactive?: boolean;
  readonly padded?: boolean;
  readonly hoverLift?: boolean;
};

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(function GlassCard(
  {
    className,
    glow = false,
    interactive = false,
    padded = true,
    hoverLift = false,
    children,
    ...rest
  },
  ref
) {
  const reducedMotion = useReducedMotion();
  return (
    <div
      ref={ref}
      className={cn(
        'relative overflow-hidden rounded-3xl border border-white/10',
        'bg-white/[0.035] backdrop-blur-xl',
        'shadow-[0_1px_0_rgba(255,255,255,0.05)_inset,0_30px_60px_-30px_rgba(0,0,0,0.45)]',
        padded && 'p-6 sm:p-8 md:p-10',
        interactive && 'outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50',
        hoverLift && !reducedMotion &&
          'transition-transform duration-500 ease-out will-change-transform hover:-translate-y-1',
        glow &&
          'before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-3xl before:bg-gradient-to-br before:from-cyan-400/[0.08] before:via-fuchsia-400/[0.06] before:to-violet-500/[0.08] before:blur-2xl before:opacity-80',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

interface SectionHeadingProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly description?: string;
  readonly align?: 'left' | 'center';
  readonly className?: string;
}

function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-10 md:mb-14 max-w-3xl',
        align === 'center' ? 'mx-auto text-center' : ''
      )}
    >
      <div
        className={cn(
          'mb-3 inline-flex items-center gap-2',
          align === 'center' ? 'justify-center' : ''
        )}
      >
        <span className="inline-block h-[1px] w-6 bg-gradient-to-r from-cyan-400/70 to-violet-400/70" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300/90">
          {eyebrow}
        </span>
      </div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-50">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            'mt-4 text-base sm:text-lg leading-relaxed text-slate-300/85',
            align === 'center' ? 'mx-auto' : ''
          )}
        >
          {description}
        </p>
      ) : null}
      <div
        className={cn(
          'mt-6 h-px w-24 bg-gradient-to-r from-cyan-400/50 via-violet-400/30 to-transparent',
          align === 'center' ? 'mx-auto' : ''
        )}
      />
    </div>
  );
}

type PillProps = HTMLAttributes<HTMLSpanElement> & {
  readonly tone?: 'slate' | 'cyan' | 'violet';
};

const Pill = forwardRef<HTMLSpanElement, PillProps>(function Pill(
  { className, tone = 'slate', children, ...rest },
  ref
) {
  const tones: Record<NonNullable<PillProps['tone']>, string> = {
    slate:
      'bg-white/5 text-slate-200/90 border-white/10',
    cyan:
      'bg-cyan-400/5 text-cyan-200/90 border-cyan-400/20',
    violet:
      'bg-violet-400/5 text-violet-200/90 border-violet-400/20',
  };
  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium tracking-wide',
        tones[tone],
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
});

export { GlassSection, GlassCard, SectionHeading, Pill };
