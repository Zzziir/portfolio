import { NextResponse } from "next/server";
import { testimonialSchema } from "@/lib/testimonials";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";

// Per-IP throttle: at most RATE_LIMIT_MAX submissions per window.
const RATE_LIMIT_WINDOW_MIN = 60;
const RATE_LIMIT_MAX = 3;

function getClientIp(req: Request): string | null {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || null;
  return req.headers.get("x-real-ip");
}

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  const parsed = testimonialSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check your details and try again." },
      { status: 422 },
    );
  }

  const { name, title, quote, website } = parsed.data;

  // Honeypot: only bots fill `website`. Feign success, store nothing.
  if (website && website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const ip = getClientIp(req);
  const userAgent = req.headers.get("user-agent");
  const supabase = getSupabaseAdmin();

  // DB-based rate limit, keyed on IP.
  if (ip) {
    const since = new Date(
      Date.now() - RATE_LIMIT_WINDOW_MIN * 60_000,
    ).toISOString();
    const { count } = await supabase
      .from("testimonials")
      .select("id", { count: "exact", head: true })
      .eq("ip", ip)
      .gte("created_at", since);

    if ((count ?? 0) >= RATE_LIMIT_MAX) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Thanks, you've already left a note. I'll review what you sent.",
        },
        { status: 429 },
      );
    }
  }

  // Stored as 'pending' by the table default, so nothing goes public until it
  // is approved in the dashboard.
  const { error: insertError } = await supabase
    .from("testimonials")
    .insert({ name, title, quote, ip, user_agent: userAgent });

  if (insertError) {
    console.error("testimonial insert failed", insertError);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
