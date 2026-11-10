import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type { Testimonial } from "@/lib/testimonials";
import { TestimonialsList } from "./testimonials-list";

export default async function TestimonialsPage() {
  const { data } = await getSupabaseAdmin()
    .from("testimonials")
    .select("*")
    .eq("is_spam", false)
    .order("created_at", { ascending: false });

  const testimonials = (data ?? []) as Testimonial[];

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Testimonials
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Approved notes appear on the homepage. Rejected ones stay here and can
        be approved later.
      </p>
      <div className="mt-8">
        <TestimonialsList items={testimonials} />
      </div>
    </>
  );
}
