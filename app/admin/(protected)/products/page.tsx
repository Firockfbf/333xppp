import Link from "next/link";
import { AdminProductTable } from "@/components/admin/AdminProductTable";
import { getProducts } from "@/lib/products";

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-6">
      <div className="admin-card rounded-[2rem] p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-pink-600">Products</p>
            <h1 className="mt-1 text-3xl font-semibold text-black">
              Manage all pieces
            </h1>
          </div>
          <Link
            href="/admin/products/new"
            className="inline-flex rounded-full bg-black px-5 py-3 text-sm font-medium text-white"
          >
            Add new product
          </Link>
        </div>
      </div>

      <AdminProductTable products={products} />
    </div>
  );
}
