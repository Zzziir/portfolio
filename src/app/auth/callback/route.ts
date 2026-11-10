import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { isAdminEmail } from "@/lib/auth/admin-email";

export const runtime = "nodejs";

/**
 * Google OAuth lands here. Exchange the code for a session, then let only
 * ADMIN_EMAIL through. Anyone else is signed out and their auth record is
 * deleted, so stray Google sign-ins never accumulate as accounts.
 */
export async function GET(req: NextRequest) {
  const { searchParams, origin } = req.nextUrl;
  const code = searchParams.get("code");
  const fail = (reason: string) =>
    NextResponse.redirect(new URL(`/admin/login?error=${reason}`, origin));

  if (!code) return fail("missing_code");

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);
  if (error || !data.user) return fail("auth_failed");

  if (!isAdminEmail(data.user.email)) {
    await supabase.auth.signOut();
    await getSupabaseAdmin().auth.admin.deleteUser(data.user.id);
    return fail("not_allowed");
  }

  return NextResponse.redirect(new URL("/admin", origin));
}
