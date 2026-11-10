import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllProjects } from "@/lib/projects-data";
import { ProjectsBoard } from "./projects/projects-board";

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Projects
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Drag to reorder. Changes go live on the site right away.
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-foreground px-3 py-2 text-sm font-medium text-background transition-[opacity,transform] duration-150 hover:opacity-90 active:scale-[0.97]"
        >
          <Plus className="size-4" aria-hidden />
          New project
        </Link>
      </div>

      <div className="mt-10">
        <ProjectsBoard projects={projects} />
      </div>
    </>
  );
}
