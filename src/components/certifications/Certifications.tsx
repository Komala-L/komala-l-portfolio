import React, { useState } from "react";
import {
  ShieldCheck,
  ExternalLink,
  Award,
  Calendar,
  Sparkles,
  CheckCircle2,
  Cpu,
  Lock,
  QrCode,
  ScanLine,
  ChevronRight,
  Terminal,
} from "lucide-react";

interface Credential {
  id: string;
  title: string;
  issuer: string;
  date: string;
  badgeCode: string;
  hashId: string;
  accent: "cyan" | "purple";
  credentialUrl?: string;
  skills: string[];
  details: string;
  verificationLevel: string;
}

const credentials: Credential[] = [
  {
    id: "hackerrank-se",
    title: "Software Engineer Certificate",
    issuer: "HackerRank",
    date: "Jul 2026",
    badgeCode: "HKR-SE-2026",
    hashId: "0x8F92...C4A1",
    credentialUrl:
      "https://www.hackerrank.com/certificates/iframe/86b82cb89339",
    accent: "cyan",
    verificationLevel: "TIER-1 ROLE CERTIFIED",
    skills: ["Problem Solving", "Data Structures", "Algorithms", "Software Design"],
    details:
      "Standardized competitive evaluation validating core algorithmic optimization, system design fundamentals, and scalable software engineering practices.",
  },
  {
    id: "hackerrank-react",
    title: "Frontend Developer (React) Certificate",
    issuer: "HackerRank",
    date: "Jul 2026",
    badgeCode: "HKR-REACT-2026",
    hashId: "0x3B71...E902",
    credentialUrl:
      "https://www.hackerrank.com/certificates/iframe/93035a42a229",
    accent: "purple",
    verificationLevel: "SPECIALIST CERTIFIED",
    skills: ["React.js", "State Management", "Virtual DOM", "Frontend Architecture"],
    details:
      "Advanced technical assessment confirming expertise in React component architecture, custom hook optimizations, and production frontend performance.",
  },
  {
    id: "naukri-ncat",
    title: "NCAT Naukri Participation Certificate",
    issuer: "Naukri Campus",
    date: "May 2026",
    badgeCode: "NCAT-AI-2026",
    hashId: "6a1d9359e34d6b76",
    credentialUrl:
      "https://www.naukri.com/campus/certificates/nc_ai_ncat_participation_may_2026/v0/6a1d9359e34d6b76d03b4749?utm_source=certificate&utm_medium=copy&utm_campaign=6a1d9359e34d6b76d03b4749",
    accent: "cyan",
    verificationLevel: "NATIONAL APTITUDE PASS",
    skills: ["AI Aptitude", "Analytical Reasoning", "Engineering Fundamentals"],
    details:
      "National-level competitive evaluation assessing technical problem-solving, artificial intelligence concepts, and engineering domain proficiency.",
  },
];

