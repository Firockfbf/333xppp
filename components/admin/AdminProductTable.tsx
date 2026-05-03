"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { ConfirmDeleteModal } from "@/components/admin/ConfirmDeleteModal";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatCurrency, formatSizeLabel } from "@/lib/utils";
import type { ProductRecord, ProductStatus } from "@/types/database";

export function AdminProductTable({ products }: { products: ProductRecord[] }) {
  const router = useRouter();
  const [pendingDelete, setPendingDelete] = useState<ProductRecord | null>(null);
  const [loading, setLoading] = useState(false);

  async function updateStatus(id: string, status: ProductStatus) {
    await fetch(`/api/admin/products/${id}/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    router.refresh();
  }

  async function confirmDelete() {
    if (!pendingDelete) return;
    setLoading(true);

    try {
      await fetch(`/api/admin/products/${pendingDelete.id}`, {
        method: "DELETE",
      });
      setPendingDelete(null);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="admin-card overflow-hidden rounded-[1.8rem]">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-zinc-50 text-zinc-500">
              <tr>
                <th className="px-5 py-4 font-medium">Product</th>
                <th className="px-5 py-4 font-medium">Price</th>
                <th className="px-5 py-4 font-medium">Category</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-black/6">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-12 overflow-hidden rounded-xl bg-zinc-100">
                        {product.main_image_url ? (
                          <img
                            src={product.main_image_url}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        ) : null}
                      </div>
                      <div>
                        <p className="font-medium text-black">{product.name}</p>
                        <p className="text-xs text-zinc-500">
                          {formatSizeLabel(product.size, product.size_system)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-zinc-700">
                    {formatCurrency(product.price)}
                  </td>
                  <td className="px-5 py-4 text-zinc-700">{product.category}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={product.status} admin />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-2 text-xs font-medium text-black"
                      >
                        <Pencil size={13} />
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => setPendingDelete(product)}
                        className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-2 text-xs font-medium text-black"
                      >
                        <Trash2 size={13} />
                        Delete
                      </button>
                      <button
                        type="button"
                        onClick={() => updateStatus(product.id, "sold")}
                        className="rounded-full bg-black px-3 py-2 text-xs font-medium text-white"
                      >
                        Mark sold
                      </button>
                      <button
                        type="button"
                        onClick={() => updateStatus(product.id, "reserved")}
                        className="rounded-full border border-black/10 px-3 py-2 text-xs font-medium text-black"
                      >
                        Mark reserved
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDeleteModal
        open={Boolean(pendingDelete)}
        productName={pendingDelete?.name ?? ""}
        loading={loading}
        onCancel={() => setPendingDelete(null)}
        onConfirm={confirmDelete}
      />
    </>
  );
}
