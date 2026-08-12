import { useEffect, useState } from "react";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import komala from "../../assets/images/komala.png";

import {
  Terminal,
  Sparkles,
  ArrowUpRight,
  FileText,
  ShieldCheck,
  Code2,
  Cpu,
  Github,
  Linkedin,
  Mail,
  CheckCircle2,
  MapPin,
  Layers,
} from "lucide-react";

const fadeUp: Variants = {
    hidden: {
        opacity: 0,
        y: 35,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
        },
    },
};

const fadeLeft: Variants = {
    hidden: {
        opacity: 0,
        x: -50,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.9,
            ease: "easeOut",
        },
    },
};

const fadeRight: Variants = {
    hidden: {
        opacity: 0,
        x: 50,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 1,
            ease: "easeOut",
        },
    },
};

const roles = [
  "MERN Stack Developer",
  "Full-Stack Systems Engineer",
  "REST API Architect",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  // Cycle through dynamic titles
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center bg-transparent overflow-hidden">
      
      {/* Background Ambient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN: INTRO & CALL TO ACTION (7 COLS) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-mono backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-4" />
              <span>Available for Internships & Full-Time Roles</span>
            </div>

            {/* Dynamic Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                Turning ideas into <br />
                <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 bg-clip-text text-transparent">
                  scalable products.
                </span>
              </h1>

              {/* Dynamic Terminal Role Switcher */}
              <div className="flex items-center gap-2 pt-2 text-sm md:text-base font-mono text-cyan-300/90">
                <Terminal className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-slate-400">$ role --current</span>
                <span className="text-purple-300 font-semibold transition-all duration-500 underline decoration-cyan-400/50 underline-offset-4">
                  "{roles[roleIndex]}"
                </span>
              </div>
            </div>

            {/* Sub-description */}
            <p className="text-sm md:text-base text-slate-300/80 leading-relaxed max-w-xl">
              Passionate about creating scalable web applications with clean architecture, intuitive user experiences, and high-performance backend systems.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* Primary CTA */}
              <a
                href="#projects"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-cyan-400 to-purple-500 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.7)] hover:scale-105 transition-all group"
              >
                <span>View Projects</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* Secondary Wireframe CTA */}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/40 hover:border-cyan-300 text-cyan-200 hover:text-white font-mono font-semibold text-xs uppercase tracking-wider flex items-center gap-2 backdrop-blur-xl hover:bg-cyan-500/10 transition-all"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>View Resume</span>
              </a>
            </div>

            {/* Social Icons */}
                     <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.6 }}
                        className="mt-8 flex items-center justify-center gap-8 lg:justify-start lg:gap-5"
                    >

                        {/* GitHub */}
                        <a
                            href="https://github.com/Komala-L"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                                <Github className="h-5 w-5 text-slate-300 transition group-hover:scale-110 group-hover:text-cyan-300" />
                            </div>
                        </a>


                        {/* LinkedIn */}
                        <a
                            href="https://www.linkedin.com/in/komala-l-dev/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                                <Linkedin className="h-5 w-5 text-slate-300 transition group-hover:scale-110 group-hover:text-cyan-300" />
                            </div>
                        </a>


                        {/* Email */}
                        <a
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=lk0106687@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                                <Mail className="h-5 w-5 text-slate-300 transition group-hover:scale-110 group-hover:text-cyan-300" />
                            </div>
                        </a>

                    </motion.div>

          </div>

          {/* RIGHT COLUMN: HOLOGRAPHIC HUD PORTRAIT STAGE (5 COLS) */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Floating Orbiting Skill Tags */}
            <div className="absolute -top-4 -left-4 z-20 px-3 py-1.5 rounded-xl bg-slate-950/90 border border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.3)] animate-bounce" style={{ animationDuration: "6s" }}>
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              React.js
            </div>

            <div className="absolute top-1/2 -right-6 z-20 px-3 py-1.5 rounded-xl bg-slate-950/90 border border-purple-500/40 text-purple-300 text-xs font-mono flex items-center gap-1.5 shadow-[0_0_15px_rgba(168,85,247,0.3)] animate-bounce" style={{ animationDuration: "5s", animationDelay: "1s" }}>
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              Node.js & Express
            </div>

            <div className="absolute -bottom-4 left-6 z-20 px-3 py-1.5 rounded-xl bg-slate-950/90 border border-cyan-500/40 text-cyan-200 text-xs font-mono flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Layers className="w-3.5 h-3.5 text-teal-400" />
              MongoDB & Mongoose
            </div>

            {/* Main Cyber HUD Frame */}
            <div className="relative group w-full max-w-md rounded-3xl p-2 bg-gradient-to-b from-cyan-500/30 via-purple-500/20 to-cyan-500/10 border border-cyan-500/40 backdrop-blur-2xl shadow-[0_0_40px_rgba(6,182,212,0.2)]">
              
              {/* Corner HUD Bracket Highlights */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400 rounded-tl-md z-20" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400 rounded-tr-md z-20" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-purple-400 rounded-bl-md z-20" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-purple-400 rounded-br-md z-20" />

              {/* Photo Box Container */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-950">
                <img
                  src={komala}
                  alt="Komala"
                  className="w-full h-[500px] object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              {/* Glass Reflection */}
              <div className=" pointer-events-none absolute top-0 -left-[120%] h-full w-[45%] -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-all duration-700 ease-out group-hover:left-[140%] group-hover:opacity-100"/>

                {/* Subtle Cyber Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/20 pointer-events-none" />

                {/* Floating "Open To Work" Status Card */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-slate-950/85 border border-cyan-500/30 backdrop-blur-xl flex items-center justify-between shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        Open to Work
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <div className="text-[10px] font-mono text-cyan-300/80 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-cyan-400" />
                        Full Stack Developer • Bengaluru, IN
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM METRICS TELEMETRY STRIP */}
        <div className="mt-16 pt-8 border-t border-cyan-900/30 grid grid-cols-2 md:grid-cols-4 gap-4 text-center font-mono">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-cyan-500/15 backdrop-blur-md">
            <div className="text-xl md:text-2xl font-bold text-white">8+</div>
            <div className="text-[11px] text-cyan-400/80 uppercase tracking-wider mt-1">REST API Endpoints</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-purple-500/15 backdrop-blur-md">
            <div className="text-xl md:text-2xl font-bold text-white">100%</div>
            <div className="text-[11px] text-purple-400/80 uppercase tracking-wider mt-1">ACID Transaction Safe</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-cyan-500/15 backdrop-blur-md">
            <div className="text-xl md:text-2xl font-bold text-white">MVC</div>
            <div className="text-[11px] text-cyan-400/80 uppercase tracking-wider mt-1">Service Layer Pattern</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-purple-500/15 backdrop-blur-md">
            <div className="text-xl md:text-2xl font-bold text-white">JWT + RBAC</div>
            <div className="text-[11px] text-purple-400/80 uppercase tracking-wider mt-1">Auth Security Standard</div>
          </div>
        </div>

      </div>
    </section>
  );
}