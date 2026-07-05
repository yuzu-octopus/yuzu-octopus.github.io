import { lazy, Suspense } from 'react';
import { ThemeProvider, CssBaseline, useMediaQuery } from '@mui/material';
import { draculaTheme } from './theme/dracula';
import { ThemeProvider as AppThemeProvider } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import { Sidebar, drawerWidth } from './components/Sidebar';
import './styles/global.css';

const Hero = lazy(() => import('./components/Hero').then((m) => ({ default: m.Hero })));
const About = lazy(() => import('./components/About').then((m) => ({ default: m.About })));
const ConfigsGallery = lazy(() => import('./components/ConfigsGallery').then((m) => ({ default: m.ConfigsGallery })));
const Workspace = lazy(() => import('./components/Workspace').then((m) => ({ default: m.Workspace })));
const Projects = lazy(() => import('./components/Projects').then((m) => ({ default: m.Projects })));

function App() {
  const isDesktop = useMediaQuery('(min-width:900px)');

  return (
    <AppThemeProvider>
      <ThemeProvider theme={draculaTheme}>
        <CssBaseline />
        <ThemeToggle />
        <Sidebar />
      <main style={{ marginLeft: isDesktop ? drawerWidth : 0 }}>
        <Suspense fallback={null}>
          <Hero />
          <About />
          <Projects />
          <ConfigsGallery />
          <Workspace />
        </Suspense>
      </main>
      </ThemeProvider>
    </AppThemeProvider>
  );
}

export default App;
