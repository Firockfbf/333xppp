"use client";

import { useMemo, useState } from "react";
import { PRODUCT_STATUSES } from "@/lib/constants";
import { ProductCard } from "@/components/public/ProductCard";
import { ProductFilters } from "@/components/public/ProductFilters";
import type { ProductRecord } from "@/types/database";

export function ProductGrid({
  products,
  categories,
}: {
  products: ProductRecord[];
  categories: string[];
}) {
  const [category, setCategory] = useState<string>("All");
  const [status, setStatus] = useState<string>("all");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = category === "All" || product.category === category;
      const statusMatch = status === "all" || product.status === status;
      return categoryMatch && statusMatch;
    });
  }, [category, products, status]);

  return (
    <div className="space-y-8">
      <ProductFilters
        categories={["All", ...categories]}
        statuses={["all", ...PRODUCT_STATUSES]}
        activeCategory={category}
        activeStatus={status}
        onCategoryChange={setCategory}
        onStatusChange={setStatus}
      />

      {filteredProducts.length ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="browser-window overflow-hidden">
          <div className="browser-bar">
            <span className="browser-dot" />
            <span className="browser-dot" />
            <span className="browser-dot" />
            <span>no-results.txt</span>
          </div>
          <div className="bg-[#111] p-8 text-center text-white/65">
            No pieces match these filters right now.
          </div>
        </div>
      )}
    </div>
  );
}
