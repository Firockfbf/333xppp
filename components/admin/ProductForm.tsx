"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { PRODUCT_STATUSES, SIZE_SYSTEMS } from "@/lib/constants";
import { slugify } from "@/lib/utils";
import { ImageUploader } from "@/components/admin/ImageUploader";
import type {
  CategoryRecord,
  CollectionRecord,
  ProductPayload,
  ProductRecord,
} from "@/types/database";

type ProductFormValues = {
  name: string;
  slug: string;
  category: string;
  price: string;
  size: string;
  size_system: ProductPayload["size_system"];
  status: ProductPayload["status"];
  short_description: string;
  full_description: string;
  main_image_url: string;
  gallery_image_urls: string[];
  featured: boolean;
  is_unique_piece: boolean;
  materials: string;
  techniquesInput: string;
  collection_name: string;
  drop_date: string;
  instagram_post_url: string;
  sort_order: string;
};

function getDefaultValues(product?: ProductRecord): ProductFormValues {
  return {
    name: product?.name ?? "",
    slug: product?.slug ?? "",
    category: product?.category ?? "Custom pieces",
    price: product?.price?.toString() ?? "",
    size: product?.size ?? "",
    size_system: product?.size_system ?? "INT",
    status: product?.status ?? "available",
    short_description: product?.short_description ?? "",
    full_description: product?.full_description ?? "",
    main_image_url: product?.main_image_url ?? "",
    gallery_image_urls: product?.gallery_image_urls ?? [],
    featured: product?.featured ?? false,
    is_unique_piece: product?.is_unique_piece ?? true,
    materials: product?.materials ?? "",
    techniquesInput: product?.techniques.join(", ") ?? "",
    collection_name: product?.collection_name ?? "",
    drop_date: product?.drop_date ?? "",
    instagram_post_url: product?.instagram_post_url ?? "",
    sort_order: product?.sort_order?.toString() ?? "",
  };
}

export function ProductForm({
  product,
  mode,
  categories,
  collections,
}: {
  product?: ProductRecord;
  mode: "create" | "edit";
  categories: CategoryRecord[];
  collections: CollectionRecord[];
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const form = useForm<ProductFormValues>({
    defaultValues: getDefaultValues(product),
  });

  const images = form.watch("gallery_image_urls");
  const mainImage = form.watch("main_image_url");

  async function onSubmit(values: ProductFormValues) {
    setSubmitting(true);
    setServerError(null);

    const payload: ProductPayload = {
      name: values.name.trim(),
      slug: values.slug.trim(),
      category: values.category,
      price: values.price ? Number(values.price) : null,
      size: values.size.trim(),
      size_system: values.size_system,
      status: values.status,
      short_description: values.short_description.trim(),
      full_description: values.full_description.trim(),
      main_image_url: values.main_image_url || null,
      gallery_image_urls: values.gallery_image_urls,
      featured: values.featured,
      is_unique_piece: values.is_unique_piece,
      materials: values.materials.trim() ? values.materials.trim() : null,
      techniques: values.techniquesInput
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      collection_name: values.collection_name.trim()
        ? values.collection_name.trim()
        : null,
      drop_date: values.drop_date || null,
      instagram_post_url: values.instagram_post_url.trim()
        ? values.instagram_post_url.trim()
        : null,
      sort_order: values.sort_order ? Number(values.sort_order) : null,
    };

    try {
      const endpoint =
        mode === "create" ? "/api/admin/products" : `/api/admin/products/${product?.id}`;
      const method = mode === "create" ? "POST" : "PATCH";
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Unable to save product.");
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Unable to save product.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="admin-card rounded-[2rem] p-6 sm:p-8"
    >
      <div className="flex flex-col gap-3 border-b border-black/8 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-pink-600">
            {mode === "create" ? "Add product" : "Edit product"}
          </p>
          <h1 className="mt-1 text-3xl font-semibold text-black">
            {mode === "create" ? "New piece" : product?.name}
          </h1>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-black px-5 py-3 text-sm font-medium text-white disabled:opacity-50"
        >
          {submitting ? "Saving..." : mode === "create" ? "Create product" : "Save changes"}
        </button>
      </div>

      {serverError ? (
        <p className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {serverError}
        </p>
      ) : null}

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <div>
          <label className="admin-label">Name</label>
          <input
            className="admin-input"
            {...form.register("name", {
              onChange: (event) => {
                form.setValue("slug", slugify(event.target.value));
              },
            })}
          />
        </div>

        <div>
          <label className="admin-label">Slug</label>
          <input className="admin-input" {...form.register("slug")} />
        </div>

        <div>
          <label className="admin-label">Category</label>
          <select className="admin-input" {...form.register("category")}>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="admin-label">Status</label>
          <select className="admin-input" {...form.register("status")}>
            {PRODUCT_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="admin-label">Price (EUR)</label>
          <input type="number" className="admin-input" {...form.register("price")} />
        </div>

        <div>
          <label className="admin-label">Size</label>
          <input
            className="admin-input"
            placeholder="38, 40, S, M, 32..."
            {...form.register("size")}
          />
        </div>

        <div>
          <label className="admin-label">Size system</label>
          <select className="admin-input" {...form.register("size_system")}>
            {SIZE_SYSTEMS.map((sizeSystem) => (
              <option key={sizeSystem} value={sizeSystem}>
                {sizeSystem}
              </option>
            ))}
          </select>
        </div>

        <div className="lg:col-span-2">
          <label className="admin-label">Short description</label>
          <textarea className="admin-input min-h-24" {...form.register("short_description")} />
        </div>

        <div className="lg:col-span-2">
          <label className="admin-label">Full description</label>
          <textarea className="admin-input min-h-40" {...form.register("full_description")} />
        </div>

        <div>
          <label className="admin-label">Materials</label>
          <input className="admin-input" {...form.register("materials")} />
        </div>

        <div>
          <label className="admin-label">Techniques</label>
          <input
            className="admin-input"
            placeholder="painting, sewing, embroidery"
            {...form.register("techniquesInput")}
          />
        </div>

        <div>
          <label className="admin-label">Collection name</label>
          <select className="admin-input" {...form.register("collection_name")}>
            <option value="">No collection</option>
            {collections.map((collection) => (
              <option key={collection.id} value={collection.name}>
                {collection.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="admin-label">Drop date</label>
          <input type="date" className="admin-input" {...form.register("drop_date")} />
        </div>

        <div>
          <label className="admin-label">Instagram post URL</label>
          <input className="admin-input" {...form.register("instagram_post_url")} />
        </div>

        <div>
          <label className="admin-label">Sort order</label>
          <input type="number" className="admin-input" {...form.register("sort_order")} />
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="flex items-center gap-3 rounded-[1.2rem] border border-black/8 bg-zinc-50 px-4 py-4 text-sm text-black">
          <input type="checkbox" {...form.register("featured")} />
          Featured on homepage
        </label>
        <label className="flex items-center gap-3 rounded-[1.2rem] border border-black/8 bg-zinc-50 px-4 py-4 text-sm text-black">
          <input type="checkbox" {...form.register("is_unique_piece")} />
          One of one / unique piece
        </label>
      </div>

      <div className="mt-8 border-t border-black/8 pt-6">
        <ImageUploader
          images={images}
          mainImage={mainImage || null}
          onChange={(nextImages) => form.setValue("gallery_image_urls", nextImages)}
          onMainImageChange={(value) => form.setValue("main_image_url", value || "")}
        />
      </div>
    </form>
  );
}
