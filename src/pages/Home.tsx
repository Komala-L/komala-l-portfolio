import Hero from "../components/hero/Hero";
import { useState } from 'react';
import { Navbar } from "../components/hero/Navbar";
import Footer from "../components/hero/Footer";
import About from "../components/about/About";
import { SectionDivider } from "../components/ui/SectionDivider";
import Skills from "../components/skills/Skills";
import Projects from "@/components/projects/Projects";
import Experience from "@/components/Experience/Experience";
import Contact from "@/components/contact/Contact";
import Certifications from "@/components/certifications/Certifications";
import Sidebar from "@/components/hero/Sidebar";
import ScrollControls from "@/components/hero/ScrollControls";
import Education from "@/components/education/Education";

export default function Home() {
  // const [clicks, setClicks] = useState(0);

  return (
    <main className="relative z-10 min-h-screen w-full text-slate-100 antialiased">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-10 sm:px-10 lg:px-16">
        <ScrollControls />
        <Navbar />
        {/* <Sidebar /> */}
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Education />
        <SectionDivider />
        <Certifications />
        <SectionDivider />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
