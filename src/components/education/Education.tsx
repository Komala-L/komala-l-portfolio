import React, { useState } from "react";
import {
  GitCommit,
  GitBranch,
  MapPin,
  Code2,
  Sparkles,
} from "lucide-react";

const educationReleases = [
  {
    version: "v3.0.0-rc",
    branch: "main / HEAD",
    commitHash: "a8f10c2",
    title: "Bachelor of Computer Applications (BCA)",
    institution: "B.M.S. College for Women",
    location: "Bengaluru, IN",
    date: "Expected Jul 2027",
    status: "ACTIVE_BUILD",
    scoreType: "CGPA",
    scoreValue: "8.25",
    maxScore: "10.0",
    percentageValue: 82.5,
    summary: "Comprehensive undergraduate degree focusing on modern web development, software engineering principles, database systems, and full-stack logic.",
    modules: ["Full-Stack Dev", "Database Management (SQL)", "Data Structures", "OOPs in Java/C++"],
    accentColor: "cyan",
    glowBorder: "group-hover:border-cyan-400/80 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]",
    badgeBg: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
    nodeBorder: "border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)]",
    lineGradient: "from-cyan-500 to-cyan-400/20",
  },
  {
    version: "v2.0.0",
    branch: "release/puc-science",
    commitHash: "b4d21e9",
    title: "Pre-University Course (Science – PCMC)",
    institution: "P.E.S. Pre-University College",
    location: "Bengaluru, IN",
    date: "Apr 2024",
    status: "DEPLOYED",
    scoreType: "PERCENTAGE",
    scoreValue: "79%",
    maxScore: "100%",
    percentageValue: 79,
    summary: "Senior secondary specialization in Physics, Chemistry, Mathematics, and Computer Science (PCMC), laying core mathematical and analytical foundations.",
    modules: ["Computer Science", "Mathematics & Logic", "Physics", "Chemistry"],
    accentColor: "purple",
    glowBorder: "group-hover:border-purple-400/80 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]",
    badgeBg: "bg-purple-500/10 text-purple-300 border-purple-500/30",
    nodeBorder: "border-purple-400 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]",
    lineGradient: "from-purple-500 to-purple-400/20",
  },
  {
    version: "v1.0.0",
    branch: "release/sslc-init",
    commitHash: "c9e32f4",
    title: "Secondary School Leaving Certificate (SSLC)",
    institution: "Excellent English High School",
    location: "Bengaluru, IN",
    date: "Apr 2022",
    status: "DEPLOYED",
    scoreType: "PERCENTAGE",
    scoreValue: "80%",
    maxScore: "100%",
    percentageValue: 80,
    summary: "Foundational secondary education completing core science and mathematics curriculums with distinction.",
    modules: ["Mathematics", "General Science", "English & Communications"],
    accentColor: "emerald",
    glowBorder: "group-hover:border-emerald-400/80 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]",
    badgeBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    nodeBorder: "border-emerald-400 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]",
    lineGradient: "from-emerald-500 to-emerald-400/20",
  },
];

