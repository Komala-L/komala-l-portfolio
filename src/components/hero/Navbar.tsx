import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  NAVBAR_HEIGHT_PX,
  NAV_ITEMS,
  PORTFOLIO_INITIALS,
  PORTFOLIO_NAME,
  SCROLL_BEHAVIOUR_SMOOTH_OPTIONS,
  SECTION_IDS,
  type SectionId,
} from '@/constants/portfolio';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Menu, X } from 'lucide-react';

function scrollToSection(sectionId: SectionId, reducedMotion: boolean) {
  const el = document.getElementById(sectionId);
  if (!el) return;
  const options: ScrollToOptions = {
    top:
      window.scrollY +
      el.getBoundingClientRect().top -
      (NAVBAR_HEIGHT_PX + 12),
    behavior: reducedMotion ? 'auto' : SCROLL_BEHAVIOUR_SMOOTH_OPTIONS.behavior,
  };
  window.scrollTo(options);
}

export function Navbar() {
  const active = useActiveSection(
    NAV_ITEMS.map((n) => n.id),
    SECTION_IDS.HERO
  );
  const reducedMotion = useReducedMotion();

  const [scrollDepth, setScrollDepth] = useState<number>(0);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const navListRef = useRef<HTMLUListElement>(null);
  const activeIndicatorRef = useRef<HTMLSpanElement>(null);
  const prevActiveRef = useRef<SectionId>(SECTION_IDS.HERO);

  useEffect(() => {
    let raf = 0;
    let pending = false;
    const onScroll = () => {
      if (pending) return;
      pending = true;
      raf = requestAnimationFrame(() => {
        pending = false;
        const maxDepth = 320;
        const depth = Math.min(1, window.scrollY / maxDepth);
        setScrollDepth(depth);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    const list = navListRef.current;
    const indicator = activeIndicatorRef.current;
    if (!list || !indicator) return;
    const items = Array.from(list.querySelectorAll<HTMLLIElement>('[data-nav-item]'));
    const target = items.find(
      (el) => el.dataset.navItem === active
    );
    if (!target) return;
    const listRect = list.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const x = targetRect.left - listRect.left;
    indicator.style.setProperty('transform', `translateX(${x}px)`);
    indicator.style.setProperty('width', `${targetRect.width}px`);
    indicator.style.setProperty(
      'transition',
      prevActiveRef.current === active || reducedMotion
        ? 'none'
        : 'transform 520ms cubic-bezier(0.2, 0.8, 0.2, 1), width 520ms cubic-bezier(0.2, 0.8, 0.2, 1)'
    );
    prevActiveRef.current = active;
  }, [active, reducedMotion, menuOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent, sectionId: SectionId) => {
      e.preventDefault();
      setMenuOpen(false);
      scrollToSection(sectionId, reducedMotion);
    },
    [reducedMotion]
  );

  const headerBlur = 6 + scrollDepth * 14;
  const headerAlpha = 0.02 + scrollDepth * 0.14;
  const headerBorderAlpha = 0.04 + scrollDepth * 0.09;
  const initialsGlow = scrollDepth > 0.2;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      style={{ height: `${NAVBAR_HEIGHT_PX}px` }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-full"
        style={{
          backdropFilter: `blur(${headerBlur}px)`,
          WebkitBackdropFilter: `blur(${headerBlur}px)`,
          backgroundColor: `rgba(8, 10, 26, ${headerAlpha})`,
          borderBottom: `1px solid rgba(255,255,255,${headerBorderAlpha})`,
          transition:
            'backdrop-filter 320ms ease-out, background-color 320ms ease-out, border-color 320ms ease-out',
        }}
      />

      <nav className="relative mx-auto flex h-full w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href={`#${SECTION_IDS.HERO}`}
          onClick={(e) => handleNavClick(e, SECTION_IDS.HERO)}
          className="group flex items-center gap-3 select-none"
          aria-label={`${PORTFOLIO_NAME} — Go to top`}
        >
          <span
            className={cn(
              'relative flex h-9 w-9 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.05] text-[11px] font-semibold tracking-wider text-slate-50 transition-transform duration-500 ease-out group-hover:scale-105',
              initialsGlow &&
                'shadow-[0_0_0_1px_rgba(56,189,248,0.15),0_12px_30px_-10px_rgba(56,189,248,0.35)]'
            )}
          >
            <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/20 via-violet-400/10 to-fuchsia-400/20 opacity-90" />
            <span className="relative">{PORTFOLIO_INITIALS}</span>
          </span>
          <div className="hidden flex-col leading-tight sm:flex">
            <span className="text-sm font-semibold tracking-wide text-slate-100">
              {PORTFOLIO_NAME}
            </span>
            <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-cyan-300/70">
              Full-Stack · Developer
            </span>
          </div>
        </a>

        {/* DESKTOP NAV LIST */}
        <ul
          ref={navListRef}
          className="relative hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-1.5 py-1.5 md:flex"
        >
          <span
            ref={activeIndicatorRef}
            aria-hidden="true"
            className="pointer-events-none absolute top-1.5 left-0 h-[calc(100%-12px)] rounded-full bg-gradient-to-r from-cyan-400/10 via-violet-400/10 to-fuchsia-400/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
          />
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id} data-nav-item={item.id} className="relative">
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'relative z-10 block rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-colors duration-300',
                    isActive
                      ? 'text-slate-50'
                      : 'text-slate-300/85 hover:text-slate-100'
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* CONTACT BUTTON */}
        <a
          href={`#${SECTION_IDS.CONTACT}`}
          onClick={(e) => handleNavClick(e, SECTION_IDS.CONTACT)}
          className={cn(
            'hidden md:inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300 ease-out',
            'border-cyan-400/25 bg-cyan-400/[0.06] text-cyan-100',
            'hover:border-cyan-400/40 hover:bg-cyan-400/[0.12] hover:text-cyan-50 hover:shadow-[0_0_0_1px_rgba(56,189,248,0.15),0_12px_30px_-16px_rgba(56,189,248,0.55)]'
          )}
        >
          Let&apos;s talk
        </a>

        {/* MOBILE MENU TOGGLE BUTTON */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-slate-200 transition-colors hover:bg-white/[0.09] md:hidden"
        >
          {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      {/* MOBILE NAV DRAWER */}
      <div
        className={cn(
          'overflow-hidden px-4 transition-[max-height,opacity] duration-500 md:hidden',
          menuOpen ? 'max-h-[560px] opacity-100' : 'pointer-events-none max-h-0 opacity-0'
        )}
      >
        <div className="mx-auto mt-1 w-full max-w-6xl">
          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-2 backdrop-blur-xl">
            <ul className="flex flex-col">
              {NAV_ITEMS.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleNavClick(e, item.id)}
                      className={cn(
                        'flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-cyan-400/5 text-slate-50 shadow-[inset_0_0_0_1px_rgba(56,189,248,0.15)]'
                          : 'text-slate-200/90 hover:bg-white/[0.04] hover:text-slate-50'
                      )}
                    >
                      <span>{item.label}</span>
                      <span
                        aria-hidden="true"
                        className={cn(
                          'h-1.5 w-1.5 rounded-full',
                          isActive ? 'bg-cyan-300' : 'bg-slate-600'
                        )}
                      />
                    </a>
                  </li>
                );
              })}
              <li className="p-2">
                <a
                  href={`#${SECTION_IDS.CONTACT}`}
                  onClick={(e) => handleNavClick(e, SECTION_IDS.CONTACT)}
                  className="flex items-center justify-center rounded-2xl border border-cyan-400/25 bg-cyan-400/[0.07] px-4 py-3 text-sm font-semibold text-cyan-100"
                >
                  Let&apos;s talk
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}








