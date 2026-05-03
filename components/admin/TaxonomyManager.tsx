"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import type { CategoryRecord, CollectionRecord } from "@/types/database";

type TaxonomySectionProps = {
  title: string;
  description: string;
  endpoint: "/api/admin/categories" | "/api/admin/collections";
  items: Array<CategoryRecord | CollectionRecord>;
};

function TaxonomySection({
  title,
  description,
  endpoint,
  items,
}: TaxonomySectionProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          sort_order: sortOrder ? Number(sortOrder) : null,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Unable to save.");
      }

      setName("");
      setSortOrder("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    await fetch(`${endpoint}/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <section className="admin-card rounded-[2rem] p-6">
      <h2 className="text-xl font-semibold text-black">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-zinc-600">{description}</p>

      <form onSubmit={handleCreate} className="mt-5 grid gap-3 md:grid-cols-[1fr_140px_auto]">
        <input
          className="admin-input"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name"
          required
        />
        <input
          className="admin-input"
          type="number"
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value)}
          placeholder="Order"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-black px-5 py-3 text-sm font-medium text-white disabled:opacity-50"
        >
          {loading ? "Saving..." : "Add"}
        </button>
      </form>

      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-[1.2rem] border border-black/8 px-4 py-4"
          >
            <div>
              <p className="font-medium text-black">{item.name}</p>
              <p className="text-xs text-zinc-500">
                slug: {item.slug} · order: {item.sort_order}
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleDelete(item.id)}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm text-black"
            >
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export function TaxonomyManager({
  categories,
  collections,
}: {
  categories: CategoryRecord[];
  collections: CollectionRecord[];
}) {
  return (
    <div className="space-y-6">
      <TaxonomySection
        title="Types"
        description="Create the product types used in the shop, like skirts, pants, jackets or custom pieces."
        endpoint="/api/admin/categories"
        items={categories}
      />
      <TaxonomySection
        title="Collections"
        description="Create collection names or drops that can be reused on product pages and collection highlights."
        endpoint="/api/admin/collections"
        items={collections}
      />
    </div>
  );
}
