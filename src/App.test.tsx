import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the sidebar navigation', () => {
    render(<App />);
    const nav = screen.getByRole('navigation');
    for (const label of ['Home', 'About', 'Projects', 'Configs', 'Workspace']) {
      expect(within(nav).getByText(label)).toBeInTheDocument();
    }
  });

  it('renders the hero section', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: "Hi, I'm yuzu" })).toBeInTheDocument();
  });

  it('renders each lazy section heading once its chunk loads', async () => {
    render(<App />);
    expect(await screen.findByText('About Me')).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: 'Projects' })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: 'Configs' })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: 'Workspace' })).toBeInTheDocument();
  });
});
