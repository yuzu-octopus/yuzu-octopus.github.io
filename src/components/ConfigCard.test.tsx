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
  it('renders the gated image with measured dimensions', () => {
    render(<ConfigCard config={withShot} />);
    const img = screen.getByAltText('Test screenshot');
    expect(img).toHaveAttribute('src', '/screenshots/test.png');
    expect(img).toHaveAttribute('width', '100');
    expect(img).toHaveAttribute('height', '100');
  });

  it('keeps the image after load', () => {
    render(<ConfigCard config={withShot} />);
    fireEvent.load(screen.getByAltText('Test screenshot'));
    expect(screen.getByAltText('Test screenshot')).toBeInTheDocument();
  });

  it('unmounts the preview on error instead of leaving a blank well', () => {
    render(<ConfigCard config={withShot} />);
    fireEvent.error(screen.getByAltText('Test screenshot'));
    expect(screen.queryByAltText('Test screenshot')).not.toBeInTheDocument();
  });

  it('renders no preview element at all when no screenshot exists', () => {
    const { container } = render(<ConfigCard config={noShot} />);
    expect(container.querySelector('img.shot')).toBeNull();
  });
});
