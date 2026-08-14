import { capabilities, profile } from '../../content/resume';
import styles from './Capabilities.module.css';

/**
 * Capabilities — grouped by engineering function, not an alphabet soup.
 * Set as a colophon: a tidy, scannable index of what the work is built
 * from, with the education line as the closing record.
 */
export function Capabilities() {
  return (
    <section id="capabilities" className="case shell" aria-labelledby="cap-title">
      <p className="eyebrow" data-reveal>
        Capabilities
      </p>
      <h2 id="cap-title" className={styles.title} data-reveal>
        Built from.
      </h2>

      <div className={styles.groups}>
        {capabilities.map((g, i) => (
          <div
            key={g.group}
            className={styles.group}
            data-reveal
            data-reveal-delay={((i % 3) + 1) as 1 | 2 | 3}
          >
            <p className={styles.groupName}>{g.group}</p>
            <ul className={styles.items}>
              {g.items.map((it) => (
                <li key={it} className={styles.item}>
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <dl className={styles.record} data-reveal>
        <div className={styles.recItem}>
          <dt>Education</dt>
          <dd>
            {profile.degree}, {profile.school}
          </dd>
        </div>
        <div className={styles.recItem}>
          <dt>Graduation</dt>
          <dd>
            {profile.graduation} · GPA {profile.gpa}
          </dd>
        </div>
        <div className={styles.recItem}>
          <dt>Focus</dt>
          <dd>{profile.concentrations.join(' · ')}</dd>
        </div>
      </dl>
    </section>
  );
}
