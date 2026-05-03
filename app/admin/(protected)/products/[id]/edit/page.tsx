import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/ProductForm";
import { getCategories, getCollections, getProductById } from "@/lib/products";

export default async function EditAdminProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, categories, collections] = await Promise.all([
    getProductById(id),
    getCategories(),
    getCollections(),
  ]);

  if (!product) notFound();

  return (
    <ProductForm
      product={product}
      mode="edit"
      categories={categories}
      collections={collections}
    />
  );
}
