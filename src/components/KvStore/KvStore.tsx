import { kvStore } from '../../content/resume';
import { SectionHead } from '../SectionHead/SectionHead';
import styles from './KvStore.module.css';

export function KvStore() {
  return (
    <section id={kvStore.id} className={styles.section} aria-labelledby={`${kvStore.id}-title`}>
      <div className={`shell ${styles.inner}`}>
        <SectionHead
          id={kvStore.id}
          kicker={kvStore.kicker}
          title={kvStore.headline}
          summary={kvStore.summary}
          tone="plate"
          meta={
            <>
              <span>{kvStore.role}</span>
              <span>{kvStore.period}</span>
            </>
          }
        />

        <div className={styles.body}>
          <div className={styles.tableWrap} data-reveal>
            <table className={styles.table}>
              <caption className={styles.caption}>Measured on the finished implementation</caption>
              <thead>
                <tr>
                  <th scope="col">Measurement</th>
                  <th scope="col" className={styles.valueCol}>
                    Result
                  </th>
                </tr>
              </thead>
              <tbody>
                {kvStore.measurements.map((m) => (
                  <tr key={m.metric}>
                    <th scope="row" className={styles.metric}>
                      {m.metric}
                    </th>
                    <td className={`num ${styles.value}`}>{m.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <aside className={styles.side} data-reveal>
            <div className={styles.figure}>
              <p className={styles.figureLabel}>{kvStore.headlineFigure.label}</p>
              <p className={`num ${styles.figureValue}`}>{kvStore.headlineFigure.value}</p>
              <p className={styles.figureUnit}>{kvStore.headlineFigure.unit}</p>
            </div>
            <ul className={styles.notes}>
              {kvStore.notes.map((n) => (
                <li key={n} className={styles.note}>
                  {n}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
