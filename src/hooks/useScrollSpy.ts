import { useState, useEffect } from 'react';

export function useScrollSpy(ids: string[], offset = 120) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

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

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, [ids, offset]);

  return active;
}
