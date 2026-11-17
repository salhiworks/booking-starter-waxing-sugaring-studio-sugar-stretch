# Sugar Stretch — the visual system

Sugar paste, pulled. Warm, glossy, elastic — and said plainly. A waxing studio people are often a
little nervous about, presented with confidence and humour instead of spa clichés: no beige, no
candles, no serif luxury. The page is built from **three colour fields**, **one typeface that
stretches**, **photographs shaped like a drop of paste**, and **one ornament**.

## Tokens (src/styles/tokens.css — the only file with raw values)

| | |
|---|---|
| Amber `--amber` #f2a33a | the paste — the first screen, the header at the top, the booking band (burnt sugar on it 8.3:1) |
| Sugar white `--paper` #fffaf3 | the reading pages: menu, first visit, questions, visit |
| Soft amber `--oat` #fdebd0 | the recipe band, the booking summary |
| Burnt sugar `--ink` / `--forest` #2a1409 | type · the wax-or-sugar band, the booking sheet's header, the footer |
| Burnt caramel `--accent` #8a3a0e | buttons, slanted words, step numbers (owner-editable; white on it 7.9:1, as text 7.4:1 on sugar white) |
| Muted `--muted` #6e5141 | secondary text (≥ 6:1 on sugar white and soft amber) |
| Wax / sugar dots | a solid caramel dot for wax, an amber dot with a burnt-sugar ring for sugar — always next to the word |

Type: **Anybody** (variable width 50–150 %, weight 100–900, italics) for every heading, price and the
name mark; **DM Sans** (optical size) for reading text and labels.

- Headings are set **wide** (`font-stretch` 128 %, weight 780–860, tight leading).
- A heading's *emphasised* words are the **same letters squeezed**: 58 % wide, slanted, lighter, in
  burnt caramel (amber on burnt sugar). In the first-screen headline they take their own line, pulled
  to the right — "Less hair. / *Less fuss.*" reads as one stretch from left to right.
- **The stretch is the motion:** headings widen from 82 % into place as they arrive (and their slanted
  words squeeze in from 100 %), the recipe words pull from 55 % to full width one after another, a
  price widens a little under the pointer, the name mark widens on hover. All of it is off under
  `prefers-reduced-motion`, and nothing is hidden without `html.js-reveal`.
- Labels: 12 px DM Sans capitals after a small strand.

Shape: photographs in **long rounded pills** (`--radius-photo`, 999 px — a stadium on wide frames, a
capsule on upright ones), softly rounded on phones where a pill would cut the subject; cards and
choices with 1.25 rem corners; actions as pills. The **strand** (`components/Strand.tsx`) — two rounded
ends joined by a thin, sagging waist — is the one ornament: small before every section label, large
between Wax and Sugar.

## Composition, section by section

Every section, the header bar and both bands share ONE centred shell (`.shell`, page max 84 rem +
gutters): wide monitors get wider margins, never a wider composition.

- **Header:** sticky; amber at the top of the page, sugar white once scrolled. The name mark in Anybody
  at 140 % width, a small descriptor, four links, a burnt-caramel *Book an appointment* pill. Phones:
  name, *Book*, a round menu toggle.
- **First screen (amber):** kicker (what · where · open-now from the engine), then the headline across
  the whole shell, sized by width AND height (`min(11.2vw, 15.5svh)`), then a 5 / 7 row: introduction,
  a burnt-sugar *Book an appointment* and *See the menu*, and "From · paid at the studio" — the lowest
  price in each zone, live from the engine, each linking to its zone — beside a **long pill photograph**
  whose height is the screen's height minus the header, kicker, headline and paddings (15–32 rem). The
  action is inside the first screen from 320 × 568 to 2560 × 1440. Phones: the upright crop, softly
  rounded, after the action.
- **The menu (sugar white):** heading, introduction, a Wax · Sugar legend; then each **zone** under a
  2 px burnt-sugar rule — a small upright pill photo and the zone's name (sticky on desktop) beside its
  **areas**. An area is its name (Anybody, wide), one line that holds for both methods, and **two
  option cards: Wax and Sugar**, each with its price (Anybody), its real length and an arrow; the card
  turns burnt sugar and lifts on hover. Each card books its own engine service.
- **Wax or sugar? (burnt sugar):** centred heading; two pill photos with **Wax** and **Sugar** set huge
  across their lower edges, the large amber strand between them; the owner's comparison rows as a real
  table (what · wax · sugar). Phones: a Wax | Sugar switch shows one column at a time.
- **The recipe (soft amber):** "Sugar. *Lemon.* Water." set huge, pulling wide one word after another,
  a short text, and two photographs — the ingredients in a wide pill, the pan in a small upright pill
  overlapping it.
- **First visit (sugar white):** a tall pill photo (sticky on desktop) beside the heading and three
  numbered columns — Before · In the room · After — then a wide pill photo and the doctor-first small
  print with an amber edge.
- **Questions & policies:** sticky heading with the "Sample policies" tag on the left; native disclosure
  rows with an amber plus on the right.
- **Booking band (amber):** an upright pill photo beside the heading, three numbered steps and a
  burnt-sugar *Choose an area* button. Every Book button on the page opens the booking sheet.
- **Visit:** hours (today in bold, open-now), contact, finding us.
- **Footer (burnt sugar):** tagline, an amber Book pill, sections, contact, and the **name mark stretched
  across the shell** in amber at 150 % width (its size follows its length).

## The booking sheet

The shared booking flow (`booking.css`) on these tokens: a burnt-sugar header with the sheet title,
sugar-white body, soft-amber summary, burnt-caramel selections. Inside the sheet, headings are set only
a little wide (106 %) so long sentences stay easy to read; each service shows its area as the name and
its method as a small tag ("Brazilian · SUGAR"), grouped by zone like the menu.

## Accessibility

Text pairs ≥ 4.5:1 (`concepts/waxing-sugaring-studio-sugar-stretch/contrast.mjs`); 44 px targets; visible
focus (amber on burnt sugar); the methods are always named, never colour alone; the comparison is a
real table with a caption; reduced motion leaves everything in place; no horizontal scroll from 320 px.
