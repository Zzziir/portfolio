import { projects, type Project } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { ImagePlaceholder } from "@/components/site/placeholder";
import { ArrowUpRight } from "@/components/icons";

export function Work() {
  const [lead, ...rest] = projects;

  return (
    <section id="work" className="px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-6">
          <Reveal>
            <h2 className="text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl">
              Featured
              <br />
              Work
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href="#contact"
              className="group inline-flex items-center gap-1.5 pb-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              View all work
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-x-6 gap-y-12">
          <Reveal>
            <ProjectCard project={lead} large />
          </Reveal>
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2">
            {rest.map((project, i) => (
              <Reveal key={project.slug} delay={i * 0.08}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, large }: { project: Project; large?: boolean }) {
  return (
    <a
      href={project.href}
      className="group block transition-transform duration-500 hover:-translate-y-1"
    >
      <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
        <div className="transition-transform duration-700 ease-out group-hover:scale-[1.04]">
          <ImagePlaceholder
            accent={project.accent}
            rounded="rounded-none"
            label={project.name}
            className={large ? "aspect-[16/9]" : "aspect-[4/3]"}
          />
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-start justify-between gap-4">
          <h3
            className={`font-semibold tracking-tight ${
              large ? "text-3xl sm:text-4xl" : "text-2xl"
            }`}
          >
            {project.result}
          </h3>
          <span className="mt-1 shrink-0 font-mono text-xs text-muted-foreground">
            {project.year}
          </span>
        </div>

        <p className="mt-1.5 text-sm text-muted-foreground">{project.context}</p>

        {/* Rule 05 — lead with the decision */}
        <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground/80">
          {project.decision}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
