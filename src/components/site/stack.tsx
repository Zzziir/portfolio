"use client";

import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { riseVariants, staggerContainer } from "@/lib/motion";
import { techStack } from "@/lib/tech-stack";
import { Reveal } from "@/components/reveal";

/**
 * The tech stack as a hairline grid of real brand marks. Marks sit monochrome
 * at rest so the page keeps its single warm accent, then reveal their true
 * brand colour and lift on hover (feedback, not decoration). The grid lines are
 * gap-px over a faint background, so nothing doubles or flashes on entrance;
 * only the inner content staggers in.
 */
export function Stack() {
  return (
    <section id="stack" className="px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="text-5xl font-black tracking-tight sm:text-6xl">
            The stack
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
            The tools behind the work above, from first prototype to production.
          </p>
        </Reveal>

        <motion.ul
          variants={staggerContainer(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -12% 0px" }}
          className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:mt-14 sm:grid-cols-3 lg:grid-cols-4"
        >
          {techStack.map((tech) => (
            <li
              key={tech.name}
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
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
