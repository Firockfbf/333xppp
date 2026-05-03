import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProductCard } from "@/components/public/ProductCard";
import type { ProductRecord } from "@/types/database";

export function FeaturedProducts({ products }: { products: ProductRecord[] }) {
  return (
    <section className="container-shell py-10 md:py-14">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="section-kicker mono-label text-xs text-accent-soft">Featured pieces</p>
          <h2 className="font-serif text-4xl font-bold uppercase leading-none text-white sm:text-6xl">
            cool girl
            <span className="block text-accent">shopping page</span>
          </h2>
        </div>
        <Link
          href="/shop"
          className="brutal-button hidden items-center gap-2 border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-accent md:inline-flex"
        >
          View all pieces
          <ArrowUpRight size={16} />
        </Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
