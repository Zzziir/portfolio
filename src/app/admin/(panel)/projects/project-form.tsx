"use client";

import { useId, useState, useTransition, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, ExternalLink, Plus, Trash2 } from "lucide-react";
import {
  projectHref,
  type Project,
  type ProjectInput,
  type ProjectPlacement,
  type ProjectPlatform,
} from "@/lib/projects";
import { deleteProject, saveProject } from "../actions";
import { ImageField, inputClass } from "./image-field";

type SectionDraft = { key: string; heading: string; body: string };

type FormState = {
  name: string;
  slug: string;
  result: string;
  context: string;
  decision: string;
  category: string;
  year: string;
  tags: string;
  accent: string;
  placement: ProjectPlacement;
  platform: ProjectPlatform;
  image: string;
  image2: string;
  image2Phone: boolean;
  useCard: boolean;
  cardSrc: string;
  cardFit: "logo" | "contain";
  cardBg: string;
  liveLink: string;
  summary: string;
  sections: SectionDraft[];
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const newKey = () => crypto.randomUUID();

function initialState(project?: Project): FormState {
  return {
    name: project?.name ?? "",
    slug: project?.slug ?? "",
    result: project?.result ?? "",
    context: project?.context ?? "",
    decision: project?.decision ?? "",
    category: project?.category ?? "",
    year: project?.year ?? String(new Date().getFullYear()),
    tags: project?.tags.join(", ") ?? "",
    accent: project?.accent ?? "#ea3a28",
    placement: project?.placement ?? "more",
    platform: project?.platform ?? "web",
    image: project?.image ?? "",
    image2: project?.image2 ?? "",
    image2Phone: project?.image2Frame === "phone",
    useCard: Boolean(project?.card),
    cardSrc: project?.card?.src ?? "",
    cardFit: project?.card?.fit ?? "logo",
    cardBg: project?.card?.bg ?? "",
    liveLink: project?.liveLink ?? "",
    summary: project?.summary ?? "",
    sections: (
      project?.sections ?? [{ heading: "The decision", body: [] }]
    ).map((s) => ({ key: newKey(), heading: s.heading, body: s.body.join("\n\n") })),
  };
}

/** Paragraphs are separated by a blank line in the textarea. */
function toInput(state: FormState): ProjectInput {
  return {
    name: state.name,
    slug: state.slug,
    result: state.result,
    context: state.context,
    decision: state.decision,
    category: state.category,
    year: state.year,
    tags: state.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    accent: state.accent,
    placement: state.placement,
    platform: state.platform,
    image: state.image,
    image2: state.image2,
    image2Frame: state.image2Phone ? "phone" : undefined,
    card:
      state.useCard && state.cardSrc
        ? {
            src: state.cardSrc,
            fit: state.cardFit,
            bg: state.cardBg || undefined,
          }
        : undefined,
    liveLink: state.liveLink,
    summary: state.summary,
    sections: state.sections.map((s) => ({
      heading: s.heading,
      body: s.body
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean),
    })),
  };
}

