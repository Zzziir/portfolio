import { z } from "zod";

/** Inquiry lifecycle, mirrors the `submission_status` enum in Postgres. */
export type SubmissionStatus = "new" | "read" | "replied" | "archived";

export const SUBMISSION_STATUSES: SubmissionStatus[] = [
  "new",
  "read",
  "replied",
  "archived",
];

/** One row of `public.contact_submissions`. */
export interface ContactSubmission {
  id: string;
  created_at: string;
  name: string;
  email: string;
  message: string;
  status: SubmissionStatus;
  is_spam: boolean;
  ip: string | null;
  user_agent: string | null;
}

/**
 * Shape of the public contact form. `website` is a honeypot: real users never
 * see it, bots fill it, and the API treats any non-empty value as spam.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(1, "Your name is required").max(100),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(3)
    .max(254)
    .refine((v) => z.email().safeParse(v).success, "Enter a valid email"),
  project: z
    .string()
    .trim()
    .min(1, "Tell me a little about your project")
    .max(2000, "Keep it under 2000 characters"),
  website: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