export default function Certifications() {
  const [selectedId, setSelectedId] = useState<string>("hackerrank-se");

  const activeCred = credentials.find((c) => c.id === selectedId) || credentials[0];
  const isPurple = activeCred.accent === "purple";

  return (
    <section id="certifications" className="relative py-24 bg-transparent min-h-screen overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-3 backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            Verified Credential // Vault
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
            Certifications & <br />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 bg-clip-text text-transparent">
              Accomplishments.
            </span>
          </h2>
          <p className="text-cyan-300/70 text-sm max-w-xl font-mono leading-relaxed">
            Select an encrypted credential security pass below to scan and view full cryptographic verification details.
          </p>
        </div>

        {/* Interactive Scanner Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Keycard Pass Selector (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-mono text-cyan-400/80 uppercase tracking-widest flex items-center gap-2 mb-2 px-1">
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              Encrypted Keycard Registry
            </div>

            {credentials.map((cred) => {
              const isSelected = cred.id === selectedId;
              const isCredPurple = cred.accent === "purple";

              return (
                <div
                  key={cred.id}
                  onClick={() => setSelectedId(cred.id)}
                  className={`group relative cursor-pointer rounded-2xl p-5 border transition-all duration-300 backdrop-blur-xl ${
                    isSelected
                      ? isCredPurple
                        ? "bg-purple-950/40 border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.3)]"
                        : "bg-slate-900/80 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.3)]"
                      : "bg-slate-900/40 border-cyan-500/20 hover:border-cyan-500/40 hover:bg-slate-900/60"
                  }`}
                >
                  {/* RFID Chip Indicator Graphic */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-6 rounded bg-gradient-to-tr from-amber-500/80 to-amber-300/90 border border-amber-200/50 flex items-center justify-center p-1 shadow-inner">
                        <div className="w-full h-full border border-amber-900/40 rounded-[2px]" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                          {cred.badgeCode}
                        </div>
                        <h3 className="text-base font-bold text-white group-hover:text-cyan-200 transition-colors">
                          {cred.title}
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

                  {/* Issuer & Date */}
                  <div className="flex items-center justify-between text-xs text-slate-400 mt-4 pt-3 border-t border-cyan-900/30 font-mono">
                    <span className="flex items-center gap-1.5 text-white/90 font-semibold">
                      <Award className={`w-3.5 h-3.5 ${isCredPurple ? "text-purple-400" : "text-cyan-400"}`} />
                      {cred.issuer}
                    </span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      {cred.date}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Holographic Laser Scanner Display (7 Cols) */}
          <div className="lg:col-span-7">
            <div
              className={`relative rounded-3xl bg-slate-900/80 border p-6 md:p-8 backdrop-blur-2xl transition-all duration-500 overflow-hidden shadow-2xl ${
                isPurple
                  ? "border-purple-500/40 shadow-[0_0_40px_rgba(168,85,247,0.15)]"
                  : "border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.15)]"
              }`}
            >
              
              {/* Laser Scanline Animation Bar */}
              <div
                className={`absolute left-0 right-0 h-1 z-20 pointer-events-none opacity-80 ${
                  isPurple
                    ? "bg-gradient-to-r from-transparent via-purple-400 to-transparent shadow-[0_0_15px_#a855f7]"
                    : "bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#06b6d4]"
                }`}
                style={{ animation: "scanLine 4s ease-in-out infinite" }}
              />

              {/* Holographic Watermark Pattern */}
              <div className="absolute top-4 right-4 opacity-10 pointer-events-none text-white">
                <QrCode className="w-32 h-32" />
              </div>

              {/* Hologram Card Top Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-6 border-b border-cyan-900/40 relative z-10">
                <div className="flex items-center gap-2">
                  <ScanLine className={`w-5 h-5 ${isPurple ? "text-purple-400" : "text-cyan-400"}`} />
                  <span className="text-xs font-mono font-semibold text-white tracking-widest uppercase">
                    CREDENTIAL_SCANNER // ACTIVE
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono flex items-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-3 h-3" />
                    VERIFIED_AUTHENTIC
                  </span>
                </div>
              </div>

              {/* Pass Main Info */}
              <div className="relative z-10 mb-6">
                <div className="text-xs font-mono text-cyan-400/80 uppercase mb-1">
                  {activeCred.verificationLevel}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                  {activeCred.title}
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300">
                  <span className="flex items-center gap-1.5 text-cyan-300 font-semibold">
                    <Award className="w-4 h-4 text-cyan-400" />
                    Issuer: {activeCred.issuer}
                  </span>
                  <span>•</span>
                  <span className="text-slate-400">Issued: {activeCred.date}</span>
                  <span>•</span>
                  <span className="text-slate-400">Hash: {activeCred.hashId}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs md:text-sm text-slate-300/90 leading-relaxed mb-6 relative z-10">
                {activeCred.details}
              </p>

              {/* Verified Competencies Matrix */}
              <div className="mb-8 relative z-10">
                <div className="text-xs font-mono text-cyan-400/80 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  Validated Skill Matrix
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeCred.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-lg bg-slate-950/90 border border-cyan-900/60 text-cyan-200 text-xs font-mono shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Verification Trigger Action */}
              <div className="pt-5 border-t border-cyan-900/40 relative z-10 flex flex-wrap items-center justify-between gap-4">
                <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  ID: <span className="text-white">{activeCred.badgeCode}</span>
                </div>

                {activeCred.credentialUrl ? (
                  <a
                    href={activeCred.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-cyan-400 to-purple-500 text-slate-950 font-bold text-xs tracking-wider uppercase flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.7)] hover:scale-105 transition-all"
                  >
                    <span>View Certificate</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <div className="px-4 py-2 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    <span>HackerRank Authenticated Pass</span>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Laser Scanline CSS Animation */}
      <style>{`
        @keyframes scanLine {
          0% { top: 0%; }
          50% { top: 98%; }
          100% { top: 0%; }
        }
      `}</style>
    </section>
  );
}