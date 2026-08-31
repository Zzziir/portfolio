import type { Metadata } from "next";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type { ContactSubmission } from "@/lib/contact";
import { SubmissionsList } from "./submissions-list";
import { logout } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Inquiries",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from("contact_submissions")
    .select("*")
    .eq("is_spam", false)
    .order("created_at", { ascending: false });

  const submissions = (data ?? []) as ContactSubmission[];
  const newCount = submissions.filter((s) => s.status === "new").length;

  return (
    <main className="mx-auto min-h-dvh max-w-3xl px-5 py-14 sm:px-8">
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
            Inquiries
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            {submissions.length}{" "}
            {submissions.length === 1 ? "message" : "messages"}
            {newCount > 0 && (
              <span className="ml-3 align-middle text-base font-medium text-[color:var(--brand-soft)]">
                {newCount} new
              </span>
            )}
          </h1>
        </div>

        <form action={logout}>
          <button
            type="submit"
            className="rounded-lg border border-white/10 px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/[0.04] hover:text-foreground"
          >
            Sign out
          </button>
        </form>
      </header>

      <div className="mt-10">
        <SubmissionsList submissions={submissions} />
      </div>
    </main>
  );
}
