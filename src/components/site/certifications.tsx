import { certifications } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { KineticText } from "@/components/magicui/kinetic-text";
import { ArrowUpRight } from "@/components/icons";

/** Credibility strip: the certifications that back the Solutions Architect
 * positioning. Badge art lives in /public/assets/certifications/. */
export function Certifications() {
  if (certifications.length === 0) return null;

  return (
    <section id="certifications" className="px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <KineticText
            as="h2"
            text="Certifications"
            className="text-5xl font-black tracking-tight sm:text-6xl"
          />
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {certifications.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.07} className="h-full">
              <article className="flex h-full items-center gap-5 rounded-2xl border border-white/10 bg-card p-6">
                <div
                  className="grid size-24 shrink-0 place-items-center rounded-2xl ring-1 ring-white/10"
                  style={{
                    backgroundImage: `radial-gradient(circle at 50% 35%, ${c.accent}1f, transparent 70%)`,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.image}
                    alt={`${c.name} badge`}
                    width={80}
                    height={80}
                    className="size-20"
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="text-lg font-semibold leading-snug tracking-tight text-pretty">
                    {c.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {c.issuer} · {c.issued}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {c.code && (
                      <span className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                        {c.code}
                      </span>
                    )}
                    {c.credentialUrl && (
                      <a
                        href={c.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                      >
                        Verify
                        <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
