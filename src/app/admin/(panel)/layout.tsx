import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth/admin";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { AdminNav } from "./admin-nav";
import { logout } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

/** Badge counts for the tabs: items waiting on a decision. */
async function getPendingCounts() {
  const db = getSupabaseAdmin();
  const [testimonials, inquiries] = await Promise.all([
    db
      .from("testimonials")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending")
      .eq("is_spam", false),
    db
      .from("contact_submissions")
      .select("id", { count: "exact", head: true })
      .eq("status", "new")
      .eq("is_spam", false),
  ]);
  return {
    testimonials: testimonials.count ?? 0,
    inquiries: inquiries.count ?? 0,
  };
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdmin();
  const counts = await getPendingCounts();

  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-background/85 backdrop-blur">
        <div className="mx-auto w-full max-w-[1680px] px-5 sm:px-8 lg:px-12 flex items-center justify-between gap-4 pt-4">
          <p className="text-sm font-bold tracking-tight text-foreground">
            Lance<span className="text-muted-foreground">.</span>{" "}
            <span className="font-medium text-muted-foreground">admin</span>
          </p>
          <div className="flex items-center gap-3">
            <span className="hidden truncate text-xs text-muted-foreground sm:block">
              {user.email}
            </span>
            <form action={logout}>
              <button
                type="submit"
                className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-white/[0.04] hover:text-foreground"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[1680px] px-5 sm:px-8 lg:px-12">
          <AdminNav counts={counts} />
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1680px] px-5 sm:px-8 lg:px-12 py-8 sm:py-10">{children}</main>
    </div>
  );
}
