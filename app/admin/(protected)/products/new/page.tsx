import { ProductForm } from "@/components/admin/ProductForm";
import { getCategories, getCollections } from "@/lib/products";

export default async function NewAdminProductPage() {
  const [categories, collections] = await Promise.all([
    getCategories(),
    getCollections(),
  ]);

  return (
    <ProductForm
      mode="create"
      categories={categories}
      collections={collections}
    />
  );
}
