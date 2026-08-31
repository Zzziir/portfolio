import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { getResend } from "@/lib/resend";
import { InquiryNotificationEmail } from "@/emails/inquiry-notification";
import { InquiryAcknowledgmentEmail } from "@/emails/inquiry-acknowledgment";

export const runtime = "nodejs";

// Per-IP throttle: at most RATE_LIMIT_MAX submissions per window.
const RATE_LIMIT_WINDOW_MIN = 60;
const RATE_LIMIT_MAX = 5;

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

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check your details and try again." },
      { status: 422 },
    );
  }

  const { name, email, project, website } = parsed.data;

  // Honeypot: only bots fill `website`. Feign success, store nothing, send nothing.
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
      .from("contact_submissions")
      .select("id", { count: "exact", head: true })
      .eq("ip", ip)
      .gte("created_at", since);

    if ((count ?? 0) >= RATE_LIMIT_MAX) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "You've sent a few messages already. Please email me directly instead.",
        },
        { status: 429 },
      );
    }
  }

  // Store first, so a Resend hiccup can never lose the inquiry.
  const { data: row, error: insertError } = await supabase
    .from("contact_submissions")
    .insert({ name, email, message: project, ip, user_agent: userAgent })
    .select("id, created_at")
    .single();

  if (insertError || !row) {
    console.error("contact insert failed", insertError);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }

  // Fire both emails. The row is already safe, so email failure is non-fatal.
  // The Resend SDK returns { error } instead of throwing, so check both.
  try {
    const resend = getResend();
    const receivedAt = new Date(row.created_at);

    const [notify, ack] = await Promise.all([
      resend.emails.send({
        from: requireEnv("CONTACT_FROM_NOTIFY"),
        to: requireEnv("CONTACT_NOTIFY_TO"),
        replyTo: email,
        subject: `New inquiry from ${name}`,
        react: InquiryNotificationEmail({
          name,
          email,
          message: project,
          receivedAt,
        }),
      }),
      resend.emails.send({
        from: requireEnv("CONTACT_FROM_VISITOR"),
        to: email,
        replyTo: requireEnv("CONTACT_NOTIFY_TO"),
        subject: "Thanks, I got your message",
        react: InquiryAcknowledgmentEmail({ name, message: project }),
      }),
    ]);

    if (notify.error) console.error("owner notification failed", notify.error);
    if (ack.error) console.error("visitor acknowledgment failed", ack.error);
  } catch (err) {
    console.error("contact email send threw", err);
    // Swallow: the submission is stored and visible in the dashboard.
  }

  return NextResponse.json({ ok: true });
}

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing ${key} environment variable`);
  return value;
}
