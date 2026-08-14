import { johnDeere } from '../../content/resume';
import { ForecastFan } from './ForecastFan';
import styles from './Forecasting.module.css';

/**
 * Demand Forecasting (The Data Mine · John Deere) — applied ML, shown
 * as method. No performance numbers exist on the résumé, so the figure
 * shows the shape of a probabilistic forecast, not invented quantities.
 */
export function Forecasting() {
  return (
    <section id={johnDeere.id} className="case shell" aria-labelledby="forecast-title">
      <div className="case-head">
        <div className="case-headMain">
          <p className="eyebrow" data-reveal>
            {johnDeere.kicker} · {johnDeere.org}
          </p>
          <h2 id="forecast-title" className="case-name" data-reveal>
            {johnDeere.name}
          </h2>
          <p className="case-deck" data-reveal data-reveal-delay="1">
            {johnDeere.headline}
          </p>
          <p className={`body ${styles.summary}`} data-reveal data-reveal-delay="1">
            {johnDeere.summary}
          </p>
        </div>
        <div className="case-rail" data-reveal data-reveal-delay="2">
          <div className="rail-item">
            <span className="k">Role</span>
            <span className="v">{johnDeere.role}</span>
          </div>
          <div className="rail-item">
            <span className="k">Period</span>
            <span className="v">{johnDeere.period}</span>
          </div>
          <div className="rail-item">
            <span className="k">Partner</span>
            <span className="v">John Deere · The Data Mine</span>
          </div>
        </div>
      </div>

      <div className={styles.split}>
        {/* The figure */}
        <figure className={`band ${styles.figureBand}`} data-reveal>
          <div className={styles.fanWrap}>
            <ForecastFan />
          </div>
          <figcaption className={styles.caption}>
            Illustrative. Evaluated with RMSE, Mean Winkler Interval Score, and 90%
            prediction-interval coverage.
          </figcaption>
        </figure>

        {/* Method progression */}
        <ol className={styles.method} data-reveal data-reveal-delay="1">
          {johnDeere.method.map((m) => (
            <li key={m.n} className={styles.step}>
              <span className={styles.stepN}>{m.n}</span>
              <div>
                <span className={styles.stepName}>{m.name}</span>
                <span className={styles.stepBody}>{m.body}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <p className={styles.outcome} data-reveal>
        <span className={styles.outcomeMark}>◇</span>
        {johnDeere.outcome}
      </p>
    </section>
  );
}
