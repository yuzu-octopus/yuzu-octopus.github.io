import { IconButton } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTheme } from '../contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <IconButton
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      sx={{
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: 1200,
        backgroundColor: 'var(--panel)',
        border: '1px solid var(--muted)',
        '&:hover': {
          backgroundColor: 'var(--purple)',
        },
      }}
    >
      {theme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
}
