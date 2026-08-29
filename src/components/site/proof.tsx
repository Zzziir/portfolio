import { proof } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { NumberTicker } from "@/components/magicui/number-ticker";

/** Slim proof band - the numbers, out of the hero, still early on the page. */
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
            <div className="flex items-baseline justify-center text-4xl font-semibold tracking-tight sm:text-5xl">
              {item.prefix && (
                <span className="whitespace-pre">{item.prefix}</span>
              )}
              <NumberTicker
                value={item.value}
                decimalPlaces={item.decimals ?? 0}
                delay={0.15 + i * 0.08}
                className="text-foreground"
              />
              {item.suffix && (
                <span className="whitespace-pre">{item.suffix}</span>
              )}
            </div>
            <div className="mt-2 text-sm text-muted-foreground">{item.label}</div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
