import { lazy, Suspense } from 'react';
import { ThemeProvider, CssBaseline, useMediaQuery } from '@mui/material';
import { draculaTheme } from './theme/dracula';
import { Sidebar, drawerWidth } from './components/Sidebar';
import './styles/global.css';

const Hero = lazy(() => import('./components/Hero').then((m) => ({ default: m.Hero })));
const About = lazy(() => import('./components/About').then((m) => ({ default: m.About })));
const ConfigsGallery = lazy(() => import('./components/ConfigsGallery').then((m) => ({ default: m.ConfigsGallery })));
const Workspace = lazy(() => import('./components/Workspace').then((m) => ({ default: m.Workspace })));

function App() {
  const isDesktop = useMediaQuery('(min-width:900px)');

  return (
    <ThemeProvider theme={draculaTheme}>
      <CssBaseline />
      <Sidebar />
      <main style={{ marginLeft: isDesktop ? drawerWidth : 0 }}>
        <Suspense fallback={null}>
          <Hero />
          <About />
          <ConfigsGallery />
          <Workspace />
        </Suspense>
      </main>
    </ThemeProvider>
  );
}

export default App;
