import { ProductGrid } from "@/components/public/ProductGrid";
import { getCategories, getProducts } from "@/lib/products";

export default async function ShopPage() {
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <section className="container-shell py-10 md:py-14">
      <div className="browser-window mb-8 overflow-hidden">
        <div className="browser-bar">
          <span className="browser-dot" />
          <span className="browser-dot" />
          <span className="browser-dot" />
          <span>shop-portal.html</span>
        </div>
        <div className="bg-[#ffd7ef] p-5 sm:p-7">
        <p className="mono-label text-xs text-accent-soft">Creations</p>
        <h1 className="font-serif text-4xl font-bold uppercase leading-none text-black sm:text-6xl">
          Shop the pieces
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-black/72">
          One-of-one garments and small series, filtered by category and status.
          Sold pieces remain visible as an archive of the project.
        </p>
        </div>
      </div>

      <ProductGrid products={products} categories={categories.map((category) => category.name)} />
    </section>
  );
}
