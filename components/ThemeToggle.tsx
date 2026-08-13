"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";
const THEME_KEY = "portfolio-theme";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(THEME_KEY, theme);
  window.dispatchEvent(new CustomEvent("theme-change", { detail: theme }));
}

export function toggleTheme() {
  const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  applyTheme(current === "dark" ? "light" : "dark");
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY) as Theme | null;
    const initial = saved ?? "dark";
    applyTheme(initial);
    setTheme(initial);

    const onTheme = (event: Event) => {
      setTheme((event as CustomEvent<Theme>).detail);
    };
    window.addEventListener("theme-change", onTheme);
    return () => window.removeEventListener("theme-change", onTheme);
  }, []);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-ink/20 text-inksoft transition-colors hover:border-signal hover:text-signal"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        {isDark ? (
          <>
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
            <path
              d="M12 2v2.5M12 19.5V22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </>
        ) : (
          <path
            d="M20.5 15.3A8.4 8.4 0 0 1 8.7 3.5 8.8 8.8 0 1 0 20.5 15.3Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  );
}
