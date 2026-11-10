"use client";

import { useMemo, useState, useTransition } from "react";
import type { Testimonial, TestimonialStatus } from "@/lib/testimonials";
import { updateTestimonialStatus } from "../actions";

type Filter = "all" | TestimonialStatus;

/** "Rejected" is the `hidden` status: off the site, recoverable. */
const FILTERS: { value: Filter; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "hidden", label: "Rejected" },
  { value: "all", label: "All" },
];

export function TestimonialsList({ items }: { items: Testimonial[] }) {
  const [filter, setFilter] = useState<Filter>("pending");

  const visible = useMemo(
    () =>
      filter === "all" ? items : items.filter((t) => t.status === filter),
    [items, filter],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map(({ value: f, label }) => {
          const count =
            f === "all" ? items.length : items.filter((t) => t.status === f).length;
          const active = filter === f;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-3 py-1.5 text-sm capitalize transition-colors ${
                active
                  ? "border-transparent bg-foreground text-background"
                  : "border-white/10 text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
              }`}
            >
              {label} <span className="opacity-60">{count}</span>
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

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {testimonial.status !== "approved" && (
          <button
            type="button"
            disabled={pending}
            onClick={() => onChangeStatus("approved")}
            className="rounded-lg bg-foreground px-3 py-1.5 text-sm font-medium text-background transition-[opacity,transform] duration-150 hover:opacity-90 active:scale-[0.97] disabled:opacity-60"
          >
            Approve
          </button>
        )}
        {testimonial.status !== "hidden" && (
          <button
            type="button"
            disabled={pending}
            onClick={() => onChangeStatus("hidden")}
            className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-muted-foreground transition-[color,background-color,transform] duration-150 hover:bg-white/[0.04] hover:text-foreground active:scale-[0.97] disabled:opacity-60"
          >
            {testimonial.status === "approved" ? "Unpublish" : "Reject"}
          </button>
        )}
        {testimonial.status !== "pending" && (
          <span className="ml-auto text-xs text-muted-foreground">
            {testimonial.status === "approved" ? "On the homepage" : "Rejected"}
          </span>
        )}
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
