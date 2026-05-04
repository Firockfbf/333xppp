export type ProductStatus = "available" | "sold" | "reserved";

export type ProductCategory = string;

export type SizeSystem = "EU" | "INT" | "US" | "ONE SIZE";

export type CategoryRecord = {
  id: string;
  created_at?: string;
  name: string;
  slug: string;
  sort_order: number;
};

export type CollectionRecord = {
  id: string;
  created_at?: string;
  name: string;
  slug: string;
  sort_order: number;
};

export type SiteContentRecord = {
  id: string;
  updated_at: string;
  hero_issue_title: string;
  hero_issue_copy: string;
  hero_card_title: string;
  hero_card_body: string;
  hero_notes: string[];
  hero_mood_tags: string[];
  hero_manifesto: string[];
  hero_primary_image_url: string | null;
  hero_secondary_image_url: string | null;
  hero_manifesto_image_url: string | null;
  about_title: string;
  about_subtitle: string;
  about_intro: string;
  about_body: string[];
  about_tags: string[];
  about_image_url: string | null;
  contact_title: string;
  contact_subtitle: string;
  contact_body: string;
};

export type ProductRecord = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  slug: string;
  category: ProductCategory;
  price: number | null;
  size: string;
  size_system: SizeSystem;
  status: ProductStatus;
  short_description: string;
  full_description: string;
  main_image_url: string | null;
  gallery_image_urls: string[];
  featured: boolean;
  is_unique_piece: boolean;
  materials: string | null;
  techniques: string[];
  collection_name: string | null;
  drop_date: string | null;
  instagram_post_url: string | null;
  sort_order: number | null;
};

export type ProductPayload = Omit<
  ProductRecord,
  "id" | "created_at" | "updated_at"
>;

export type SiteContentPayload = Omit<SiteContentRecord, "updated_at">;
