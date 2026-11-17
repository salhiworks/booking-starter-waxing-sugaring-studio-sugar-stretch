import type { Preset } from '@profitstudio/booking-engine';

/**
 * Plain Sugar's own preset (INTEGRATION.md §5): the sample services, hours and policies preview
 * mode shows, and the starter set the dashboard offers an owner who has no services yet
 * (<BookingAdmin presets>). Prices are in US dollars, in cents.
 *
 * WHAT A BOOKING IS HERE. One booking = ONE appointment: a reserved block of the specialist's time
 * with ONE client, on the studio's one calendar (one specialist, one treatment bed), for ONE service.
 * Its length is the real time in the room. The specialist reviews and confirms every request
 * (`autoConfirm: false`). Two areas on one visit are two bookings, one after the other — the engine
 * has no linked bookings.
 *
 * WAX OR SUGAR. Every area comes two ways, as two services named "<Area> Wax" and "<Area> Sugaring".
 * The website pairs them by name (src/lib/services.ts) and shows both side by side; the engine sees
 * two ordinary services with their own length and price.
 *
 * WHAT A PRICE IS HERE. The engine has one price per service: the price of that appointment, paid at
 * the studio — never online. Zero reads as free.
 *
 * Cosmetic hair removal, nothing medical: a description never promises a result, and the booking form
 * never asks health questions (see CLAUDE.md). A description may end with "Good for: …" — who it
 * usually suits, in the client's own terms. The website shows it as its own line.
 */
export const sitePreset = {
  id: 'waxing-sugaring-studio',
  label: 'Waxing & Sugaring Studio',
  terminology: { customer: 'client', customers: 'clients', booking: 'appointment', bookings: 'appointments' },
  previewBusiness: {
    name: 'Sample Waxing & Sugaring Studio',
    currency: 'USD',
    locale: 'en-US',
    contact: {
      email: 'hello@example.com',
      phone: '+1 512-555-0100',
      address: '100 Example Street, Austin, TX',
    },
  },
  policies: {
    slotIntervalMinutes: 15,
    minNoticeMinutes: 240,
    maxAdvanceDays: 60,
    autoConfirm: false,
    requirePhone: true,
    pendingHoldMinutes: 1440,
    verificationWindowMinutes: 15,
  },
  // One specialist: Tuesday to Saturday, a later Thursday for after work; closed Sunday and Monday.
  workingHours: [
    { weekday: 2, start: '10:00', end: '19:00' },
    { weekday: 3, start: '10:00', end: '19:00' },
    { weekday: 4, start: '12:00', end: '20:00' },
    { weekday: 5, start: '10:00', end: '18:00' },
    { weekday: 6, start: '09:00', end: '15:00' },
  ],
  services: [
    {
      name: 'Brow Wax',
      description: 'Shaped along your natural line, then tidied with tweezers. With warm wax — tell us how full you like them. Good for: a clean shape between visits',
      durationMinutes: 20,
      bufferAfterMinutes: 10,
      priceCents: 2600,
      priceFrom: false,
    },
    {
      name: 'Brow Sugaring',
      description: 'Shaped along your natural line, then tidied with tweezers. With sugar paste. Good for: shorter brow hairs',
      durationMinutes: 25,
      bufferAfterMinutes: 10,
      priceCents: 3000,
      priceFrom: false,
    },
    {
      name: 'Lip & Chin Wax',
      description: 'Upper lip and chin, in one short appointment. With warm wax. Good for: a quick visit',
      durationMinutes: 15,
      bufferAfterMinutes: 10,
      priceCents: 2200,
      priceFrom: false,
    },
    {
      name: 'Lip & Chin Sugaring',
      description: 'Upper lip and chin, in one short appointment. With sugar paste. Good for: fine, short hair',
      durationMinutes: 20,
      bufferAfterMinutes: 10,
      priceCents: 2600,
      priceFrom: false,
    },
    {
      name: 'Underarm Wax',
      description: 'Both underarms, worked in small sections. With warm hard wax that lifts off without a strip. Good for: a lunch break',
      durationMinutes: 15,
      bufferAfterMinutes: 10,
      priceCents: 2200,
      priceFrom: false,
    },
    {
      name: 'Underarm Sugaring',
      description: 'Both underarms, worked in small sections. With sugar paste. Good for: hair that grows in several directions',
      durationMinutes: 20,
      bufferAfterMinutes: 10,
      priceCents: 2600,
      priceFrom: false,
    },
    {
      name: 'Half Leg Wax',
      description: 'Knee to ankle, or knee to the top of the thigh — you choose on the day. With warm wax. Good for: shorts season',
      durationMinutes: 30,
      bufferAfterMinutes: 10,
      priceCents: 4800,
      priceFrom: false,
    },
    {
      name: 'Half Leg Sugaring',
      description: 'Knee to ankle, or knee to the top of the thigh — you choose on the day. With sugar paste. Good for: a first time sugaring',
      durationMinutes: 40,
      bufferAfterMinutes: 10,
      priceCents: 5600,
      priceFrom: false,
    },
    {
      name: 'Full Leg Wax',
      description: 'Ankle to the top of the thigh, front and back, feet and toes included. With warm wax. Good for: a holiday coming up',
      durationMinutes: 50,
      bufferAfterMinutes: 10,
      priceCents: 7800,
      priceFrom: false,
    },
    {
      name: 'Full Leg Sugaring',
      description: 'Ankle to the top of the thigh, front and back, feet and toes included. With sugar paste. Good for: an unhurried hour',
      durationMinutes: 60,
      bufferAfterMinutes: 10,
      priceCents: 8800,
      priceFrom: false,
    },
    {
      name: 'Bikini Line Wax',
      description: 'Whatever would show outside a swimsuit, and nothing more. With warm hard wax. Good for: a first bikini appointment',
      durationMinutes: 20,
      bufferAfterMinutes: 10,
      priceCents: 3800,
      priceFrom: false,
    },
    {
      name: 'Bikini Line Sugaring',
      description: 'Whatever would show outside a swimsuit, and nothing more. With sugar paste. Good for: hair that is a little shorter',
      durationMinutes: 25,
      bufferAfterMinutes: 10,
      priceCents: 4400,
      priceFrom: false,
    },
    {
      name: 'Brazilian Wax',
      description: 'Front to back, with a strip, a triangle or nothing left — your call. With warm hard wax, in small sections. Good for: regulars every four to six weeks',
      durationMinutes: 40,
      bufferAfterMinutes: 10,
      priceCents: 6600,
      priceFrom: false,
    },
    {
      name: 'Brazilian Sugaring',
      description: 'Front to back, with a strip, a triangle or nothing left — your call. With sugar paste, in small sections. Good for: a first Brazilian, at a slower pace',
      durationMinutes: 45,
      bufferAfterMinutes: 10,
      priceCents: 7400,
      priceFrom: false,
    },
  ],
} satisfies Preset;
