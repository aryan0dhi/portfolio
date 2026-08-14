import { useState } from 'react';
import { contact } from '../../content/resume';
import styles from './Contact.module.css';

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'mailto';

// Web3Forms access key — public by design (front-end key). Set it in a
// local .env as VITE_WEB3FORMS_KEY (see .env.example). Without it, the
// form falls back to opening the visitor's mail client, prefilled.
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — real users never fill a hidden field.
    if ((data.get('company') as string)?.length) {
      setStatus('sent');
      form.reset();
      return;
    }

    const name = (data.get('name') as string) ?? '';
    const email = (data.get('email') as string) ?? '';
    const message = (data.get('message') as string) ?? '';

    // No key configured → hand off to the visitor's mail client honestly,
    // rather than pretending a message was delivered.
    if (!ACCESS_KEY) {
      const subject = encodeURIComponent(`Portfolio message from ${name}`);
      const body = encodeURIComponent(`${message}\n\n${name} · ${email}`);
      window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
      setStatus('mailto');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `New portfolio message from ${name}`,
          from_name: name,
          name,
          email,
          message,
        }),
      });
      const json = (await res.json()) as { success?: boolean };
      if (json.success) {
        setStatus('sent');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  const sending = status === 'sending';

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* Honeypot: visually hidden, off the tab order. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className={styles.honeypot}
      />

      <div className={styles.field}>
        <label htmlFor="cf-name" className={styles.label}>
          Name <span aria-hidden="true">*</span>
        </label>
        <input id="cf-name" name="name" type="text" required className={styles.input} />
      </div>

      <div className={styles.field}>
        <label htmlFor="cf-email" className={styles.label}>
          Email <span aria-hidden="true">*</span>
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="cf-message" className={styles.label}>
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          required
          placeholder="What are you building?"
          className={styles.textarea}
        />
      </div>

      <div className={styles.formFoot}>
        <p className={styles.note} role="status" aria-live="polite">
          {status === 'idle' && 'Spam-protected · replies within a day'}
          {status === 'sending' && 'Sending…'}
          {status === 'sent' && 'Sent. I’ll reply within a day.'}
          {status === 'mailto' && 'Opening your mail app…'}
          {status === 'error' && (
            <>
              Something went wrong. Email{' '}
              <a className={styles.noteLink} href={`mailto:${contact.email}`}>
                {contact.email}
              </a>{' '}
              directly.
            </>
          )}
        </p>
        <button className={styles.send} type="submit" disabled={sending}>
          <span aria-hidden="true">→</span> {sending ? 'sending' : 'send message'}
        </button>
      </div>
    </form>
  );
}
