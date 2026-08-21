import { posts } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { ImagePlaceholder } from "@/components/site/placeholder";
import { ArrowUpRight } from "@/components/icons";

export function Thoughts() {
  return (
    <section className="px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="text-5xl font-black tracking-tight sm:text-6xl">
            Thoughts
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.07} className="h-full">
              <a
                href={`#`}
                className="group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-2xl p-6 ring-1 ring-white/10"
              >
                <div className="absolute inset-0 -z-10 transition-transform duration-700 ease-out group-hover:scale-[1.06]">
                  <ImagePlaceholder
                    accent="#4a4640"
                    rounded="rounded-none"
                    className="h-full w-full"
                  />
                </div>
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <time className="font-mono text-xs text-white/60">
                  {post.date}
                </time>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {post.excerpt}
                </p>
              </a>
            </Reveal>
          ))}

          {/* CTA card */}
          <Reveal delay={posts.length * 0.07} className="h-full">
            <div className="flex min-h-[420px] flex-col justify-between rounded-2xl bg-card p-6 ring-1 ring-white/10">
              <p className="text-pretty text-3xl font-semibold leading-tight tracking-tight">
                Notes on shipping products with clarity and craft — read the blog.
              </p>
              <a
                href="#"
                className="group inline-flex items-center gap-2 text-base font-medium"
              >
                View all work
                <span className="grid size-8 place-items-center rounded-lg border border-white/15 transition-colors group-hover:bg-foreground group-hover:text-background">
                  <ArrowUpRight className="size-4" />
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
