import { contact, profile, worksIndex } from '../../content/resume';
import styles from './Hero.module.css';

/**
 * The title spread. A monograph opens on its thesis, not a wordmark:
 * a Fraunces headline, the four disciplines as a lede, and a numbered
 * contents index that doubles as fast navigation for a skimming reader.
 */
export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.grid} aria-hidden="true" />
      <span className={`${styles.crop} ${styles.cropTL}`} aria-hidden="true" />
      <span className={`${styles.crop} ${styles.cropTR}`} aria-hidden="true" />

      <div className={`shell ${styles.inner}`}>
        <div className={styles.folio} data-reveal>
          <span>{profile.name}</span>
          <span className={styles.folioMid}>Selected Works</span>
          <span>
            {profile.school.replace(' University', '')} · CmpE · {profile.graduation.split(' ')[1]}
          </span>
        </div>

        <div className={styles.top}>
          <div className={styles.headWrap}>
            <h1 id="hero-title" className={styles.title}>
              {profile.thesis.map((line, i) => (
                <span key={line} className={styles.titleLine} data-reveal data-reveal-delay={i + 1}>
                  {line}
                </span>
              ))}
            </h1>

            <p className={styles.lede} data-reveal data-reveal-delay="2">
              I’m a Computer Engineering student at Purdue building software across{' '}
              {profile.disciplines.map((d, i) => (
                <span key={d}>
                  <em className={styles.disc}>{d}</em>
                  {i < profile.disciplines.length - 2
                    ? ', '
                    : i === profile.disciplines.length - 2
                      ? ', and '
                      : '.'}
                </span>
              ))}
            </p>

            <div className={styles.actions} data-reveal data-reveal-delay="3">
              <a
                className={styles.primary}
                href={contact.resume}
                target="_blank"
                rel="noreferrer"
              >
                Download résumé
              </a>
              <a className={styles.secondary} href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
              <a
                className={styles.secondary}
                href={contact.github}
                target="_blank"
                rel="noreferrer"
              >
                {contact.githubLabel}
              </a>
            </div>

            <p className={styles.status} data-reveal data-reveal-delay="3">
              <span className={styles.dot} aria-hidden="true" />
              {profile.status}
            </p>
          </div>

          {/* Contents — the four anchor works. */}
          <nav className={styles.contents} aria-label="Selected works" data-reveal data-reveal-delay="2">
            <p className={styles.contentsHead}>Contents</p>
            <ol className={styles.index}>
              {worksIndex.map((w) => (
                <li key={w.id}>
                  <a className={styles.entry} href={`#${w.id}`}>
                    <span className={styles.entryNo}>{w.no}</span>
                    <span className={styles.entryName}>{w.name}</span>
                    <span className={styles.entryDisc}>{w.discipline}</span>
                    <span className={styles.entryDot} aria-hidden="true" />
                    <span className={styles.entryPeriod}>{w.period}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
}
