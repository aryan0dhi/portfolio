"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProjectKeyboardNav({
  previousId,
  nextId,
}: {
  previousId: string;
  nextId: string;
}) {
  const router = useRouter();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) return;
      if (event.key === "ArrowLeft") router.push(`/work/${previousId}`);
      if (event.key === "ArrowRight") router.push(`/work/${nextId}`);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nextId, previousId, router]);

  return null;
}
