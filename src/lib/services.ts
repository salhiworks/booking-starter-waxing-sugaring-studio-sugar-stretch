import { formatMoney } from '@profitstudio/booking-engine';
import type { Service } from '@profitstudio/booking-engine';

/**
 * The studio's menu: every AREA (brows, underarms, a Brazilian…) in its ZONE (Face · Arms & underarms ·
 * Legs · Bikini), and each area's two METHODS — wax and sugar — side by side.
 *
 * The engine (2.0.0-beta.3) has no service categories, no variants and no per-service metadata, and a
 * service's id is a database UUID this site cannot know when it is built — so everything is read from
 * the service's own engine data:
 *
 *   1. its METHOD, from its NAME ("Brazilian Wax" → wax, "Brazilian Sugaring" → sugar), else none;
 *   2. its AREA, the name without the method word ("Brazilian"). Two services with the same area and
 *      different methods become ONE menu row with two Book buttons — each passing its own engine id;
 *   3. its ZONE, from the area's name, else its description, else "Also by appointment";
 *   4. who it is GOOD FOR: the part after "Good for:" in the description;
 *   5. its LENGTH: the real time in the room; its PRICE: paid at the studio, never online; zero is free.
 *
 * A service that names no method (a "Patch test", "Ingrown hair care") is a row of its own with one
 * Book button. Stable categories and variants need an engine version — see
 * docs/ENGINE-PROPOSAL-waxing-sugaring.md in the Niche Pack workspace.
 */
export type ZoneId = 'face' | 'arms' | 'legs' | 'bikini' | 'more';
export type Method = 'wax' | 'sugar';

const SUGAR = /\bsugar(?:ing|ed)?\b(?:\s+paste)?/i;
const WAX = /\b(?:hard\s+|soft\s+|strip\s+)?wax(?:ing|ed)?\b/i;

const ZONES: { id: ZoneId; label: string; test: RegExp }[] = [
  { id: 'bikini', label: 'Bikini', test: /\b(bikini|brazilian|hollywood|intimate|butt|buttocks)\b/i },
  { id: 'face', label: 'Face', test: /\b(brows?|eyebrows?|lips?|chin|cheeks?|face|facial|nose|ears?|sideburns?|neck|jaw\w*)\b/i },
  { id: 'arms', label: 'Arms & underarms', test: /\b(underarms?|armpits?|arms?|forearms?|hands?|fingers?|shoulders?)\b/i },
  { id: 'legs', label: 'Legs', test: /\b(legs?|thighs?|knees?|calf|calves|feet|foot|toes?|shins?)\b/i },
];
const MORE = { id: 'more' as const, label: 'Also by appointment' };
const ORDER: ZoneId[] = ['face', 'arms', 'legs', 'bikini', 'more'];

const norm = (s: string | null | undefined) => (s ?? '').trim().replace(/\s+/g, ' ');

/** "Brazilian Sugaring" → sugar; "Underarm Wax" → wax; "Patch Test" → null. Sugar is checked first ("sugar wax" is sugar). */
export function methodOf(service: Pick<Service, 'name'>): Method | null {
  if (SUGAR.test(service.name)) return 'sugar';
  if (WAX.test(service.name)) return 'wax';
  return null;
}

/** The area a service is for: its name without the method word ("Brazilian Sugaring" → "Brazilian"). */
export function areaOf(name: string): string {
  const stripped = norm(name.replace(SUGAR, ' ').replace(WAX, ' ').replace(/\s*[—–\-·:|/(),]+\s*$/g, '').replace(/^\s*[—–\-·:|/(),]+\s*/g, ''));
  return stripped || norm(name);
}

export const METHOD_LABEL: Record<Method, string> = { wax: 'Wax', sugar: 'Sugar' };

function zoneFromText(text: string): ZoneId | null {
  for (const z of ZONES) if (z.test.test(text)) return z.id;
  return null;
}

export function zoneOf(service: Pick<Service, 'name' | 'description'>): ZoneId {
  return zoneFromText(areaOf(service.name)) ?? zoneFromText(lead(service.description)) ?? 'more';
}

/** One menu row: an area, with its wax and sugar services (either may be missing), or one service with no method. */
export interface Area {
  key: string;
  name: string;
  zone: ZoneId;
  wax: Service | null;
  sugar: Service | null;
  /** A service that names no method — the row's only Book button. */
  single: Service | null;
  /** The services in this row, in the owner's order. */
  services: Service[];
}

export interface Zone {
  id: ZoneId;
  label: string;
  areas: Area[];
}

/** Services as menu rows in their zones, keeping the owner's display order; empty zones are left out. */
export function zones(services: readonly Service[]): Zone[] {
  const rows = new Map<string, Area>();
  const order: Area[] = [];
  for (const service of services) {
    const method = methodOf(service);
    const name = areaOf(service.name);
    let key = method ? `area:${name.toLowerCase()}` : `single:${service.id}`;
    let row = rows.get(key);
    // A second service with the same area AND the same method starts a row of its own.
    if (row && method && row[method]) {
      key = `${key}:${service.id}`;
      row = undefined;
    }
    if (!row) {
      row = { key, name: method ? name : norm(service.name), zone: zoneOf(service), wax: null, sugar: null, single: null, services: [] };
      rows.set(key, row);
      order.push(row);
    }
    if (method) row[method] = service;
    else row.single = service;
    row.services.push(service);
  }
  const map = new Map<ZoneId, Zone>();
  for (const area of order) {
    let z = map.get(area.zone);
    if (!z) {
      const meta = ZONES.find((x) => x.id === area.zone) ?? MORE;
      z = { id: area.zone, label: meta.label, areas: [] };
      map.set(area.zone, z);
    }
    z.areas.push(area);
  }
  return ORDER.flatMap((id) => (map.has(id) ? [map.get(id)!] : []));
}

