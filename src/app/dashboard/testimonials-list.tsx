"use client";

import { useMemo, useState, useTransition } from "react";
import {
  TESTIMONIAL_STATUSES,
  type Testimonial,
  type TestimonialStatus,
} from "@/lib/testimonials";
import { updateTestimonialStatus } from "./actions";

type Filter = "all" | TestimonialStatus;

const FILTERS: Filter[] = ["all", "pending", "approved", "hidden"];

export function TestimonialsList({ items }: { items: Testimonial[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(
    () =>
      filter === "all" ? items : items.filter((t) => t.status === filter),
    [items, filter],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const count =
            f === "all" ? items.length : items.filter((t) => t.status === f).length;
          const active = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-3 py-1.5 text-sm capitalize transition-colors ${
                active
                  ? "border-transparent bg-foreground text-background"
                  : "border-white/10 text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
              }`}
            >
              {f} <span className="opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <p className="mt-10 text-sm text-muted-foreground">
          No feedback here yet.
        </p>
      ) : (
        <ul className="mt-6 space-y-4">
          {visible.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </ul>
      )}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const [pending, startTransition] = useTransition();
  const isPending = testimonial.status === "pending";

  function onChangeStatus(status: TestimonialStatus) {
    startTransition(() => updateTestimonialStatus(testimonial.id, status));
  }

  return (
    <li
      className={`rounded-2xl border bg-card p-5 transition-opacity ${
        pending ? "opacity-60" : ""
      } ${isPending ? "border-[color:var(--brand)]/40" : "border-white/10"}`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="text-lg font-semibold text-foreground">
          {testimonial.name}
        </h2>
        <time
          className="text-xs text-muted-foreground"
          dateTime={testimonial.created_at}
        >
          {formatDate(testimonial.created_at)}
        </time>
      </div>

      <p className="mt-0.5 text-sm text-muted-foreground">{testimonial.title}</p>

      <blockquote className="mt-3 whitespace-pre-wrap text-[15px] leading-relaxed text-foreground/90">
        {testimonial.quote}
      </blockquote>

      <div className="mt-4 flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Status</span>
        <select
          value={testimonial.status}
          disabled={pending}
          onChange={(e) => onChangeStatus(e.target.value as TestimonialStatus)}
          className="rounded-lg border border-white/10 bg-background/50 px-2.5 py-1.5 text-sm capitalize text-foreground outline-none transition-colors focus:border-white/25"
        >
          {TESTIMONIAL_STATUSES.map((status) => (
            <option key={status} value={status} className="bg-card">
              {status}
            </option>
          ))}
        </select>
      </div>
    </li>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
