import styles from './ProductComposition.module.css';

/**
 * An abstract composition of product surfaces on three elevation planes.
 *
 * This is illustrative, not a screenshot — it depicts the shape of the
 * scheduling flow described in the prose beside it. It carries no
 * information that isn't also stated in text, so it is hidden from
 * assistive technology rather than read out as a jumble of fragments.
 */
export function ProductComposition() {
  return (
    <div className={styles.stage} aria-hidden="true">
      {/* Plane 1 — availability, synced from three providers */}
      <div className={`${styles.plane} ${styles.availability}`}>
        <p className={styles.planeLabel}>Availability · synced</p>
        <ul className={styles.slots}>
          <li className={styles.slot}>
            <span className={styles.time}>09:00</span>
            <span className={styles.state}>Busy · Google</span>
          </li>
          <li className={styles.slot}>
            <span className={styles.time}>10:30</span>
            <span className={styles.state}>Open</span>
          </li>
          <li className={`${styles.slot} ${styles.slotOpen}`}>
            <span className={styles.time}>11:00</span>
            <span className={styles.state}>Open · all guests</span>
          </li>
          <li className={styles.slot}>
            <span className={styles.time}>13:00</span>
            <span className={styles.state}>Busy · Outlook</span>
          </li>
          <li className={styles.slot}>
            <span className={styles.time}>15:30</span>
            <span className={styles.state}>Busy · Apple</span>
          </li>
        </ul>
      </div>

      {/* Plane 2 — the hybrid engine's two passes */}
      <div className={`${styles.plane} ${styles.engine}`}>
        <p className={styles.planeLabel}>Scheduling engine</p>
        <ol className={styles.passes}>
          <li className={styles.pass}>
            <span className={styles.passDot} />
            Deterministic conflict pass
          </li>
          <li className={styles.pass}>
            <span className={styles.passDot} />
            Model-ranked candidates
          </li>
          <li className={`${styles.pass} ${styles.passDone}`}>
            <span className={styles.passDot} />
            Confirmed · event created
          </li>
        </ol>
      </div>

      {/* Plane 3 — the iOS surface */}
      <div className={`${styles.plane} ${styles.device}`}>
        <p className={styles.deviceTitle}>Vaila</p>
        <p className={styles.deviceMeta}>Group · 4 guests</p>
        <ul className={styles.proposals}>
          <li className={`${styles.proposal} ${styles.proposalActive}`}>
            <span>Thu 11:00</span>
            <span className={styles.check}>✓</span>
          </li>
          <li className={styles.proposal}>
            <span>Fri 09:30</span>
          </li>
          <li className={styles.proposal}>
            <span>Fri 16:00</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
