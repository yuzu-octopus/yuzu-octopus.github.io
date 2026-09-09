import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
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

type IoCallback = (entries: { isIntersecting: boolean }[]) => void;

function mockIntersectionObserver() {
  let callback: IoCallback | null = null;
  const observe = vi.fn();
  const disconnect = vi.fn();
  window.IntersectionObserver = class {
    constructor(cb: IoCallback) {
      callback = cb;
    }
    observe = observe;
    disconnect = disconnect;
    unobserve() {}
  } as unknown as typeof IntersectionObserver;
  return {
    fireIntersecting() {
      act(() => {
        callback?.([{ isIntersecting: true }]);
      });
    },
  };
}

function deleteIntersectionObserver() {
  // @ts-expect-error jsdom has no native IntersectionObserver
  delete window.IntersectionObserver;
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
  deleteIntersectionObserver();
});

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

  it('gates the image behind intersection and mounts on entry', () => {
    const io = mockIntersectionObserver();
    render(<ConfigCard config={withShot} />);
    expect(screen.queryByAltText('Test screenshot')).not.toBeInTheDocument();
    io.fireIntersecting();
    expect(screen.getByAltText('Test screenshot')).toBeInTheDocument();
  });

  it('unmounts a still-loading preview after the timeout', () => {
    const io = mockIntersectionObserver();
    vi.useFakeTimers();
    render(<ConfigCard config={withShot} />);
    // Intersect so the image mounts but never loads.
    io.fireIntersecting();
    expect(screen.getByAltText('Test screenshot')).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(15000);
    });
    expect(screen.queryByAltText('Test screenshot')).not.toBeInTheDocument();
  });
});

describe('ConfigCard source expand', () => {
  const fetchMock = (text: string) =>
    vi.fn().mockResolvedValue({ ok: true, text: async () => text });

  // CodeBlock tokenizes source into spans (plus gutter text), so match the
  // code element by inclusion.
  const byCodeText = (text: string) => (_: string, el: Element | null) =>
    el?.tagName === 'CODE' && (el.textContent ?? '').includes(text);

  it('fetches and shows source on expand', async () => {
    vi.stubGlobal('fetch', fetchMock('key = 1'));
    render(<ConfigCard config={withShot} />);
    fireEvent.click(screen.getByRole('button', { name: 'Preview code' }));
    expect(await screen.findByText(byCodeText('key = 1'), undefined, { timeout: 5000 })).toBeInTheDocument();
  });

  it('shows the error banner and retries on failure', async () => {
    const fetch = vi
      .fn()
      .mockRejectedValueOnce(new Error('down'))
      .mockResolvedValueOnce({ ok: true, text: async () => 'key = 1' });
    vi.stubGlobal('fetch', fetch);
    render(<ConfigCard config={withShot} />);
    fireEvent.click(screen.getByRole('button', { name: 'Preview code' }));
    expect(await screen.findByText('Source failed to load')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /retry/i }));
    expect(await screen.findByText(byCodeText('key = 1'), undefined, { timeout: 5000 })).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(2);
  });
});
