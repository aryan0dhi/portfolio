import { garmin } from '../../content/resume';
import { GarminScope } from './GarminScope';
import styles from './Garmin.module.css';

/**
 * Garmin — engineering under certification. The narrative is the
 * four-stage verification every change passes; the instrument is the
 * TCAS traffic display those changes served.
 */
export function Garmin() {
  return (
    <section id={garmin.id} className="case shell" aria-labelledby="garmin-title">
      <div className="case-head">
        <div className="case-headMain">
          <p className="eyebrow" data-reveal>
            Embedded · {garmin.kicker}
          </p>
          <h2 id="garmin-title" className="case-name" data-reveal>
            {garmin.name}
          </h2>
          <p className="case-deck" data-reveal data-reveal-delay="1">
            {garmin.headline}
          </p>
          <p className={`body ${styles.summary}`} data-reveal data-reveal-delay="1">
            {garmin.summary}
          </p>
        </div>
        <div className="case-rail" data-reveal data-reveal-delay="2">
          <div className="rail-item">
            <span className="k">Role</span>
            <span className="v">{garmin.role}</span>
          </div>
          <div className="rail-item">
            <span className="k">Location</span>
            <span className="v">{garmin.location}</span>
          </div>
          <div className="rail-item">
            <span className="k">Period</span>
            <span className="v">{garmin.period}</span>
          </div>
          <div className="rail-item">
            <span className="k">Program</span>
            <span className="v">DO-178B · GTS 8x0 v5.03</span>
          </div>
        </div>
      </div>

      {/* The four-stage verification progression */}
      <ol className={styles.stages} data-reveal>
        {garmin.stages.map((s, i) => (
          <li key={s.n} className={styles.stage} data-reveal data-reveal-delay={((i % 3) + 1) as 1 | 2 | 3}>
            <span className={styles.stageN}>{s.n}</span>
            <span className={styles.stageName}>{s.name}</span>
            <span className={styles.stageBody}>{s.body}</span>
          </li>
        ))}
      </ol>

      {/* Instrument band — the traffic scope */}
      <div className="band band--plate" data-reveal>
        <div className={styles.band}>
          <div className={styles.bandCopy}>
            <p className={styles.bandEyebrow}>The system, live</p>
            <p className={styles.bandFigureWrap}>
              <span className={styles.bandFigure}>{garmin.count}</span>
              <span className={styles.bandFigureK}>{garmin.countLabel}</span>
            </p>
            <ul className={styles.also}>
              {garmin.also.map((line, i) => (
                <li key={i} className={styles.alsoItem}>
                  {line}
                </li>
              ))}
            </ul>
            <p className={styles.programme}>{garmin.programme}</p>
          </div>
          <GarminScope />
        </div>
      </div>
    </section>
  );
}
