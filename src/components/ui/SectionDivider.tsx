export function SectionDivider() {
  return (
    <div
      className="relative flex items-center justify-center py-10 sm:py-14"
      aria-hidden="true"
    >
      {/* Left fading line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/20 to-cyan-300/40" />

      {/* Center glow */}
      <div className="relative mx-5 flex h-3 w-3 shrink-0 items-center justify-center sm:mx-7">
        <div className="absolute h-7 w-7 rounded-full bg-cyan-400/10 blur-md" />

        <div className="absolute h-3 w-3 rounded-full border border-cyan-300/40 bg-cyan-300/10" />

        <div className="relative h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
      </div>

      {/* Right fading line */}
      <div className="h-px w-full bg-gradient-to-l from-transparent via-cyan-400/20 to-cyan-300/40" />
    </div>
  );
}