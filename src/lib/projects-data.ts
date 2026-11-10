import "server-only";
import { cache } from "react";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { fromRow, type Project, type ProjectRow } from "@/lib/projects";

/** Every project, featured group first, each group in its admin order. */
export const getAllProjects = cache(async (): Promise<Project[]> => {
  const { data, error } = await getSupabaseAdmin()
    .from("projects")
    .select("*")
    .order("placement", { ascending: true })
    .order("sort_order", { ascending: true });

  if (error) throw new Error(`Failed to load projects: ${error.message}`);
  return (data as ProjectRow[]).map(fromRow);
});

/** Projects shown in public lists (unlisted ones excluded). */
export async function getListedProjects(): Promise<Project[]> {
  return (await getAllProjects()).filter((p) => p.visible);
}

/** A detail page resolves any project, listed or not (unlisted = link-only). */
export async function getProjectBySlug(
  slug: string,
): Promise<Project | undefined> {
  return (await getAllProjects()).find((p) => p.slug === slug);
}
