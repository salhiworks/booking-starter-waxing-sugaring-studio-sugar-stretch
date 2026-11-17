import type { SiteValues } from '../lib/content';
import { Photo } from './Photo';

/**
 * The recipe: three words set huge on the soft-amber band — each one stretching from narrow to wide
 * as it comes into view (`data-reveal`, off under reduced motion) — beside two photographs.
 */
export function Recipe({ values, ownerFields }: { values: SiteValues; ownerFields: string[] }) {
  const words = values['recipe.words'].map((w) => w.word.trim()).filter(Boolean);
  const photo = values['recipe.photo'];
  const photo2 = values['recipe.photo2'];
  if (words.length === 0 && !values['recipe.text']) return null;
  return (
    <section className="recipe" aria-label="What sugar paste is made of">
      <div className="shell recipe__grid">
        <div className="recipe__words">
          {words.length > 0 && (
            <p className="recipe__list" data-reveal="">
              {words.map((w, i) => (
                <span className="recipe__word" key={`${i}-${w}`} style={{ transitionDelay: `${i * 140}ms` }}>
                  {w}
                </span>
              ))}
            </p>
          )}
          {values['recipe.text'] && <p className="recipe__text">{values['recipe.text']}</p>}
        </div>
        <div className="recipe__photos">
          {photo && (
            <figure className="recipe__photo recipe__photo--wide" data-reveal="">
              <Photo image={photo} sizes="(min-width: 1024px) 34rem, 100vw" />
              {!ownerFields.includes('recipe.photo') && <span className="photo-label">Sample photo</span>}
            </figure>
          )}
          {photo2 && (
            <figure className="recipe__photo recipe__photo--tall" data-reveal="">
              <Photo image={photo2} sizes="(min-width: 1024px) 16rem, 45vw" />
              {!ownerFields.includes('recipe.photo2') && <span className="photo-label photo-label--small">Sample photo</span>}
            </figure>
          )}
          {values['recipe.caption'] && <p className="recipe__caption">{values['recipe.caption']}</p>}
        </div>
      </div>
    </section>
  );
}
