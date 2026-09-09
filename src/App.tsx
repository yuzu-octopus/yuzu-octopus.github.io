import { lazy, Suspense } from 'react';
import { AppShell } from '@astryxdesign/core/AppShell';
import { Sidebar } from './components/Sidebar';
import { Hero } from './components/Hero';

const About = lazy(() => import('./components/About').then((m) => ({ default: m.About })));
const Projects = lazy(() => import('./components/Projects').then((m) => ({ default: m.Projects })));
const ConfigsGallery = lazy(() =>
  import('./components/ConfigsGallery').then((m) => ({ default: m.ConfigsGallery })),
);
const Workspace = lazy(() => import('./components/Workspace').then((m) => ({ default: m.Workspace })));

function App() {
  return (
    <AppShell sideNav={<Sidebar />} height="auto" contentPadding={0}>
      <Hero />
      <Suspense fallback={null}>
        <About />
        <Projects />
        <ConfigsGallery />
        <Workspace />
      </Suspense>
    </AppShell>
  );
}

export default App;
