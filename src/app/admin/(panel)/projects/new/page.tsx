import { ProjectForm } from "../project-form";

export default function NewProjectPage() {
  return (
    <>
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
        New project
      </h1>
      <ProjectForm />
    </>
  );
}
