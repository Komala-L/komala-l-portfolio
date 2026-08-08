import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import { AuroraBackground } from '@/background/AuroraBackground';

const LazyDebugPanel = import.meta.env.DEV
  ? lazy(async () => {
      const m = await import('@/components/DebugPanel');
      return { default: m.DebugPanel };
    })
  : null;

export default function App() {
  return (
    <>
      <AuroraBackground />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/other"
            element={
              <main className="relative z-10 min-h-screen flex items-center justify-center p-6">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-8 py-6 backdrop-blur-md text-slate-100">
                  Other Page — Coming Soon
                </div>
              </main>
            }
          />
        </Routes>
      </Router>
      {import.meta.env.DEV && LazyDebugPanel ? (
        <Suspense fallback={null}>
          <LazyDebugPanel />
        </Suspense>
      ) : null}
    </>
  );
}