// import { useCallback, useEffect, useRef, useState } from 'react';
// import { cn } from '@/lib/utils';
// import {
//   NAVBAR_HEIGHT_PX,
//   NAV_ITEMS,
//   PORTFOLIO_INITIALS,
//   PORTFOLIO_NAME,
//   SCROLL_BEHAVIOUR_SMOOTH_OPTIONS,
//   SECTION_IDS,
//   type SectionId,
// } from '@/constants/portfolio';
// import { useActiveSection } from '@/hooks/useActiveSection';
// import { useReducedMotion } from '@/hooks/useReducedMotion';
// import { Menu, X } from 'lucide-react';

// function scrollToSection(sectionId: SectionId, reducedMotion: boolean) {
//   const el = document.getElementById(sectionId);
//   if (!el) return;
//   const options: ScrollToOptions = {
//     top:
//       window.scrollY +
//       el.getBoundingClientRect().top -
//       (NAVBAR_HEIGHT_PX + 12),
//     behavior: reducedMotion ? 'auto' : SCROLL_BEHAVIOUR_SMOOTH_OPTIONS.behavior,
//   };
//   window.scrollTo(options);
// }

// export function Navbar() {
//   const active = useActiveSection(
//     NAV_ITEMS.map((n) => n.id),
//     SECTION_IDS.HERO
//   );
//   const reducedMotion = useReducedMotion();

