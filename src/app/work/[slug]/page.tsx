import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/lib/content";
import { getAllProjects, getProjectBySlug } from "@/lib/projects-data";
import { ProjectDetail } from "@/components/site/project-detail";
import { MoreProjects } from "@/components/site/more-projects";
import { Footer } from "@/components/site/footer";

type Params = { slug: string };

// Pages are static; /admin saves revalidate them on demand. New slugs render
// on first visit (dynamicParams defaults to true).
export const revalidate = 3600;

export async function generateStaticParams(): Promise<Params[]> {
  return (await getAllProjects()).map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Not found" };
  return {
    title: `${project.name} - ${site.name}`,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <main>
      <ProjectDetail project={project} />
      <MoreProjects currentSlug={project.slug} />
      <Footer />
    </main>
  );
}
