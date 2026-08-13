"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { label: "Vaila", href: "#featured-vaila" },
  { label: "Work", href: "#work" },
  { label: "All", href: "#all-work" },
  { label: "Skills", href: "#skills" },
  { label: "Now", href: "#now" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[120] border-b bg-paper transition-colors duration-300 ${
        scrolled ? "site-divider shadow-[0_1px_0_rgba(0,0,0,0.04)]" : "border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-4 md:px-10">
        <a href="#top" aria-label="Home" className="flex items-center gap-2">
          <svg width="26" height="26" viewBox="0 0 26 26" className="text-ink" aria-hidden="true">
            <circle cx="6" cy="13" r="3.2" fill="#2A50E0" />
            <path
              d="M9 13 C 15 13, 15 8, 22 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            />
          </svg>
          <span className="font-serif text-[15px] text-ink">Aryan Dhillon</span>
        </a>

        <div className="hidden items-center gap-5 text-[13px] text-ink/90 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-signal">
              {l.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
            className="site-button gap-1.5 border border-ink/20 px-2.5 py-1.5 font-mono text-[11px] text-muted transition-colors hover:border-signal hover:text-signal"
            aria-label="Open command palette"
          >
            <span className="text-[13px] leading-none">⌘</span>K
          </button>
          <ThemeToggle />
          <a
            href="#resume"
            className="rounded-md border border-ink/25 px-3 py-1.5 transition-colors hover:border-signal hover:text-signal"
          >
            Resume
          </a>
        </div>

        <a
          href="#work"
          className="text-[13px] text-signal md:hidden"
          aria-label="Jump to work"
        >
          Work ↓
        </a>
      </nav>
    </header>
  );
}
