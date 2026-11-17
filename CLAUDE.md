# Waxing & Sugaring Studio "Sugar Stretch" Starter — project rules

A one-page booking website for an independent waxing and sugaring specialist, shipped as **Plain
Sugar** (a fictional one-room, one-specialist studio in East Austin: brows, lip & chin, underarms, half
and full legs, bikini line and Brazilian — every area with wax or with sugar paste) for the owner to
make their own. Its identity lives in `src/site.config.ts`; `CUSTOMIZE.md` is the prompt that
personalizes it. Built around **@profitstudio/booking-engine** **2.0.0-beta.3** (pinned; lock in
`booking-engine.lock.json`). The engine owns booking; this project owns the public design.

Read before changing anything:
- `BOOKING_ENGINE.md` — the engine's rules (engine-owned; `npx booking-engine sync` replaces it).
- `node_modules/@profitstudio/booking-engine/docs/INTEGRATION.md` — the full contract. It wins on technical points.
- `DESIGN.md` — the visual system. `PHOTOS.md` — photo sources and licences.

## The Live Demo layer — leave it alone

- `src/demo/` is the public Live Demo's in-browser engine and sample data. Only
  `npm run dev:demo` / `npm run build:demo` use it (`vite --mode demo` defines
  `__BOOKING_DEMO__`); in every other build it is compiled out. Never read, edit
  or "fix" it while customizing the website.
- Keep the `__BOOKING_DEMO__ ? … : …` branches as they are: the demo wording
  (no email is sent) must stay true in the demo, and the real wording in production.
- `src/demo/engine/` is vendored from the Niche Pack workspace — edit it there.
- `src/admin-main.tsx` passes `emailDelivery={__BOOKING_DEMO__ ? 'none' : undefined}`:
  only the demo's dashboard says no email is sent. Never set it on a real site.

## Engine boundaries (from BOOKING_ENGINE.md)

- All booking data goes through the ONE instance in `src/lib/engine.ts`. Never import
  `@supabase/supabase-js` for booking data, call `booking_*` RPCs or write SQL for booking tables.
- Never edit `supabase/migrations/*_booking_engine_*.sql`, `supabase/functions/booking-mailer/`,
  `booking-engine.lock.json` or `node_modules`.
- Only the publishable key may reach the website (`VITE_SUPABASE_URL` + `VITE_SUPABASE_PUBLISHABLE_KEY`,
  both or neither). Never a secret/`service_role` key, never an email provider key, in any file or `VITE_` variable.
- Show only the slots `getAvailability()` returns; send `slot.startsAt` back unchanged; show dates and
  times in `business.timezone`. Never compute availability in the browser — the calendar only reshapes
  engine data with the engine's helpers (`monthGrid`, `groupSlotsByPartOfDay`, `isFewLeft`, `nextAvailableDay`…).
- Label slot times with the server's business-local `slot.time` / `confirmation.time` via `formatClockTime`.
- Book in two steps: `requestBooking()` → code step → `verifyBooking()`. "Send a new code" =
  `resendVerificationCode()`; "Choose another time" = await `cancelBookingRequest()`, then reload availability.
- Handle `ok: false` on every call. Show success only after `verifyBooking()` returned `ok: true`
  (pending → "Request received — we'll review your appointment and confirm the time shortly.",
  confirmed → "Your appointment is booked."). Preview answers `PREVIEW_MODE`: say so honestly, never a success screen.
- `business.policies.onlineBookingEnabled === false` (or `BOOKING_DISABLED`) → contact details instead of the flow.
- The engine sends every booking email. Never add an email service to the website.
- Keep the packaged dashboard on `/admin/` (`admin/index.html` → `src/admin-main.tsx`). Never fork or restyle it:
  `src/admin-theme.css` sets only `--pbe-accent` / `--pbe-accent-text` per mode.

## What the engine does not do — never fake it

