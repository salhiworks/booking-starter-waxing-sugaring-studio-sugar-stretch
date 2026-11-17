import type { DemoConfig } from './engine';
import { sitePreset } from '../lib/preset';

/**
 * The public Live Demo's sample studio (`npm run dev:demo` / `npm run build:demo`).
 * Only demo builds read this file. Customizing the real website? Leave src/demo/ alone.
 */
export const demoConfig: DemoConfig = {
  id: 'waxing-sugaring-studio-sugar-stretch',
  preset: sitePreset,
  business: {
    name: 'Plain Sugar Studio',
    timezone: 'America/Chicago',
    email: 'hello@plainsugar.example',
    phone: '+1 512-555-0147',
    address: '1108 E 6th St, Suite 3, Austin, TX 78702',
  },
  ownerEmail: 'owner@plainsugar.example',
  referencePrefix: 'PS',
  sampleNotes: [
    'First Brazilian — a little nervous, happy to go slowly.',
    'Could we keep the brows a bit fuller at the tails?',
    'Last waxed about five weeks ago, so it should be long enough.',
  ],
  // The site caches published content under this key (createSiteContentStore's default).
  resetKeys: ['pbe-site-content'],
  customers: [
    { name: 'Lucía Herrera', email: 'lucia.herrera@example.com', phone: '+1 512 555 0112' },
    { name: 'Jordan Ellis', email: 'jordan.ellis@example.com', phone: '+1 512 555 0126' },
    { name: 'Priya Raman', email: 'priya.raman@example.com', phone: '+1 512 555 0133' },
    { name: 'Danielle Brooks', email: 'danielle.brooks@example.com', phone: '+1 512 555 0148' },
    { name: 'Mara Lindqvist', email: 'mara.lindqvist@example.com', phone: '+1 512 555 0150' },
    { name: 'Tanya Osei', email: 'tanya.osei@example.com', phone: '+1 512 555 0161' },
    { name: 'Camila Reyes', email: 'camila.reyes@example.com', phone: '+1 512 555 0174' },
    { name: 'Hannah Kim', email: 'hannah.kim@example.com', phone: '+1 512 555 0187' },
    { name: 'Sofia Marchetti', email: 'sofia.marchetti@example.com', phone: '+1 512 555 0195' },
    { name: 'Alex Moreau', email: 'alex.moreau@example.com', phone: '+1 512 555 0109' },
  ],
};
