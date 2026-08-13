import { nowItems } from "@/lib/data";
import Reveal from "./Reveal";

export default function Now() {
  return (
    <section id="now" className="relative z-10 scroll-mt-28 bg-paper">
      <div className="mx-auto max-w-content px-6 py-8 md:px-10 md:py-10">
        <Reveal>
          <p className="eyebrow mb-3 text-signal">Now</p>
          <h2 className="section-heading max-w-2xl">
            Current operating state.
          </h2>
        </Reveal>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {nowItems.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08}>
              <div className="border-t site-divider pt-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-signal">
                  {item.label}
                </p>
                <p className="mt-3 text-[14px] leading-relaxed text-inksoft">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
