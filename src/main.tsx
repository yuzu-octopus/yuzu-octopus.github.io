import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@astryxdesign/core/reset.css';
import '@astryxdesign/core/astryx.css';
import 'astryx-dracula/tokens.css';
import 'astryx-dracula/theme.css';
import { Theme } from '@astryxdesign/core/theme';
import { astryxDraculaTheme } from 'astryx-dracula';
import App from './App.tsx'
import './styles/global.css';

document.documentElement.classList.add('js');

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found — check index.html for <div id="root">');
}

createRoot(rootElement).render(
  <StrictMode>
    <Theme theme={astryxDraculaTheme} mode="dark">
      <App />
    </Theme>
  </StrictMode>,
)
