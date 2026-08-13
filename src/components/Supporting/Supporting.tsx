import { footnote, supporting } from '../../content/resume';
import styles from './Supporting.module.css';

export function Supporting() {
  return (
    <section id="also" className={styles.section} aria-labelledby="also-title">
      <div className={`shell ${styles.inner}`}>
        <h2 id="also-title" className={`eyebrow ${styles.title}`}>
          Also
        </h2>

        <ul className={styles.list}>
          {supporting.map((item) => (
            <li key={item.id} className={styles.item} data-reveal>
              <div className={styles.itemHead}>
                <h3 className={styles.name}>{item.name}</h3>
                <p className={styles.meta}>
                  <span>{item.role}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.period}</span>
                </p>
              </div>
              <p className={styles.body}>{item.body}</p>
            </li>
          ))}
        </ul>

        {/* Deliberately the smallest entry on the page. */}
        <p className={styles.footnote} data-reveal>
          <span className={styles.footnoteName}>{footnote.name}</span>
          <span className={styles.footnoteMeta}>
            {footnote.role} · {footnote.period}
          </span>
          <span className={styles.footnoteBody}>{footnote.body}</span>
        </p>
      </div>
    </section>
  );
}
