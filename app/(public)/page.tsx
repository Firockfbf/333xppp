import Image from "next/image";
import { AboutSection } from "@/components/public/AboutSection";
import { ContactCTA } from "@/components/public/ContactCTA";
import { FeaturedProducts } from "@/components/public/FeaturedProducts";
import { HeroSection } from "@/components/public/HeroSection";
import { getFeaturedProducts, getLatestDropProducts } from "@/lib/products";

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();
  const latestDrop = await getLatestDropProducts();

  return (
    <>
      <HeroSection />
      <FeaturedProducts products={featuredProducts} />
      <AboutSection />

      <section className="container-shell py-10 md:py-14">
        <div className="browser-window overflow-hidden">
          <div className="browser-bar">
            <span className="browser-dot" />
            <span className="browser-dot" />
            <span className="browser-dot" />
            <span>new-drop-magazine.html</span>
          </div>
          <div className="bg-[#111] p-6 sm:p-8">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="section-kicker mono-label text-xs text-accent-soft">Latest drop</p>
                <h2 className="font-serif text-4xl font-bold uppercase leading-none text-white sm:text-6xl">
                  kitsch magazine
                  <span className="block text-accent">new collection</span>
                </h2>
              </div>
            </div>
            <div className="mt-4 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="image-panel overflow-hidden bg-black">
                <Image
                  src="/brand/models/model-camo.png"
                  alt="333XPPP lookbook model"
                  width={386}
                  height={551}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {latestDrop.map((product) => (
                  <div
                    key={product.id}
                    className="paper-panel glitch-hover overflow-hidden"
                  >
                    <div className="bg-[#ffd7ef] p-4 text-black">
                      <p className="mono-label text-[11px] text-black/55">
                        {product.collection_name || "Recent piece"}
                      </p>
                      <h3 className="mt-2 font-serif text-2xl font-bold uppercase leading-none text-[#ff1493]">
                        {product.name}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-black/72">
                        {product.short_description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
