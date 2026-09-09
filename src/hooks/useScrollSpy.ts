import { useState, useEffect } from 'react';

export function useScrollSpy(ids: string[], offset = 120) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    let observer: MutationObserver | null = null;
    let scrollHandler: (() => void) | null = null;

    function onScroll() {
      // Past the end: the last section owns the remainder even if it never
      // crosses the offset (short closing sections).
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 2) {
        setActive(ids[ids.length - 1]);
        return;
      }
      // Viewport-relative: immune to positioned ancestors (AppShell wrappers).
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) {
          current = id;
        }
      }
      setActive(current);
    }

    function setupScrollSpy() {
      const sections = ids
        .map((id) => document.getElementById(id))
        .filter(Boolean) as HTMLElement[];

      if (sections.length === 0) return false;

      scrollHandler = onScroll;
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      onScroll();
      return true;
    }

    // Try to setup immediately
    if (!setupScrollSpy()) {
      // If sections not found, watch for DOM changes
      observer = new MutationObserver(() => {
        if (setupScrollSpy() && observer) {
          observer.disconnect();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      if (observer) observer.disconnect();
      if (scrollHandler) {
        window.removeEventListener('scroll', scrollHandler);
        window.removeEventListener('resize', scrollHandler);
      }
    };
  }, [ids, offset]);

  return active;
}
