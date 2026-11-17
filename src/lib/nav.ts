/** The page's sections, in order — the header, the phone menu and the footer all list these. */
export const NAV: readonly { href: string; label: string; header?: false }[] = [
  { href: '#menu', label: 'Menu' },
  { href: '#wax-or-sugar', label: 'Wax or sugar' },
  { href: '#first-visit', label: 'First visit' },
  { href: '#questions', label: 'Questions', header: false },
  { href: '#visit', label: 'Visit' },
];
