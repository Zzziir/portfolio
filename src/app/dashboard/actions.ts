"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { SESSION_COOKIE } from "@/lib/auth/session";
import { SUBMISSION_STATUSES, type SubmissionStatus } from "@/lib/contact";
import {
  TESTIMONIAL_STATUSES,
  type TestimonialStatus,
} from "@/lib/testimonials";

export async function updateStatus(id: string, status: SubmissionStatus) {
  if (!SUBMISSION_STATUSES.includes(status)) return;

  const supabase = getSupabaseAdmin();
  await supabase.from("contact_submissions").update({ status }).eq("id", id);
  revalidatePath("/dashboard");
}

export async function updateTestimonialStatus(
  id: string,
  status: TestimonialStatus,
) {
  if (!TESTIMONIAL_STATUSES.includes(status)) return;

  const supabase = getSupabaseAdmin();
  await supabase.from("testimonials").update({ status }).eq("id", id);
  // The public homepage reads approved testimonials, so refresh it too.
  revalidatePath("/dashboard");
  revalidatePath("/");
}

export async function logout() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect("/dashboard/login");
}
