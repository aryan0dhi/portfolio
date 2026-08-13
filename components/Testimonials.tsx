import { testimonials } from "@/lib/data";
import Reveal from "./Reveal";

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative z-10 scroll-mt-28 bg-paperdeep">
      <div className="mx-auto max-w-content px-6 py-16 md:px-10 md:py-20">
        <Reveal>
          <p className="eyebrow mb-3 text-signal">Recommendations</p>
          <h2 className="section-heading max-w-xl">
            Third-party signal.
          </h2>
        </Reveal>

        <div className="mt-9 grid gap-4 md:grid-cols-2">
          {testimonials.map((item, i) => (
            <Reveal key={item.source} delay={i * 0.08}>
              <figure className="site-card h-full bg-paper/70 p-6">
                <blockquote className="font-serif text-2xl leading-snug text-ink">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-6 text-[13px] text-muted">
                  <span className="text-inksoft">{item.source}</span> · {item.context}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
