import { defineSiteContent } from '@profitstudio/booking-engine';

/**
 * What the owner may change in the dashboard (Website). The defaults are the
 * website's own copy and photos: until the owner publishes, the page shows
 * exactly these. Services, prices, lengths, hours, the address, phone and
 * email are NOT here — they come from the engine.
 *
 * Never rename or reuse a field id once the site is live: the owner's text is
 * stored under it. Add a new id instead.
 *
 * This file is also imported by vite.config.ts (Node), so it imports nothing
 * local. Default photo `src` values are keys of src/content/photoVariants.ts.
 *
 * Headings may wrap words in *asterisks*: those words are set narrow and
 * slanted — the "stretch" of the type (Emphasis).
 *
 * Copy rules (CLAUDE.md): waxing and sugaring here are cosmetic hair removal —
 * no medical claims, no promised results ("permanent", "painless", "no
 * ingrowns"), no invented credentials, reviews or awards.
 */
const SAMPLE_HELP =
  'A “Sample photo” label stays on it until you replace it with your own photo — use only photos of your own studio and work (with your client’s permission) or photos you have the right to use. Never show before/after pictures or another studio’s work as yours.';

type Img = { src: string; alt: string; width: number; height: number };
const P = (name: string, alt: string): Img => ({ src: `/photos/${name}-800.webp`, alt, width: 800, height: 1000 });
const L = (name: string, alt: string): Img => ({ src: `/photos/${name}-960.webp`, alt, width: 960, height: 640 });
const EMPHASIS = 'Wrap a word or two in *asterisks* to set them narrow and slanted — the stretch in the type.';
const ZONE_PHOTO = `Upright (4:5), shown small beside this part of the menu. A body or a face in calm light reads best; keep the subject near the middle. ${SAMPLE_HELP}`;

