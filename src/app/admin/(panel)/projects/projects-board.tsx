"use client";

import { useRef, useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { Reorder, useDragControls } from "motion/react";
import {
  ArrowDown,
  ArrowUp,
  ExternalLink,
  Eye,
  EyeOff,
  GripVertical,
  Pencil,
} from "lucide-react";
import {
  FEATURED_LIMIT,
  projectHref,
  type Project,
  type ProjectPlacement,
} from "@/lib/projects";
import {
  moveProject,
  reorderProjects,
  setProjectVisible,
  type ActionResult,
} from "../actions";

type Groups = Record<ProjectPlacement, Project[]>;

const split = (projects: Project[]): Groups => ({
  featured: projects.filter((p) => p.placement === "featured"),
  more: projects.filter((p) => p.placement === "more"),
});

const GROUPS: { placement: ProjectPlacement; title: string; hint: string }[] = [
  {
    placement: "featured",
    title: "Featured",
    hint: "Headline case studies, strongest first.",
  },
  {
    placement: "more",
    title: "More builds",
    hint: "The smaller grid under the featured work.",
  },
];

export function ProjectsBoard({ projects }: { projects: Project[] }) {
  const [groups, setGroups] = useState<Groups>(() => split(projects));
  const [source, setSource] = useState(projects);
  // A drag reorders state live; this holds the order to persist on drop.
  const dropped = useRef<{ placement: ProjectPlacement; items: Project[] } | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  // Server revalidation after every action sends fresh props; adopt them.
  if (projects !== source) {
    setSource(projects);
    setGroups(split(projects));
  }

  const featuredVisible = groups.featured.filter((p) => p.visible).length;
  const featuredFull = featuredVisible >= FEATURED_LIMIT;

  function run(action: () => Promise<ActionResult>) {
    setError(null);
    startTransition(async () => {
      const result = await action();
      if (!result.ok) {
        setError(result.error);
        setGroups(split(projects));
      }
    });
  }

  function persistOrder(placement: ProjectPlacement, items: Project[]) {
    run(() => reorderProjects(placement, items.map((p) => p.id)));
  }

  function nudge(placement: ProjectPlacement, index: number, delta: -1 | 1) {
    const items = [...groups[placement]];
    const target = index + delta;
    if (target < 0 || target >= items.length) return;
    [items[index], items[target]] = [items[target], items[index]];
    setGroups((g) => ({ ...g, [placement]: items }));
    persistOrder(placement, items);
  }

  return (
    <div className={pending ? "cursor-progress" : undefined}>
      <p role="status" aria-live="polite" className="min-h-5 text-sm text-red-400">
        {error}
      </p>

      <div className="mt-2 grid gap-12 xl:grid-cols-2 xl:items-start xl:gap-10">
        {GROUPS.map(({ placement, title, hint }) => {
          const items = groups[placement];
          return (
            <section key={placement} aria-labelledby={`group-${placement}`}>
              <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3">
                <div>
                  <h2
                    id={`group-${placement}`}
                    className="text-lg font-semibold tracking-tight text-foreground"
                  >
                    {title}
                  </h2>
                  <p className="text-sm text-muted-foreground">{hint}</p>
                </div>
                {placement === "featured" && (
                  <span
                    className={`shrink-0 font-mono text-xs tabular-nums ${
                      featuredFull
                        ? "text-[color:var(--brand-soft)]"
                        : "text-muted-foreground"
                    }`}
                  >
                    {featuredVisible}/{FEATURED_LIMIT} shown
                  </span>
                )}
              </div>

              {items.length === 0 ? (
                <p className="py-8 text-sm text-muted-foreground">
                  Nothing here yet.
                </p>
              ) : (
                <Reorder.Group
                  as="ol"
                  axis="y"
                  values={items}
                  onReorder={(next) => {
                    dropped.current = { placement, items: next };
                    setGroups((g) => ({ ...g, [placement]: next }));
                  }}
                  className="divide-y divide-white/[0.06]"
                >
                  {items.map((project, index) => (
                    <ProjectRow
                      key={project.id}
                      project={project}
                      index={index}
                      count={items.length}
                      canFeature={!featuredFull || !project.visible}
                      onDragEnd={() => {
                        if (!dropped.current) return;
                        persistOrder(
                          dropped.current.placement,
                          dropped.current.items,
                        );
                        dropped.current = null;
                      }}
                      onNudge={(delta) => nudge(placement, index, delta)}
                      onToggleVisible={() =>
                        run(() => setProjectVisible(project.id, !project.visible))
                      }
                      onMove={() =>
                        run(() =>
                          moveProject(
                            project.id,
                            placement === "featured" ? "more" : "featured",
                          ),
                        )
                      }
                    />
                  ))}
                </Reorder.Group>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}

const iconButton =
  "grid size-8 shrink-0 place-items-center rounded-lg text-muted-foreground transition-[color,background-color,transform] duration-150 hover:bg-white/[0.06] hover:text-foreground active:scale-[0.94] disabled:pointer-events-none disabled:opacity-30";

function ProjectRow({
  project,
  index,
  count,
  canFeature,
  onDragEnd,
  onNudge,
  onToggleVisible,
  onMove,
}: {
  project: Project;
  index: number;
  count: number;
  canFeature: boolean;
  onDragEnd: () => void;
  onNudge: (delta: -1 | 1) => void;
  onToggleVisible: () => void;
  onMove: () => void;
}) {
  const controls = useDragControls();
  const thumb = project.card?.src ?? project.image;
  const featured = project.placement === "featured";

  return (
    <Reorder.Item
      as="li"
      value={project}
      dragListener={false}
      dragControls={controls}
      onDragEnd={onDragEnd}
      className="relative flex flex-wrap items-center gap-x-3 gap-y-2 bg-background py-3 sm:flex-nowrap"
    >
      <button
        type="button"
        aria-label={`Drag to reorder ${project.name}`}
        onPointerDown={(e) => controls.start(e)}
        className={`${iconButton} cursor-grab touch-none active:cursor-grabbing`}
      >
        <GripVertical className="size-4" aria-hidden />
      </button>

      <div
        className="relative aspect-[16/10] w-16 shrink-0 overflow-hidden rounded-md ring-1 ring-white/10"
        style={{ background: project.card?.bg ?? project.accent }}
      >
        {thumb && (
          <Image
            src={thumb}
            alt=""
            fill
            sizes="64px"
            className={project.card ? "object-contain p-1.5" : "object-cover"}
          />
        )}
      </div>

      <div className={`min-w-0 flex-1 ${project.visible ? "" : "opacity-50"}`}>
        <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <span className="truncate">{project.name}</span>
          {!project.visible && (
            <span className="shrink-0 rounded-full border border-white/15 px-1.5 py-px text-[11px] font-medium text-muted-foreground">
              Unlisted
            </span>
          )}
        </p>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {project.result}
        </p>
      </div>

      {/* Mobile: a full-width action bar under the text. sm+: inline. */}
      <div className="flex w-full items-center justify-end border-t border-white/[0.04] pt-2 sm:w-auto sm:shrink-0 sm:border-0 sm:pt-0">
        <div className="mr-auto flex sm:mr-0">
          <button
            type="button"
            aria-label={`Move ${project.name} up`}
            disabled={index === 0}
            onClick={() => onNudge(-1)}
            className={iconButton}
          >
            <ArrowUp className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            aria-label={`Move ${project.name} down`}
            disabled={index === count - 1}
            onClick={() => onNudge(1)}
            className={iconButton}
          >
            <ArrowDown className="size-4" aria-hidden />
          </button>
        </div>

        <button
          type="button"
          aria-pressed={project.visible}
          aria-label={
            project.visible
              ? `${project.name} is listed. Unlist it`
              : `${project.name} is unlisted. List it`
          }
          title={project.visible ? "Listed on site" : "Unlisted (link still works)"}
          disabled={featured && !project.visible && !canFeature}
          onClick={onToggleVisible}
          className={iconButton}
        >
          {project.visible ? (
            <Eye className="size-4" aria-hidden />
          ) : (
            <EyeOff className="size-4" aria-hidden />
          )}
        </button>

        <button
          type="button"
          disabled={!featured && !canFeature}
          title={
            !featured && !canFeature
              ? `Featured is full (${FEATURED_LIMIT} max)`
              : undefined
          }
          onClick={onMove}
          className="ml-1 whitespace-nowrap rounded-lg border border-white/10 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-[color,background-color,transform] duration-150 hover:bg-white/[0.04] hover:text-foreground active:scale-[0.97] disabled:pointer-events-none disabled:opacity-30"
        >
          {featured ? "To More" : "To Featured"}
        </button>

        <Link
          href={`/admin/projects/${project.id}`}
          aria-label={`Edit ${project.name}`}
          className={`${iconButton} ml-1`}
        >
          <Pencil className="size-4" aria-hidden />
        </Link>
        <a
          href={projectHref(project.slug)}
          target="_blank"
          rel="noreferrer"
          aria-label={`View ${project.name} on the site`}
          className={iconButton}
        >
          <ExternalLink className="size-4" aria-hidden />
        </a>
      </div>
    </Reorder.Item>
  );
}
