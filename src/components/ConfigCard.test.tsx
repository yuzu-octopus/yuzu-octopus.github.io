import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConfigCard } from './ConfigCard';
import type { Config } from '../data/configs';

const withShot: Config = {
  id: 'test',
  name: 'Test',
  description: 'desc',
  screenshot: '/screenshots/test.png',
  screenshotWidth: 100,
  screenshotHeight: 100,
  sourceUrl: 'https://example.com/full',
  rawUrl: 'https://example.com/raw',
  language: 'json',
};

const noShot: Config = { ...withShot, id: 'noscreen', screenshot: undefined };

describe('ConfigPreview', () => {
  it('shows a loading well before the image loads', () => {
    render(<ConfigCard config={withShot} />);
    expect(screen.getByText('Loading preview…')).toBeInTheDocument();
  });

  it('swaps the well for the image on load', () => {
    render(<ConfigCard config={withShot} />);
    fireEvent.load(screen.getByAltText('Test screenshot'));
    expect(screen.queryByText('Loading preview…')).not.toBeInTheDocument();
    expect(screen.getByAltText('Test screenshot')).toBeVisible();
  });

  it('shows a message instead of a blank well on error', () => {
    render(<ConfigCard config={withShot} />);
    fireEvent.error(screen.getByAltText('Test screenshot'));
    expect(screen.getByText('Preview unavailable')).toBeInTheDocument();
  });

  it('shows a placeholder well when no screenshot exists', () => {
    render(<ConfigCard config={noShot} />);
    expect(screen.getByText('No preview available')).toBeInTheDocument();
  });
});
