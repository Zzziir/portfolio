import { z } from "zod";

/**
 * Projects live in Supabase (`public.projects`) and are managed from /admin.
 * This module is client-safe: the app shape, the DB row mapping, and the
 * admin form schema. Server reads are in ./projects-data.ts.
 */

/** Rule 07 (adjusted): at most this many visible featured case studies. Mirrors the DB trigger. */
export const FEATURED_LIMIT = 4;

export type ProjectSection = { heading: string; body: string[] };
export type ProjectPlacement = "featured" | "more";
export type ProjectPlatform = "mobile" | "web";

export type ProjectCardThumb = {
  src: string;
  fit: "logo" | "contain";
  bg?: string;
};

export type Project = {
  id: string;
  slug: string;
  name: string;
  /** Rule 02 - the title IS a result. */
  result: string;
  context: string;
  /** Rule 05 - lead with the decision. */
  decision: string;
  tags: string[];
  year: string;
  /** accent used for the placeholder thumbnail gradient */
  accent: string;
  /** homepage group: headline case study or the smaller "more builds" grid */
  placement: ProjectPlacement;
  /** false = unlisted: off every list, but /work/<slug> still renders */
  visible: boolean;
  sortOrder: number;
  /** how imagery is framed: "mobile" gets an iPhone mock, "web" fills the frame */
  platform: ProjectPlatform;
  /** primary screenshot (card + detail hero) */
  image?: string;
  /** optional second screenshot for the detail page */
  image2?: string;
  /** frame the second detail image in an iPhone (for phone-shaped screenshots on a web project) */
  image2Frame?: "phone";
  /**
   * Card thumbnail override, shown contained on the tile instead of the cover
   * screenshot: "logo" gets generous padding, "contain" (a centered UI) gets a
   * tight one. `bg` fills the tile with a flat colour matching a logo's own
   * background; omit it to keep the accent glow. The detail hero still uses `image`.
   */
  card?: ProjectCardThumb;
  // ── detail page (/work/[slug]) ──
  category: string;
  liveLink?: string;
  summary: string;
  sections: ProjectSection[];
};

/** One row of `public.projects`. */
export type ProjectRow = {
  id: string;
  slug: string;
  name: string;
  result: string;
  context: string;
  decision: string;
  tags: string[];
  year: string;
  accent: string;
  placement: ProjectPlacement;
  visible: boolean;
  sort_order: number;
  platform: ProjectPlatform;
  image: string | null;
  image2: string | null;
  image2_frame: "phone" | null;
  card: ProjectCardThumb | null;
  category: string;
  live_link: string | null;
  summary: string;
  sections: ProjectSection[];
};

/** Route to a project's detail page. */
export const projectHref = (slug: string) => `/work/${slug}`;

export function fromRow(row: ProjectRow): Project {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    result: row.result,
    context: row.context,
    decision: row.decision,
    tags: row.tags,
    year: row.year,
    accent: row.accent,
    placement: row.placement,
    visible: row.visible,
    sortOrder: row.sort_order,
    platform: row.platform,
    image: row.image ?? undefined,
    image2: row.image2 ?? undefined,
    image2Frame: row.image2_frame ?? undefined,
    card: row.card ?? undefined,
    category: row.category,
    liveLink: row.live_link ?? undefined,
    summary: row.summary,
    sections: row.sections,
  };
}

const optionalText = z
  .string()
  .trim()
  .transform((v) => (v === "" ? undefined : v))
  .optional();

/** An image is either a site asset path ("/assets/...") or an uploaded https URL. */
const imageRef = z
  .string()
  .trim()
  .refine((v) => v === "" || v.startsWith("/") || v.startsWith("https://"), {
    message: "Use a /assets/... path or an uploaded image",
  })
  .transform((v) => (v === "" ? undefined : v))
  .optional();

/** The admin edit form. Visibility and order are managed from the list. */
export const projectInputSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80),
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(80)
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Lowercase letters, numbers and dashes"),
  result: z.string().trim().min(1, "The result headline is required").max(160),
  context: z.string().trim().min(1, "Context is required").max(160),
  decision: z.string().trim().min(1, "Lead with the decision").max(600),
  category: z.string().trim().min(1, "Category is required").max(60),
  year: z.string().trim().min(1, "Year is required").max(30),
  tags: z.array(z.string().trim().min(1).max(40)).max(12),
  accent: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Use a #rrggbb colour"),
  placement: z.enum(["featured", "more"]),
  platform: z.enum(["mobile", "web"]),
  image: imageRef,
  image2: imageRef,
  image2Frame: z.enum(["phone"]).optional(),
  card: z
    .object({
      src: z.string().trim().min(1),
      fit: z.enum(["logo", "contain"]),
      bg: z
        .string()
        .regex(/^#[0-9a-fA-F]{6}$/)
        .optional(),
    })
    .optional(),
  liveLink: optionalText.pipe(z.url("Use a full https:// link").optional()),
  summary: z.string().trim().min(1, "Summary is required").max(800),
  sections: z
    .array(
      z.object({
        heading: z.string().trim().min(1, "Section heading is required").max(80),
        body: z.array(z.string().trim().min(1)).min(1, "Add at least one paragraph"),
      }),
    )
    .max(8),
});

export type ProjectInput = z.infer<typeof projectInputSchema>;

/** Form values → DB columns (placement/visible/order are set separately). */
export function toRow(input: ProjectInput) {
  return {
    slug: input.slug,
    name: input.name,
    result: input.result,
    context: input.context,
    decision: input.decision,
    category: input.category,
    year: input.year,
    tags: input.tags,
    accent: input.accent,
    platform: input.platform,
    image: input.image ?? null,
    image2: input.image2 ?? null,
    image2_frame: input.image2Frame ?? null,
    card: input.card ?? null,
    live_link: input.liveLink ?? null,
    summary: input.summary,
    sections: input.sections,
  };
}
