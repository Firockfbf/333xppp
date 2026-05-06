import { cache } from "react";
import {
  DEFAULT_CATEGORIES,
  PRODUCT_STATUSES,
} from "@/lib/constants";
import { demoProducts } from "@/lib/demo-data";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient as createServerSupabaseClient } from "@/lib/supabase/server";
import type {
  CategoryRecord,
  CollectionRecord,
  ProductCategory,
  ProductPayload,
  ProductRecord,
  ProductStatus,
} from "@/types/database";

async function fetchProducts({
  includeDemoFallback,
}: {
  includeDemoFallback: boolean;
}): Promise<ProductRecord[]> {
  if (!isSupabaseConfigured()) {
    return includeDemoFallback ? demoProducts : [];
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error || !data) {
    return includeDemoFallback ? demoProducts : [];
  }

  if (!data.length) {
    return includeDemoFallback ? demoProducts : [];
  }

  return data.map((row) => normalizeProduct(row as ProductRecord));
}

function normalizeProduct(row: Partial<ProductRecord>): ProductRecord {
  return {
    id: row.id ?? crypto.randomUUID(),
    created_at: row.created_at ?? new Date().toISOString(),
    updated_at: row.updated_at ?? new Date().toISOString(),
    name: row.name ?? "",
    slug: row.slug ?? "",
    category: (row.category as ProductCategory) ?? "Custom pieces",
    price: row.price ?? null,
    size: row.size ?? "",
    size_system: row.size_system ?? "INT",
    status: (row.status as ProductStatus) ?? "available",
    short_description: row.short_description ?? "",
    full_description: row.full_description ?? "",
    main_image_url: row.main_image_url ?? null,
    gallery_image_urls: Array.isArray(row.gallery_image_urls)
      ? row.gallery_image_urls
      : [],
    featured: Boolean(row.featured),
    is_unique_piece: row.is_unique_piece ?? true,
    materials: row.materials ?? null,
    techniques: Array.isArray(row.techniques) ? row.techniques : [],
    collection_name: row.collection_name ?? null,
    drop_date: row.drop_date ?? null,
    instagram_post_url: row.instagram_post_url ?? null,
    sort_order: row.sort_order ?? null,
  };
}

export const getProducts = cache(async () => {
  return fetchProducts({ includeDemoFallback: true });
});

export const getProductBySlug = cache(async (slug: string) => {
  const products = await getProducts();
  return products.find((product) => product.slug === slug) ?? null;
});

export const getProductById = cache(async (id: string) => {
  const products = await fetchProducts({ includeDemoFallback: false });
  return products.find((product) => product.id === id) ?? null;
});

export const getAdminProducts = cache(async () => {
  return fetchProducts({ includeDemoFallback: false });
});

export async function getFeaturedProducts() {
  const products = await getProducts();
  return products.filter((product) => product.featured).slice(0, 3);
}

export async function getLatestDropProducts() {
  const products = await getProducts();
  return [...products]
    .sort((a, b) => {
      const aTime = a.drop_date ? new Date(a.drop_date).getTime() : 0;
      const bTime = b.drop_date ? new Date(b.drop_date).getTime() : 0;
      return bTime - aTime;
    })
    .slice(0, 4);
}

export async function getAdminStats() {
  const products = await fetchProducts({ includeDemoFallback: false });

  return {
    total: products.length,
    available: products.filter((product) => product.status === "available").length,
    sold: products.filter((product) => product.status === "sold").length,
    latest: [...products].slice(0, 5),
  };
}

export function getStatusOptions() {
  return ["all", ...PRODUCT_STATUSES] as const;
}

export const getCategories = cache(async (): Promise<CategoryRecord[]> => {
  if (!isSupabaseConfigured()) {
    return DEFAULT_CATEGORIES;
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error || !data?.length) {
    return DEFAULT_CATEGORIES;
  }

  return data as CategoryRecord[];
});

export const getCollections = cache(async (): Promise<CollectionRecord[]> => {
  if (!isSupabaseConfigured()) {
    return [];
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("collections")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error || !data) {
    return [];
  }

  return data as CollectionRecord[];
});

export function getEmptyProductPayload(): ProductPayload {
  return {
    name: "",
    slug: "",
    category: "Custom pieces",
    price: null,
    size: "",
    size_system: "INT",
    status: "available",
    short_description: "",
    full_description: "",
    main_image_url: null,
    gallery_image_urls: [],
    featured: false,
    is_unique_piece: true,
    materials: null,
    techniques: [],
    collection_name: null,
    drop_date: null,
    instagram_post_url: null,
    sort_order: null,
  };
}
