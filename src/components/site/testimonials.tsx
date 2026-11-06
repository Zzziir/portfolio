import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type { PublicTestimonial } from "@/lib/testimonials";
import { Reveal } from "@/components/reveal";
import { KineticText } from "@/components/magicui/kinetic-text";
import { FeedbackForm } from "@/components/site/feedback-form";

/** Approved testimonials, newest first. Never throws: if the table or env is
 * not ready yet, the section simply shows its empty state + the form. */
async function getApprovedTestimonials(): Promise<PublicTestimonial[]> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("testimonials")
      .select("id, name, title, quote")
      .eq("status", "approved")
      .eq("is_spam", false)
      .order("created_at", { ascending: false })
      .limit(12);
    if (error) return [];
    return (data ?? []) as PublicTestimonial[];
  } catch {
    return [];
  }
}

export async function Testimonials() {
  const items = await getApprovedTestimonials();

  return (
    <section id="testimonials" className="px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <KineticText
            as="h2"
            text="Testimonials"
            className="text-5xl font-black tracking-tight sm:text-6xl"
          />
        </Reveal>

        {items.length > 0 ? (
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.07} className="h-full">
                <figure className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-card p-6">
                  <blockquote className="text-pretty text-[15px] leading-relaxed">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-3">
                    <span
                      className="grid size-9 shrink-0 place-items-center rounded-full font-mono text-[11px] text-white/70 ring-1 ring-white/10"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 30% 25%, #3a3730, #17150f)",
                      }}
                      aria-hidden
                    >
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                    <div className="leading-tight">
                      <div className="text-sm font-medium">{t.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {t.title}
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <p className="mt-10 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
              No testimonials up yet. If we have worked together, yours could be
              the first.
            </p>
          </Reveal>
        )}

        {/* Rule 03/08: let visitors add proof, one click away. */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-14 max-w-xl">
            <FeedbackForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
