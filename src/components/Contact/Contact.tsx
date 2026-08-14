import { contact, profile } from '../../content/resume';
import { ContactForm } from './ContactForm';
import styles from './Contact.module.css';

/**
 * Closing spread — a real contact form (delivers by email via Web3Forms,
 * or falls back to the visitor's mail client) alongside direct channels
 * and a "schedule a call" CTA. Ends on a printer's-mark colophon.
 */
export function Contact() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className={styles.wrap} aria-labelledby="contact-title">
      <div className="shell">
        <div className={styles.headRow}>
          <div>
            <p className="eyebrow" data-reveal>
              Get in touch
            </p>
            <h2 id="contact-title" className={styles.headline} data-reveal>
              Let&rsquo;s build something.
            </h2>
          </div>
          <p className={styles.replies} data-reveal>
            <span className={styles.dot} aria-hidden="true" />
            {profile.status}
          </p>
        </div>

        <hr className={styles.rule} />

        <div className={styles.grid}>
          {/* Left — direct channels + schedule */}
          <div className={styles.left} data-reveal>
            <a className={styles.email} href={`mailto:${contact.email}`}>
              {contact.email} <span aria-hidden="true">→</span>
            </a>

            <dl className={styles.meta}>
              <div className={styles.metaRow}>
                <dt>location</dt>
                <dd>{contact.timezone}</dd>
              </div>
              <div className={styles.metaRow}>
                <dt>stack</dt>
                <dd>{contact.stack}</dd>
              </div>
              <div className={styles.metaRow}>
                <dt>github</dt>
                <dd>
                  <a href={contact.github} target="_blank" rel="noreferrer">
                    {contact.githubLabel}
                  </a>
                </dd>
              </div>
              <div className={styles.metaRow}>
                <dt>linkedin</dt>
                <dd>
                  <a href={contact.linkedin} target="_blank" rel="noreferrer">
                    {contact.linkedinLabel}
                  </a>
                </dd>
              </div>
            </dl>

            <div className={styles.callBlock}>
              <p className={styles.callLabel}>Prefer a call?</p>
              <a
                className={styles.callBtn}
                href={contact.scheduleUrl}
                target="_blank"
                rel="noreferrer"
              >
                <span aria-hidden="true">$</span> {contact.scheduleLabel}
              </a>
              <p className={styles.callNote}>Booked through Vaila, my own scheduling app.</p>
            </div>
          </div>

          {/* Right — the form */}
          <div className={styles.right} data-reveal data-reveal-delay="1">
            <ContactForm />
          </div>
        </div>

        <div className={styles.foot}>
          <span>
            © {year} {profile.name}
          </span>
          <a className={styles.toTop} href="#main">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
