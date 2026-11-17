/**
 * The strand — the one ornament: sugar paste pulled between two fingers, two rounded ends joined by
 * a thin, sagging waist. Drawn in currentColor; decorative only. In a section label it is small; between
 * the two methods it is large and, where motion is allowed, stretches once as it comes into view.
 */
export function Strand({ className }: { className?: string }) {
  return (
    <svg className={`strand${className ? ` ${className}` : ''}`} viewBox="0 0 120 24" aria-hidden="true" focusable="false" preserveAspectRatio="none">
      <path d="M12 2C40 2 50 10.6 60 10.6S80 2 108 2a10 10 0 0 1 0 20c-28 0-38-8.6-48-8.6S40 22 12 22A10 10 0 0 1 12 2Z" />
    </svg>
  );
}
