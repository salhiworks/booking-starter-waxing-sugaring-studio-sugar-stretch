import { useEffect } from 'react';

/**
 * Photographs settle into place as they enter the screen: any element marked `data-reveal` gets
 * `is-in` once it is a little way into the viewport (site.css draws the reveal). Without JavaScript,
 * under `prefers-reduced-motion`, or where IntersectionObserver is missing, nothing is hidden:
 * the hidden starting state only exists while `html.js-reveal` is set.
 */
export function useReveal(): void {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = document.documentElement;
    root.classList.add('js-reveal');
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    const watch = (scope: ParentNode) => scope.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => io.observe(el));
    watch(document);
    // Sections that render once the engine answers (the menu) add their photographs later.
    const mo = new MutationObserver(() => watch(document));
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
      root.classList.remove('js-reveal');
    };
  }, []);
}