export const siteContent = defineSiteContent({
  sections: [
    {
      id: 'brand',
      label: 'Brand',
      description: 'Your name mark or logo and the colour of the main buttons.',
      fields: [
        {
          type: 'text',
          id: 'brand.wordmark',
          label: 'Name mark',
          help: 'The name in the header and, stretched across the page, in the footer. One or two short words read best.',
          default: 'Plain Sugar',
          maxLength: 22,
          required: true,
        },
        {
          type: 'text',
          id: 'brand.descriptor',
          label: 'Line beside the name mark',
          help: 'What you are, in two or three words. Shown small beside the name.',
          default: 'Wax & sugaring',
          maxLength: 28,
        },
        {
          type: 'image',
          id: 'brand.logo',
          label: 'Logo',
          help: 'Optional. A wide, dark logo on a transparent background — the header sits on amber at the top of the page and on white below it. It replaces the name mark in the header.',
          default: null,
          aspectRatio: 4,
        },
        {
          type: 'color',
          id: 'brand.accent',
          label: 'Accent colour',
          help: 'The main buttons, selected choices and the slanted words. Buttons carry white text, so pick a deep colour — burnt caramel (the original), oxblood, cocoa, plum, ink. Light colours are refused because white text would not read on them.',
          default: '#8a3a0e',
          contrastWith: '#ffffff',
          minContrast: 4.5,
        },
      ],
    },
    {
      id: 'hero',
      label: 'First screen',
      description: 'The headline, a short introduction and the main photograph, on the amber band at the top.',
      fields: [
        { type: 'text', id: 'hero.kicker', label: 'What you are', default: 'Waxing & sugaring studio', maxLength: 40 },
        { type: 'text', id: 'hero.place', label: 'Where you are', help: 'A neighbourhood and city.', default: 'East Austin', maxLength: 40 },
        {
          type: 'text',
          id: 'hero.title',
          label: 'Headline',
          help: `Short — it is set very large and very wide. Say how it feels to come here, not a promise about results. ${EMPHASIS}`,
          default: 'Less hair. *Less fuss.*',
          maxLength: 36,
          required: true,
        },
        {
          type: 'longText',
          id: 'hero.lede',
          label: 'Introduction',
          default:
            'Waxing and sugaring by one specialist, in one sunny room off East 6th. Real times, clear prices, and every step explained before it happens.',
          maxLength: 200,
          rows: 3,
        },
        { type: 'text', id: 'hero.cta', label: 'Main button', default: 'Book an appointment', maxLength: 28, required: true },
        {
          type: 'image',
          id: 'hero.photo',
          label: 'Main photo (wide)',
          help: `Wide (2:1), shown as a long rounded pill beside the introduction (cropped upright on phones, so keep the subject in the middle with space either side). ${SAMPLE_HELP}`,
          default: {
            src: '/photos/hero-reach-1440.webp',
            alt: 'A woman in a black crop top sitting on a grey studio floor, both arms arched over her head, looking at the camera.',
            width: 1440,
            height: 720,
          },
          aspectRatio: 2,
        },
      ],
    },
    {
      id: 'menu',
      label: 'Menu',
      description:
        'The words and photographs around your services. The services themselves — names, descriptions, lengths and prices — are edited in Services. Name them “<area> Wax” and “<area> Sugaring” (“Brazilian Wax”, “Brazilian Sugaring”) and the menu shows both on one row. A description can end with “Good for: a first visit”, shown as its own line.',
      fields: [
        { type: 'text', id: 'menu.title', label: 'Heading', help: EMPHASIS, default: 'Pick a spot. *Pick a method.*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'menu.intro',
          label: 'Introduction',
          default: 'Every area comes two ways: warm wax or sugar paste. Times are the real time in the room; prices are paid at the studio.',
          maxLength: 240,
          rows: 3,
        },
        { type: 'image', id: 'menu.photoFace', label: 'Photo — face', help: ZONE_PHOTO, default: P('zone-face', 'A close crop of a woman’s face: one eye, a natural brow and short platinum hair against a grey wall.'), aspectRatio: 4 / 5 },
        { type: 'image', id: 'menu.photoArms', label: 'Photo — arms & underarms', help: ZONE_PHOTO, default: P('zone-arms', 'A woman with short platinum hair raising both arms above her head in a grey studio.'), aspectRatio: 4 / 5 },
        { type: 'image', id: 'menu.photoLegs', label: 'Photo — legs', help: ZONE_PHOTO, default: P('zone-legs', 'Bare legs crossed at the ankle on a pale studio floor, a soft shadow beneath them.'), aspectRatio: 4 / 5 },
        { type: 'image', id: 'menu.photoBikini', label: 'Photo — bikini', help: ZONE_PHOTO, default: P('zone-bikini', 'Two hands resting on a bare stomach above dark shorts.'), aspectRatio: 4 / 5 },
        {
          type: 'text',
          id: 'menu.footnote',
          label: 'Small print under the menu',
          default: 'Two areas on one visit? Book them one after the other. Waxing and sugaring are cosmetic hair removal; how long it lasts varies from person to person.',
          maxLength: 200,
        },
      ],
    },
    {
      id: 'methods',
      label: 'Wax or sugar',
      description: 'The two methods side by side, in plain words, with a photograph of each.',
      fields: [
        { type: 'text', id: 'methods.title', label: 'Heading', help: EMPHASIS, default: 'Wax or *sugar?*', maxLength: 40, required: true },
        {
          type: 'longText',
          id: 'methods.intro',
          label: 'Introduction',
          default: 'Both take hair out from the root. The difference is in the stuff itself, and in which way it comes off.',
          maxLength: 220,
          rows: 2,
        },
        {
          type: 'list',
          id: 'methods.rows',
          label: 'Side by side',
          help: 'Up to six rows: what you compare, then a few words for wax and for sugar.',
          itemLabel: 'Row',
          maxItems: 6,
          fields: [
            { type: 'text', id: 'label', label: 'What', default: '', maxLength: 24, required: true },
            { type: 'text', id: 'wax', label: 'Wax', default: '', maxLength: 60, required: true },
            { type: 'text', id: 'sugar', label: 'Sugar', default: '', maxLength: 60, required: true },
          ],
          default: [
            { label: 'Made of', wax: 'Resins and beeswax, warmed in a pot', sugar: 'Sugar, lemon juice and water' },
            { label: 'Goes on', wax: 'Warm, with the direction of growth', sugar: 'Lukewarm, pressed in against it' },
            { label: 'Comes off', wax: 'In one quick pull, against the growth', sugar: 'Flicked off by hand, with the growth' },
            { label: 'Hair length', wax: 'About ¼ inch — a grain of rice', sugar: 'From about ⅛ inch' },
            { label: 'Afterwards', wax: 'A little oil lifts any residue', sugar: 'Anything left rinses off with water' },
          ],
        },
        { type: 'image', id: 'methods.photoWax', label: 'Photo — wax', help: `Upright (4:5). ${SAMPLE_HELP}`, default: P('method-wax', 'Gloved hands pressing down on warm, golden skin.'), aspectRatio: 4 / 5 },
        { type: 'image', id: 'methods.photoSugar', label: 'Photo — sugar', help: `Upright (4:5). ${SAMPLE_HELP}`, default: P('method-sugar', 'A wooden spatula spreading a thick amber paste across skin.'), aspectRatio: 4 / 5 },
        {
          type: 'longText',
          id: 'methods.note',
          label: 'Not sure',
          default: 'Not sure? Book either. If your hair length suits the other method better on the day, we’ll say so — and change nothing without asking you first.',
          maxLength: 220,
          rows: 2,
        },
      ],
    },
    {
      id: 'recipe',
      label: 'The recipe',
      description: 'Three words, set large, and two photographs — what sugar paste is made of.',
      fields: [
        {
          type: 'list',
          id: 'recipe.words',
          label: 'The three words',
          help: 'Shown very large, one per line, stretching wide as they come into view.',
          itemLabel: 'Word',
          maxItems: 3,
          fields: [{ type: 'text', id: 'word', label: 'Word', default: '', maxLength: 12, required: true }],
          default: [{ word: 'Sugar.' }, { word: 'Lemon.' }, { word: 'Water.' }],
        },
        {
          type: 'longText',
          id: 'recipe.text',
          label: 'Text',
          default: 'That’s all sugar paste is. Cooked slowly until it turns thick and amber, then worked by hand at body temperature — soft enough to stretch, firm enough to hold on to a hair.',
          maxLength: 260,
          rows: 3,
        },
        { type: 'image', id: 'recipe.photo', label: 'Photo — ingredients (wide)', help: `Wide (3:2). ${SAMPLE_HELP}`, default: L('recipe', 'Halved lemons, a glass of sugar and a glass of water on a sunlit kitchen counter.'), aspectRatio: 3 / 2 },
        { type: 'image', id: 'recipe.photo2', label: 'Photo — cooking (upright)', help: `Upright (4:5). ${SAMPLE_HELP}`, default: P('recipe-pan', 'A hand stirring a pan of clear golden syrup with a wooden stick.'), aspectRatio: 4 / 5 },
        { type: 'text', id: 'recipe.caption', label: 'Caption', default: 'Three ingredients, nothing else', maxLength: 48 },
      ],
    },
    {
      id: 'first',
      label: 'First visit',
      description: 'What to do before, what happens in the room, and what to do after — practical, never medical.',
      fields: [
        { type: 'text', id: 'first.title', label: 'Heading', help: EMPHASIS, default: 'First time? *No surprises.*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'first.intro',
          label: 'Introduction',
          default: 'Most nerves come from not knowing what happens next. So here it is, start to finish.',
          maxLength: 200,
          rows: 2,
        },
        {
          type: 'list',
          id: 'first.steps',
          label: 'Before, during, after',
          help: 'Up to three columns: a short title and a few practical sentences.',
          itemLabel: 'Column',
          maxItems: 3,
          fields: [
            { type: 'text', id: 'title', label: 'Title', default: '', maxLength: 24, required: true },
            { type: 'longText', id: 'text', label: 'Text', default: '', maxLength: 280, rows: 4 },
          ],
          default: [
            {
              title: 'Before',
              text: 'Let it grow for two or three weeks after shaving — about a grain of rice. Skip scrubs and self-tan that day, and wear something loose.',
            },
            {
              title: 'In the room',
              text: 'We talk first: what comes off and what stays. Then small sections, with a hand pressed on right after each one. Say stop at any point, and we stop.',
            },
            {
              title: 'After',
              text: 'Give it a day without hot baths, saunas, the gym or tight clothes. Exfoliate gently from day three. Most people come back every four to six weeks.',
            },
          ],
        },
        { type: 'image', id: 'first.photo', label: 'Photo (upright)', help: `Upright (4:5). ${SAMPLE_HELP}`, default: P('visit-walk', 'Bare legs walking away on a pale grey studio floor, heels lifted.'), aspectRatio: 4 / 5 },
        { type: 'image', id: 'first.photo2', label: 'Photo (wide)', help: `Wide (3:2). ${SAMPLE_HELP}`, default: L('visit-rest', 'Bare legs stretched out and resting on a pale studio floor.'), aspectRatio: 3 / 2 },
        {
          type: 'longText',
          id: 'first.note',
          label: 'Small print',
          default:
            'If you use a retinoid or a prescription skin product, are pregnant, or are under a doctor’s care for your skin, please check with your doctor first and tell us before your appointment.',
          maxLength: 260,
          rows: 3,
        },
      ],
    },
    {
      id: 'faq',
      label: 'Questions & policies',
      description: 'Practical answers before a first visit. Until you edit them they are labelled “Sample policies”.',
      fields: [
        { type: 'text', id: 'faq.title', label: 'Heading', help: EMPHASIS, default: 'Asked *a lot.*', maxLength: 48, required: true },
        {
          type: 'list',
          id: 'faq.items',
          label: 'Questions',
          itemLabel: 'Question',
          maxItems: 10,
          fields: [
            { type: 'text', id: 'question', label: 'Question', default: '', maxLength: 90, required: true },
            { type: 'longText', id: 'answer', label: 'Answer', default: '', maxLength: 600, rows: 4 },
          ],
          default: [
            {
              question: 'Does it hurt?',
              answer:
                'Honestly, a little — a quick sting that fades fast. We work in small sections and press a hand on straight after each one, so it’s over quickly. Many people find later visits easier than the first.',
            },
            {
              question: 'Wax or sugar — which should I book?',
              answer:
                'If you’re unsure, book either. Sugar can take slightly shorter hair; wax is a little quicker on large areas. If the other one suits your hair better on the day, we’ll tell you before we start.',
            },
            {
              question: 'What do I take off for a Brazilian?',
              answer:
                'Everything from the waist down, with a towel to hand. What stays is your call — a strip, a triangle or nothing at all — and we’ll ask before we begin.',
            },
            {
              question: 'Can I come on my period?',
              answer: 'Yes. For a bikini or Brazilian appointment, wear a tampon or a cup. Some people feel more sensitive that week, so you might prefer another time.',
            },
            {
              question: 'Is waxing a medical treatment?',
              answer:
                'No. It’s cosmetic hair removal. Please don’t put medical details in the booking form. If you use a retinoid or prescription skin product, are pregnant or under a doctor’s care for your skin, check with your doctor first and tell us before your appointment.',
            },
            {
              question: 'What if I need to cancel?',
              answer:
                'Please let us know at least 24 hours before so someone else can have the time. Arriving more than ten minutes late may mean a shorter appointment or a new time.',
            },
            {
              question: 'How do I pay?',
              answer: 'At the studio, after your appointment, by card or cash. Nothing is paid online, and there are no deposits.',
            },
          ],
        },
      ],
    },
    {
      id: 'book',
      label: 'Booking',
      description: 'The closing booking band and the top of the booking sheet.',
      fields: [
        { type: 'text', id: 'book.title', label: 'Heading', help: EMPHASIS, default: 'Book your *spot.*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'book.intro',
          label: 'Introduction',
          default: 'Choose an area, wax or sugar, and a time. Every request is read and confirmed by the specialist, usually within a day.',
          maxLength: 240,
          rows: 3,
        },
        {
          type: 'image',
          id: 'book.photo',
          label: 'Photo (upright)',
          help: `Upright (4:5), shown as a tall pill in the closing booking band. Remove it for text only. ${SAMPLE_HELP}`,
          default: P('book-arc', 'A woman in a black crop top stretching, one arm curved over her head and the other reaching out.'),
          aspectRatio: 4 / 5,
        },
      ],
    },
    {
      id: 'visit',
      label: 'Visit',
      description: 'Hours, address, phone and email come from your Business settings. Add how to find you.',
      fields: [
        { type: 'text', id: 'visit.title', label: 'Heading', help: EMPHASIS, default: 'Find the *yellow door.*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'visit.note',
          label: 'Finding us',
          default:
            'Ring the bell at the yellow door beside the bike shop; Suite 3 is the first room at the top of the stairs. Street parking on East 6th, and the bus stops at the corner.',
          maxLength: 400,
          rows: 3,
        },
      ],
    },
    {
      id: 'footer',
      label: 'Footer',
      fields: [{ type: 'text', id: 'footer.tagline', label: 'Line under the name', default: 'Waxing & sugaring · East Austin', maxLength: 80 }],
    },
    {
      id: 'seo',
      label: 'Search & sharing',
      description: 'Search engines and link previews show new text after the website is next deployed.',
      fields: [
        {
          type: 'text',
          id: 'seo.title',
          label: 'Page title',
          help: 'Search engines and link previews show new text after the website is next deployed.',
          default: 'Plain Sugar — waxing & sugaring in East Austin',
          maxLength: 80,
          required: true,
        },
        {
          type: 'longText',
          id: 'seo.description',
          label: 'Page description',
          help: 'One or two sentences for search results. Updated after the next deploy.',
          default:
            'An independent waxing and sugaring studio in East Austin: brows, lip & chin, underarms, legs, bikini line and Brazilian, each with wax or sugar paste. Book online.',
          maxLength: 180,
          rows: 3,
          required: true,
        },
      ],
    },
  ],
});
