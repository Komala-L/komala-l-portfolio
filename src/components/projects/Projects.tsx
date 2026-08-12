import React, { useState } from "react";
import {
  Server,
  Database,
  Code2,
  ShieldCheck,
  ExternalLink,
  Github,
  Terminal,
  Activity,
  Layers,
  Zap,
  CheckCircle2,
  Sparkles,
  Lock,
  Globe,
  Radio,
  RefreshCw,
  Layout,
  Cpu,
} from "lucide-react";

interface BackendProject {
  id: string;
  title: string;
  subtitle: string;
  status: "PRODUCTION_READY" | "IN_DEVELOPMENT";
  badge: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  highlights: string[];
  terminalSnippet: {
    method: "POST" | "GET" | "PATCH";
    endpoint: string;
    responseStatus: string;
    payloadPreview: string;
  };
}

interface FrontendProject {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  highlights: string[];
  githubUrl: string;
  liveUrl: string;
  badge: string;
}

const backendProjects: BackendProject[] = [
  {
    id: "aegis-banking",
    title: "Aegis Banking Backend System",
    subtitle: "ACID-Compliant Secure Financial Engine",
    status: "PRODUCTION_READY",
    badge: "Financial Engineering",
    techStack: ["Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "Winston", "Bcrypt"],
    metrics: [
      { label: "API Endpoints", value: "8+ Secured" },
      { label: "Architecture", value: "MVC + Service Layer" },
      { label: "Transaction Safety", value: "ACID Compliant" },
    ],
    highlights: [
      "Architected secure banking backend with 8+ RESTful APIs adhering strictly to MVC and Service Layer design patterns.",
      "Implemented JWT, Role-Based Access Control (RBAC), token blacklisting, HTTP-only cookies, and bcrypt password encryption.",
      "Engineered ACID-compliant fund transfers utilizing MongoDB Sessions & double-entry ledger accounting principles.",
      "Integrated automated email notifications, Winston logging, centralized error handling, and comprehensive Postman test suites.",
    ],
    terminalSnippet: {
      method: "POST",
      endpoint: "/api/v1/transactions/transfer",
      responseStatus: "200 OK [SESSION_COMMITTED]",
      payloadPreview: `{ "fromAccount": "ACC-8821", "toAccount": "ACC-3049", "amount": 1500, "ledgerVerified": true }`,
    },
  },
  {
    id: "spotify-backend",
    title: "Spotify Backend API",
    subtitle: "High-Throughput Streaming & Media Management Service",
    status: "PRODUCTION_READY",
    badge: "Cloud Media Architecture",
    techStack: ["Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "ImageKit", "Bcrypt"],
    metrics: [
      { label: "API Endpoints", value: "8+ RESTful" },
      { label: "Media Storage", value: "ImageKit CDN" },
      { label: "Schema Relations", value: "1-to-Many Mongoose" },
    ],
    highlights: [
      "Architected Spotify-inspired backend engine exposing 8+ RESTful endpoints for authentication, music catalog, and album creation.",
      "Designed secure authentication with JWT, HTTP-only Cookies, bcrypt password hashing, and Role-Based Access Control (RBAC).",
      "Configured complex MongoDB schemas with one-to-many relational references using Mongoose.",
      "Built modular controllers and middleware, integrating ImageKit for high-performance cloud media storage and Postman verification.",
    ],
    terminalSnippet: {
      method: "POST",
      endpoint: "/api/v1/tracks/upload",
      responseStatus: "201 CREATED [IMAGEKIT_SYNCED]",
      payloadPreview: `{ "trackId": "TRK-9012", "artistId": "ART-441", "storageProvider": "ImageKit CDN", "format": "audio/mp3" }`,
    },
  },
  {
    id: "nexora-social",
    title: "Nexora (Social Engine)",
    subtitle: "Location-Based Proximity Discovery Platform",
    status: "IN_DEVELOPMENT",
    badge: "Ongoing Core Initiative",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "Zod"],
    metrics: [
      { label: "Token System", value: "Rotation Strategy" },
      { label: "Validation", value: "Zod Schema Type-Safe" },
      { label: "Discovery", value: "Geo-Proximity" },
    ],
    highlights: [
      "Developing the backend engine for a location-based social platform enabling secure user discovery and nearby connections.",
      "Implemented advanced authentication featuring JWT access tokens, refresh token rotation, HTTP-only cookies, and bcrypt hashing.",
      "Engineered 5+ RESTful endpoints using MVC & Service Layer architecture for strict separation of concerns.",
      "Integrated type-safe Zod runtime validation, centralized error pipelines, Winston logging, and comprehensive API documentation.",
    ],
    terminalSnippet: {
      method: "PATCH",
      endpoint: "/api/v1/auth/refresh-token",
      responseStatus: "200 OK [TOKEN_ROTATED]",
      payloadPreview: `{ "refreshTokenState": "ROTATED", "cookieType": "HTTPOnly", "schemaValidation": "Zod Passed" }`,
    },
  },
];

const frontendProjects: FrontendProject[] = [
  {
    id: "firebase-contact-manager",
    title: "Firebase Contact Manager",
    description:
      "Enterprise contact management platform featuring Firebase Authentication, secure user-isolated data sync, and dynamic CRUD interfaces.",
    techStack: ["React", "Firebase Auth", "Firestore", "JavaScript", "Tailwind CSS"],
    badge: "Full Auth & Database",
    highlights: [
      "Secured with Firebase Authentication for isolated per-user contact pipelines.",
      "Real-time database listener integration for zero-latency CRUD operations.",
      "Responsive user interface styled for cross-device compatibility.",
    ],
    githubUrl: "https://github.com/Komala-L/react-firebase-contact-app",
    liveUrl: "https://demo.com",
  },
  {
    id: "react-dice-game",
    title: "React Interactive Dice Game",
    description:
      "Interactive gaming application built with React, demonstrating advanced state management hooks, dynamic score calculation, and modular UI components.",
    techStack: ["React", "JavaScript", "Styled Components", "State Management"],
    badge: "State Management Engine",
    highlights: [
      "Dynamic dice rolling algorithms with real-time game-state synchronization.",
      "Modular, reusable React component architecture with Styled Components.",
      "Optimized state updates with instantaneous user interaction feedback.",
    ],
    githubUrl: "https://github.com/Komala-L/react-dice-game",
    liveUrl: "https://demo.com",
  },
  {
    id: "toogoodco-experience",
    title: "TooGoodCo Web Experience",
    description:
      "High-fidelity responsive web experience recreating fluid layouts, custom interactive UI animations, and modern structural design patterns.",
    techStack: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "DOM Manipulation"],
    badge: "UI / UX Reconstruction",
    highlights: [
      "Recreated complex multi-breakpoint layout systems using modern CSS Flexbox/Grid.",
      "Smooth interactive UI transitions built using pure JavaScript.",
      "Followed strict W3C semantic HTML5 standards and responsive guidelines.",
    ],
    githubUrl: "https://github.com/Komala-L/Too-Good-Co-Frontend-Clone",
    liveUrl: "https://demo.com",
  },
];

