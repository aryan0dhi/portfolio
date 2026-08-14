import { footnote, supporting } from '../../content/resume';
import styles from './Supporting.module.css';

/**
 * Appendix — further work that supports the four cases without competing
 * with them. Compact rows; the dropped-from-résumé role sits as a literal
 * footnote, honest about its weight.
 */
export function Supporting() {
  return (
    <section id="supporting" className="case shell" aria-labelledby="supporting-title">
      <h2 id="supporting-title" className={`${styles.title}`} data-reveal>
        More
      </h2>

      <ol className={styles.list}>
        {supporting.map((item, i) => (
          <li
            key={item.id}
            className={styles.entry}
            data-reveal
            data-reveal-delay={((i % 2) + 1) as 1 | 2}
          >
            <div className={styles.entryHead}>
              <h3 className={styles.name}>{item.name}</h3>
              <span className={styles.role}>{item.role}</span>
            </div>
            <div className={styles.meta}>
              <span>{item.meta}</span>
              <span className={styles.period}>{item.period}</span>
            </div>
            <p className={styles.body}>{item.body}</p>
          </li>
        ))}
      </ol>

      <p className={`footnote ${styles.foot}`} data-reveal>
        <span className="mark">†</span> {footnote.name}, {footnote.role} ({footnote.period}).{' '}
        {footnote.body}
      </p>
    </section>
  );
}
