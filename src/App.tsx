import { ThemeProvider, CssBaseline } from '@mui/material';
import { draculaTheme } from './theme/dracula';
import { Sidebar, drawerWidth } from './components/Sidebar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ConfigsGallery } from './components/ConfigsGallery';
import { Workspace } from './components/Workspace';
import './styles/global.css';

function App() {
  return (
    <ThemeProvider theme={draculaTheme}>
      <CssBaseline />
      <Sidebar />
      <main style={{ marginLeft: drawerWidth }}>
        <Hero />
        <About />
        <ConfigsGallery />
        <Workspace />
      </main>
    </ThemeProvider>
  );
}

export default App;
