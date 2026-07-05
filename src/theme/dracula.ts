import { createTheme } from '@mui/material/styles';

export const draculaColors = {
  background: '#282a36',
  currentLine: '#44475a',
  foreground: '#f8f8f2',
  comment: '#8ca0d7',
  cyan: '#8be9fd',
  green: '#50fa7b',
  orange: '#ffb86c',
  pink: '#ff79c6',
  purple: '#bd93f9',
  red: '#ff5555',
  yellow: '#f1fa8c',
};

export const draculaTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: 'var(--bg)',
      paper: 'var(--panel)',
    },
    primary: {
      main: 'var(--purple)',
    },
    secondary: {
      main: 'var(--pink)',
    },
    text: {
      primary: 'var(--fg)',
      secondary: 'var(--muted)',
    },
  },
  typography: {
    fontFamily: "'JetBrainsMono Nerd Font', monospace",
    h1: {
      fontFamily: "'JetBrainsMono Nerd Font', monospace",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "'JetBrainsMono Nerd Font', monospace",
      fontWeight: 700,
    },
    h3: {
      fontFamily: "'JetBrainsMono Nerd Font', monospace",
      fontWeight: 700,
    },
    body1: {
      fontFamily: "'JetBrainsMono Nerd Font', monospace",
    },
    body2: {
      fontFamily: "'JetBrainsMono Nerd Font', monospace",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: 'var(--bg)',
          color: 'var(--fg)',
        },
        '::-webkit-scrollbar': {
          width: '8px',
        },
        '::-webkit-scrollbar-track': {
          background: 'var(--bg)',
        },
        '::-webkit-scrollbar-thumb': {
          background: 'var(--panel)',
          borderRadius: '4px',
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: 'var(--muted)',
        },
      },
    },
  },
});
