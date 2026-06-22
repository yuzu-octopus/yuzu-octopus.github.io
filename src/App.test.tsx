import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the sidebar navigation', () => {
    render(<App />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Configs')).toBeInTheDocument();
    expect(screen.getByText('Workspace')).toBeInTheDocument();
  });

  it('renders lazy-loaded hero section', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText("Hi, I'm yuzu")).toBeInTheDocument();
    });
  });

  it('renders lazy-loaded section headings', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('About Me')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Projects' })).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Workspace' })).toBeInTheDocument();
    });
  });
});
