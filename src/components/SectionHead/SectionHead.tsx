import type { ReactNode } from 'react';
import styles from './SectionHead.module.css';

interface Props {
  id: string;
  kicker: string;
  title: string;
  summary?: string;
  meta?: ReactNode;
  tone?: 'default' | 'plate';
}

/**
 * Shared heading pattern so every section shares one grammar —
 * kicker, monumental title, summary. What differs between sections
 * is the body treatment beneath, never the head.
 */
export function SectionHead({ id, kicker, title, summary, meta, tone = 'default' }: Props) {
  return (
    <header className={`${styles.head} ${tone === 'plate' ? styles.plate : ''}`} data-reveal>
      <p className={`eyebrow ${styles.kicker}`}>{kicker}</p>
      <h2 id={`${id}-title`} className={`section-title ${styles.title}`}>
        {title}
      </h2>
      {summary ? <p className={styles.summary}>{summary}</p> : null}
      {meta ? <div className={styles.meta}>{meta}</div> : null}
    </header>
  );
}
