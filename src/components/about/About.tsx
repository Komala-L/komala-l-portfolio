import React, { useState } from "react";
import {
  Terminal,
  Cpu,
  Layers,
  Zap,
  CheckCircle2,
  Code2,
  Sparkles,
  BookOpen,
  ShieldCheck,
  ArrowUpRight,
  Database,
  Layout,
} from "lucide-react";

export default function About() {
  const [activeTab, setActiveTab] = useState<"story" | "mindset" | "specs">("story");

  return (
    <section id="about" className="py-24 relative bg-transparent overflow-hidden">
      
      {/* Background Glow Orbs */}
      <div className="absolute top-1/2 -left-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Terminal className="w-4 h-4" />
          </div>
          <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
            ABOUT // SYSTEM_OVERVIEW
          </span>
        </div>

        {/* MAIN HEADLINE */}
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-12 max-w-3xl leading-tight">
          Building with curiosity. <br />
          <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 bg-clip-text text-transparent">
            Engineering with purpose.
          </span>
        </h2>

        {/* TWO COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT COLUMN: TABBED INTERACTIVE BIO (7 COLS) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tab Controller Buttons */}
            <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-950/80 border border-cyan-500/20 backdrop-blur-md w-fit">
              <button
                onClick={() => setActiveTab("story")}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-2 ${
                  activeTab === "story"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.25)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>01. Bio</span>
              </button>

              <button
                onClick={() => setActiveTab("mindset")}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-2 ${
                  activeTab === "mindset"
                    ? "bg-purple-500/20 text-purple-300 border border-purple-400/40 shadow-[0_0_15px_rgba(168,85,247,0.25)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>02. Mindset</span>
              </button>

              <button
                onClick={() => setActiveTab("specs")}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-2 ${
                  activeTab === "specs"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>03. Specs</span>
              </button>
            </div>

            {/* TAB CONTENT CARDS */}
            <div className="p-6 md:p-8 rounded-2xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl shadow-[0_0_30px_rgba(2,6,23,0.5)] transition-all min-h-[220px]">
              
              {/* TAB 1: STORY */}
              {activeTab === "story" && (
                <div className="space-y-4 animate-fadeIn">
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                    I'm <strong className="text-cyan-300 font-semibold">Komala</strong>, a BCA student and full-stack developer who enjoys turning complex ideas into thoughtful, high-performance web experiences. I bridge the gap between intuitive user interfaces and robust backend architectures.
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    I care deeply about understanding how systems operate under the hood—from React component lifecycles and state hydration to Express REST endpoints and optimized database queries.
                  </p>
                </div>
              )}

              {/* TAB 2: MINDSET */}
              {activeTab === "mindset" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-cyan-500/20">
                    <div className="text-xs font-mono text-cyan-300 font-bold mb-1 flex items-center gap-1.5">
                      <Layout className="w-3.5 h-3.5 text-cyan-400" />
                      Clean Architecture
                    </div>
                    <p className="text-xs text-slate-400">Modular component trees with strict separation of concerns.</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-purple-500/20">
                    <div className="text-xs font-mono text-purple-300 font-bold mb-1 flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5 text-purple-400" />
                      API & Data Safety
                    </div>
                    <p className="text-xs text-slate-400">RESTful design patterns with input validation & JWT auth.</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-emerald-500/20">
                    <div className="text-xs font-mono text-emerald-300 font-bold mb-1 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-emerald-400" />
                      Performance
                    </div>
                    <p className="text-xs text-slate-400">Lighthouse score optimizations and lightweight bundle sizes.</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-amber-500/20">
                    <div className="text-xs font-mono text-amber-300 font-bold mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      UX Detail
                    </div>
                    <p className="text-xs text-slate-400">Fluid micro-interactions, responsive grids, and accessible UI.</p>
                  </div>
                </div>
              )}

              {/* TAB 3: SPECS */}
              {activeTab === "specs" && (
                <div className="grid grid-cols-2 gap-4 text-xs font-mono animate-fadeIn">
                  <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                    <span className="text-slate-500 block">Degree</span>
                    <span className="text-white font-semibold">Bachelor of Computer Applications</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                    <span className="text-slate-500 block">Primary Stack</span>
                    <span className="text-cyan-300 font-semibold">MERN (Mongo, Express, React, Node)</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                    <span className="text-slate-500 block">Language Focus</span>
                    <span className="text-purple-300 font-semibold">TypeScript & JavaScript (ES6+)</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                    <span className="text-slate-500 block">Status</span>
                    <span className="text-emerald-400 font-semibold">Open for Roles & Internships</span>
                  </div>
                </div>
              )}

            </div>

            {/* Quick Action Link */}
            <a
              href="#projects"
              className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 group pt-2 transition-colors"
            >
              <span>EXPLORE DEVELOPER PROJECTS</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

          </div>

          {/* RIGHT COLUMN: ACTIVE FOCUS MODULE CARDS (5 COLS) */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>CURRENTLY_FOCUSED_ON</span>
            </div>

            {/* Focus Card 1 */}
            <div className="group p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  Frontend Engineering
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                  ACTIVE
                </span>
              </div>
              <p className="text-xs text-slate-400">
                React.js, TypeScript, and responsive Tailwind UI architecture.
              </p>
            </div>

            {/* Focus Card 2 */}
            <div className="group p-4 rounded-xl bg-slate-950/80 border border-purple-500/30 hover:border-purple-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-400" />
                  Full-Stack Development
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/10 border border-purple-500/30 text-purple-300">
                  OPTIMIZING
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Node.js, Express, RESTful APIs, and full end-to-end data pipelines.
              </p>
            </div>

            {/* Focus Card 3 */}
            <div className="group p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 hover:border-emerald-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-400" />
                  Backend & Databases
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                  SECURED
                </span>
              </div>
              <p className="text-xs text-slate-400">
                MongoDB schema modeling, authentication routines, and database optimization.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}