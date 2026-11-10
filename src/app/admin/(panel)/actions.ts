"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import type { PostgrestError } from "@supabase/supabase-js";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/admin";
import { SUBMISSION_STATUSES, type SubmissionStatus } from "@/lib/contact";
import {
  TESTIMONIAL_STATUSES,
  type TestimonialStatus,
} from "@/lib/testimonials";
import {
  FEATURED_LIMIT,
  projectInputSchema,
  toRow,
  type ProjectInput,
  type ProjectPlacement,
} from "@/lib/projects";

export type ActionResult<T = undefined> =
  | ({ ok: true } & (T extends undefined ? object : { data: T }))
  | { ok: false; error: string };

const MEDIA_BUCKET = "project-media";

/** Homepage + every detail page (their "more projects" grid lists the rest). */
function revalidateProjects() {
  revalidatePath("/");
  revalidatePath("/work/[slug]", "page");
  revalidatePath("/admin", "layout");
}

function describe(error: PostgrestError): string {
  if (error.message.includes("featured_limit")) {
    return `Featured is full (${FEATURED_LIMIT} max). Move one to More first.`;
  }
  if (error.code === "23505") return "That slug is already used by another project.";
  return error.message;
}

// ── Inquiries ─────────────────────────────────────────────────────────────

export async function updateStatus(id: string, status: SubmissionStatus) {
  await requireAdmin();
  if (!SUBMISSION_STATUSES.includes(status)) return;

  await getSupabaseAdmin()
    .from("contact_submissions")
    .update({ status })
    .eq("id", id);
  revalidatePath("/admin/inquiries");
}

// ── Testimonials ──────────────────────────────────────────────────────────

/** Approve shows it on the homepage; reject maps to `hidden` (recoverable). */
export async function updateTestimonialStatus(
  id: string,
  status: TestimonialStatus,
) {
  await requireAdmin();
  if (!TESTIMONIAL_STATUSES.includes(status)) return;

  await getSupabaseAdmin().from("testimonials").update({ status }).eq("id", id);
  revalidatePath("/admin", "layout");
  revalidatePath("/");
}

// ── Projects ──────────────────────────────────────────────────────────────

async function nextSortOrder(placement: ProjectPlacement): Promise<number> {
  const { data } = await getSupabaseAdmin()
    .from("projects")
    .select("sort_order")
    .eq("placement", placement)
    .order("sort_order", { ascending: false })
    .limit(1);
  return (data?.[0]?.sort_order ?? -1) + 1;
}

/** Create (id = null) or update a project from the edit form. */
export async function saveProject(
  id: string | null,
  raw: ProjectInput,
): Promise<ActionResult<{ id: string }>> {
  await requireAdmin();

  const parsed = projectInputSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const input = parsed.data;
  const db = getSupabaseAdmin();

  if (id) {
    const { data: current } = await db
      .from("projects")
      .select("placement")
      .eq("id", id)
      .single();
    // Changing group from the form appends the project to the end of the new group.
    const placementChange =
      current && current.placement !== input.placement
        ? {
            placement: input.placement,
            sort_order: await nextSortOrder(input.placement),
          }
        : {};

    const { error } = await db
      .from("projects")
      .update({ ...toRow(input), ...placementChange })
      .eq("id", id);
    if (error) return { ok: false, error: describe(error) };
    revalidateProjects();
    return { ok: true, data: { id } };
  }

  const { data, error } = await db
    .from("projects")
    .insert({
      ...toRow(input),
      placement: input.placement,
      sort_order: await nextSortOrder(input.placement),
    })
    .select("id")
    .single();
  if (error) return { ok: false, error: describe(error) };
  revalidateProjects();
  return { ok: true, data: { id: data.id as string } };
}

export async function setProjectVisible(
  id: string,
  visible: boolean,
): Promise<ActionResult> {
  await requireAdmin();
  const { error } = await getSupabaseAdmin()
    .from("projects")
    .update({ visible })
    .eq("id", id);
  if (error) return { ok: false, error: describe(error) };
  revalidateProjects();
  return { ok: true };
}

/** Move a project to the other group, at the end of it. */
export async function moveProject(
  id: string,
  placement: ProjectPlacement,
): Promise<ActionResult> {
  await requireAdmin();
  const { error } = await getSupabaseAdmin()
    .from("projects")
    .update({ placement, sort_order: await nextSortOrder(placement) })
    .eq("id", id);
  if (error) return { ok: false, error: describe(error) };
  revalidateProjects();
  return { ok: true };
}

/** Persist a group's order: `ids` is the full group, top to bottom. */
export async function reorderProjects(
  placement: ProjectPlacement,
  ids: string[],
): Promise<ActionResult> {
  await requireAdmin();
  const db = getSupabaseAdmin();
  const results = await Promise.all(
    ids.map((id, index) =>
      db
        .from("projects")
        .update({ sort_order: index })
        .eq("id", id)
        .eq("placement", placement),
    ),
  );
  const failed = results.find((r) => r.error);
  if (failed?.error) return { ok: false, error: describe(failed.error) };
  revalidateProjects();
  return { ok: true };
}

export async function deleteProject(id: string): Promise<ActionResult> {
  await requireAdmin();
  const { error } = await getSupabaseAdmin()
    .from("projects")
    .delete()
    .eq("id", id);
  if (error) return { ok: false, error: describe(error) };
  revalidateProjects();
  return { ok: true };
}

/**
 * Signed upload URL for one image. The browser uploads straight to Storage,
 * so large screenshots never pass through a server action's body limit.
 */
export async function createImageUpload(
  slug: string,
  fileName: string,
): Promise<ActionResult<{ path: string; token: string; publicUrl: string }>> {
  await requireAdmin();

  const ext = fileName.split(".").pop()?.toLowerCase() ?? "";
  if (!["png", "jpg", "jpeg", "webp", "avif"].includes(ext)) {
    return { ok: false, error: "Use a PNG, JPG, WebP or AVIF image." };
  }
  const folder = /^[a-z0-9-]+$/.test(slug) ? slug : "unsorted";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;

  const storage = getSupabaseAdmin().storage.from(MEDIA_BUCKET);
  const { data, error } = await storage.createSignedUploadUrl(path);
  if (error) return { ok: false, error: error.message };

  return {
    ok: true,
    data: {
      path,
      token: data.token,
      publicUrl: storage.getPublicUrl(path).data.publicUrl,
    },
  };
}

// ── Session ───────────────────────────────────────────────────────────────

export async function logout() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
