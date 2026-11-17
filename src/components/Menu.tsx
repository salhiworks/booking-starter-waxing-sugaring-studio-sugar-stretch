import type { Business, Service, SiteImage } from '@profitstudio/booking-engine';
import type { StartBooking } from '../App';
import { bookLink } from '../lib/bookLink';
import type { SiteValues } from '../lib/content';
import type { Resource } from '../lib/resource';
import { durationSpoken, METHOD_LABEL, minutesLabel, priceLabel, splitDescription, zones } from '../lib/services';
import type { Area, Method, ZoneId } from '../lib/services';
import { Emphasis } from './Emphasis';
import { Notice } from './Notice';
import { Photo } from './Photo';
import { SectionLabel } from './SectionLabel';

interface MenuProps {
  values: SiteValues;
  ownerFields: string[];
  services: Resource<Service[]>;
  business: Business | null;
  onRetry: () => void;
  onBook: StartBooking;
}

const PHOTO_FIELD: Partial<Record<ZoneId, 'menu.photoFace' | 'menu.photoArms' | 'menu.photoLegs' | 'menu.photoBikini'>> = {
  face: 'menu.photoFace',
  arms: 'menu.photoArms',
  legs: 'menu.photoLegs',
  bikini: 'menu.photoBikini',
};

/**
 * The menu: the engine's services as rows in their zones (Face · Arms & underarms · Legs · Bikini),
 * each AREA once, with its two methods side by side — a Wax and a Sugar button, each with its own
 * real length and price and its own engine id. A zone opens with a small pill photograph.
 */
export function Menu({ values, ownerFields, services, business, onRetry, onBook }: MenuProps) {
  const locale = business?.locale ?? 'en-US';
  return (
    <section className="menu" id="menu" aria-labelledby="menu-title">
      <div className="shell">
        <header className="menu__head">
          <SectionLabel>The menu</SectionLabel>
          <h2 id="menu-title" className="menu__title stretch-in" data-reveal="">
            <Emphasis text={values['menu.title']} />
          </h2>
          <div className="menu__sub">
            {values['menu.intro'] && <p className="menu__intro">{values['menu.intro']}</p>}
            <p className="legend" aria-hidden="true">
              <span className="legend__item">
                <span className="dot dot--wax" />
                Wax
              </span>
              <span className="legend__item">
                <span className="dot dot--sugar" />
                Sugar
              </span>
            </p>
          </div>
        </header>
        <MenuBody values={values} ownerFields={ownerFields} services={services} locale={locale} onRetry={onRetry} onBook={onBook} />
        {values['menu.footnote'] && <p className="menu__footnote">{values['menu.footnote']}</p>}
      </div>
    </section>
  );
}

function MenuBody({
  values,
  ownerFields,
  services,
  locale,
  onRetry,
  onBook,
}: Omit<MenuProps, 'business'> & { locale: string }) {
  if (services.status === 'loading') {
    return (
      <div className="menu__zones" aria-busy="true">
        <p className="sr-only" role="status">
          Loading the menu…
        </p>
        {[0, 1].map((i) => (
          <div className="zone" key={i} aria-hidden="true">
            <span className="skeleton skeleton--zone" />
            <div className="zone__rows">
              <span className="skeleton skeleton--area" />
              <span className="skeleton skeleton--area" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (services.status === 'error') {
    if (services.error.code === 'NOT_CONFIGURED') return <p className="quiet-state">The menu will be listed here soon.</p>;
    return (
      <Notice tone="error" action={{ label: 'Try again', onClick: onRetry }}>
        <p>{services.error.code === 'NETWORK' ? "We couldn't reach the booking system. Please check your connection." : "We couldn't load the menu just now."}</p>
      </Notice>
    );
  }
  if (services.data.length === 0) return <p className="quiet-state">The menu will be listed here soon — call or email the studio in the meantime.</p>;

  return (
    <div className="menu__zones">
      {zones(services.data).map((zone) => {
        const field = PHOTO_FIELD[zone.id];
        const photo: SiteImage | null = field ? values[field] : null;
        return (
          <section className="zone" id={`zone-${zone.id}`} key={zone.id} aria-labelledby={`zone-${zone.id}-title`}>
            <div className="zone__side">
              {photo && field && (
                <figure className="zone__photo" data-reveal="">
                  <Photo image={photo} sizes="(min-width: 1024px) 14rem, 6rem" />
                  {!ownerFields.includes(field) && <figcaption className="photo-label photo-label--small">Sample photo</figcaption>}
                </figure>
              )}
              <h3 id={`zone-${zone.id}-title`} className="zone__title">
                {zone.label}
              </h3>
            </div>
            <ul className="zone__rows" role="list">
              {zone.areas.map((area) => (
                <AreaRow key={area.key} area={area} locale={locale} onBook={onBook} />
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

/** First sentence of the row's first description: the area, in words that hold for both methods. */
function areaLine(area: Area): string {
  const { lead } = splitDescription(area.services[0]?.description);
  const m = /^(.+?[.!?])(\s|$)/.exec(lead);
  return (m ? m[1] : lead).trim();
}

function AreaRow({ area, locale, onBook }: { area: Area; locale: string; onBook: StartBooking }) {
  const line = areaLine(area);
  const options: { method: Method | null; service: Service }[] = area.single
    ? [{ method: null, service: area.single }]
    : (['wax', 'sugar'] as const).flatMap((m) => (area[m] ? [{ method: m, service: area[m]! }] : []));
  return (
    <li className="area">
      <div className="area__text">
        <h4 className="area__name">{area.name}</h4>
        {line && <p className="area__line">{line}</p>}
      </div>
      <div className={`area__options area__options--${options.length}`}>
        {options.map(({ method, service }) => (
          <a
            key={service.id}
            className={`option${method ? ` option--${method}` : ''}`}
            href="#book"
            onClick={bookLink(onBook, service.id)}
            aria-label={`Book ${service.name} — ${durationSpoken(service.durationMinutes)}, ${priceLabel(service, locale)}`}
          >
            <span className="option__method">
              <span className={`dot${method ? ` dot--${method}` : ''}`} aria-hidden="true" />
              {method ? METHOD_LABEL[method] : 'Book'}
            </span>
            <span className="option__price">{priceLabel(service, locale)}</span>
            <span className="option__time">{minutesLabel(service.durationMinutes)}</span>
            <span className="option__arrow" aria-hidden="true">
              →
            </span>
          </a>
        ))}
      </div>
    </li>
  );
}
