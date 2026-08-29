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
            {/* headline row with a shared min height so number and word stats
                keep their labels on the same line; fixed on desktop, growing on
                mobile so a wrapped phrase isn't clipped */}
            <div className="flex min-h-14 items-center justify-center sm:h-14">
              {item.text ? (
                // sized down from the numbers so a phrase like
                // "iOS · Android · web" stays tidy in a narrow cell
                <span className="text-balance text-xl font-semibold tracking-tight text-foreground sm:text-[1.75rem]">
                  {item.text}
                </span>
              ) : (
                <span className="flex items-baseline text-4xl font-semibold tracking-tight sm:text-5xl">
                  {item.prefix && (
                    <span className="whitespace-pre">{item.prefix}</span>
                  )}
                  <NumberTicker
                    value={item.value ?? 0}
                    decimalPlaces={item.decimals ?? 0}
                    useGrouping={item.grouping ?? true}
                    delay={0.15 + i * 0.08}
                    className="text-foreground"
                  />
                  {item.suffix && (
                    <span className="whitespace-pre">{item.suffix}</span>
                  )}
                </span>
              )}
            </div>
            <div className="mt-2 text-sm text-muted-foreground">{item.label}</div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
