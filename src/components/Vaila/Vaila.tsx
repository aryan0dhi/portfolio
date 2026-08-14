import { vaila } from '../../content/resume';
import styles from './Vaila.module.css';

// The layers of the product, top (closest to the user) to base.
const LAYER_STACK = ['SwiftUI', 'React', 'FastAPI', 'PostgreSQL', 'Redis'];

/**
 * Vaila — one person, every layer of a real product. The signature is a
 * cross-section: the three pillars as physical strata with real depth,
 * the only place elevation appears on the site. The launch card carries
 * the App Store "coming soon" state and hands off to the real product.
 */
export function Vaila() {
  // No backend on a portfolio — the notify action forwards to the real
  // product site (vaila.dev) rather than collecting an address that would
  // go nowhere.
  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(vaila.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id={vaila.id} className="case shell" aria-labelledby="vaila-title">
      <div className="case-head">
        <div className="case-headMain">
          <p className="eyebrow" data-reveal>
            {vaila.kicker}
          </p>
          <h2 id="vaila-title" className="case-name" data-reveal>
            {vaila.name}
          </h2>
          <p className="case-deck" data-reveal data-reveal-delay="1">
            {vaila.headline}
          </p>
        </div>
        <div className="case-rail" data-reveal data-reveal-delay="2">
          <div className="rail-item">
            <span className="k">Role</span>
            <span className="v">{vaila.role}</span>
          </div>
          <div className="rail-item">
            <span className="k">Period</span>
            <span className="v">{vaila.period}</span>
          </div>
          <div className="rail-item">
            <span className="k">Platform</span>
            <span className="v">iOS · Web</span>
          </div>
        </div>
      </div>

      {/* Intro: summary + stack on the left, launch card on the right */}
      <div className={styles.intro}>
        <div className={styles.introMain} data-reveal>
          <p className={`body ${styles.summary}`}>{vaila.summary}</p>
          <div className={styles.builtWith}>
            <p className={styles.builtHead}>Built with</p>
            <ul className={styles.stack}>
              {LAYER_STACK.map((s) => (
                <li key={s} className={styles.chip}>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className={styles.launch} data-reveal data-reveal-delay="1" aria-label="Vaila availability">
          <span className={styles.badge}>
            <svg className={styles.apple} viewBox="0 0 384 512" aria-hidden="true">
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zM262.1 104.5c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
            </svg>
            <span className={styles.badgeText}>
              <small>Coming soon on the</small>
              <strong>App&nbsp;Store</strong>
            </span>
          </span>

          <form className={styles.notify} onSubmit={handleNotify}>
            <label className={styles.notifyLabel} htmlFor="vaila-notify">
              Get notified at launch
            </label>
            <div className={styles.notifyRow}>
              <input
                id="vaila-notify"
                className={styles.notifyInput}
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@email.com"
                aria-label="Your email for launch notifications"
              />
              <button className={styles.notifyBtn} type="submit">
                Notify me
              </button>
            </div>
            <a className={styles.visit} href={vaila.url} target="_blank" rel="noreferrer">
              Visit {vaila.urlLabel} <span aria-hidden="true">↗</span>
            </a>
          </form>
        </aside>
      </div>

      {/* Cross-section — the three pillars as strata, full width */}
      <div className={`band ${styles.band}`} data-reveal>
        <div className={styles.strata}>
          {vaila.pillars.map((p, i) => (
            <article
              key={p.label}
              className={`${styles.layer} ${i === 0 ? styles.layerTop : ''}`}
              style={{ '--i': i } as React.CSSProperties}
            >
              <div className={styles.layerEdge} aria-hidden="true" />
              <div className={styles.layerBody}>
                <span className={styles.layerNo}>{`0${i + 1}`}</span>
                <div>
                  <h3 className={styles.layerLabel}>{p.label}</h3>
                  <p className={styles.layerText}>{p.body}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
