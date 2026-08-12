import React, { useState, useEffect } from "react";
import {
  Terminal,
  ArrowUp,
  Github,
  Linkedin,
  Mail,
  Heart,
  Globe,
  Radio,
  Code2,
} from "lucide-react";

export default function Footer() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-slate-950/95 border-t border-slate-800/80 pt-10 pb-8 font-mono text-xs text-slate-400 backdrop-blur-xl relative z-20">
      <div className="max-w-6xl mx-auto px-6 space-y-8">
        
        {/* Live System Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-xl bg-slate-900/50 border border-slate-800/90 text-slate-300">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              SYSTEM OPERATIONAL
            </span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
              <Radio className="w-3.5 h-3.5 text-cyan-400" />
              LATENCY: <span className="text-cyan-300">18ms</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>BENGALURU, IN</span>
            </div>
            <span className="text-slate-700">•</span>
            <div className="text-cyan-300 font-bold tracking-wider">
              {time || "11:39:00 PM"} <span className="text-slate-500 text-[10px]">IST</span>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start py-2">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-white font-sans tracking-tight">
                Komala L
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm font-sans text-xs">
              Full Stack Developer specializing in clean UI architecture, high-performance REST APIs, and responsive full-stack web applications.
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[10px]">React 18</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[10px]">TypeScript</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[10px]">Tailwind CSS</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[10px]">Node.js</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-slate-300 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Quick Navigation</span>
            </div>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#about" className="hover:text-cyan-300 transition-colors">01. About</a></li>
              <li><a href="#skills" className="hover:text-cyan-300 transition-colors">02. Skills</a></li>
              <li><a href="#projects" className="hover:text-cyan-300 transition-colors">03. Projects</a></li>
              <li><a href="#contact" className="hover:text-cyan-300 transition-colors">04. Contact</a></li>
            </ul>
          </div>

          {/* Connect & Actions */}
          <div className="md:col-span-4 space-y-3 md:text-right flex flex-col md:items-end">
            <div className="text-slate-300 font-bold uppercase tracking-wider text-[11px]">
              Connect & Transmit
            </div>

            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://github.com/Komala-L"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/komala-l-dev/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=lk0106687@gmail.com"
                aria-label="Send Email"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-2 px-3.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white flex items-center gap-2 transition-all group"
            >
              <span>RETURN TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform text-cyan-400" />
            </button>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-4 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-500 text-[11px]">
          <div>© {new Date().getFullYear()} Komala L. All rights reserved.</div>
          <div className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            <span>& React Engineering</span>
          </div>
        </div>

      </div>
    </footer>
  );
}