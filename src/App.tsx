import { lazy, Suspense, useEffect } from 'react';
import { AppShell } from '@astryxdesign/core/AppShell';
import { Spinner } from '@astryxdesign/core/Spinner';
import { Sidebar } from './components/Sidebar';
import { Hero } from './components/Hero';

const About = lazy(() => import('./components/About').then((m) => ({ default: m.About })));
const Projects = lazy(() => import('./components/Projects').then((m) => ({ default: m.Projects })));
const ConfigsGallery = lazy(() =>
  import('./components/ConfigsGallery').then((m) => ({ default: m.ConfigsGallery })),
);
const Workspace = lazy(() => import('./components/Workspace').then((m) => ({ default: m.Workspace })));
const Footer = lazy(() => import('./components/Footer').then((m) => ({ default: m.Footer })));

// Deep links (/_#configs on fresh load) target sections inside lazy chunks
// that do not exist when the browser attempts its initial jump. Poll briefly
// for the target, then scroll once it mounts.
function useHashRestore() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    let attempts = 0;
    const timer = setInterval(() => {
      attempts += 1;
      const target = document.getElementById(hash);
      if (target || attempts > 10) {
        clearInterval(timer);
        target?.scrollIntoView();
      }
    }, 200);
    return () => clearInterval(timer);
  }, []);
}

function App() {
  useHashRestore();
  return (
    <AppShell sideNav={<Sidebar />} height="auto" contentPadding={0}>
      <Hero />
      <Suspense fallback={<Spinner label="Loading sections" />}>
        <About />
        <Projects />
        <ConfigsGallery />
        <Workspace />
        <Footer />
      </Suspense>
    </AppShell>
  );
}

export default App;