export default function Projects() {
  const [category, setCategory] = useState<"backend" | "frontend">("backend");
  const [selectedBackendId, setSelectedBackendId] = useState<string>("aegis-banking");

  const activeBackend =
    backendProjects.find((p) => p.id === selectedBackendId) || backendProjects[0];

  return (
    <section id="projects" className="relative py-24 bg-transparent min-h-screen">
      
      {/* Background Ambient Glowing Lights */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-6">

      {/* Section Header */}
      <div className="mb-12 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-3 backdrop-blur-md">
          <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          Software Engineering // Portfolio
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
          Featured System <br />
          <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 bg-clip-text text-transparent">
            Deployments & Builds.
          </span>
        </h2>
        <p className="text-cyan-300/70 text-sm max-w-xl font-mono leading-relaxed">
          Explore backend microservices, REST API architectures, security pipelines, and interactive frontend web platforms.
        </p>
      </div>

        {/* System Category Mode Switcher */}
        <div className="flex justify-center mb-12">
          <div className="p-1.5 rounded-2xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-xl flex items-center gap-2 shadow-[0_0_25px_rgba(6,182,212,0.15)]">
            <button
              onClick={() => setCategory("backend")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs md:text-sm font-mono font-semibold transition-all ${
                category === "backend"
                  ? "bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Server className="w-4 h-4" />
              <span>Backend & System APIs ({backendProjects.length})</span>
            </button>

            <button
              onClick={() => setCategory("frontend")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs md:text-sm font-mono font-semibold transition-all ${
                category === "frontend"
                  ? "bg-gradient-to-r from-purple-500 to-purple-400 text-slate-950 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Layout className="w-4 h-4" />
              <span>Frontend UI Builds ({frontendProjects.length})</span>
            </button>
          </div>
        </div>

        {/* CATEGORY 1: BACKEND SYSTEMS & ARCHITECTURES */}
        {category === "backend" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Selector Deck (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs font-mono text-cyan-400/80 uppercase tracking-widest flex items-center gap-2 mb-2 px-1">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                Select Backend System
              </div>

              {backendProjects.map((project) => {
                const isSelected = project.id === selectedBackendId;

                return (
                  <div
                    key={project.id}
                    onClick={() => setSelectedBackendId(project.id)}
                    className={`group cursor-pointer rounded-2xl p-5 border transition-all duration-300 backdrop-blur-xl ${
                      isSelected
                        ? "bg-slate-900/90 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.25)]"
                        : "bg-slate-900/40 border-cyan-500/20 hover:border-cyan-500/40 hover:bg-slate-900/60"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-semibold uppercase">
                        {project.badge}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded flex items-center gap-1 ${
                          project.status === "IN_DEVELOPMENT"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                            : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        }`}
                      >
                        {project.status === "IN_DEVELOPMENT" ? (
                          <RefreshCw className="w-3 h-3 animate-spin text-amber-400" />
                        ) : (
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        )}
                        {project.status}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-200 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1 font-mono">
                      {project.subtitle}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded bg-slate-950/80 border border-cyan-900/40 text-cyan-200 text-[10px] font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="px-1.5 py-0.5 rounded bg-slate-950/80 text-slate-400 text-[10px] font-mono">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Detailed Stage & API Telemetry Console (7 Cols) */}
            <div className="lg:col-span-7 rounded-3xl bg-slate-900/80 border border-cyan-500/40 p-6 md:p-8 backdrop-blur-2xl shadow-[0_0_35px_rgba(6,182,212,0.15)] relative overflow-hidden">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-cyan-900/40">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-cyan-400" />
                  <span className="text-xs font-mono font-semibold text-white uppercase tracking-wider">
                    SYSTEM_INSPECTOR // {activeBackend.id.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-[10px] font-mono">
                    REST API ENGINE
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {activeBackend.title}
                </h3>
                <p className="text-xs md:text-sm text-cyan-300/80 font-mono">
                  {activeBackend.subtitle}
                </p>
              </div>

              {/* Metric Highlights Bar */}
              <div className="grid grid-cols-3 gap-3 mb-6 p-3 rounded-xl bg-slate-950/80 border border-cyan-950 font-mono">
                {activeBackend.metrics.map((m, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-[10px] text-cyan-400/70 uppercase">{m.label}</div>
                    <div className="text-xs md:text-sm font-bold text-white mt-0.5">{m.value}</div>
                  </div>
                ))}
              </div>

              {/* Live API Route Telemetry Console */}
              <div className="mb-6 rounded-xl bg-slate-950 border border-cyan-900/60 p-4 font-mono text-xs shadow-inner">
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2.5 pb-2 border-b border-white/5">
                  <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                    <Terminal className="w-3.5 h-3.5" />
                    LIVE ROUTE INSPECTOR
                  </span>
                  <span className="text-emerald-400 font-bold">{activeBackend.terminalSnippet.responseStatus}</span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold text-[10px]">
                    {activeBackend.terminalSnippet.method}
                  </span>
                  <span className="text-slate-200">{activeBackend.terminalSnippet.endpoint}</span>
                </div>

                <div className="p-2.5 rounded bg-slate-900/90 text-cyan-200/90 text-[11px] overflow-x-auto border border-white/5">
                  <code>{activeBackend.terminalSnippet.payloadPreview}</code>
                </div>
              </div>

              {/* Key Deliverables Bullet List */}
              <div className="space-y-3 mb-6">
                <div className="text-[11px] font-mono text-cyan-400/80 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Architectural Deliverables
                </div>
                <ul className="space-y-2.5">
                  {activeBackend.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-200/90 leading-relaxed">
                      <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Full Tech Stack Pills */}
              <div>
                <div className="text-[10px] font-mono text-cyan-400/70 uppercase tracking-wider mb-2">
                  Deployed Technologies & Libraries
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeBackend.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-slate-950 border border-cyan-900/50 text-cyan-200 text-xs font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* CATEGORY 2: FRONTEND EXPERIENCES */}
        {category === "frontend" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {frontendProjects.map((project) => (
              <div
                key={project.id}
                className="group rounded-2xl bg-slate-900/70 border border-purple-500/30 p-6 backdrop-blur-xl hover:border-purple-400/60 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-300 text-[10px] font-mono font-semibold uppercase">
                      {project.badge}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                      <Globe className="w-3 h-3 text-emerald-400" />
                      CLIENT DEPLOYED
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-purple-200 transition-colors mb-2">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-300/80 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Highlights List */}
                  <ul className="space-y-2 mb-6">
                    {project.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack Matrix */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-slate-950/80 border border-purple-900/40 text-purple-200 text-[10px] font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct Action Launchpad Links */}
                <div className="pt-4 border-t border-purple-900/40 mt-auto">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-950/80 border border-purple-900/50 hover:border-purple-400 text-purple-200 text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-all hover:bg-purple-950/30"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Repository</span>
                  </a>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}