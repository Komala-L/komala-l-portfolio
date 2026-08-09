import Hero from "../components/hero/Hero";
import { useState } from 'react';
import { Navbar } from "../components/hero/Navbar";
import { Footer } from "../components/hero/Footer";
import About from "../components/about/About";
import { SectionDivider } from "../components/ui/SectionDivider";

export default function Home() {
  // const [clicks, setClicks] = useState(0);

  return (
    <main className="relative z-10 min-h-screen w-full text-slate-100 antialiased">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-10 sm:px-10 lg:px-16">
        <Navbar />
        <Hero />
        <SectionDivider />
        <About />
        <Footer />
      </div>
    </main>
  );
}
