import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Anybody (variable width 50–150 %, weight 100–900, with italics): every heading and the name mark —
// set wide, with the emphasised words narrow and slanted (the stretch). DM Sans (optical size): text.
import '@fontsource-variable/anybody/wdth.css';
import '@fontsource-variable/anybody/wdth-italic.css';
import '@fontsource-variable/dm-sans/opsz.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/site.css';
import './styles/booking.css';
import { App } from './App';
import { engine } from './lib/engine';
import type { DemoEngine } from './demo/engine';

if (__BOOKING_DEMO__) void import('./demo/engine/DemoBar').then((m) => m.mountDemoBar(engine as DemoEngine, 'site'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
