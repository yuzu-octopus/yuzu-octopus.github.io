import { useEffect, useRef, useState } from 'react';

// Measures how many grid columns actually resolved, so last-row spans can
// target only the layouts that would otherwise strand a single card.
// Seeds from viewport width to avoid a first-paint span flash, then the
// ResizeObserver corrects exactly. jsdom has neither observer nor layout:
// stays single-column, which never spans.
export function useColumnCount() {
  const ref = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(() =>
    typeof window === 'undefined'
      ? 1
      : window.innerWidth >= 1400
        ? 3
        : window.innerWidth >= 700
          ? 2
          : 1,
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const measure = () => {
      const kids = Array.from(el.children) as HTMLElement[];
      if (kids.length === 0) return;
      const top = kids[0].offsetTop;
      setColumns(kids.filter((k) => k.offsetTop === top).length || 1);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return { ref, columns };
}
