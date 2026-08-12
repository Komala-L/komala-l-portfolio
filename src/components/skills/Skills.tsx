import React from "react";
import { Cpu } from 'lucide-react';
// Reliable SVG tech icons
const getIcon = (name: string) => {
  const iconMap: Record<string, string> = {
    "React.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    "JavaScript (ES6+)": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    "HTML5 · CSS3": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    "Express.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    "REST APIs": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
    "Architecture: MVC, Service Layer": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg",
    "MongoDB · Mongoose": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    "Firebase": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    "JWT · bcrypt": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
    "HTTP-only Cookies · RBAC": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/networkx/networkx-original.svg",
    "Zod": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-plain.svg",
    "Git · GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    "Postman": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
    "VS Code · Vite": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    "Three.js · WebGL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
    "Interactive animation systems": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg",
  };
  return iconMap[name] || "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg";
};

interface RingConfig {
  id: number;
  title: string;
  rx: number; // Horizontal Radius
  ry: number; // Vertical Radius
  direction: "cw" | "ccw";
  duration: number; // Duration in seconds per rotation
  skills: string[];
}

const rings: RingConfig[] = [
  {
    id: 1,
    title: "Frontend",
    rx: 340, // 1st Ring: Largest
    ry: 60,
    direction: "cw", // Clockwise
    duration: 22,
    skills: ["React.js", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "HTML5 · CSS3"],
  },
  {
    id: 2,
    title: "Backend",
    rx: 260, // 2nd Ring: 2nd Largest
    ry: 48,
    direction: "ccw", // Anti-clockwise
    duration: 20,
    skills: ["Node.js", "Express.js", "REST APIs", "Architecture: MVC, Service Layer"],
  },
  {
    id: 3,
    title: "Tools & Workflow",
    rx: 190, // 3rd Ring: 3rd Largest (Smallest)
    ry: 38,
    direction: "cw", // Clockwise
    duration: 18,
    skills: ["Git · GitHub", "Postman", "VS Code · Vite"],
  },
  {
    id: 4,
    title: "Data & Security",
    rx: 260, // 4th Ring: 2nd Largest
    ry: 48,
    direction: "ccw", // Anti-clockwise
    duration: 22,
    skills: ["MongoDB · Mongoose", "Firebase", "JWT · bcrypt", "HTTP-only Cookies · RBAC", "Zod"],
  },
  {
    id: 5,
    title: "Creative Computing",
    rx: 340, // 5th Ring: Largest
    ry: 60,
    direction: "cw", // Clockwise
    duration: 25,
    skills: ["Three.js · WebGL", "Interactive animation systems"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative flex min-h-screen flex-col items-center justify-center py-20 bg-transparent overflow-hidden">
      
      {/* Section Header */}
      <div className="text-center mb-12 z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-3 backdrop-blur-md">
    <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
    System Capabilities // Stack
  </div>
  <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
    Technical Stack & <br />
    <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 bg-clip-text text-transparent">
      Core Skills.
    </span>
  </h2>
  <p className="text-cyan-300/70 text-sm max-w-lg font-mono leading-relaxed">
    Orbital system representing core technical stack and engineering workflow.
  </p>
      </div>

      {/* Earth Orbit Container */}
      <div className="relative flex flex-col items-center justify-center gap-10 scale-75 sm:scale-90 md:scale-100">
        {rings.map((ring) => {
          const totalSkills = ring.skills.length;

          return (
            <div
              key={ring.id}
              className="relative flex items-center justify-center"
              style={{
                width: `${ring.rx * 2 + 80}px`,
                height: `${ring.ry * 2 + 60}px`,
              }}
            >
              {/* Ellipse Outline Ring */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox={`0 0 ${ring.rx * 2 + 80} ${ring.ry * 2 + 60}`}
              >
                <ellipse
                  cx={ring.rx + 40}
                  cy={ring.ry + 30}
                  rx={ring.rx}
                  ry={ring.ry}
                  fill="none"
                  stroke="rgba(6, 182, 212, 0.3)"
                  strokeWidth="1.5"
                  strokeDasharray="6 6"
                  className="drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]"
                />
              </svg>

              {/* Center Category Badge */}
              <div className="z-0 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-[11px] font-semibold tracking-wider uppercase backdrop-blur-md shadow-[0_0_12px_rgba(6,182,212,0.2)]">
                {ring.title}
              </div>

              {/* Orbiting Tech Items */}
              {ring.skills.map((skill, idx) => {
                // Phase delay calculations
                const baseDelay = - (idx / totalSkills) * ring.duration;
                const phaseShift = ring.direction === "cw" ? - (ring.duration / 4) : (ring.duration / 4);
                
                const delayX = baseDelay;
                const delayY = baseDelay + phaseShift;

                return (
                  <div
                    key={skill}
                    className="absolute top-1/2 left-1/2 z-10 pointer-events-auto"
                    style={{
                      animation: `orbitX ${ring.duration}s ease-in-out infinite`,
                      animationDelay: `${delayX}s`,
                      /* @ts-ignore */
                      "--rx": `${ring.rx}px`,
                    }}
                  >
                    <div
                      style={{
                        animation: `orbitY ${ring.duration}s ease-in-out infinite`,
                        animationDelay: `${delayY}s`,
                        /* @ts-ignore */
                        "--ry": `${ring.ry}px`,
                      }}
                    >
                      <div className="flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                        {/* Technology Icon (Bigger than text) */}
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-900/80 border border-cyan-500/40 p-2.5 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.25)] backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-cyan-400 group-hover:shadow-[0_0_22px_rgba(6,182,212,0.5)]">
                          <img
                            src={getIcon(skill)}
                            alt={skill}
                            className="w-full h-full object-contain filter drop-shadow"
                          />
                        </div>

                        {/* Technology Name */}
                        <span className="mt-1.5 px-2 py-0.5 rounded-md bg-slate-950/70 border border-cyan-900/40 text-[10px] sm:text-xs font-medium text-cyan-100 whitespace-nowrap shadow-sm backdrop-blur-sm group-hover:text-cyan-300 transition-colors">
                          {skill}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
              
            </div>
          );
        })}
      </div>

      {/* Keyframe Animations for Harmonic Elliptical Orbit */}
      <style>{`
        @keyframes orbitX {
          0%, 100% {
            transform: translateX(var(--rx));
          }
          50% {
            transform: translateX(calc(-1 * var(--rx)));
          }
        }

        @keyframes orbitY {
          0%, 100% {
            transform: translateY(var(--ry));
          }
          50% {
            transform: translateY(calc(-1 * var(--ry)));
          }
        }
      `}</style>
    </section>
  );
}