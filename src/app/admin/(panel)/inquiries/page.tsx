import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type { ContactSubmission } from "@/lib/contact";
import { SubmissionsList } from "./submissions-list";

export default async function InquiriesPage() {
  const { data } = await getSupabaseAdmin()
    .from("contact_submissions")
    .select("*")
    .eq("is_spam", false)
    .order("created_at", { ascending: false });

  const submissions = (data ?? []) as ContactSubmission[];
  const newCount = submissions.filter((s) => s.status === "new").length;

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        {submissions.length} {submissions.length === 1 ? "message" : "messages"}
        {newCount > 0 && (
          <span className="ml-3 align-middle text-base font-medium text-[color:var(--brand-soft)]">
            {newCount} new
          </span>
        )}
      </h1>
      <div className="mt-8">
        <SubmissionsList submissions={submissions} />
      </div>
    </>
  );
}
