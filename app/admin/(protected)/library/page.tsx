import { TaxonomyManager } from "@/components/admin/TaxonomyManager";
import { getCategories, getCollections } from "@/lib/products";

export default async function AdminLibraryPage() {
  const [categories, collections] = await Promise.all([
    getCategories(),
    getCollections(),
  ]);

  return (
    <div className="space-y-6">
      <div className="admin-card rounded-[2rem] p-6 sm:p-8">
        <p className="text-sm font-semibold text-pink-600">Library</p>
        <h1 className="mt-1 text-3xl font-semibold text-black">
          Types and collections
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-600">
          Add the reusable values used in the product form: clothing types like
          skirts or pants, and collection names for each drop.
        </p>
      </div>

      <TaxonomyManager categories={categories} collections={collections} />
    </div>
  );
}
