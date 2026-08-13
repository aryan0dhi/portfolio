import { contact, profile } from '../../content/resume';
import styles from './Contact.module.css';

const year = new Date().getFullYear();

export function Contact() {
  return (
    <footer id="contact" className={styles.section} aria-labelledby="contact-title">
      <div className={`shell ${styles.inner}`}>
        <div className={styles.head} data-reveal>
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title" className={`section-title ${styles.title}`}>
            Open to 2027 new-grad and internship roles
          </h2>
        </div>

        <ul className={styles.links} data-reveal>
          <li>
            <a className={styles.big} href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </li>
          <li>
            <a className={styles.big} href={contact.github} target="_blank" rel="noreferrer">
              {contact.githubLabel}
            </a>
          </li>
          <li>
            <a className={styles.big} href={contact.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a className={styles.big} href={contact.resume} target="_blank" rel="noreferrer">
              Résumé (PDF)
            </a>
          </li>
        </ul>

        <div className={styles.foot}>
          <p className={styles.colophon}>
            {profile.name} · {profile.location} · {year}
          </p>
          <a className={styles.top} href="#main">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
