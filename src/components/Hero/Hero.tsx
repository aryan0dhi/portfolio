import { contact, garmin, profile, vaila } from '../../content/resume';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`shell ${styles.inner}`}>
        <p className={`eyebrow ${styles.kicker}`}>
          {profile.school} · Computer Engineering · {profile.graduation}
        </p>

        <h1 id="hero-title" className={styles.title}>
          <span className={styles.line}>Software</span>
          <span className={styles.line}>Engineer</span>
        </h1>

        <hr className={styles.rule} />

        <div className={styles.grid}>
          <p className={styles.lede}>{profile.lede}</p>

          <dl className={styles.now}>
            <div className={styles.nowItem}>
              <dt className="eyebrow">Currently</dt>
              <dd>
                Founder of <strong>{vaila.name}</strong> — an AI scheduling product for iOS and web,
                built and operated solo.{' '}
                <a className={styles.inline} href={vaila.url} target="_blank" rel="noreferrer">
                  {vaila.urlLabel}
                </a>
              </dd>
            </div>
            <div className={styles.nowItem}>
              <dt className="eyebrow">Most recently</dt>
              <dd>
                Software engineering intern at <strong>{garmin.name}</strong>, writing embedded C
                inside a formal certification process.
              </dd>
            </div>
          </dl>
        </div>

        <div className={styles.foot}>
          <ul className={styles.actions}>
            <li>
              <a className={styles.primary} href={contact.resume} target="_blank" rel="noreferrer">
                Download résumé
              </a>
            </li>
            <li>
              <a className={styles.secondary} href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </li>
            <li>
              <a className={styles.secondary} href={contact.github} target="_blank" rel="noreferrer">
                {contact.githubLabel}
              </a>
            </li>
          </ul>
          <p className={styles.scroll} aria-hidden="true">
            Selected work ↓
          </p>
        </div>
      </div>
    </section>
  );
}
