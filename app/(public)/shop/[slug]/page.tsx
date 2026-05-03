import { notFound } from "next/navigation";
import { CopyProductLinkButton } from "@/components/shared/CopyProductLinkButton";
import { ProductGallery } from "@/components/public/ProductGallery";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { INSTAGRAM_URL } from "@/lib/constants";
import { formatCurrency, formatSizeLabel } from "@/lib/utils";
import { getProductBySlug } from "@/lib/products";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const images = [
    ...(product.main_image_url ? [product.main_image_url] : []),
    ...product.gallery_image_urls.filter((image) => image !== product.main_image_url),
  ];

  return (
    <section className="container-shell py-10 md:py-14">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <ProductGallery name={product.name} images={images} />

        <div className="space-y-6">
          <div className="browser-window overflow-hidden">
            <div className="browser-bar">
              <span className="browser-dot" />
              <span className="browser-dot" />
              <span className="browser-dot" />
              <span>{product.slug}.html</span>
            </div>
            <div className="paper-grid bg-[#ffd7ef] p-5 text-black sm:p-6">
              <p className="mono-label text-xs text-black/55">{product.category}</p>
              <h1 className="mt-3 font-serif text-4xl font-bold uppercase leading-none text-[#ff1493] sm:text-6xl">
                {product.name}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <StatusBadge status={product.status} />
                {product.is_unique_piece ? (
                  <span className="mono-label chrome-pill px-3 py-1 text-[11px]">
                    one of one
                  </span>
                ) : null}
                {product.collection_name ? (
                  <span className="mono-label border border-black/15 bg-white/70 px-3 py-1 text-[11px] text-black/70">
                    {product.collection_name}
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          <div className="browser-window overflow-hidden">
            <div className="browser-bar">
              <span className="browser-dot" />
              <span className="browser-dot" />
              <span className="browser-dot" />
              <span>piece-info.txt</span>
            </div>
            <div className="bg-[#111] p-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <p className="mono-label text-[11px] text-white/45">Price</p>
                <p className="mt-2 text-xl font-semibold text-white">
                  {formatCurrency(product.price)}
                </p>
              </div>
              <div>
                <p className="mono-label text-[11px] text-white/45">Size</p>
                <p className="mt-2 text-xl font-semibold text-white">
                  {formatSizeLabel(product.size, product.size_system)}
                </p>
              </div>
              <div>
                <p className="mono-label text-[11px] text-white/45">Materials</p>
                <p className="mt-2 text-sm leading-7 text-white/72">
                  {product.materials || "Not specified"}
                </p>
              </div>
              <div>
                <p className="mono-label text-[11px] text-white/45">Techniques</p>
                <p className="mt-2 text-sm leading-7 text-white/72">
                  {product.techniques.length
                    ? product.techniques.join(", ")
                    : "Not specified"}
                </p>
              </div>
            </div>
            </div>
          </div>

          <div className="browser-window overflow-hidden">
            <div className="browser-bar">
              <span className="browser-dot" />
              <span className="browser-dot" />
              <span className="browser-dot" />
              <span>editorial-description.rtf</span>
            </div>
            <div className="bg-white p-5 text-black sm:p-6">
              <p className="text-lg font-medium text-black">{product.short_description}</p>
              <p className="mt-4 text-base leading-8 text-black/72">
                {product.full_description}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="brutal-button inline-flex items-center justify-center bg-[#ff1493] px-5 py-3 font-medium text-white transition hover:bg-[#ff3eb0]"
            >
              DM on Instagram to buy
            </a>
            <CopyProductLinkButton />
          </div>
        </div>
      </div>
    </section>
  );
}
