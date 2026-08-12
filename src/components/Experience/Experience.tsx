import React, { useState } from "react";
import {
  Terminal,
  Cpu,
  Award,
  Calendar,
  Building2,
  CheckCircle2,
  Code2,
  Bot,
  Activity,
  Layers,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

interface ExperienceData {
  id: string;
  role: string;
  company: string;
  affiliation: string;
  period: string;
  type: string;
  status: string;
  icon: React.ReactNode;
  accentColor: "cyan" | "purple";
  summary: string;
  techStack: string[];
  systemLogs: string[];
  metrics: { label: string; value: string }[];
}

const experiences: ExperienceData[] = [
  {
    id: "edunet",
    role: "Foundations of AI Intern",
    company: "EduNet Foundation",
    affiliation: "Microsoft Initiative",
    period: "Apr 2025 – May 2025",
    type: "AI & ML Internship",
    status: "COMPLETED_VERIFIED",
    icon: <Bot className="w-5 h-5 text-purple-400" />,
    accentColor: "purple",
    summary:
      "Integrated Generative AI capabilities and OpenAI API endpoints into conversational system architectures with responsible AI protocols.",
    techStack: ["Python", "OpenAI API", "Prompt Engineering", "Machine Learning", "AI Architecture"],
    systemLogs: [
      "Architected a Python-based AI chatbot integrated with OpenAI API endpoints to process user prompts and stream real-time responses.",
      "Engineered optimized prompt strategies and REST API pipelines for high-reliability AI-driven user interactions.",
      "Applied core Machine Learning fundamentals and responsible AI development guidelines across system modules.",
    ],
    metrics: [
      { label: "Core Model", value: "OpenAI GPT" },
      { label: "Execution Engine", value: "Python 3.x" },
      { label: "Partner Track", value: "Microsoft" },
    ],
  },
  {
    id: "oasis",
    role: "Web Development Intern",
    company: "Oasis Infobyte",
    affiliation: "AICTE Affiliated",
    period: "Aug 2025 – Sep 2025",
    type: "Frontend Engineering",
    status: "COMPLETED_VERIFIED",
    icon: <Code2 className="w-5 h-5 text-cyan-400" />,
    accentColor: "cyan",
    summary:
      "Engineered production-ready web interfaces, dynamic DOM workflows, and responsive web applications following strict UI/UX standards.",
    techStack: ["HTML5", "CSS3", "JavaScript (ES6+)", "DOM Manipulation", "Git", "GitHub"],
    systemLogs: [
      "Engineered 3 responsive frontend applications: a high-converting Landing Page, a Personal Portfolio, and a Temperature Converter.",
      "Developed interactive user interfaces using advanced DOM manipulation, event listener pipelines, and modular CSS architecture.",
      "Managed version control workflows, branch management, and code tracking across repositories using Git and GitHub.",
    ],
    metrics: [
      { label: "Deployments", value: "3 Projects" },
      { label: "Core Stack", value: "JS / HTML / CSS" },
      { label: "Certification", value: "AICTE" },
    ],
  },
];

export default function Experience() {
  const [selectedId, setSelectedId] = useState<string>("edunet");

  const activeExp = experiences.find((e) => e.id === selectedId) || experiences[0];
  const isPurple = activeExp.accentColor === "purple";

  return (
    <section id="experience" className="relative py-24 bg-transparent min-h-screen">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section Header */}
        <div className="mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-3 backdrop-blur-md">
            <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            Industry Telemetry // Career Logs
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
            Professional <br />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 bg-clip-text text-transparent">
              Experience & Deliverables.
            </span>
          </h2>
          <p className="text-cyan-300/70 text-sm max-w-xl font-mono leading-relaxed">
            Select a mission module to inspect architectural deliverables, verified system logs, and technology integrations.
          </p>
        </div>

        {/* Main HUD Deck Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Side: Mission Module Selector (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="text-xs font-mono text-cyan-400/80 uppercase tracking-widest flex items-center gap-2 mb-1 px-1">
              <Layers className="w-3.5 h-3.5" />
              Select Internship Module
            </div>

            {experiences.map((exp) => {
              const isSelected = exp.id === selectedId;
              const expIsPurple = exp.accentColor === "purple";

              return (
                <div
                  key={exp.id}
                  onClick={() => setSelectedId(exp.id)}
                  className={`group relative cursor-pointer rounded-2xl p-5 border transition-all duration-300 backdrop-blur-xl ${
                    isSelected
                      ? expIsPurple
                        ? "bg-purple-950/40 border-purple-400/60 shadow-[0_0_25px_rgba(168,85,247,0.25)]"
                        : "bg-slate-900/80 border-cyan-400/60 shadow-[0_0_25px_rgba(6,182,212,0.25)]"
                      : "bg-slate-900/40 border-cyan-500/20 hover:border-cyan-500/40 hover:bg-slate-900/60"
                  }`}
                >
                  {/* Active Indicator Strip */}
                  <div
                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-12 rounded-r-full transition-all ${
                      isSelected
                        ? expIsPurple
                          ? "bg-purple-400 shadow-[0_0_10px_#a855f7]"
                          : "bg-cyan-400 shadow-[0_0_10px_#06b6d4]"
                        : "bg-transparent"
                    }`}
                  />

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-slate-950/80 border border-white/10">
                        {exp.icon}
                      </div>
                      <div>
                        <span className="flex items-center gap-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-cyan-400">
                          <Award className="w-3 h-3 text-cyan-400" />
                          {exp.affiliation}
                        </span>
                        <h3 className="text-lg font-bold text-white group-hover:text-cyan-200 transition-colors">
                          {exp.role}
                        </h3>
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-5 h-5 shrink-0 transition-transform ${
                        isSelected
                          ? "text-cyan-400 translate-x-1"
                          : "text-slate-600 group-hover:text-slate-400"
                      }`}
                    />
                  </div>

                  {/* Company & Date */}
                  <div className="flex items-center justify-between text-xs text-slate-400 mt-4 pt-3 border-t border-cyan-900/30 font-mono">
                    <span className="flex items-center gap-1.5 text-cyan-200/80">
                      <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                      {exp.company}
                    </span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {exp.period}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Side: Live System Log & Telemetry Terminal (7 Cols) */}
          <div className="lg:col-span-7 rounded-2xl bg-slate-900/70 border border-cyan-500/30 p-6 md:p-8 backdrop-blur-xl shadow-[0_0_35px_rgba(6,182,212,0.12)]">
            
            {/* Terminal Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-cyan-900/40">
              <div className="flex items-center gap-2">
                <Terminal className={`w-5 h-5 ${isPurple ? "text-purple-400" : "text-cyan-400"}`} />
                <span className="text-xs font-mono font-semibold text-white tracking-wider uppercase">
                  EXECUTION_LOG // {activeExp.id.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono">
                  <ShieldCheck className="w-3 h-3" />
                  {activeExp.status}
                </span>
              </div>
            </div>

            {/* Role Header Info */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-1">
                {activeExp.role}
              </h3>
              <p className="text-xs text-cyan-300/80 font-mono">
                {activeExp.company} — <span className="text-slate-300">{activeExp.affiliation}</span>
              </p>
              <p className="text-xs md:text-sm text-slate-300 mt-3 leading-relaxed">
                {activeExp.summary}
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 mb-6 p-3 rounded-xl bg-slate-950/60 border border-cyan-950/80 font-mono">
              {activeExp.metrics.map((m, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-[10px] text-cyan-400/70 uppercase">{m.label}</div>
                  <div className="text-xs font-bold text-white mt-0.5">{m.value}</div>
                </div>
              ))}
            </div>

            {/* Tech Stack Matrix */}
            <div className="mb-6">
              <div className="text-[11px] font-mono text-cyan-400/80 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                Deployed Stack & Tools
              </div>
              <div className="flex flex-wrap gap-2">
                {activeExp.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-cyan-900/50 text-cyan-200 text-xs font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Verified System Logs (Bullet Points) */}
            <div className="space-y-3 pt-4 border-t border-cyan-900/40">
              <div className="text-[11px] font-mono text-cyan-400/80 uppercase tracking-wider mb-2">
                System Deliverables & Key Impact
              </div>
              <ul className="space-y-2.5">
                {activeExp.systemLogs.map((log, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs md:text-sm text-slate-200/90 leading-relaxed">
                    <CheckCircle2
                      className={`w-4 h-4 shrink-0 mt-0.5 ${
                        isPurple ? "text-purple-400" : "text-cyan-400"
                      }`}
                    />
                    <span>{log}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}