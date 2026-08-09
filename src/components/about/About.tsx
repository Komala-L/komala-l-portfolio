import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Code2,
  Database,
  Layers3,
} from "lucide-react";

const focusAreas = [
  {
    icon: Code2,
    title: "Frontend Engineering",
    description:
      "React, TypeScript, responsive interfaces and thoughtful interactions.",
  },
  {
    icon: Layers3,
    title: "Full-Stack Development",
    description:
      "Node.js, Express, REST APIs and application architecture.",
  },
  {
    icon: Database,
    title: "Backend & Data",
    description:
      "MongoDB, authentication, security and reliable backend systems.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 sm:py-32"
    >
      {/* Section heading */}
      <div className="mb-14">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px w-8 bg-cyan-400/70" />

          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/80">
            About / 01
          </span>
        </div>

        <h2 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-slate-100 sm:text-5xl lg:text-6xl">
          Building with curiosity.
          <br />
          <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 bg-clip-text text-transparent">
            Engineering with purpose.
          </span>
        </h2>
      </div>

      {/* Main content */}
      <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">

        {/* Story */}
        <div>
          <p className="max-w-2xl text-lg leading-8 text-slate-300">
            I'm Komala, a BCA student and developer who enjoys turning ideas
            into thoughtful, reliable web experiences. I work across the
            frontend and backend, with a particular interest in React,
            TypeScript, Node.js, and API-driven applications.
          </p>

          <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300/80">
            I care about more than making an interface look good. I enjoy
            understanding how things work underneath — from component
            architecture and state management to authentication, databases,
            and backend APIs. My goal is to build software that feels
            intuitive on the surface and is well-engineered underneath.
          </p>

         <a
            href="#projects"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-200 transition-colors hover:text-cyan-300"
          >
            Explore my work
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </a>
        </div>

        {/* Focus tree */}
        <div>
          <div className="relative mt-12 lg:mt-0">
        {/* Section label */}
        <div className="mb-8 flex items-center gap-3">
          <span className="h-px w-8 bg-cyan-400/70" />

          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
            Currently focused on
          </span>
        </div>

        {/* Focus tree */}
        <div className="relative pl-7">
          {/* Main vertical trunk */}
          <div className="absolute left-1 top-2 bottom-2 w-px bg-gradient-to-b from-cyan-400/60 via-cyan-400/25 to-transparent" />

          <div className="space-y-8">

            {/* Frontend */}
            <div className="group relative">
              {/* Branch */}
              <div className="absolute -left-6 top-4 h-px w-6 bg-cyan-400/35 transition-all duration-300 group-hover:w-8 group-hover:bg-cyan-300/70" />

              {/* Node */}
              <div className="absolute -left-[30px] top-[9px] h-2 w-2 rounded-full border border-cyan-300/70 bg-cyan-300/20 shadow-[0_0_10px_rgba(103,232,249,0.45)] transition-all duration-300 group-hover:scale-125 group-hover:bg-cyan-300/50" />

              <div className="transition-transform duration-300 group-hover:translate-x-1">
                <h3 className="text-base font-semibold text-slate-100">
                  Frontend Engineering
                </h3>

                <p className="mt-1.5 text-sm leading-6 text-slate-400">
                  React, TypeScript, responsive interfaces and interaction.
                </p>
              </div>
            </div>

            {/* Full Stack */}
            <div className="group relative">
              {/* Branch */}
              <div className="absolute -left-6 top-4 h-px w-6 bg-violet-400/35 transition-all duration-300 group-hover:w-8 group-hover:bg-violet-300/70" />

              {/* Node */}
              <div className="absolute -left-[30px] top-[9px] h-2 w-2 rounded-full border border-violet-300/70 bg-violet-300/20 shadow-[0_0_10px_rgba(167,139,250,0.4)] transition-all duration-300 group-hover:scale-125 group-hover:bg-violet-300/50" />

              <div className="transition-transform duration-300 group-hover:translate-x-1">
                <h3 className="text-base font-semibold text-slate-100">
                  Full-Stack Development
                </h3>

                <p className="mt-1.5 text-sm leading-6 text-slate-400">
                  Node.js, Express, REST APIs and application architecture.
                </p>
              </div>
            </div>

            {/* Backend */}
            <div className="group relative">
              {/* Branch */}
              <div className="absolute -left-6 top-4 h-px w-6 bg-sky-400/35 transition-all duration-300 group-hover:w-8 group-hover:bg-sky-300/70" />

              {/* Node */}
              <div className="absolute -left-[30px] top-[9px] h-2 w-2 rounded-full border border-sky-300/70 bg-sky-300/20 shadow-[0_0_10px_rgba(125,211,252,0.4)] transition-all duration-300 group-hover:scale-125 group-hover:bg-sky-300/50" />

              <div className="transition-transform duration-300 group-hover:translate-x-1">
                <h3 className="text-base font-semibold text-slate-100">
                  Backend & Data
                </h3>

                <p className="mt-1.5 text-sm leading-6 text-slate-400">
                  MongoDB, authentication, security and backend systems.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  );
}