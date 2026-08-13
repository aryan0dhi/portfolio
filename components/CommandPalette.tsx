"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { profile, projects } from "@/lib/data";
import { toggleTheme } from "./ThemeToggle";

type Command = {
  id: string;
  label: string;
  hint: string;
  keywords?: string;
  run: () => void;
};

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setCopied(false);
  }, []);

  const go = useCallback(
    (href: string) => {
      close();
      router.push(href);
    },
    [close, router],
  );

  const commands = useMemo<Command[]>(() => {
    const nav: Command[] = [
      { id: "home", label: "Home", hint: "Go", keywords: "top hero", run: () => go("/") },
      { id: "work", label: "Work", hint: "Section", keywords: "projects signal", run: () => go("/#work") },
      { id: "all-work", label: "All projects", hint: "Section", keywords: "filter grid recruiter", run: () => go("/#all-work") },
      { id: "skills", label: "Skills", hint: "Section", keywords: "tools stack", run: () => go("/#skills") },
      { id: "resume-preview", label: "Resume preview", hint: "Section", keywords: "pdf cv inline", run: () => go("/#resume") },
      { id: "testimonials", label: "Recommendations", hint: "Section", keywords: "testimonials quotes", run: () => go("/#testimonials") },
      { id: "now", label: "Now", hint: "Section", keywords: "current changelog working", run: () => go("/#now") },
      { id: "about", label: "About", hint: "Section", keywords: "education purdue", run: () => go("/#about") },
      { id: "contact", label: "Contact", hint: "Section", keywords: "email reach", run: () => go("/#contact") },
    ];
    const proj: Command[] = projects.map((p) => ({
      id: `p-${p.id}`,
      label: p.name,
      hint: "Project",
      keywords: `${p.proves} ${p.blurb}`,
      run: () => go(`/work/${p.id}`),
    }));
    const actions: Command[] = [
      {
        id: "copy-email",
        label: "Copy email address",
        hint: "Action",
        keywords: profile.email,
        run: () => {
          navigator.clipboard?.writeText(profile.email);
          setCopied(true);
          window.setTimeout(close, 650);
        },
      },
      { id: "resume", label: "View résumé (PDF)", hint: "Action", keywords: "cv download", run: () => window.open(profile.resume, "_blank") },
      { id: "theme", label: "Toggle dark/light mode", hint: "Action", keywords: "theme dark light", run: () => toggleTheme() },
      {
        id: "diagnostic",
        label: "Run signal diagnostic",
        hint: "Easter egg",
        keywords: "terminal mcu circuit console",
        run: () => {
          close();
          window.dispatchEvent(new Event("open-signal-console"));
        },
      },
      { id: "github", label: "GitHub", hint: "Link", keywords: "code repos", run: () => window.open(profile.github, "_blank") },
      { id: "linkedin", label: "LinkedIn", hint: "Link", keywords: "connect", run: () => window.open(profile.linkedin, "_blank") },
    ];
    return [...nav, ...proj, ...actions];
  }, [go]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      `${c.label} ${c.hint} ${c.keywords ?? ""}`.toLowerCase().includes(q),
    );
  }, [commands, query]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTyping = Boolean(target?.closest("input, textarea, select, [contenteditable='true']"));
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (!isTyping && e.key === "/") {
        e.preventDefault();
        setOpen(true);
      } else if (!isTyping && e.key.toLowerCase() === "t") {
        toggleTheme();
      } else if (!isTyping && e.key.toLowerCase() === "r") {
        window.open(profile.resume, "_blank");
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      results[active]?.run();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-ink/30 px-4 pt-[14vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onMouseDown={close}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <motion.div
            className="w-full max-w-lg overflow-hidden rounded-xl border border-ink/15 bg-paper shadow-2xl"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            onMouseDown={(e) => e.stopPropagation()}
            onKeyDown={onListKey}
          >
            <div className="flex items-center gap-3 border-b border-ink/10 px-4">
              <span className="font-mono text-[13px] text-signal">∿</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to a project, copy email, open resume…"
                className="w-full bg-transparent py-3.5 text-[15px] text-ink outline-none placeholder:text-muted"
                aria-label="Search commands"
              />
              <kbd className="rounded border border-ink/15 px-1.5 py-0.5 font-mono text-[10px] text-muted">esc</kbd>
            </div>

            <ul className="max-h-[52vh] overflow-y-auto py-2">
              {results.length === 0 && (
                <li className="px-4 py-6 text-center text-[13px] text-muted">No matches.</li>
              )}
              {results.map((c, i) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => c.run()}
                    className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-[14px] transition-colors ${
                      i === active ? "bg-signal/10 text-ink" : "text-inksoft"
                    }`}
                  >
                    <span>
                      {c.id === "copy-email" && copied ? "Copied to clipboard ✓" : c.label}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wide text-muted">
                      {c.hint}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-ink/10 px-4 py-2 font-mono text-[10px] text-muted">
              <span>↑↓ navigate</span>
              <span>⏎ select</span>
              <span>/ search</span>
              <span>T theme</span>
              <span>R resume</span>
              <span>esc close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
