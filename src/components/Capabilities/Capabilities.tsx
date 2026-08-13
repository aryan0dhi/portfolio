import { capabilities, profile } from '../../content/resume';
import styles from './Capabilities.module.css';

export function Capabilities() {
  return (
    <section id="capabilities" className={styles.section} aria-labelledby="capabilities-title">
      <div className={`shell ${styles.inner}`}>
        <div className={styles.head} data-reveal>
          <p className="eyebrow">Capabilities</p>
          <h2 id="capabilities-title" className={`section-title ${styles.title}`}>
            Grouped by what it&nbsp;does
          </h2>
        </div>

        <dl className={styles.grid}>
          {capabilities.map((c) => (
            <div key={c.group} className={styles.group} data-reveal>
              <dt className={styles.groupName}>{c.group}</dt>
              <dd className={styles.groupItems}>
                <ul>
                  {c.items.map((i) => (
                    <li key={i} className={styles.item}>
                      {i}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>

        <div className={styles.education} data-reveal>
          <div className={styles.eduMain}>
            <h3 className={styles.eduSchool}>{profile.school}</h3>
            <p className={styles.eduDegree}>{profile.degree}</p>
          </div>
          <dl className={styles.eduFacts}>
            <div>
              <dt>Graduating</dt>
              <dd className="num">{profile.graduation}</dd>
            </div>
            <div>
              <dt>GPA</dt>
              <dd className="num">{profile.gpa}</dd>
            </div>
            <div>
              <dt>Concentrations</dt>
              <dd>{profile.concentrations.join(', ')}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