export default function Education() {
  const [selectedCommit, setSelectedCommit] = useState<string>("v3.0.0-rc");

  return (
    <section id="education" className="py-24 relative bg-transparent font-sans overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* SECTION HEADER */}
        <div className="flex items-center gap-3 mb-4">
          
          <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
            ACADEMIC // EDUCATION_LOGS
          </span>
        </div>

        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
          Academic Timeline & <br />
          <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 bg-clip-text text-transparent">
            Foundational Excellence.
          </span>
        </h2>

        <p className="text-slate-400 text-sm max-w-xl mb-16 font-mono">
          Structured overview of my academic progression and quantitative milestones.
        </p>

        {/* MAIN CONTAINER WITH VERTICAL TREE TRUNK */}
        <div className="relative pl-8 md:pl-16 space-y-10">
          
          {/* 1. CENTRAL GLOWING TREE TRUNK (SPINE LINE) */}
          <div className="absolute left-3 md:left-6 top-8 bottom-8 w-[2px] bg-gradient-to-b from-cyan-500 via-purple-500 to-emerald-500 shadow-[0_0_12px_rgba(6,182,212,0.5)]" />

          {educationReleases.map((item) => {
            const isSelected = selectedCommit === item.version;

            return (
              <div
                key={item.version}
                onClick={() => setSelectedCommit(item.version)}
                className="relative group cursor-pointer"
              >
                
                {/* ==================================================== */}
                {/* 2. UNIQUE NODE CONNECTOR MARKER (BRANCH NODE) */}
                {/* ==================================================== */}
                <div className="absolute -left-[32px] md:-left-[64px] top-8 z-20 flex items-center">
                  
                  {/* Outer Pulsing Radar Ring */}
                  <div className="relative flex items-center justify-center">
                    <span className={`absolute w-8 h-8 rounded-full animate-ping opacity-30 ${
                      item.accentColor === "cyan" ? "bg-cyan-400" : item.accentColor === "purple" ? "bg-purple-400" : "bg-emerald-400"
                    }`} />

                    {/* Central Glowing Commit Node Box */}
                    <div className={`w-8 h-8 rounded-xl bg-slate-950 border-2 flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${item.nodeBorder}`}>
                      <GitCommit className="w-4 h-4 animate-pulse" />
                    </div>
                  </div>

                  {/* Horizontal Branch Connector Arm (Leaves Trunk -> Plugs into Card) */}
                  <div className={`h-[2px] w-6 md:w-10 bg-gradient-to-r ${item.lineGradient} transition-all duration-300 group-hover:w-8 md:group-hover:w-12`} />
                </div>
                {/* ==================================================== */}

                {/* 3. CARD CONTAINER */}
                <div
                  className={`relative p-6 md:p-8 rounded-2xl bg-slate-950/80 border border-slate-800/80 transition-all duration-300 backdrop-blur-xl ${
                    isSelected
                      ? "border-cyan-500/60 shadow-[0_0_30px_rgba(6,182,212,0.15)]"
                      : "hover:border-slate-700"
                  } ${item.glowBorder}`}
                >
                  
                  {/* Top Status Strip */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-900 font-mono text-xs">
                    
                    <div className="flex items-center gap-3">
                      {/* Version Tag */}
                      <span className={`px-3 py-1 rounded-lg border font-bold flex items-center gap-1.5 ${item.badgeBg}`}>
                        <Sparkles className="w-3.5 h-3.5" />
                        {item.version}
                      </span>

                      {/* Branch Name */}
                      <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400">
                        git branch: <span className="text-purple-300 font-semibold">{item.branch}</span>
                      </span>

                      {/* Commit Hash */}
                      <span className="hidden sm:inline-block text-slate-500">
                        #{item.commitHash}
                      </span>
                    </div>

                    {/* Date & Location */}
                    <div className="flex items-center gap-3 text-slate-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-cyan-400" />
                        {item.location}
                      </span>
                      <span>•</span>
                      <span className="text-cyan-300 font-bold">{item.date}</span>
                    </div>

                  </div>

                  {/* Main Info Block */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    
                    {/* Qualification Title & Institution */}
                    <div className="md:col-span-8 space-y-2">
                      <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-cyan-300/90 font-medium">
                        {item.institution}
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans pt-1">
                        {item.summary}
                      </p>
                    </div>

                    {/* Performance Meter Gauge */}
                    <div className="md:col-span-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col justify-center space-y-2">
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="text-slate-400">{item.scoreType} METRIC</span>
                        <span className="text-cyan-300 font-bold">{item.scoreValue}</span>
                      </div>

                      {/* Gauge Bar */}
                      <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${
                            item.accentColor === "cyan"
                              ? "bg-gradient-to-r from-cyan-500 to-teal-400"
                              : item.accentColor === "purple"
                              ? "bg-gradient-to-r from-purple-500 to-indigo-400"
                              : "bg-gradient-to-r from-emerald-500 to-teal-400"
                          }`}
                          style={{ width: `${item.percentageValue}%` }}
                        />
                      </div>

                      <div className="text-[10px] font-mono text-slate-500 text-right">
                        Target Threshold: {item.maxScore}
                      </div>
                    </div>

                  </div>

                  {/* Bottom Modules Tags */}
                  <div className="mt-6 pt-4 border-t border-slate-900/80 flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mr-2 flex items-center gap-1">
                      <Code2 className="w-3 h-3 text-cyan-400" />
                      Acquired Modules:
                    </span>
                    {item.modules.map((mod, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-[11px] font-mono"
                      >
                        {mod}
                      </span>
                    ))}
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}