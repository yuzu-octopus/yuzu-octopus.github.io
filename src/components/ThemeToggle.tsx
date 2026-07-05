import { useTheme } from '../hooks/useTheme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="theme-toggle"
    >
      <span
        className="material-symbols-outlined"
        style={{ display: theme === 'dark' ? 'block' : 'none' }}
        aria-hidden="true"
      >
        dark_mode
      </span>
      <span
        className="material-symbols-outlined"
        style={{ display: theme === 'light' ? 'block' : 'none' }}
        aria-hidden="true"
      >
        light_mode
      </span>
    </button>
  );
}
