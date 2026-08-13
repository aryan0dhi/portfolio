import { vaila } from '../../content/resume';
import { SectionHead } from '../SectionHead/SectionHead';
import { ProductComposition } from './ProductComposition';
import styles from './Vaila.module.css';

export function Vaila() {
  return (
    <section id={vaila.id} className={styles.section} aria-labelledby={`${vaila.id}-title`}>
      <div className={`shell ${styles.inner}`}>
        <div className={styles.top}>
          <SectionHead
            id={vaila.id}
            kicker={vaila.kicker}
            title={vaila.headline}
            summary={vaila.summary}
            meta={
              <>
                <span>{vaila.role}</span>
                <span>{vaila.period}</span>
                <a className={styles.link} href={vaila.url} target="_blank" rel="noreferrer">
                  {vaila.urlLabel} ↗
                </a>
              </>
            }
          />

          <div className={styles.composition} data-reveal>
            <ProductComposition />
          </div>
        </div>

        <ol className={styles.pillars}>
          {vaila.pillars.map((p, i) => (
            <li key={p.label} className={styles.pillar} data-reveal>
              <span className={`num ${styles.pillarNum}`}>{String(i + 1).padStart(2, '0')}</span>
              <h3 className={styles.pillarLabel}>{p.label}</h3>
              <p className={styles.pillarBody}>{p.body}</p>
            </li>
          ))}
        </ol>

        <ul className={styles.stack} data-reveal>
          {vaila.stack.map((s) => (
            <li key={s} className={styles.chip}>
              {s}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
