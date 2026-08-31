import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/session";

/** Gate everything under /dashboard behind a valid session, except the login page. */
export async function proxy(req: NextRequest) {
  if (req.nextUrl.pathname === "/dashboard/login") {
    return NextResponse.next();
  }

  const secret = process.env.DASHBOARD_SESSION_SECRET;
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const authed = secret ? await verifySessionToken(token, secret) : false;

  if (!authed) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard/login";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
