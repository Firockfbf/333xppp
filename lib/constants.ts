import type {
  CategoryRecord,
  ProductCategory,
  ProductStatus,
  SizeSystem,
} from "@/types/database";

export const PRODUCT_BUCKET = "product-images";

export const DEFAULT_CATEGORY_NAMES: ProductCategory[] = [
  "Tops",
  "Skirts",
  "Jeans",
  "Pants",
  "Jackets",
  "Dresses",
  "Accessories",
  "Custom pieces",
  "Sold archive",
];

export const DEFAULT_CATEGORIES: CategoryRecord[] = DEFAULT_CATEGORY_NAMES.map(
  (name, index) => ({
    id: `default-category-${index + 1}`,
    name,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
    sort_order: index + 1,
  }),
);

export const PRODUCT_STATUSES: ProductStatus[] = [
  "available",
  "reserved",
  "sold",
];

export const SIZE_SYSTEMS: SizeSystem[] = ["EU", "INT", "US", "ONE SIZE"];

export const INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/333xppp";

export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";
