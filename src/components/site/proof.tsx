import { proof } from "@/lib/content";
import { Reveal } from "@/components/reveal";

/** Slim proof band — the numbers, out of the hero, still early on the page. */
export function Proof() {
  return (
    <section className="border-y border-white/10 px-5 py-14 sm:px-8 sm:py-16">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 sm:grid-cols-4">
        {proof.map((item, i) => (
          <Reveal
            as="li"
            key={item.label}
            delay={i * 0.08}
            className="px-4 text-center sm:border-l sm:border-white/10 sm:first:border-l-0"
          >
            <div className="text-4xl font-semibold tracking-tight sm:text-5xl">
              {item.value}
            </div>
            <div className="mt-2 text-sm text-muted-foreground">{item.label}</div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
