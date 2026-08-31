"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { KineticText } from "@/components/magicui/kinetic-text";
import { SocialIcon, ArrowUpRight } from "@/components/icons";

type Status = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    project: "",
    website: "", // honeypot, stays empty for humans
  });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok: boolean; error?: string }
        | null;

      if (res.ok && data?.ok) {
        setStatus("success");
        return;
      }
      setStatus("error");
      setError(data?.error ?? "Something went wrong. Please try again.");
    } catch {
      setStatus("error");
      setError("Couldn't reach the server. Please try again.");
    }
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
              <KineticText
                as="h2"
                text="Let’s talk."
                className="text-6xl font-black tracking-tight sm:text-7xl"
              />
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
          {status === "success" ? (
            <SuccessPanel name={values.name} />
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-white/10 bg-card p-6 sm:p-8"
            >
              <Field label="Name" htmlFor="name">
                <input
                  id="name"
                  name="name"
                  required
                  maxLength={100}
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
                  maxLength={254}
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
                  maxLength={2000}
                  value={values.project}
                  onChange={set("project")}
                  placeholder="Tell me about your project"
                  className={`${inputClass} resize-none`}
                />
              </Field>

              {/* Honeypot: hidden from humans, catnip for bots. */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.website}
                  onChange={set("website")}
                />
              </div>

              {error && (
                <p role="alert" className="mb-4 text-sm text-[color:var(--brand-soft)]">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-2 w-full rounded-xl bg-foreground py-3.5 text-[15px] font-medium text-background transition-transform hover:opacity-95 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "submitting" ? "Sending…" : "Submit"}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function SuccessPanel({ name }: { name: string }) {
  const firstName = name.trim().split(" ")[0] || "there";
  return (
    <div className="flex h-full min-h-[320px] flex-col justify-center rounded-3xl border border-white/10 bg-card p-8 sm:p-10">
      <div className="grid size-11 place-items-center rounded-full border border-white/10 bg-background/50">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="size-5 text-foreground"
          aria-hidden="true"
        >
          <path
            d="m5 13 4 4L19 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h3 className="mt-5 text-2xl font-bold tracking-tight">
        Message sent, {firstName}.
      </h3>
      <p className="mt-3 max-w-sm text-pretty text-base leading-relaxed text-muted-foreground">
        It landed in my inbox and a confirmation is on its way to you. I reply
        within 24 hours.
      </p>
    </div>
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
