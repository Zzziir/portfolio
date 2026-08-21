import { services } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { ArrowUpRight } from "@/components/icons";

export function Services() {
  return (
    <section id="services" className="px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="text-5xl font-black tracking-tight sm:text-6xl">
            Services
          </h2>
        </Reveal>

        <ul className="mt-14 border-t border-white/10">
          {services.map((service, i) => (
            <Reveal as="li" key={service.title} delay={i * 0.05}>
              <div className="group relative flex items-center justify-between gap-6 border-b border-white/10 py-7 transition-colors hover:bg-white/[0.02] sm:py-8">
                <div className="flex items-center gap-4 sm:gap-6">
                  <ArrowUpRight className="size-5 shrink-0 -translate-x-2 text-brand opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  <h3 className="text-2xl font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-1 sm:text-3xl">
                    {service.title}
                  </h3>
                </div>
                <div className="hidden shrink-0 items-center gap-2 font-mono text-xs text-muted-foreground sm:flex">
                  {service.tags.map((tag, t) => (
                    <span key={tag} className="flex items-center gap-2">
                      {t > 0 && <span className="text-white/20">•</span>}
                      <span className="transition-colors group-hover:text-foreground">
                        {tag}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
