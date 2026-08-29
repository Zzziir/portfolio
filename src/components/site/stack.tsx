"use client";

import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { riseVariants, staggerContainer } from "@/lib/motion";
import { stackGroups, type Tech } from "@/lib/tech-stack";
import { Reveal } from "@/components/reveal";
import { KineticText } from "@/components/magicui/kinetic-text";

/**
 * The tech stack as hairline grids of real brand marks, split into a couple of
 * labelled clusters so it reads as a workflow (build, then design) rather than
 * a bag of logos. Marks sit monochrome at rest so the page keeps its single
 * warm accent, then reveal their true brand colour and lift on hover. Grid
 * lines are gap-px over a faint background, so nothing doubles or flashes on
 * entrance; only the inner content staggers in.
 */
export function Stack() {
  return (
    <section id="stack" className="px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <KineticText
            as="h2"
            text="The stack"
            className="text-5xl font-black tracking-tight sm:text-6xl"
          />
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
            The tools behind the work above, from first sketch to production.
          </p>
        </Reveal>

        {stackGroups.map((group, i) => (
          <div key={group.label} className={i === 0 ? "mt-12 sm:mt-14" : "mt-12"}>
            <Reveal>
              <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                {group.label}
              </h3>
            </Reveal>
            <motion.ul
              variants={staggerContainer(0.05)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
              className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-4"
            >
              {group.items.map((tech) => (
                <StackCell key={tech.name} tech={tech} />
              ))}
            </motion.ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function StackCell({ tech }: { tech: Tech }) {
  return (
    <li
      className="group bg-background"
      style={{ "--c": tech.color } as CSSProperties}
    >
      <motion.div
        variants={riseVariants}
        className="flex h-full flex-col items-center justify-center gap-3 px-4 py-9 sm:py-11"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="size-7 fill-current text-foreground/40 transition-[color,transform] duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:[color:var(--c)] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
        >
          <path d={tech.path} />
        </svg>
        <span className="font-mono text-xs tracking-tight text-muted-foreground transition-colors duration-200 group-hover:text-foreground">
          {tech.name}
        </span>
      </motion.div>
    </li>
  );
}
