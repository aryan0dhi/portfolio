import { johnDeere } from '../../content/resume';
import { SectionHead } from '../SectionHead/SectionHead';
import styles from './Forecasting.module.css';

export function Forecasting() {
  return (
    <section
      id={johnDeere.id}
      className={styles.section}
      aria-labelledby={`${johnDeere.id}-title`}
    >
      <div className={`shell ${styles.inner}`}>
        <SectionHead
          id={johnDeere.id}
          kicker={johnDeere.kicker}
          title={johnDeere.headline}
          summary={johnDeere.summary}
          meta={
            <>
              <span>{johnDeere.org}</span>
              <span>{johnDeere.role}</span>
              <span>{johnDeere.period}</span>
            </>
          }
        />

        {/* Method, not metrics — the work reports no values, so none are shown. */}
        <ol className={styles.method}>
          {johnDeere.method.map((step) => (
            <li key={step.n} className={styles.step} data-reveal>
              <div className={styles.stepHead}>
                <span className={`num ${styles.stepNum}`}>{step.n}</span>
                <h3 className={styles.stepName}>{step.name}</h3>
              </div>
              <p className={styles.stepBody}>{step.body}</p>
            </li>
          ))}
        </ol>

        <p className={styles.outcome} data-reveal>
          {johnDeere.outcome}
        </p>
      </div>
    </section>
  );
}
