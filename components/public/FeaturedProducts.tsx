import Link from "next/link";
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
          className="mono-label hidden text-[11px] text-accent underline underline-offset-4 transition hover:text-white md:inline-flex"
        >
          View all pieces
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
