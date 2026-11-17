import type { SiteValues } from '../lib/content';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';
import { SectionLabel } from './SectionLabel';

/**
 * First time? No surprises: before, in the room and after, as three numbered columns beside a tall
 * pill photograph, a wide photograph under them, and the doctor-first small print.
 */
export function FirstVisit({ values, ownerFields }: { values: SiteValues; ownerFields: string[] }) {
  const steps = values['first.steps'];
  const photo = values['first.photo'];
  const photo2 = values['first.photo2'];
  return (
    <section className="first" id="first-visit" aria-labelledby="first-title">
      <div className="shell first__grid">
        {photo && (
          <figure className="first__photo" data-reveal="">
            <Photo image={photo} sizes="(min-width: 1024px) 24rem, 100vw" />
            {!ownerFields.includes('first.photo') && <span className="photo-label">Sample photo</span>}
          </figure>
        )}
        <div className="first__main">
          <header className="first__head">
            <SectionLabel>First visit</SectionLabel>
            <h2 id="first-title" className="first__title stretch-in" data-reveal="">
              <Emphasis text={values['first.title']} />
            </h2>
            {values['first.intro'] && <p className="first__intro">{values['first.intro']}</p>}
          </header>
          {steps.length > 0 && (
            <ol className="steps" role="list">
              {steps.map((step, i) => (
                <li className="step" key={`${i}-${step.title}`}>
                  <span className="step__n" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="step__title">{step.title}</h3>
                  {step.text && <p className="step__text">{step.text}</p>}
                </li>
              ))}
            </ol>
          )}
          {photo2 && (
            <figure className="first__wide" data-reveal="">
              <Photo image={photo2} sizes="(min-width: 1024px) 50rem, 100vw" />
              {!ownerFields.includes('first.photo2') && <span className="photo-label">Sample photo</span>}
            </figure>
          )}
          {values['first.note'] && <p className="first__note">{values['first.note']}</p>}
        </div>
      </div>
    </section>
  );
}
