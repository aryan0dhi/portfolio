import { useState } from 'react';
import { contact, garmin, profile, vaila } from '../../content/resume';
import { disciplines, type FormationId } from './formations';
import { ParticleField } from './ParticleField';
import styles from './Hero.module.css';

export function Hero() {
  const [formation, setFormation] = useState<FormationId>('ring');

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.field}>
        <ParticleField formation={formation} />
      </div>

      <div className={`shell ${styles.inner}`}>
        <p className={`eyebrow ${styles.kicker}`}>
          {profile.school} · Computer Engineering · {profile.graduation}
        </p>

        <h1 id="hero-title" className={styles.title}>
          <span className={styles.line}>Software</span>
          <span className={styles.line}>Engineer</span>
        </h1>

        {/* The four disciplines double as the control for the field behind
            them — hovering or focusing one reshapes it into that structure. */}
        <div className={styles.rangeRow}>
          <p className={styles.rangeLead}>I work across</p>
          <ul className={styles.disciplines}>
            {disciplines.map((d) => (
              <li key={d.id}>
                <button
                  type="button"
                  className={styles.discipline}
                  aria-pressed={formation === d.id}
                  onMouseEnter={() => setFormation(d.id)}
                  onFocus={() => setFormation(d.id)}
                  onClick={() => setFormation(d.id)}
                >
                  <span className={styles.discLabel}>{d.label}</span>
                  <span className={styles.discNote}>{d.note}</span>
                </button>
              </li>
            ))}
          </ul>
          <p className={styles.rangeTail}>— and go deep at each.</p>
        </div>

        <hr className={styles.rule} />

        <div className={styles.grid}>
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
        </div>
      </div>
    </section>
  );
}
