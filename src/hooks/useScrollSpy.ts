import { useState, useEffect } from 'react';

export function useScrollSpy(ids: string[], offset = 120) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    function onScroll() {
      // Past the end: the last section owns the remainder even if it never
      // crosses the offset (short closing sections).
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 2) {
        setActive(ids[ids.length - 1]);
        return;
      }
      // Viewport-relative: immune to positioned ancestors (AppShell wrappers).
      // Late-mounting lazy sections resolve live on every scroll event.
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) {
          current = id;
        }
      }
      setActive(current);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids, offset]);

  return active;
}
