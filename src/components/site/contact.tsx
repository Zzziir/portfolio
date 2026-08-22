"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { SocialIcon, ArrowUpRight } from "@/components/icons";

export function Contact() {
  const [values, setValues] = useState({ name: "", email: "", project: "" });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Project inquiry from ${values.name || "a visitor"}`,
    );
    const body = encodeURIComponent(
      `${values.project}\n\n- ${values.name}\n${values.email}`,
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }

  const set = (key: keyof typeof values) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setValues((v) => ({ ...v, [key]: e.target.value }));

  return (
    <section id="contact" className="px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:gap-16">
        {/* Left: pitch + direct contact */}
        <div className="flex flex-col justify-between gap-10">
          <div>
            <Reveal>
              <h2 className="text-6xl font-black tracking-tight sm:text-7xl">
                Let’s talk.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
                Have a role or a problem worth solving? Tell me about it - I reply
                within 24 hours.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <a
                href={`mailto:${site.email}`}
                className="group mt-6 inline-flex items-center gap-2 text-lg font-medium underline-offset-4 hover:underline"
              >
                {site.email}
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="flex items-center gap-3">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid size-11 place-items-center rounded-xl border border-white/10 text-muted-foreground transition-colors hover:bg-white/[0.04] hover:text-foreground"
                >
                  <SocialIcon label={s.label} className="size-[18px]" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right: form */}
        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-white/10 bg-card p-6 sm:p-8"
          >
            <Field label="Name" htmlFor="name">
              <input
                id="name"
                name="name"
                required
                value={values.name}
                onChange={set("name")}
                placeholder="Enter your name"
                className={inputClass}
              />
            </Field>
            <Field label="Email" htmlFor="email">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={values.email}
                onChange={set("email")}
                placeholder="Enter your email"
                className={inputClass}
              />
            </Field>
            <Field label="Your project" htmlFor="project">
              <textarea
                id="project"
                name="project"
                required
                rows={4}
                value={values.project}
                onChange={set("project")}
                placeholder="Tell me about your project"
                className={`${inputClass} resize-none`}
              />
            </Field>
            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-foreground py-3.5 text-[15px] font-medium text-background transition-transform hover:opacity-95 active:scale-[0.99]"
            >
              Submit
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-[15px] text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-white/25 focus:ring-2 focus:ring-white/10";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-sm font-medium text-foreground"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