export function ProjectForm({ project }: { project?: Project }) {
  const router = useRouter();
  const [state, setState] = useState(() => initialState(project));
  const [slugTouched, setSlugTouched] = useState(Boolean(project));
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(
    null,
  );
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [pending, startTransition] = useTransition();

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setState((s) => ({ ...s, [key]: value }));

  function setName(name: string) {
    setState((s) => ({ ...s, name, slug: slugTouched ? s.slug : slugify(name) }));
  }

  function updateSection(key: string, patch: Partial<SectionDraft>) {
    set(
      "sections",
      state.sections.map((s) => (s.key === key ? { ...s, ...patch } : s)),
    );
  }

  function moveSection(index: number, delta: -1 | 1) {
    const next = [...state.sections];
    const target = index + delta;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    set("sections", next);
  }

  function onSave() {
    setStatus(null);
    startTransition(async () => {
      const result = await saveProject(project?.id ?? null, toInput(state));
      if (!result.ok) {
        setStatus({ ok: false, text: result.error });
        return;
      }
      if (!project) {
        router.replace(`/admin/projects/${result.data.id}?created=1`);
        return;
      }
      setStatus({ ok: true, text: "Saved. Live on the site." });
    });
  }

  function onDelete() {
    if (!project) return;
    startTransition(async () => {
      const result = await deleteProject(project.id);
      if (!result.ok) {
        setStatus({ ok: false, text: result.error });
        setConfirmDelete(false);
        return;
      }
      router.replace("/admin");
    });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave();
      }}
      className="pb-28"
    >
      <Fieldset
        title="Card"
        hint="What shows on the homepage. The result line is the headline: give it a number or an outcome."
      >
        <Field label="Name">
          {(id) => (
            <input
              id={id}
              required
              value={state.name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
          )}
        </Field>
        <Field label="Result headline" hint="e.g. “Order-ahead coffee app live across 2 branches”">
          {(id) => (
            <input
              id={id}
              required
              value={state.result}
              onChange={(e) => set("result", e.target.value)}
              className={inputClass}
            />
          )}
        </Field>
        <Field label="Context" hint="What it is · who it was for">
          {(id) => (
            <input
              id={id}
              required
              value={state.context}
              onChange={(e) => set("context", e.target.value)}
              className={inputClass}
            />
          )}
        </Field>
        <Field label="Decision" hint="Lead with the call you made and why.">
          {(id) => (
            <textarea
              id={id}
              required
              rows={3}
              value={state.decision}
              onChange={(e) => set("decision", e.target.value)}
              className={textareaClass}
            />
          )}
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Tags" hint="Comma-separated">
            {(id) => (
              <input
                id={id}
                value={state.tags}
                onChange={(e) => set("tags", e.target.value)}
                className={inputClass}
              />
            )}
          </Field>
          <Field label="Year">
            {(id) => (
              <input
                id={id}
                required
                value={state.year}
                onChange={(e) => set("year", e.target.value)}
                className={inputClass}
              />
            )}
          </Field>
        </div>

        <Choice
          label="Group"
          value={state.placement}
          onChange={(v) => set("placement", v)}
          options={[
            { value: "featured", label: "Featured" },
            { value: "more", label: "More builds" },
          ]}
        />

        <div className="space-y-4 rounded-xl border border-white/10 p-4">
          <label className="flex items-center gap-2.5 text-sm text-foreground">
            <input
              type="checkbox"
              checked={state.useCard}
              onChange={(e) => set("useCard", e.target.checked)}
              className="size-4 accent-[color:var(--brand)]"
            />
            Use a logo or contained image on the card instead of the cover
          </label>
          {state.useCard && (
            <>
              <ImageField
                label="Card image"
                value={state.cardSrc}
                onChange={(v) => set("cardSrc", v)}
                slug={state.slug}
                contain
              />
              <div className="grid gap-5 sm:grid-cols-2">
                <Choice
                  label="Fit"
                  value={state.cardFit}
                  onChange={(v) => set("cardFit", v)}
                  options={[
                    { value: "logo", label: "Logo" },
                    { value: "contain", label: "Contained UI" },
                  ]}
                />
                <Field label="Tile background" hint="Match the logo's own background, or leave empty">
                  {(id) => (
                    <input
                      id={id}
                      value={state.cardBg}
                      placeholder="#ffffff"
                      onChange={(e) => set("cardBg", e.target.value)}
                      className={inputClass}
                    />
                  )}
                </Field>
              </div>
            </>
          )}
        </div>
      </Fieldset>

      <Fieldset title="Detail page" hint="The case study at /work/<slug>. Keep it under a 3-minute read.">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Slug" hint={`/work/${state.slug || "…"}`}>
            {(id) => (
              <input
                id={id}
                required
                value={state.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  set("slug", slugify(e.target.value));
                }}
                className={inputClass}
              />
            )}
          </Field>
          <Field label="Category">
            {(id) => (
              <input
                id={id}
                required
                value={state.category}
                onChange={(e) => set("category", e.target.value)}
                className={inputClass}
              />
            )}
          </Field>
        </div>
        <Field label="Summary">
          {(id) => (
            <textarea
              id={id}
              required
              rows={3}
              value={state.summary}
              onChange={(e) => set("summary", e.target.value)}
              className={textareaClass}
            />
          )}
        </Field>
        <div className="grid gap-5 sm:grid-cols-[1fr_auto]">
          <Field label="Live link" hint="Optional">
            {(id) => (
              <input
                id={id}
                type="url"
                value={state.liveLink}
                placeholder="https://"
                onChange={(e) => set("liveLink", e.target.value)}
                className={inputClass}
              />
            )}
          </Field>
          <Field label="Accent">
            {(id) => (
              <input
                id={id}
                type="color"
                value={state.accent}
                onChange={(e) => set("accent", e.target.value)}
                className="h-10 w-16 cursor-pointer rounded-lg border border-white/10 bg-transparent p-1"
              />
            )}
          </Field>
        </div>

        <Choice
          label="Screenshots are"
          value={state.platform}
          onChange={(v) => set("platform", v)}
          options={[
            { value: "web", label: "Web (fill the frame)" },
            { value: "mobile", label: "Mobile (iPhone mock)" },
          ]}
        />
        <ImageField
          label="Cover image"
          hint="Card and detail hero"
          value={state.image}
          onChange={(v) => set("image", v)}
          slug={state.slug}
        />
        <ImageField
          label="Second image"
          hint="Optional, shown on the detail page"
          value={state.image2}
          onChange={(v) => set("image2", v)}
          slug={state.slug}
        />
        {state.platform === "web" && state.image2 && (
          <label className="flex items-center gap-2.5 text-sm text-foreground">
            <input
              type="checkbox"
              checked={state.image2Phone}
              onChange={(e) => set("image2Phone", e.target.checked)}
              className="size-4 accent-[color:var(--brand)]"
            />
            Frame the second image in an iPhone
          </label>
        )}

        <div>
          <p className="text-sm font-medium text-foreground">Sections</p>
          <p className="text-xs text-muted-foreground">
            Separate paragraphs with a blank line.
          </p>
          <ol className="mt-3 space-y-4">
            {state.sections.map((section, index) => (
              <li
                key={section.key}
                className="space-y-3 rounded-xl border border-white/10 p-4"
              >
                <div className="flex items-center gap-2">
                  <input
                    aria-label={`Section ${index + 1} heading`}
                    value={section.heading}
                    placeholder="Heading"
                    onChange={(e) =>
                      updateSection(section.key, { heading: e.target.value })
                    }
                    className={inputClass}
                  />
                  <SmallIconButton
                    label={`Move section ${index + 1} up`}
                    disabled={index === 0}
                    onClick={() => moveSection(index, -1)}
                  >
                    <ArrowUp className="size-4" aria-hidden />
                  </SmallIconButton>
                  <SmallIconButton
                    label={`Move section ${index + 1} down`}
                    disabled={index === state.sections.length - 1}
                    onClick={() => moveSection(index, 1)}
                  >
                    <ArrowDown className="size-4" aria-hidden />
                  </SmallIconButton>
                  <SmallIconButton
                    label={`Remove section ${index + 1}`}
                    onClick={() =>
                      set(
                        "sections",
                        state.sections.filter((s) => s.key !== section.key),
                      )
                    }
                  >
                    <Trash2 className="size-4" aria-hidden />
                  </SmallIconButton>
                </div>
                <textarea
                  aria-label={`Section ${index + 1} body`}
                  rows={5}
                  value={section.body}
                  onChange={(e) =>
                    updateSection(section.key, { body: e.target.value })
                  }
                  className={textareaClass}
                />
              </li>
            ))}
          </ol>
          <button
            type="button"
            onClick={() =>
              set("sections", [
                ...state.sections,
                { key: newKey(), heading: "", body: "" },
              ])
            }
            className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-dashed border-white/15 px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/[0.04] hover:text-foreground"
          >
            <Plus className="size-4" aria-hidden />
            Add section
          </button>
        </div>
      </Fieldset>

      {project && (
        <Fieldset title="Delete" hint="Removes the project and its page for good.">
          {confirmDelete ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-foreground">
                Delete {project.name} permanently?
              </span>
              <button
                type="button"
                disabled={pending}
                onClick={onDelete}
                className="rounded-lg bg-red-500/90 px-3 py-1.5 text-sm font-medium text-white transition-[opacity,transform] duration-150 hover:opacity-90 active:scale-[0.97] disabled:opacity-60"
              >
                Yes, delete
              </button>
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 px-3 py-1.5 text-sm text-red-400 transition-colors hover:bg-red-500/10"
            >
              <Trash2 className="size-4" aria-hidden />
              Delete project
            </button>
          )}
        </Fieldset>
      )}

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-5 py-3 sm:px-8">
          <p
            role="status"
            aria-live="polite"
            className={`min-w-0 truncate text-sm ${
              status?.ok === false ? "text-red-400" : "text-muted-foreground"
            }`}
          >
            {status?.text}
          </p>
          <div className="flex shrink-0 items-center gap-2">
            {project && (
              <a
                href={projectHref(project.slug)}
                target="_blank"
                rel="noreferrer"
                className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
              >
                View on site
                <ExternalLink className="size-3.5" aria-hidden />
              </a>
            )}
            <Link
              href="/admin"
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Back
            </Link>
            <button
              type="submit"
              disabled={pending}
              className="rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background transition-[opacity,transform] duration-150 hover:opacity-90 active:scale-[0.97] disabled:opacity-60"
            >
              {pending ? "Saving…" : project ? "Save" : "Create project"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

const textareaClass =
  "w-full rounded-lg border border-white/10 bg-background/50 px-3 py-2.5 text-sm leading-relaxed text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus-visible:border-white/30 focus-visible:ring-2 focus-visible:ring-white/10";

function Fieldset({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="border-t border-white/10 py-8 first:border-t-0 first:pt-0">
      <legend className="sr-only">{title}</legend>
      <h2 className="text-lg font-semibold tracking-tight text-foreground" aria-hidden>
        {title}
      </h2>
      <p className="text-sm text-muted-foreground">{hint}</p>
      <div className="mt-6 space-y-5">{children}</div>
    </fieldset>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: (id: string) => ReactNode;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      <div className="mt-2">{children(id)}</div>
    </div>
  );
}

function Choice<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <div role="radiogroup" aria-label={label}>
      <p className="text-sm font-medium text-foreground">{label}</p>
      <div className="mt-2 inline-flex flex-wrap gap-1 rounded-xl border border-white/10 p-1">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={value === option.value}
            onClick={() => onChange(option.value)}
            className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
              value === option.value
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function SmallIconButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid size-10 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
    >
      {children}
    </button>
  );
}
