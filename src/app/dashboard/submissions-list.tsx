"use client";

import { useMemo, useState, useTransition } from "react";
import {
  SUBMISSION_STATUSES,
  type ContactSubmission,
  type SubmissionStatus,
} from "@/lib/contact";
import { updateStatus } from "./actions";

type Filter = "all" | SubmissionStatus;

const FILTERS: Filter[] = ["all", "new", "read", "replied", "archived"];

export function SubmissionsList({
  submissions,
}: {
  submissions: ContactSubmission[];
}) {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(
    () =>
      filter === "all"
        ? submissions
        : submissions.filter((s) => s.status === filter),
    [submissions, filter],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const count =
            f === "all"
              ? submissions.length
              : submissions.filter((s) => s.status === f).length;
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
          No messages here yet.
        </p>
      ) : (
        <ul className="mt-6 space-y-4">
          {visible.map((s) => (
            <SubmissionCard key={s.id} submission={s} />
          ))}
        </ul>
      )}
    </div>
  );
}

function SubmissionCard({ submission }: { submission: ContactSubmission }) {
  const [pending, startTransition] = useTransition();
  const isNew = submission.status === "new";

  function onChangeStatus(status: SubmissionStatus) {
    startTransition(() => updateStatus(submission.id, status));
  }

  return (
    <li
      className={`rounded-2xl border bg-card p-5 transition-opacity ${
        pending ? "opacity-60" : ""
      } ${isNew ? "border-[color:var(--brand)]/40" : "border-white/10"}`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="text-lg font-semibold text-foreground">
          {submission.name}
        </h2>
        <time className="text-xs text-muted-foreground" dateTime={submission.created_at}>
          {formatDate(submission.created_at)}
        </time>
      </div>

      <a
        href={`mailto:${submission.email}?subject=${encodeURIComponent(
          `Re: your message`,
        )}`}
        className="mt-0.5 inline-block text-sm text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
      >
        {submission.email}
      </a>

      <p className="mt-3 whitespace-pre-wrap text-[15px] leading-relaxed text-foreground/90">
        {submission.message}
      </p>

      <div className="mt-4 flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Status</span>
        <select
          value={submission.status}
          disabled={pending}
          onChange={(e) => onChangeStatus(e.target.value as SubmissionStatus)}
          className="rounded-lg border border-white/10 bg-background/50 px-2.5 py-1.5 text-sm capitalize text-foreground outline-none transition-colors focus:border-white/25"
        >
          {SUBMISSION_STATUSES.map((status) => (
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