//   const [scrollDepth, setScrollDepth] = useState<number>(0);
//   const [menuOpen, setMenuOpen] = useState<boolean>(false);
//   const navListRef = useRef<HTMLUListElement>(null);
//   const activeIndicatorRef = useRef<HTMLSpanElement>(null);
//   const prevActiveRef = useRef<SectionId>(SECTION_IDS.HERO);

//   useEffect(() => {
//     let raf = 0;
//     let pending = false;
//     const onScroll = () => {
//       if (pending) return;
//       pending = true;
//       raf = requestAnimationFrame(() => {
//         pending = false;
//         const maxDepth = 320;
//         const depth = Math.min(1, window.scrollY / maxDepth);
//         setScrollDepth(depth);
//       });
//     };
//     onScroll();
//     window.addEventListener('scroll', onScroll, { passive: true });
//     return () => {
//       cancelAnimationFrame(raf);
//       window.removeEventListener('scroll', onScroll);
//     };
//   }, []);

//   useEffect(() => {
//     const list = navListRef.current;
//     const indicator = activeIndicatorRef.current;
//     if (!list || !indicator) return;
//     const items = Array.from(list.querySelectorAll<HTMLLIElement>('[data-nav-item]'));
//     const target = items.find(
//       (el) => el.dataset.navItem === active
//     );
//     if (!target) return;
//     const listRect = list.getBoundingClientRect();
//     const targetRect = target.getBoundingClientRect();
//     const x = targetRect.left - listRect.left;
//     indicator.style.setProperty('transform', `translateX(${x}px)`);
//     indicator.style.setProperty('width', `${targetRect.width}px`);
//     indicator.style.setProperty(
//       'transition',
//       prevActiveRef.current === active || reducedMotion
//         ? 'none'
//         : 'transform 520ms cubic-bezier(0.2, 0.8, 0.2, 1), width 520ms cubic-bezier(0.2, 0.8, 0.2, 1)'
//     );
//     prevActiveRef.current = active;
//   }, [active, reducedMotion, menuOpen]);

//   const handleNavClick = useCallback(
//     (e: React.MouseEvent, sectionId: SectionId) => {
//       e.preventDefault();
//       setMenuOpen(false);
//       scrollToSection(sectionId, reducedMotion);
//     },
//     [reducedMotion]
//   );

//   const headerBlur = 6 + scrollDepth * 14;
//   const headerAlpha = 0.02 + scrollDepth * 0.14;
//   const headerBorderAlpha = 0.04 + scrollDepth * 0.09;
//   const initialsGlow = scrollDepth > 0.2;

