"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { Project } from "@/lib/content";
import { EASE_OUT } from "@/lib/motion";
import { Reveal } from "@/components/reveal";
import { ProjectMedia } from "@/components/site/project-media";
import { StackTags } from "@/components/site/stack-tags";
import { ArrowUpRight } from "@/components/icons";

export function ProjectDetail({ project }: { project: Project }) {
  const [first, ...rest] = project.sections;

  return (
    <article className="px-5 pb-24 pt-32 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/#work"
          className="group inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <span className="transition-transform group-hover:-translate-x-0.5">←</span>
          Back to work
        </Link>

        {/* Title - blur in */}
        <motion.h1
          initial={{ opacity: 0, filter: "blur(16px)", y: 10 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.1 }}
          className="mt-8 text-6xl font-black tracking-tight sm:text-8xl"
        >
          {project.name}
        </motion.h1>

        {/* Meta + description */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.35 }}
          className="mt-12 grid gap-8 md:grid-cols-2 md:items-start"
        >
          <div className="flex flex-col gap-8">
            <dl className="flex flex-wrap items-start gap-x-4 gap-y-4 font-mono text-sm">
              <Meta label="Category" value={project.category} />
              <Divider />
              <Meta label="Year" value={project.year} />
              {project.liveLink && (
                <>
                  <Divider />
                  <div className="flex flex-col gap-1.5">
                    <dt className="text-xs text-muted-foreground">Live Link</dt>
                    <dd>
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-1.5 text-foreground"
                      >
                        Visit
                        <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </dd>
                  </div>
                </>
              )}
            </dl>

            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs text-muted-foreground">
                Stack
              </span>
              <StackTags tags={project.tags} size="md" />
            </div>
          </div>
          <p className="text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            {project.summary}
          </p>
        </motion.div>

        {/* Hero image */}
        <Reveal className="mt-12" delay={0.1}>
          <ProjectMedia
            project={project}
            src={project.image}
            src2={project.platform === "mobile" ? project.image2 : undefined}
            aspect={project.platform === "web" ? "aspect-[16/9]" : "aspect-[16/10]"}
            rounded="rounded-2xl"
            className="w-full ring-1 ring-white/10"
            priority
          />
        </Reveal>

        {/* Body */}
        <div className="mt-16 max-w-3xl">
          <Section section={first} />
        </div>

        {/* Second image - web only; mobile shows both phones in the hero */}
        {rest.length > 0 && project.platform === "web" && project.image2 && (
          <Reveal className="mt-16" delay={0.05}>
            <ProjectMedia
              project={project}
              src={project.image2}
              aspect={project.image2Frame === "phone" ? "aspect-[16/10]" : "aspect-[16/9]"}
              rounded="rounded-2xl"
              className="w-full ring-1 ring-white/10"
              variant={project.image2Frame}
            />
          </Reveal>
        )}

        <div className="mt-16 max-w-3xl space-y-14">
          {rest.map((section) => (
            <Section key={section.heading} section={section} />
          ))}
        </div>
      </div>
    </article>
  );
}

function Section({ section }: { section: Project["sections"][number] }) {
  return (
    <Reveal as="section" delay={0.05}>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {section.heading}
      </h2>
      <div className="mt-5 space-y-4">
        {section.body.map((paragraph, i) => (
          <p
            key={i}
            className="text-pretty leading-relaxed text-muted-foreground"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </Reveal>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="text-foreground">{value}</dd>
    </div>
  );
}

function Divider() {
  return <span className="mt-6 text-white/20">/</span>;
}
