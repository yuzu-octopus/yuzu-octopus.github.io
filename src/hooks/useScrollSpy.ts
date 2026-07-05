import { useState, useEffect } from 'react';

export function useScrollSpy(ids: string[], offset = 120) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    let observer: MutationObserver | null = null;
    let scrollHandler: (() => void) | null = null;

    function setupScrollSpy() {
      const sections = ids
        .map((id) => document.getElementById(id))
        .filter(Boolean) as HTMLElement[];

      if (sections.length === 0) return false;

      function onScroll() {
        const scrollY = window.scrollY + offset;
        let current = sections[0];
        for (const section of sections) {
          if (section.offsetTop <= scrollY) {
            current = section;
          }
        }
        if (current) {
          setActive(current.id);
        }
      }

      scrollHandler = onScroll;
      window.addEventListener('scroll', onScroll, { passive: true });
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
      if (scrollHandler) window.removeEventListener('scroll', scrollHandler);
    };
  }, [ids, offset]);

  return active;
}
