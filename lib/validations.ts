import { z } from "zod";
import { PRODUCT_STATUSES, SIZE_SYSTEMS } from "@/lib/constants";

const imageReferenceSchema = z
  .string()
  .trim()
  .refine(
    (value) => {
      if (!value) return false;
      if (value.startsWith("/")) return true;

      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    },
    { message: "Invalid image reference." },
  );

export const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  category: z.string().min(1),
  price: z.number().nullable(),
  size: z.string().min(1),
  size_system: z.enum(SIZE_SYSTEMS),
  status: z.enum(PRODUCT_STATUSES),
  short_description: z.string().min(8),
  full_description: z.string().min(20),
  main_image_url: imageReferenceSchema.nullable(),
  gallery_image_urls: z.array(imageReferenceSchema),
  featured: z.boolean(),
  is_unique_piece: z.boolean(),
  materials: z.string().nullable(),
  techniques: z.array(z.string()),
  collection_name: z.string().nullable(),
  drop_date: z.string().nullable(),
  instagram_post_url: z.string().url().nullable(),
  sort_order: z.number().int().nullable(),
});

export const siteContentSchema = z.object({
  id: z.literal("main"),
  hero_issue_title: z.string().min(2),
  hero_issue_copy: z.string().min(8),
  hero_card_title: z.string().min(2),
  hero_card_body: z.string().min(8),
  hero_notes: z.array(z.string().min(1)).min(1),
  hero_mood_tags: z.array(z.string().min(1)).min(1),
  hero_manifesto: z.array(z.string().min(1)).min(1),
  brand_logo_url: imageReferenceSchema.nullable(),
  hero_primary_image_url: imageReferenceSchema.nullable(),
  hero_secondary_image_url: imageReferenceSchema.nullable(),
  hero_manifesto_image_url: imageReferenceSchema.nullable(),
  latest_drop_image_url: imageReferenceSchema.nullable(),
  about_title: z.string().min(2),
  about_subtitle: z.string().min(2),
  about_intro: z.string().min(8),
  about_body: z.array(z.string().min(1)).min(1),
  about_tags: z.array(z.string().min(1)).min(1),
  about_image_url: imageReferenceSchema.nullable(),
  contact_title: z.string().min(2),
  contact_subtitle: z.string().min(2),
  contact_body: z.string().min(8),
});
