import { useEffect, useState } from "react";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import komala from "../../assets/images/komala.png";
import {Github, Linkedin, Mail, Code2,} from "lucide-react";

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
    "Backend Developer",
    "Full Stack Developer",
    "Node.js Developer",
    "Software Engineer",
];

export default function Hero() {
    const [roleIndex, setRoleIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setRoleIndex((current) => (current + 1) % roles.length);
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative flex min-h-screen items-center">
            <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-16 px-6 py-20 sm:px-6 sm:py-20 lg:flex-row lg:gap-24 lg:px-12">
               
                {/* LEFT SIDE */}
                <div className="order-2 w-full flex-1 text-center lg:order-1 lg:text-left lg:max-w-[620px]">
                    {/* Availability Badge */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="inline-flex max-w-full items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-xs text-cyan-200 backdrop-blur-md sm:px-4 sm:text-sm"
                    >
                        <span className="h-2 w-2 animate-pulse rounded-full bg-green-400"></span>

                        Available for Internships & Full-Time Roles
                    </motion.div>


                    {/* Heading */}
                    <motion.h1
                        variants={fadeLeft}
                        initial="hidden"
                        animate="visible"
                        className="mt-6 text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:mt-8 lg:text-7xl"
                    >
                        Turning
                        <br />

                        <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-400 bg-clip-text text-transparent">
                            ideas into scalable
                        </span>

                        <br />

                        products.
                    </motion.h1>


                    {/* Description */}
                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.25 }}
                        className="mx-auto mt-6 max-w-lg text-base leading-7 text-slate-300 sm:text-lg sm:leading-8 lg:mx-0 lg:mt-8"
                    >
                        I'm Komala, a MERN Stack Developer passionate about creating
                        scalable web applications with clean architecture, intuitive
                        user experiences, and high-performance backend systems.
                    </motion.p>


                    {/* Buttons */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.45 }}
                        className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-center lg:mt-10 lg:justify-start"
                    >
                        <a
                            href="#projects"
                            className="w-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-8 py-4 font-semibold text-slate-950 transition hover:scale-105 sm:w-auto"
                        >
                            View Projects
                        </a>

                        <a
                            href="/resume.pdf"
                            className="w-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-8 py-4 font-semibold text-slate-950 transition hover:scale-105 sm:w-auto"
                        >
                            Download Resume
                        </a>
                    </motion.div>


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


                {/* RIGHT SIDE */}
                <div className="order-1 relative flex w-full flex-1 justify-center lg:order-2 lg:max-w-[500px]">
                    {/* Photo + Card Container */}
                    <div className="relative">

                        {/* Animated Glow */}
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                            <div
                                className="
                                    h-[360px]
                                    w-[280px]
                                    rounded-full
                                    bg-gradient-to-r
                                    from-cyan-500/25
                                    via-violet-500/20
                                    to-blue-500/25
                                    blur-[140px]
                                    animate-pulse
                                    sm:h-[420px]
                                    sm:w-[320px]
                                "
                            />
                        </div>

                        {/* Glass Frame */}
                        <motion.div
                            variants={fadeRight}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.35 }}
                            className="group relative z-10 animate-float-slow rounded-[40px] p-[1px] transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]"
                        >
                            {/* Animated Gradient Border */}
                            <div
                                className="
                                    absolute inset-0
                                    rounded-[40px]
                                    bg-[linear-gradient(120deg,rgba(34,211,238,0.8),rgba(139,92,246,0.8),rgba(34,211,238,0.8))]
                                    bg-[length:200%_200%]
                                    animate-gradient-border
                                    opacity-80
                                "
                            />

                            {/* Inner Glass Frame */}
                            <div className="relative overflow-hidden rounded-[39px] bg-slate-950/60 backdrop-blur-xl">

                            {/* Cyan Glow */}
                            <div
                                className="
                                    absolute
                                    -inset-10
                                    -z-10
                                    rounded-full
                                    bg-cyan-400/15
                                    blur-[80px]
                                    opacity-40
                                    transition-all
                                    duration-700
                                    group-hover:opacity-100
                                    group-hover:scale-110
                                "
                            />

                            {/* Profile Image */}
                            <img
                                src={komala}
                                alt="Komala"
                                className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105 sm:h-[550px] sm:w-[380px] lg:h-[600px] lg:w-[420px]"
                            />

                            {/* Glass Shine */}
                            <div
                                className="
                                    pointer-events-none
                                    absolute
                                    top-0
                                    -left-[120%]
                                    h-full
                                    w-[45%]
                                    -skew-x-12
                                    bg-gradient-to-r
                                    from-transparent
                                    via-white/25
                                    to-transparent
                                    opacity-0
                                    transition-all
                                    duration-700
                                    ease-out
                                    group-hover:left-[140%]
                                    group-hover:opacity-100
                                "
                            />

                            {/* Glass Reflection */}
                            <div
                                className="
                                    pointer-events-none
                                    absolute
                                    inset-0
                                    bg-gradient-to-tr
                                    from-transparent
                                    via-white/5
                                    to-cyan-300/10
                                    opacity-0
                                    transition-opacity
                                    duration-500
                                    group-hover:opacity-100
                                  "
                            />
                            </div>
                        </motion.div>

                        {/* Open to Work Card */}
                        <div
                            className="
                                absolute
                                -bottom-6
                                left-1/2
                                z-20
                                w-[calc(100%-1rem)]
                                max-w-[340px]
                                -translate-x-1/2
                                sm:-bottom-8
                                sm:w-auto
                                sm:max-w-none
                                min-w-[300px]
                                sm:min-w-[320px]
                                lg:-left-8
                                lg:translate-x-0
                            "
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{
                                    delay: 1,
                                    duration: 0.7,
                                    ease: "easeOut",
                                }}
                                className="
                                    animate-float
                                    rounded-2xl
                                    border border-cyan-400/20
                                    bg-slate-900/60
                                    px-5 py-4
                                    backdrop-blur-xl
                                    shadow-[0_20px_50px_rgba(0,0,0,0.35)]
                                "
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10">
                                        🚀
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-white">
                                            Open to Work
                                        </h3>

                                        <div className="relative h-5 ">
                                        <AnimatePresence mode="wait">
                                            <motion.p
                                                key={roles[roleIndex]}
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -15 }}
                                                transition={{ duration: 0.35, ease: "easeOut" }}
                                                className="absolute whitespace-nowrap text-sm text-slate-300"
                                            >
                                                {roles[roleIndex]}
                                            </motion.p>
                                        </AnimatePresence>
                                    </div>

                                        <p className="mt-1 text-xs text-cyan-300">
                                            Bangalore • India
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}