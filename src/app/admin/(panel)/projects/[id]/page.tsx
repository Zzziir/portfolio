import { notFound } from "next/navigation";
import { getAllProjects } from "@/lib/projects-data";
import { ProjectForm } from "../project-form";

export default async function EditProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ created?: string }>;
}) {
  const [{ id }, { created }] = await Promise.all([params, searchParams]);
  const project = (await getAllProjects()).find((p) => p.id === id);
  if (!project) notFound();

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        {project.name}
      </h1>
      <p className="mb-8 mt-1 text-sm text-muted-foreground">
        {created ? "Created. It's live on the site." : project.result}
      </p>
      <ProjectForm key={project.id} project={project} />
    </>
  );
}
