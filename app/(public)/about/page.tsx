import Image from "next/image";
import { INSTAGRAM_URL } from "@/lib/constants";

export default function AboutPage() {
  return (
    <section className="container-shell py-10 md:py-14">
      <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr]">
        <div className="browser-window overflow-hidden">
          <div className="browser-bar">
            <span className="browser-dot" />
            <span className="browser-dot" />
            <span className="browser-dot" />
            <span>about-the-project.html</span>
          </div>
          <div className="paper-grid bg-[#ffd7ef] p-6 text-black">
            <p className="mono-label text-xs text-black/55">About</p>
            <h1 className="mt-3 font-serif text-4xl font-bold uppercase leading-none text-[#ff1493] sm:text-6xl">
              handmade
              <span className="block text-black">no gender</span>
            </h1>
            <div className="mt-6 paper-panel overflow-hidden">
              <div className="relative aspect-[4/5] bg-black">
                <Image
                  src="/brand/models/model-black-jacket.png"
                  alt="333XPPP lookbook"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="magazine-panel p-6 sm:p-8">
          <div className="space-y-5 text-base leading-8 text-white/74">
            <p>
              333XPPP is an upcycled clothing project focused on reconstruction,
              textile experimentation and a strong anti-fashion attitude. The
              creator works directly on existing garments and materials to build
              pieces that feel raw, lived-in, edited and emotionally charged.
            </p>
            <p>
              The process includes sewing, painting, embroidery, knitting,
              distressing, patching and handmade interventions that make each
              garment singular. The project is no gender, anti-normative and
              openly resistant to disposable trend cycles.
            </p>
            <p>
              Sustainability here is practical and radical: extending the life of
              existing textiles, producing in one-of-one or very small series,
              and rejecting fast-fashion overproduction.
            </p>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {["upcycled", "editorial trash", "anti fast fashion", "DIY", "club kid", "archive mood"].map(
              (tag) => (
                <span
                  key={tag}
                  className="mono-label stamped-label px-4 py-3 text-[11px] text-white/80"
                >
                  {tag}
                </span>
              ),
            )}
          </div>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="brutal-button mt-8 inline-flex bg-[#ff1493] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#ff3eb0]"
          >
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
