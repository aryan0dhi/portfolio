import { garmin } from '../../content/resume';
import { SectionHead } from '../SectionHead/SectionHead';
import styles from './Garmin.module.css';

export function Garmin() {
  return (
    <section id={garmin.id} className={styles.section} aria-labelledby={`${garmin.id}-title`}>
      <div className={`shell ${styles.inner}`}>
        <div className={styles.top}>
          <SectionHead
            id={garmin.id}
            kicker={garmin.kicker}
            title={garmin.headline}
            summary={garmin.summary}
            meta={
              <>
                <span>{garmin.role}</span>
                <span>{garmin.location}</span>
                <span>{garmin.period}</span>
              </>
            }
          />

          <p className={styles.count} data-reveal>
            <span className={`num ${styles.countValue}`}>{garmin.count}</span>
            <span className={styles.countLabel}>{garmin.countLabel}</span>
          </p>
        </div>

        <p className={styles.programme} data-reveal>
          {garmin.programme}
        </p>

        <ol className={styles.stages}>
          {garmin.stages.map((s) => (
            <li key={s.n} className={styles.stage} data-reveal>
              <span className={`num ${styles.stageNum}`}>{s.n}</span>
              <h3 className={styles.stageName}>{s.name}</h3>
              <p className={styles.stageBody}>{s.body}</p>
            </li>
          ))}
        </ol>

        <ul className={styles.also} data-reveal>
          {garmin.also.map((line) => (
            <li key={line} className={styles.alsoItem}>
              {line}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
