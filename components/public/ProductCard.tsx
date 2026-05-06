import Image from "next/image";
import Link from "next/link";
import { formatCurrency, formatSizeLabel } from "@/lib/utils";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { ProductRecord } from "@/types/database";

export function ProductCard({ product }: { product: ProductRecord }) {
  return (
    <article className="group browser-window glitch-hover overflow-hidden">
      <div className="browser-bar">
        <span className="browser-dot" />
        <span className="browser-dot" />
        <span className="browser-dot" />
        <span>{product.slug}.gif</span>
      </div>

      <div className="relative aspect-[4/5] overflow-hidden border-b-2 border-[#8c8c8c] bg-[linear-gradient(180deg,rgba(255,45,166,0.16),rgba(255,255,255,0.04)),linear-gradient(180deg,#151515,#080808)]">
        {product.main_image_url ? (
          <Image
            src={product.main_image_url}
            alt={product.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.06]"
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        ) : (
          <div className="archive-grid flex h-full items-end p-5">
            <span className="display-title hero-shadow text-4xl leading-none text-white/70">
              333XPPP
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgba(0,0,0,0.7)_100%)]" />
        <div className="stamped-label absolute left-3 top-3 bg-black/55 px-3 py-1">
          <span className="mono-label text-[10px] text-white/62">
            {product.collection_name || "drop archive"}
          </span>
        </div>
      </div>

      <div className="space-y-4 bg-[#f8d3ec] p-4 text-black sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="mono-label text-[10px] text-black/55">
              {product.category}
            </p>
            <h3 className="mt-1 font-serif text-2xl font-bold leading-none tracking-tight text-black">
              {product.name}
            </h3>
          </div>
          <StatusBadge status={product.status} />
        </div>

        <div className="raw-divider flex items-center justify-between pb-3 text-sm text-black/72">
          <span>{formatCurrency(product.price)}</span>
          <span>{formatSizeLabel(product.size, product.size_system)}</span>
        </div>

        <Link
          href={`/shop/${product.slug}`}
          className="mono-label inline-flex text-[11px] text-black underline underline-offset-4 transition hover:text-[#ff1493]"
        >
          View piece
        </Link>
      </div>
    </article>
  );
}
