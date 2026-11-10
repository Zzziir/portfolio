import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { isAdminEmail } from "@/lib/auth/admin-email";

/**
 * Gate everything under /admin (except the login page) behind a Supabase Auth
 * session for ADMIN_EMAIL, refreshing the session cookies on the way through.
 * Pages and server actions re-check with `requireAdmin()`; this is the fast
 * first line, not the only one.
 */
export async function proxy(req: NextRequest) {
  let res = NextResponse.next({ request: req });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) =>
            req.cookies.set(name, value),
          );
          res = NextResponse.next({ request: req });
          cookiesToSet.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options),
          );
          Object.entries(headers).forEach(([key, value]) =>
            res.headers.set(key, value),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (req.nextUrl.pathname === "/admin/login") {
    if (user && isAdminEmail(user.email)) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return res;
  }

  if (!user || !isAdminEmail(user.email)) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*"],
};
