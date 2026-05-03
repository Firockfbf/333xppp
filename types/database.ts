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
