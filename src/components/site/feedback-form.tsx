"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

type Status = "idle" | "working" | "success" | "error";

/**
 * The labor-illusion steps. The request usually resolves in well under a
 * second; we deliberately pace the UI through these so the submit feels like
 * real work is happening (which it is: it's saved and queued for review). This
 * raises perceived value and trust versus a bare spinner.
 */
const STEPS = [
  "Saving your words",
  "Checking it over",
  "Sending to Lance for review",
] as const;

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function FeedbackForm() {
  const [values, setValues] = useState({
    quote: "",
    name: "",
    title: "",
    website: "", // honeypot, stays empty for humans
  });
  const [status, setStatus] = useState<Status>("idle");
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Clear any pending step timers if the component unmounts mid-submit.
  useEffect(() => {
    const t = timers.current;
    return () => t.forEach(clearTimeout);
  }, []);

  const set =
    (key: keyof typeof values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [key]: e.target.value }));

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setStep(0);
    setStatus("working");

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const perStep = reduce ? 260 : 780;
    const minDuration = perStep * STEPS.length;

    timers.current.forEach(clearTimeout);
    timers.current = [];
    for (let i = 1; i < STEPS.length; i++) {
      timers.current.push(setTimeout(() => setStep(i), perStep * i));
    }

    const request = fetch("/api/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then(async (res) => {
        const data = (await res.json().catch(() => null)) as
          | { ok: boolean; error?: string }
          | null;
        return {
          ok: res.ok && Boolean(data?.ok),
          error: data?.error,
        };
      })
      .catch(() => ({
        ok: false,
        error: "Couldn't reach the server. Please try again.",
      }));

    // Hold the labor illusion for at least its full run, even if the network
    // beat it, so the steps never flicker past.
    const [result] = await Promise.all([request, delay(minDuration)]);

    if (result.ok) {
      setStep(STEPS.length);
      setStatus("success");
    } else {
      setStatus("error");
      setError(result.error ?? "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return <SuccessPanel name={values.name} />;
  }

  return (
    <div className="relative rounded-3xl border border-white/10 bg-card p-6 sm:p-8">
      <h3 className="text-xl font-semibold tracking-tight">
        Worked with me? Leave a note.
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        One quote, two details. It shows up here once I approve it.
      </p>

      <form onSubmit={handleSubmit} className="mt-6">
        <Field label="Your feedback" htmlFor="quote">
          <textarea
            id="quote"
            name="quote"
            required
            rows={4}
            minLength={10}
            maxLength={600}
            value={values.quote}
            onChange={set("quote")}
            placeholder="What was it like working together?"
            className={`${inputClass} resize-none`}
          />
        </Field>

        <div className="grid gap-x-4 sm:grid-cols-2">
          <Field label="Name" htmlFor="fb-name">
            <input
              id="fb-name"
              name="name"
              required
              maxLength={80}
              value={values.name}
              onChange={set("name")}
              placeholder="Jane Dela Cruz"
              className={inputClass}
            />
          </Field>
          <Field label="Role / company" htmlFor="fb-title">
            <input
              id="fb-title"
              name="title"
              required
              maxLength={120}
              value={values.title}
              onChange={set("title")}
              placeholder="Head of Product, Acme"
              className={inputClass}
            />
          </Field>
        </div>

        {/* Honeypot: hidden from humans, catnip for bots. */}
        <div
          aria-hidden="true"
          className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
        >
          <label htmlFor="fb-website">Website</label>
          <input
            id="fb-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={set("website")}
          />
        </div>

        {error && (
          <p
            role="alert"
            className="mb-4 text-sm text-[color:var(--brand-soft)]"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          className="mt-1 w-full rounded-xl bg-foreground py-3.5 text-[15px] font-medium text-background transition-transform hover:opacity-95 active:scale-[0.99]"
        >
          Share feedback
        </button>
      </form>

      {status === "working" && <LaborOverlay step={step} />}
    </div>
  );
}

/** The labor-illusion overlay: stepped progress that reads as real work. */
function LaborOverlay({ step }: { step: number }) {
  const pct = Math.min(step, STEPS.length) / STEPS.length;
  return (
    <div
      className="absolute inset-0 flex flex-col justify-center rounded-3xl border border-white/10 bg-card/95 p-8 backdrop-blur-sm"
      role="status"
      aria-live="polite"
    >
      <div className="mx-auto w-full max-w-xs">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-foreground transition-[width] duration-700 ease-out motion-reduce:transition-none"
            style={{ width: `${Math.max(pct, 0.08) * 100}%` }}
          />
        </div>

        <ul className="mt-6 space-y-3">
          {STEPS.map((label, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <li
                key={label}
                className={`flex items-center gap-3 text-sm transition-colors ${
                  done || active ? "text-foreground" : "text-muted-foreground/50"
                }`}
              >
                <StepMark done={done} active={active} />
                <span>{label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function StepMark({ done, active }: { done: boolean; active: boolean }) {
  if (done) {
    return (
      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-foreground text-background">
        <svg viewBox="0 0 24 24" fill="none" className="size-3" aria-hidden>
          <path
            d="m5 13 4 4L19 7"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }
  return (
    <span
      className={`grid size-5 shrink-0 place-items-center rounded-full ring-1 ring-white/15 ${
        active ? "bg-white/5" : ""
      }`}
    >
      {active && (
        <span className="size-2 animate-pulse rounded-full bg-foreground motion-reduce:animate-none" />
      )}
    </span>
  );
}

function SuccessPanel({ name }: { name: string }) {
  const firstName = name.trim().split(" ")[0] || "there";
  return (
    <div className="flex min-h-[320px] flex-col justify-center rounded-3xl border border-white/10 bg-card p-8 sm:p-10">
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
        Got it, {firstName}.
      </h3>
      <p className="mt-3 max-w-sm text-pretty text-base leading-relaxed text-muted-foreground">
        Your feedback is saved and queued for review. It appears in this section
        once I approve it.
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
