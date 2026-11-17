import { useState } from 'react';
import type { SiteValues } from '../lib/content';
import type { Method } from '../lib/services';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';
import { SectionLabel } from './SectionLabel';
import { Strand } from './Strand';

/**
 * Wax or sugar, on the burnt-sugar band: the two methods compared row by row in the owner's words,
 * with a pill photograph heading each column. Wide screens show both columns at once; phones show
 * one at a time with a Wax | Sugar switch (both stay in the document for screen readers, which read
 * the comparison as a table).
 */
export function Methods({ values, ownerFields }: { values: SiteValues; ownerFields: string[] }) {
  const [shown, setShown] = useState<Method>('sugar');
  const rows = values['methods.rows'];
  const photos = { wax: values['methods.photoWax'], sugar: values['methods.photoSugar'] };
  const own = { wax: ownerFields.includes('methods.photoWax'), sugar: ownerFields.includes('methods.photoSugar') };
  return (
    <section className="methods dark" id="wax-or-sugar" aria-labelledby="methods-title" data-shown={shown}>
      <div className="shell">
        <header className="methods__head">
          <SectionLabel tone="dark">Wax or sugar</SectionLabel>
          <h2 id="methods-title" className="methods__title stretch-in" data-reveal="">
            <Emphasis text={values['methods.title']} />
          </h2>
          {values['methods.intro'] && <p className="methods__intro">{values['methods.intro']}</p>}
        </header>

        <div className="switch" role="group" aria-label="Show">
          {(['wax', 'sugar'] as const).map((m) => (
            <button key={m} type="button" className="switch__btn" aria-pressed={shown === m} onClick={() => setShown(m)}>
              <span className={`dot dot--${m}`} aria-hidden="true" />
              {m === 'wax' ? 'Wax' : 'Sugar'}
            </button>
          ))}
        </div>

        <div className="methods__grid">
          {(['wax', 'sugar'] as const).map((m) => (
            <div className={`method method--${m}`} key={m} data-method={m}>
              {photos[m] && (
                <figure className="method__photo" data-reveal="">
                  <Photo image={photos[m]!} sizes="(min-width: 1024px) 22rem, 70vw" />
                  {!own[m] && <figcaption className="photo-label">Sample photo</figcaption>}
                </figure>
              )}
              <p className="method__name" aria-hidden="true">
                {m === 'wax' ? 'Wax' : 'Sugar'}
              </p>
            </div>
          ))}
          <Strand className="methods__strand" />
          {rows.length > 0 && (
            <table className="compare">
              <caption className="sr-only">Wax and sugar compared</caption>
              <thead>
                <tr>
                  <td />
                  <th scope="col" className="compare__col compare__col--wax">
                    Wax
                  </th>
                  <th scope="col" className="compare__col compare__col--sugar">
                    Sugar
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={`${i}-${row.label}`}>
                    <th scope="row">{row.label}</th>
                    <td className="compare__cell compare__cell--wax">{row.wax}</td>
                    <td className="compare__cell compare__cell--sugar">{row.sugar}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {values['methods.note'] && <p className="methods__note">{values['methods.note']}</p>}
      </div>
    </section>
  );
}
