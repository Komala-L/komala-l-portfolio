import React, { useState, useEffect } from "react";
import { ChevronUp, ChevronDown, Rocket, Compass } from "lucide-react";

export default function ScrollControls() {
  const [scrollPercent, setScrollPercent] = useState<number>(0);
  const [isAtBottom, setIsAtBottom] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      if (totalHeight > 0) {
        const percentage = Math.round((currentScroll / totalHeight) * 100);
        setScrollPercent(percentage);
        setIsAtBottom(percentage > 85);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollAction = () => {
    if (isAtBottom) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* 1. RIGHT EDGE SLIM SCROLL PROGRESS BAR */}
      <div className="fixed right-0 top-0 bottom-0 w-1 z-40 bg-slate-950/50 pointer-events-none">
        <div
          className="w-full bg-gradient-to-b from-cyan-400 via-purple-500 to-cyan-300 shadow-[0_0_12px_#06b6d4] transition-all duration-150"
          style={{ height: `${scrollPercent}%` }}
        />
      </div>

      {/* 2. FLOATING CONTROL DOCK (BOTTOM RIGHT) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
        
        {/* Animated Direction Indicator Tooltip */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/90 border border-cyan-500/30 text-[10px] font-mono text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)] backdrop-blur-md">
          <Compass className="w-3 h-3 text-cyan-400 animate-spin" style={{ animationDuration: "8s" }} />
          <span>{scrollPercent}% SCROLLED</span>
        </div>

        {/* Main Floating Trigger Button */}
        <button
          onClick={handleScrollAction}
          aria-label="Scroll Toggle"
          className="group relative w-12 h-12 rounded-2xl bg-slate-950/90 border border-cyan-500/40 hover:border-purple-400 backdrop-blur-xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] active:scale-95"
        >
          {/* Circular Progress Ring Graphic */}
          <svg className="absolute inset-0 w-full h-full p-1 -rotate-90 pointer-events-none">
            <circle
              cx="20"
              cy="20"
              r="18"
              className="stroke-slate-800"
              strokeWidth="2"
              fill="transparent"
            />
            <circle
              cx="20"
              cy="20"
              r="18"
              className="stroke-cyan-400 transition-all duration-150"
              strokeWidth="2"
              fill="transparent"
              strokeDasharray={113}
              strokeDashoffset={113 - (113 * scrollPercent) / 100}
              strokeLinecap="round"
            />
          </svg>

          {/* Animated Arrow Icons */}
          {isAtBottom ? (
            <Rocket className="w-5 h-5 text-purple-400 group-hover:-translate-y-1 transition-transform" />
          ) : (
            <ChevronDown className="w-5 h-5 text-cyan-400 animate-bounce group-hover:translate-y-0.5 transition-transform" />
          )}

          {/* Ambient Glow Pill */}
          <span className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-20 blur transition-opacity pointer-events-none" />
        </button>

      </div>
    </>
  );
}