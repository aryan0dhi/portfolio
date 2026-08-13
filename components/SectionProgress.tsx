"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "top", label: "Home" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

export default function SectionProgress() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const onScroll = () => {
      const header = document.querySelector("header");
      const headerBottom = header?.getBoundingClientRect().bottom ?? 72;
      const probe = window.scrollY + headerBottom + 32;
      let next = sections[0].id;

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= probe) next = section.id;
      }

      setActive(next);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed bottom-5 left-5 z-40 hidden rounded-full border border-ink/15 bg-paper/80 px-2 py-2 backdrop-blur md:block"
      aria-label="Section progress"
    >
      <div className="flex flex-col gap-2">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`h-2.5 w-2.5 rounded-full border transition-colors ${
              active === section.id
                ? "border-signal bg-signal"
                : "border-trace bg-paperdeep hover:border-signal"
            }`}
            aria-label={`Jump to ${section.label}`}
            title={section.label}
          />
        ))}
      </div>
    </nav>
  );
}