//   return (
//     <header
//       className="fixed inset-x-0 top-0 z-50"
//       style={{ height: `${NAVBAR_HEIGHT_PX}px` }}
//     >
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-x-0 top-0 h-full"
//         style={{
//           backdropFilter: `blur(${headerBlur}px)`,
//           WebkitBackdropFilter: `blur(${headerBlur}px)`,
//           backgroundColor: `rgba(8, 10, 26, ${headerAlpha})`,
//           borderBottom: `1px solid rgba(255,255,255,${headerBorderAlpha})`,
//           transition:
//             'backdrop-filter 320ms ease-out, background-color 320ms ease-out, border-color 320ms ease-out',
//         }}
//       />

//       <nav className="relative mx-auto flex h-full w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
//         <a
//           href={`#${SECTION_IDS.HERO}`}
//           onClick={(e) => handleNavClick(e, SECTION_IDS.HERO)}
//           className="group flex items-center gap-3 select-none"
//           aria-label={`${PORTFOLIO_NAME} — Go to top`}
//         >
//           <span
//             className={cn(
//               'relative flex h-9 w-9 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.05] text-[11px] font-semibold tracking-wider text-slate-50 transition-transform duration-500 ease-out group-hover:scale-105',
//               initialsGlow &&
//                 'shadow-[0_0_0_1px_rgba(56,189,248,0.15),0_12px_30px_-10px_rgba(56,189,248,0.35)]'
//             )}
//           >
//             <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/20 via-violet-400/10 to-fuchsia-400/20 opacity-90" />
//             <span className="relative">{PORTFOLIO_INITIALS}</span>
//           </span>
//           <div className="hidden flex-col leading-tight sm:flex">
//             <span className="text-sm font-semibold tracking-wide text-slate-100">
//               {PORTFOLIO_NAME}
//             </span>
//             <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-cyan-300/70">
//               MERN · Developer
//             </span>
//           </div>
//         </a>

//         <ul
//           ref={navListRef}
//           className="relative hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-1.5 py-1.5 md:flex"
//         >
//           <span
//             ref={activeIndicatorRef}
//             aria-hidden="true"
//             className="pointer-events-none absolute top-1.5 left-0 h-[calc(100%-12px)] rounded-full bg-gradient-to-r from-cyan-400/10 via-violet-400/10 to-fuchsia-400/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
//           />
//           {NAV_ITEMS.map((item) => {
//             const isActive = active === item.id;
//             return (
//               <li key={item.id} data-nav-item={item.id} className="relative">
//                 <a
//                   href={`#${item.id}`}
//                   onClick={(e) => handleNavClick(e, item.id)}
//                   aria-current={isActive ? 'page' : undefined}
//                   className={cn(
//                     'relative z-10 block rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-colors duration-300',
//                     isActive
//                       ? 'text-slate-50'
//                       : 'text-slate-300/85 hover:text-slate-100'
//                   )}
//                 >
//                   {item.label}
//                 </a>
//               </li>
//             );
//           })}
//         </ul>

//         <a
//           href={`#${SECTION_IDS.CONTACT}`}
//           onClick={(e) => handleNavClick(e, SECTION_IDS.CONTACT)}
//           className={cn(
//             'hidden md:inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300 ease-out',
//             'border-cyan-400/25 bg-cyan-400/[0.06] text-cyan-100',
//             'hover:border-cyan-400/40 hover:bg-cyan-400/[0.12] hover:text-cyan-50 hover:shadow-[0_0_0_1px_rgba(56,189,248,0.15),0_12px_30px_-16px_rgba(56,189,248,0.55)]'
//           )}
//         >
//           Let&apos;s talk
//         </a>

//         <button
//           type="button"
//           onClick={() => setMenuOpen((v) => !v)}
//           aria-expanded={menuOpen}
//           aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
//           className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-slate-200 transition-colors hover:bg-white/[0.09] md:hidden"
//         >
//           {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
//         </button>
//       </nav>

