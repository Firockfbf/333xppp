import Link from "next/link";
import { getAdminStats } from "@/lib/products";

export default async function AdminDashboardPage() {
  const stats = await getAdminStats();

  return (
    <div className="space-y-6">
      <div className="admin-card rounded-[2rem] p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-pink-600">Dashboard</p>
            <h1 className="mt-1 text-3xl font-semibold text-black">
              Inventory overview
            </h1>
          </div>
          <Link
            href="/admin/products/new"
            className="inline-flex rounded-full bg-black px-5 py-3 text-sm font-medium text-white"
          >
            Add new product
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.4rem] border border-black/8 bg-zinc-50 p-5">
            <p className="text-sm text-zinc-500">Total products</p>
            <p className="mt-2 text-4xl font-semibold text-black">{stats.total}</p>
          </div>
          <div className="rounded-[1.4rem] border border-black/8 bg-zinc-50 p-5">
            <p className="text-sm text-zinc-500">Available</p>
            <p className="mt-2 text-4xl font-semibold text-black">
              {stats.available}
            </p>
          </div>
          <div className="rounded-[1.4rem] border border-black/8 bg-zinc-50 p-5">
            <p className="text-sm text-zinc-500">Sold</p>
            <p className="mt-2 text-4xl font-semibold text-black">{stats.sold}</p>
          </div>
        </div>
      </div>

      <div className="admin-card rounded-[2rem] p-6">
        <h2 className="text-xl font-semibold text-black">Latest products</h2>
        <div className="mt-5 space-y-3">
          {stats.latest.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between rounded-[1.2rem] border border-black/8 px-4 py-4"
            >
              <div>
                <p className="font-medium text-black">{product.name}</p>
                <p className="text-sm text-zinc-500">{product.category}</p>
              </div>
              <Link
                href={`/admin/products/${product.id}/edit`}
                className="rounded-full border border-black/10 px-4 py-2 text-sm text-black"
              >
                Edit
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