**One booking = one appointment: a reserved block of the specialist's time with one client, for one
service, on one calendar (one specialist, one treatment bed).** Its length is the real time in the
room. Prices are paid at the studio — never online. The specialist reviews and confirms every request
(`autoConfirm: false`).

**Wax and sugar are two services.** "Brazilian Wax" and "Brazilian Sugaring" are two ordinary engine
services with their own length and price; the website only *shows* them on one row (by name, in
`src/lib/services.ts`). There are no variants, no add-ons, and two areas on one visit are two
bookings, one after the other — never present them as one appointment, a combined price or a package.

**Cosmetic, not medical.** Waxing and sugaring here are cosmetic hair removal. Never diagnose, never
name a skin condition as something a service treats, never promise or imply results ("permanent",
"painless", "no ingrown hairs", "grows back finer/slower"), never use clinical framing (patients,
treatment plans, medical-grade). The *Good for:* line describes the client's situation in their own
terms ("a first Brazilian, at a slower pace", "a lunch break") — never a condition. Anything medical
(retinoids or prescription skin products, pregnancy, a doctor's care for the skin) → "check with your
doctor first and tell us before your appointment". The booking system screens nobody and the site
never implies it does.

A new booking feature needs a new engine version — never custom database code or browser-side logic:

- intake, consent or health forms, allergy or medication records, client photo histories;
- linked or combined bookings (two areas as one appointment), courses or series;
- deposits, cancellation fees, packages, memberships, gift cards, product sales or any online payment;
- several specialists or calendars, room allocation.

The booking notes field is **Anything we should know? (optional)** with the helper "For example
whether it's your first time, or when you last waxed, sugared or shaved. Please don't include medical
details here — if you use prescription skin products, are pregnant or under a doctor's care for your
skin, tell us when we confirm." Never ask for health, allergy, medication or pregnancy details in the
form. Proposed engine work: `docs/ENGINE-PROPOSAL-waxing-sugaring.md` in the Niche Pack workspace.

## Where things live

| What | Where |
|---|---|
| Engine instance (preview: name, `America/Chicago`, placeholder contact) | `src/lib/engine.ts` |
| This site's preset (sample services, hours, policies; "clients"/"appointments") — also the dashboard's starter set | `src/lib/preset.ts` (`sitePreset`) |
| Method (wax / sugar, from the name), area (the name without the method word), zone (Face · Arms & underarms · Legs · Bikini · Also by appointment), menu rows (`zones`), booking-sheet groups (`kinds`), "Good for:" parsing, length and price terms, `cheapest` | `src/lib/services.ts` |
| What the owner can edit (every text and photo — hero photo, four zone photos, wax and sugar photos, two recipe photos, two first-visit photos, booking photo — comparison rows, recipe words, before / in the room / after, questions & policies, booking words, finding-us note, logo, accent colour) | `src/content/site.ts` (`defineSiteContent`) |
| Content store + brand → CSS variable (`--accent`) | `src/lib/content.ts` |
| Design tokens — the ONLY file with raw colours, fonts, sizes, spacing | `src/styles/tokens.css` |
| Base / page / booking styles (tokens only) | `src/styles/base.css`, `site.css`, `booking.css` |
| Sections | `src/components/*.tsx` (Header, Hero `#top` (live "from" prices per zone, open-now), Menu `#menu` (zones `#zone-face`…, each area's Wax and Sugar buttons), Methods `#wax-or-sugar` (comparison table, phone switch), Recipe, FirstVisit `#first-visit`, GoodToKnow `#questions`, BookingSection `#book` (amber band), Visit `#visit`, Footer); the strand ornament `Strand.tsx`; scroll reveals `src/lib/reveal.ts` (`data-reveal`); the section list for header, phone menu and footer is `src/lib/nav.ts` |
| Booking sheet (a modal `<dialog>` at `#book`; Back/Esc/✕ close it) + the `#book` band | `src/App.tsx` (open/close + history), `src/components/booking/BookingSheet.tsx`, `BookingSection.tsx`, `src/lib/dialog.ts` |
| Booking flow | `src/components/booking/` (BookingFlow = state + engine calls, root `#book-flow`; DayPicker, TimePicker, DetailsForm, CodeStep, Summary, Done) |
| "Open now" + hours changes | `src/lib/useOpening.ts`, `src/lib/hours.ts` |
| Photo variant map | `public/photos/`, `src/content/photoVariants.ts` (generated by `concepts/waxing-sugaring-studio-sugar-stretch/photo-pipeline/photos.mjs`) |
| Content baked into `index.html` at build | `vite.config.ts` (`publishedSiteContent`) |

## Rules for future changes

- **Content fields:** render values as text (never `dangerouslySetInnerHTML`), images from the resolved
  `src`/`alt`. Never rename or reuse a field id on a live site — add a new id. Services, prices,
  lengths, hours, the address, phone and email are NOT content: they come from the engine.
- `src/content/site.ts` is also imported by `vite.config.ts` (Node): keep it free of local imports.
- **Every Book button** calls `startBooking()` (App): it opens the sheet, or — while online booking is off,
  unconfigured or failing — leads to the `#book` section and its contact details. A menu row's Wax or
  Sugar button passes THAT service's engine id — never a stored price or id.
- **Lengths and prices:** always from the engine (`minutesLabel`, `durationLabel`, `priceLabel`, `priceTerms`).
  Never hard-code a service, length, price or id in copy (questions and first-visit steps included —
  hair lengths and aftercare are practical guidance, not a service's engine data).
- **Sample photos:** every photo carries a "Sample photo" label until the owner replaces that field
  (`ownerFields`). Never present a stock photograph as the studio's work or a client's result, never
  show before/after images, never invent a client, a name, a licence, qualifications, years of
  experience, awards, press, reviews or testimonials.
- **Default photos:** add variants to `public/photos/` via the photo pipeline, keep the default `src`
  in `site.ts` equal to a key in `photoVariants.ts`, record the source in `PHOTOS.md`. If the
  first-screen default changes, update both `<link rel="preload">` in `index.html` (`imagesizes` must
  match `HERO_SIZES` / `SMALL` in `src/components/Hero.tsx`).
- **Policies:** Questions & policies shows a "Sample policies" label until the owner edits `faq.items`.
- **Copy:** frank, warm, plain ("a quick sting that fades fast"); no "flawless", "perfect", "luxury",
  "silky-smooth for weeks", "painless", "permanent", no result promises, no pressure, no clinical words.
- **Style:** plain CSS with the tokens; no UI kit. 44 px tap targets, visible focus, the
  `prefers-reduced-motion` path, every text/background pair at 4.5:1 (`contrast.mjs` in the concept
  folder). The button colour is owner-editable and always carries white text (`--on-accent`); the
  amber and burnt-sugar bands are fixed (not owner-editable) so their contrast is known.
- **Composition (DESIGN.md):** three colour fields (amber · sugar white · burnt sugar); one variable
  family (Anybody) set wide, emphasised words narrow and slanted; photographs in long rounded pills;
  the strand as the one ornament; every section inside the one centred shell (`.shell`, `--page-max`).
  Motion: headings widening into place, photo reveals, the hero settle and small hover stretches — all
  off under `prefers-reduced-motion`; never hide content without `html.js-reveal`.
- The public site stays one page (sections + in-page booking flow); no client-side path routes.

## Commands

```bash
npm run dev                              # http://localhost:5217 (preview mode without a backend)
npm run build                            # tsc -b && vite build (multi-page: / and /admin/)
npm run lint                             # oxlint (supabase/functions is ignored)
npm run dev:demo                         # the Live Demo: in-browser engine + dashboard, nothing sent
npm run build:demo                       # the public Live Demo build — never the production site
npx booking-engine doctor                # project check
npx booking-engine doctor --dist dist    # after a build: scans the output for secrets
```

Connecting a backend (Supabase, email) follows INTEGRATION.md §11 — only with the owner's go-ahead.