//       <div
//         className={cn(
//           'overflow-hidden px-4 transition-[max-height,opacity] duration-500 md:hidden',
//           menuOpen ? 'max-h-[560px] opacity-100' : 'pointer-events-none max-h-0 opacity-0'
//         )}
//       >
//         <div className="mx-auto mt-1 w-full max-w-6xl">
//           <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-2 backdrop-blur-xl">
//             <ul className="flex flex-col">
//               {NAV_ITEMS.map((item) => {
//                 const isActive = active === item.id;
//                 return (
//                   <li key={item.id}>
//                     <a
//                       href={`#${item.id}`}
//                       onClick={(e) => handleNavClick(e, item.id)}
//                       className={cn(
//                         'flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition-colors',
//                         isActive
//                           ? 'bg-cyan-400/5 text-slate-50 shadow-[inset_0_0_0_1px_rgba(56,189,248,0.15)]'
//                           : 'text-slate-200/90 hover:bg-white/[0.04] hover:text-slate-50'
//                       )}
//                     >
//                       <span>{item.label}</span>
//                       <span
//                         aria-hidden="true"
//                         className={cn(
//                           'h-1.5 w-1.5 rounded-full',
//                           isActive ? 'bg-cyan-300' : 'bg-slate-600'
//                         )}
//                       />
//                     </a>
//                   </li>
//                 );
//               })}
//               <li className="p-2">
//                 <a
//                   href={`#${SECTION_IDS.CONTACT}`}
//                   onClick={(e) => handleNavClick(e, SECTION_IDS.CONTACT)}
//                   className="flex items-center justify-center rounded-2xl border border-cyan-400/25 bg-cyan-400/[0.07] px-4 py-3 text-sm font-semibold text-cyan-100"
//                 >
//                   Let&apos;s talk
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }










// import React, { useState, useEffect } from "react";
// import { MessageSquare } from "lucide-react";

// const navLinks = [
//   { name: "Home", href: "#hero" },
//   { name: "About", href: "#about" },
//   { name: "Skills", href: "#skills" },
//   { name: "Experience", href: "#experience" },
//   { name: "Projects", href: "#projects" },
//   { name: "Certifications", href: "#certifications" },
//   { name: "Contact", href: "#contact" },
// ];

// export default function Navbar() {
//   const [activeSection, setActiveSection] = useState("Home");
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300">
//       <div className="max-w-6xl mx-auto flex items-center justify-between">
        
//         {/* Brand / Name Block */}
//         <a href="#hero" className="flex items-center gap-3 group">
//           <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-xs text-cyan-400 shadow-md group-hover:border-cyan-500/50 transition-colors">
//             KL
//           </div>
//           <div className="text-left">
//             <div className="text-sm font-bold text-white tracking-tight leading-none group-hover:text-cyan-300 transition-colors">
//               Komala L
//             </div>
//             <div className="text-[10px] font-mono text-cyan-400/80 tracking-wider mt-1">
//               MERN • DEVELOPER
//             </div>
//           </div>
//         </a>

//         {/* Center Pill Nav Bar */}
//         <nav className="hidden md:flex items-center gap-1 px-4 py-1.5 rounded-full bg-slate-950/80 border border-slate-800/80 backdrop-blur-xl shadow-xl">
//           {navLinks.map((link) => {
//             const isActive = activeSection === link.name;
//             return (
//               <a
//                 key={link.name}
//                 href={link.href}
//                 onClick={() => setActiveSection(link.name)}
//                 className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
//                   isActive
//                     ? "bg-slate-800 text-cyan-300 shadow-sm border border-slate-700"
//                     : "text-slate-400 hover:text-white"
//                 }`}
//               >
//                 {link.name}
//               </a>
//             );
//           })}
//         </nav>

//         {/* Action Button */}
//         <a
//           href="#contact"
//           className="px-4 py-2 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center gap-2 backdrop-blur-md transition-all hover:scale-105 active:scale-95"
//         >
//           <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
//           <span>Let's talk</span>
//         </a>

//       </div>
//     </header>
//   );
// }