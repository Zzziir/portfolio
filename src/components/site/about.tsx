import { about, site } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { ImagePlaceholder } from "@/components/site/placeholder";
import { ArrowUpRight } from "@/components/icons";

export function About() {
  return (
    <section id="about" className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-12 md:items-center md:gap-8">
        {/* greeting + intro */}
        <div className="flex flex-col justify-between md:col-span-4 md:h-[420px]">
          <Reveal>
            <h2 className="text-6xl font-black tracking-tight sm:text-7xl">
              {about.greeting}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xs text-pretty text-lg font-medium leading-snug md:mt-0">
              {about.lead}
            </p>
          </Reveal>
        </div>

        {/* portrait */}
        <Reveal delay={0.05} className="md:col-span-4">
          <ImagePlaceholder
            className="mx-auto aspect-[4/5] w-full max-w-[340px] ring-1 ring-white/10"
            monogram={`${site.firstName[0]}${site.lastName[0]}`}
            label="portrait"
          />
        </Reveal>

        {/* body + cta */}
        <div className="md:col-span-4">
          <Reveal delay={0.1}>
            <p className="text-pretty text-base leading-relaxed text-muted-foreground">
              {site.metaDescription.split("—")[0].trim()}. {about.body}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href={about.cta.href}
              className="group mt-8 inline-flex items-center gap-2 text-base font-medium"
            >
              {about.cta.label}
              <span className="grid size-8 place-items-center rounded-lg border border-white/15 transition-colors group-hover:bg-foreground group-hover:text-background">
                <ArrowUpRight className="size-4" />
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
