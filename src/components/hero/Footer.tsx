import { Github, Linkedin, Mail } from "lucide-react";
export function Footer() {
    return (
       <footer className="mt-20 w-full border-t border-white/10 pt-8 pb-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

            {/* LEFT */}
            <div>
                <h3 className="text-base font-semibold text-white">
                    Komala L
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                    MERN Stack Developer
                </p>

                <p className="mt-3 text-xs text-slate-500">
                    © {new Date().getFullYear()} Komala L. All rights reserved.
                </p>
            </div>


            {/* RIGHT */}
            <div className="flex flex-wrap items-center gap-3">

                {/* GitHub */}
                <a
                    href="https://github.com/Komala-L"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-300 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-300"
                >
                    <Github className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                    <span>GitHub</span>
                </a>


                {/* LinkedIn */}
                <a
                    href="https://www.linkedin.com/in/komala-l-dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-300 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-300"
                >
                    <Linkedin className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                    <span>LinkedIn</span>
                </a>


                {/* Email */}
                <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=lk0106687@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Email"
                    className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-300 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-300"
                >
                    <Mail className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                    <span>Email</span>
                </a>

            </div>
        </div>


        {/* BOTTOM LINE */}
        <div className="mt-8 flex flex-col gap-2 border-t border-white/5 pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <span>
                Built with React, TypeScript &amp; Tailwind CSS.
            </span>

            <span>
                Bengaluru, India
            </span>
        </div>
    </footer>
    );
}