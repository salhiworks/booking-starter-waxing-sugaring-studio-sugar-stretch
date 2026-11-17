# Make this starter yours — the Claude Code prompt

Fill in the four lines at the top, then paste the whole prompt into a Claude Code session opened in
this folder. It changes identity and words only, so it finishes in one short session.

```text
Customize this waxing & sugaring studio starter for my business.

Studio name: <YOUR STUDIO NAME>
City and area: <CITY, AREA>
Time zone (IANA): <e.g. America/Chicago>
How I work and my personality in a few words: <e.g. quick, friendly, no-awkwardness waxing; sugaring for first-timers>

Follow CLAUDE.md (already loaded in this session — no need to open it again).
Open and change only these files; don't explore the rest of the project:
1. src/site.config.ts — name, timezone, and fictional previewContact details in my city.
2. index.html and admin/index.html — the studio name, city and description in <title>,
   the meta description and the og tags.
3. src/content/site.ts — rewrite every DEFAULT text for my studio: the name mark and the line
   beside it, what I am and where, the headline (short — it is set very large and very wide),
   introduction and main button, the menu heading, introduction and small print, the wax-or-sugar
   heading, introduction, comparison rows and note, the three recipe words and text, the first-visit
   heading, introduction, before / in the room / after and small print, the questions & policies
   (my real policies), the booking heading and introduction, the finding-us note, the footer line
   and the search title and description. Keep field ids, types, limits and photos. Keep the sample
   photos (they stay labelled "Sample photo" until I upload my own).
   Keep the honesty rules: waxing and sugaring are cosmetic hair removal — no medical claims, no
   promised results ("permanent", "painless", "no ingrowns", "hair grows back finer"); the booking
   form never asks about health, medication or pregnancy, and the site never suggests the booking
   system checks anyone's suitability; anything medical → "check with your doctor first and tell us
   before your appointment"; nothing is paid online; no service lengths or prices written into the
   copy; no invented clients, results, before/after photos, licences, qualifications, years of
   experience, awards, press, reviews or testimonials.
4. Only if burnt caramel clearly doesn't fit my brand (otherwise skip this step): change the default
   of brand.accent in src/content/site.ts (a deep colour that keeps white text at 4.5:1 — oxblood,
   cocoa, plum, ink), the light colour in src/admin-theme.css. The amber and burnt-sugar bands are
   part of the design and stay.

Do not change the layout, the booking flow, src/lib/engine.ts, src/lib/preset.ts,
src/lib/services.ts, src/demo/, supabase/, booking-engine.lock.json or package.json.
Do not invent services, prices, opening hours or credentials I haven't told you about —
services, prices and hours are set in the dashboard. When done, run npm run build and fix any
error, then show me the result with npm run dev.
```

## After the prompt

- **Your services:** dashboard → Services. One booking is one appointment with you, for one service.
  - **Wax and sugar on one row.** Name a service "<area> Wax" or "<area> Sugaring" — "Brow Wax",
    "Brow Sugaring". Two services with the same area and different methods share one menu row, with
    a Wax and a Sugar button, each with its own length and price. A service with neither word
    ("Patch Test") gets a row of its own.
  - **Zones.** The menu sorts areas by the words in their names: *brow, lip, chin, face, nose, ear,
    neck* → **Face**; *underarm, arm, hand, shoulder* → **Arms & underarms**; *leg, thigh, knee,
    foot, toe* → **Legs**; *bikini, Brazilian, intimate* → **Bikini**. Otherwise the description
    decides, then "Also by appointment".
  - **The line under an area** is the first sentence of the first service's description — keep that
    sentence true for both methods ("Front to back — your call."), and say "With warm wax" or "With
    sugar paste" after it.
  - **Who it's for.** End a description with `Good for:` — `Good for: a first Brazilian`. It shows in
    the booking sheet. Describe the client's situation, never a skin condition or a result.
- **Zone photos:** Website → Menu — one upright photo each for face, arms & underarms, legs and bikini.
- **Headings:** wrap a word or two in *asterisks* to set them narrow and slanted. In the first-screen
  headline they take their own line, pulled to the right.
- **Photos:** Website → each section. Use only your own studio and work (with your client's
  permission) or photos you have the right to use. The "Sample photo" label disappears from each one
  you replace.
- **Online booking:** dashboard → Settings, once email sending works (see BOOKING_ENGINE.md).
