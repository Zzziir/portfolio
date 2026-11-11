import Link from "next/link";
import { brands, proof, type Brand } from "@/lib/content";
import { projectHref } from "@/lib/projects";
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

      {brands.length > 0 && (
        <Reveal
          delay={0.3}
          className="mx-auto mt-12 flex max-w-6xl flex-col items-center gap-4 border-t border-white/[0.06] pt-10 sm:mt-14 sm:flex-row sm:justify-center sm:gap-10"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            shipped for
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {brands.map((brand) => (
              <li key={brand.name}>
                <BrandMark brand={brand} />
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </section>
  );
}

function BrandMark({ brand }: { brand: Brand }) {
  const mark = brand.logo ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={brand.logo}
      alt={brand.name}
      height={28}
      className="h-7 w-auto opacity-60 grayscale transition-opacity duration-200 group-hover:opacity-100"
    />
  ) : (
    <span className="text-2xl font-semibold tracking-tight text-muted-foreground transition-colors duration-200 group-hover:text-foreground sm:text-3xl">
      {brand.name}
    </span>
  );

  if (!brand.slug) return mark;

  return (
    <Link
      href={projectHref(brand.slug)}
      aria-label={`${brand.name} case study`}
      className="group block rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
    >
      {mark}
    </Link>
  );
}
