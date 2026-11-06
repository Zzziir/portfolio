import { z } from "zod";

/** Testimonial lifecycle, mirrors the `testimonial_status` enum in Postgres. */
export type TestimonialStatus = "pending" | "approved" | "hidden";

export const TESTIMONIAL_STATUSES: TestimonialStatus[] = [
  "pending",
  "approved",
  "hidden",
];

/** One row of `public.testimonials`. */
export interface Testimonial {
  id: string;
  created_at: string;
  name: string;
  /** Role + company, e.g. "Head of Product, Ledgerly". */
  title: string;
  quote: string;
  status: TestimonialStatus;
  is_spam: boolean;
  ip: string | null;
  user_agent: string | null;
}

/** The public shape, no PII, safe to render on the homepage. */
export type PublicTestimonial = Pick<
  Testimonial,
  "id" | "name" | "title" | "quote"
>;

/**
 * Public feedback form. Hick's Law: three fields, one decision. `website` is a
 * honeypot: real users never see it, bots fill it, the API treats any non-empty
 * value as spam.
 */
export const testimonialSchema = z.object({
  name: z.string().trim().min(1, "Your name is required").max(80),
  title: z.string().trim().min(1, "Add your role or company").max(120),
  quote: z
    .string()
    .trim()
    .min(10, "A sentence or two, please")
    .max(600, "Keep it under 600 characters"),
  website: z.string().max(200).optional(),
});

export type TestimonialInput = z.infer<typeof testimonialSchema>;
