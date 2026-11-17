import { Strand } from './Strand';

/** A section's small label: a short strand, then "The menu" (or "01 The menu"). */
export function SectionLabel({ n, children, tone }: { n?: string; children: string; tone?: 'dark' | 'accent' }) {
  return (
    <p className={`label${tone ? ` label--${tone}` : ''}`}>
      <Strand className="label__strand" />
      {n && <span className="label__n">{n}</span>}
      <span>{children}</span>
    </p>
  );
}
