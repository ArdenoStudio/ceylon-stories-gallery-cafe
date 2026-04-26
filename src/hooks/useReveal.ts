import { useEffect, useRef } from 'react';

export function useReveal(margin = '-10%') {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('in-view');
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in-view');
          io.disconnect();
        }
      },
      { rootMargin: margin },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [margin]);

  return ref;
}
