import { useEffect, useState } from 'react';
import { contact, navSections, profile } from '../../content/resume';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useTheme } from '../../hooks/useTheme';
import styles from './Nav.module.css';

const SECTION_IDS = navSections.map((s) => s.id);

export function Nav() {
  const active = useActiveSection(SECTION_IDS);
  const { theme, toggle } = useTheme();
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`${styles.bar} ${lifted ? styles.lifted : ''}`}>
      <div className={`shell ${styles.inner}`}>
        <a href="#main" className={styles.name}>
          {profile.name}
        </a>

        <nav className={styles.links} aria-label="Sections">
          <ul className={styles.list}>
            {navSections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={styles.link}
                  aria-current={active === s.id ? 'true' : undefined}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <a className={styles.resume} href={contact.resume} target="_blank" rel="noreferrer">
            Résumé
          </a>
          <button
            type="button"
            className={styles.toggle}
            onClick={toggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            <span aria-hidden="true">{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
