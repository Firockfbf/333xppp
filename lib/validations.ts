import { z } from "zod";
import { PRODUCT_STATUSES, SIZE_SYSTEMS } from "@/lib/constants";

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
  main_image_url: z.string().url().nullable(),
  gallery_image_urls: z.array(z.string().url()),
  featured: z.boolean(),
  is_unique_piece: z.boolean(),
  materials: z.string().nullable(),
  techniques: z.array(z.string()),
  collection_name: z.string().nullable(),
  drop_date: z.string().nullable(),
  instagram_post_url: z.string().url().nullable(),
  sort_order: z.number().int().nullable(),
});
