import { IconButton } from '@mui/material';
import { Icon } from './Icon';
import { useTheme } from '../hooks/useTheme';

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
      {theme === 'dark' ? <Icon name="light_mode" /> : <Icon name="dark_mode" />}
    </IconButton>
  );
}
