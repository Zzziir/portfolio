import { testimonials } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { KineticText } from "@/components/magicui/kinetic-text";

export function Testimonials() {
  return (
    <section className="px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <KineticText
            as="h2"
            text="Testimonials"
            className="text-5xl font-black tracking-tight sm:text-6xl"
          />
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.07} className="h-full">
              <figure className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-card p-6">
                <blockquote className="text-pretty text-[15px] leading-relaxed">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3">
                  <span
                    className="grid size-9 shrink-0 place-items-center rounded-full font-mono text-[11px] text-white/70 ring-1 ring-white/10"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 30% 25%, #3a3730, #17150f)",
                    }}
                    aria-hidden
                  >
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <div className="leading-tight">
                    <div className="text-sm font-medium">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.title}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