/** For the booking sheet: services grouped by zone, in menu order (wax before sugar within an area). */
export interface Kind {
  id: ZoneId;
  label: string;
  services: Service[];
}

export function kinds(services: readonly Service[]): Kind[] {
  return zones(services).map((z) => ({
    id: z.id,
    label: z.label,
    services: z.areas.flatMap((a) => (a.single ? [a.single] : [a.wax, a.sugar].filter((s): s is Service => s !== null))),
  }));
}

/** The services in menu order. */
export function indexOrder(services: readonly Service[]): Service[] {
  return kinds(services).flatMap((k) => k.services);
}

export interface Described {
  lead: string;
  /** "A first visit" — the part after "Good for:", or null. */
  goodFor: string | null;
}

const GOOD_FOR = /(?:^|[\s.])(?:good for|best for|ideal for)\s*:\s*/i;

function lead(description: string | null | undefined): string {
  return splitDescription(description).lead;
}

/** "…tweezers. Good for: a clean shape" → { lead: "…tweezers.", goodFor: "A clean shape" }. */
export function splitDescription(description: string | null | undefined): Described {
  const text = (description ?? '').trim();
  const m = GOOD_FOR.exec(text);
  if (!m) return { lead: text, goodFor: null };
  const raw = text.slice(m.index + m[0].length).trim().replace(/\.$/, '');
  return {
    lead: text.slice(0, m.index + (m[0].startsWith('.') ? 1 : 0)).trim(),
    goodFor: raw ? raw[0].toUpperCase() + raw.slice(1) : null,
  };
}

/** Kept for the shared booking flow: every appointment is at the studio, so there is no format to show. */
export function formatOf(_service: Pick<Service, 'description'>): { kind: 'studio'; label: string } | null {
  return null;
}

/** The booking sheet shows the area as the name and the method as a small tag: "Brazilian" · Sugar. */
export function splitName(name: string): { base: string; size: string | null } {
  const method = methodOf({ name });
  return method ? { base: areaOf(name), size: METHOD_LABEL[method] } : { base: name, size: null };
}

export type Role = Method | 'other';
export function roleOf(service: Pick<Service, 'name'>): Role {
  return methodOf(service) ?? 'other';
}

/** "45 min", "1 h 15 min", "2 h" — the appointment's length, straight from the engine. */
export function durationLabel(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}

/** Menu figures: "20 min", "60 min" — a wax menu reads in minutes up to two hours. */
export function minutesLabel(minutes: number): string {
  return minutes < 120 ? `${minutes} min` : durationLabel(minutes);
}

/** The same, for screen readers. */
export function durationSpoken(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${minutes} minutes`;
  const hours = `${h} hour${h > 1 ? 's' : ''}`;
  return m ? `${hours} ${m} minutes` : hours;
}

/** What the booking's LENGTH means: the time in the room. */
export interface TimeTerms {
  role: Role;
  label: string;
  note: string | null;
}

export function timeTerms(service: Pick<Service, 'name' | 'description'>): TimeTerms {
  return { role: roleOf(service), label: 'Time', note: null };
}

type PriceInput = Pick<Service, 'priceCents' | 'priceFrom' | 'currency' | 'name'>;

/** Whole dollars print without ".00" — "$26", not "$26.00". */
const money = (cents: number, currency: string, locale: string) => formatMoney(cents, currency, locale).replace(/([.,])00(?!\d)/, '');

/**
 * What the engine's price MEANS on this site:
 *   free    → no charge
 *   from    → a starting price; the specialist confirms it before the appointment
 *   fixed   → the price of this appointment, paid at the studio — not online
 *   request → no price shown: ask the studio
 */
export interface PriceTerms {
  kind: 'free' | 'from' | 'fixed' | 'request';
  label: string;
  amount: string;
  note: string | null;
}

export function priceTerms(service: PriceInput, locale: string): PriceTerms {
  if (service.priceCents === null) return { kind: 'request', label: 'Price', amount: 'Ask the studio', note: null };
  if (service.priceCents === 0) return { kind: 'free', label: 'Price', amount: 'Free', note: 'No charge' };
  const amount = money(service.priceCents, service.currency, locale);
  if (service.priceFrom) return { kind: 'from', label: 'From', amount, note: 'Confirmed with you before the appointment' };
  return { kind: 'fixed', label: 'Price', amount, note: null };
}

/** One line: "$26", "from $26", "Free", "Ask the studio". */
export function priceLabel(service: PriceInput, locale: string): string {
  const t = priceTerms(service, locale);
  if (t.kind === 'from') return `from ${t.amount}`;
  return t.amount;
}

/** The lowest priced service in a list (for "Brows from $26"), or null. */
export function cheapest(services: readonly Service[]): Service | null {
  const priced = services.filter((s) => s.priceCents !== null && s.priceCents > 0);
  priced.sort((a, b) => (a.priceCents ?? 0) - (b.priceCents ?? 0));
  return priced[0] ?? null;
}
