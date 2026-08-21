import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, site } from "@/lib/content";
import { ProjectDetail } from "@/components/site/project-detail";
import { MoreProjects } from "@/components/site/more-projects";
import { Footer } from "@/components/site/footer";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Not found" };
  return {
    title: `${project.name} — ${site.name}`,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <main>
      <ProjectDetail project={project} />
      <MoreProjects currentSlug={project.slug} />
      <Footer />
    </main>
  );
}
