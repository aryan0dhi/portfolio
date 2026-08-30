import { Fragment, useState } from 'react';
import { kvStore } from '../../content/resume';
import styles from './KvStore.module.css';

/**
 * Distributed KV Store — systems depth. The dark panel is evidence from a
 * real system: the request data path (interactive), the throughput
 * benchmark with its true 32-client latencies, and the two implementation
 * details worth calling out — no dashboard chrome.
 */
export function KvStore() {
  // Default to the hash table — the core, and the most interesting stage.
  const coreIndex = kvStore.flow.findIndex((s) => s.core);
  const [active, setActive] = useState(coreIndex === -1 ? 0 : coreIndex);
  const stage = kvStore.flow[active];

  return (
    <section id={kvStore.id} className="case shell" aria-labelledby="kv-title">
      <div className="case-head">
        <div className="case-headMain">
          <p className="eyebrow" data-reveal>
            {kvStore.kicker}
          </p>
          <h2 id="kv-title" className="case-name" data-reveal>
            {kvStore.name}
          </h2>
          <p className="case-deck" data-reveal data-reveal-delay="1">
            {kvStore.headline}
          </p>
          <p className={`body ${styles.summary}`} data-reveal data-reveal-delay="1">
            {kvStore.summary}
          </p>
          <p className={styles.why} data-reveal data-reveal-delay="2">
            {kvStore.why}
          </p>
        </div>
        <div className="case-rail" data-reveal data-reveal-delay="2">
          <div className="rail-item">
            <span className="k">Language</span>
            <span className="v">{kvStore.role}</span>
          </div>
          <div className="rail-item">
            <span className="k">Built</span>
            <span className="v">{kvStore.period}</span>
          </div>
          <div className="rail-item">
            <span className="k">Protocol</span>
            <span className="v">RESP · java.nio</span>
          </div>
        </div>
      </div>

      <div className="band band--plate" data-reveal>
        <div className={styles.plate}>
          {/* The request data path */}
          <div className={styles.pathHead}>The path a request takes</div>
          <div className={styles.flow} role="group" aria-label="Request data path">
            {kvStore.flow.map((s, i) => (
              <Fragment key={s.name}>
                {i > 0 && (
                  <span className={styles.arrow} aria-hidden="true">
                    →
                  </span>
                )}
                <button
                  type="button"
                  className={`${styles.stage} ${i === active ? styles.stageActive : ''} ${
                    s.core ? styles.stageCore : ''
                  }`}
                  aria-pressed={i === active}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  <span className={styles.stageDot} aria-hidden="true" />
                  {s.name}
                </button>
              </Fragment>
            ))}
          </div>
          <p className={styles.flowDetail} aria-live="polite">
            <span className={styles.flowStage}>{stage.name}.</span> {stage.detail}
          </p>

          <hr className={styles.divide} />

          {/* Evidence */}
          <div className={styles.evidence}>
            <div className={styles.benchmark}>
              <p className={styles.benchFigure}>
                <span className={styles.benchNum}>{kvStore.benchmark.value}</span>
                <span className={styles.benchUnit}>{kvStore.benchmark.unit}</span>
              </p>
              <p className={styles.benchContext}>{kvStore.benchmark.context}</p>
              <p className={styles.latency}>
                <span>
                  <span className={styles.latK}>p50</span> {kvStore.benchmark.p50}
                </span>
                <span className={styles.latSep} aria-hidden="true">
                  ·
                </span>
                <span>
                  <span className={styles.latK}>p99</span> {kvStore.benchmark.p99}
                </span>
              </p>
            </div>

            <div className={styles.notes}>
              {kvStore.implementation.map((it) => (
                <p key={it.figure} className={styles.note}>
                  <span className={styles.noteFig}>{it.figure}</span> {it.note}
                </p>
              ))}
              <a className={styles.source} href={kvStore.repo} target="_blank" rel="noreferrer">
                Read the source <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
