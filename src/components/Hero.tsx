import type { Business, Service } from '@profitstudio/booking-engine';
import type { StartBooking } from '../App';
import { bookLink } from '../lib/bookLink';
import type { SiteValues } from '../lib/content';
import type { Resource } from '../lib/resource';
import { cheapest, priceLabel, zones } from '../lib/services';
import type { OpeningInfo } from '../lib/useOpening';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';

/** imagesizes must match the preloads in index.html. */
const HERO_SIZES = '(min-width: 1024px) min(60vw, 56rem), 100vw';
/** Phones get the upright crop of the same frame — the site's own default only. */
const SMALL = { key: '/photos/hero-reach-phone-800.webp', media: '(max-width: 599px)', sizes: '100vw' };

interface HeroProps {
  values: SiteValues;
  ownerFields: string[];
  services: Resource<Service[]>;
  business: Business | null;
  opening: OpeningInfo;
  onBook: StartBooking;
}

/**
 * The first screen, on amber: the headline across the page's whole shell, set very wide (the
 * emphasised words narrow and slanted — the stretch), then a row with the introduction, the main
 * action and live "from" prices beside a long rounded pill of a photograph. Everything sits in the
 * page's centred shell, and the pill's height follows the screen's height, so the action stays in
 * the first screen from a 320 × 568 phone to a 2560 × 1440 monitor.
 */
export function Hero({ values, ownerFields, services, business, opening, onBook }: HeroProps) {
  const photo = values['hero.photo'];
  const own = ownerFields.includes('hero.photo');
  const kicker = values['hero.kicker'].trim();
  const place = values['hero.place'].trim();
  return (
    <section className={`hero${photo ? '' : ' hero--no-photo'}`} id="top" aria-labelledby="hero-title">
      <div className="hero__shell">
        <p className="hero__kicker">
          {kicker && <span>{kicker}</span>}
          {place && <span>{place}</span>}
          {opening.status && (
            <span className="hero__open" data-open={opening.status.open}>
              <span className="hero__open-dot" aria-hidden="true" />
              {opening.status.text}
            </span>
          )}
        </p>
        <h1 id="hero-title" className="hero__title stretch-in">
          <Emphasis text={values['hero.title']} />
        </h1>
        <div className="hero__row">
          <div className="hero__aside">
            {values['hero.lede'] && <p className="hero__lede">{values['hero.lede']}</p>}
            <div className="hero__actions">
              <a className="btn btn--ink btn--large" href="#book" onClick={bookLink(onBook)}>
                {values['hero.cta']}
                <span className="btn__arrow" aria-hidden="true">
                  →
                </span>
              </a>
              <a className="hero__menu-link" href="#menu">
                See the menu
              </a>
            </div>
            <FromPrices services={services} business={business} />
          </div>
          {photo && (
            <figure className="hero__photo">
              <Photo image={photo} sizes={HERO_SIZES} priority small={own ? undefined : SMALL} className="frame--hero" />
              {!own && <figcaption className="photo-label">Sample photo</figcaption>}
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}

/** "Face from $22 · Legs from $48 …" — the lowest price in each zone, live from the engine. */
function FromPrices({ services, business }: { services: Resource<Service[]>; business: Business | null }) {
  if (services.status !== 'ready' || services.data.length === 0) return null;
  const locale = business?.locale ?? 'en-US';
  const rows = zones(services.data)
    .filter((z) => z.id !== 'more')
    .map((z) => ({ id: z.id, label: z.label, service: cheapest(z.areas.flatMap((a) => a.services)) }))
    .filter((r) => r.service !== null);
  if (rows.length === 0) return null;
  return (
    <div className="hero__prices">
      <p className="hero__prices-label">From · paid at the studio</p>
      <ul className="hero__price-list" role="list">
        {rows.map((r) => (
          <li key={r.id}>
            <a href={`#zone-${r.id}`}>
              <span>{r.label}</span>{' '}
              <strong>{priceLabel(r.service!, locale)}</strong>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
