import Image from "next/image";
import { INSTAGRAM_URL } from "@/lib/constants";
import { getSiteContent } from "@/lib/site-content";

export default async function AboutPage() {
  const siteContent = await getSiteContent();

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
              {siteContent.about_title}
              <span className="block text-black">{siteContent.about_subtitle}</span>
            </h1>
            <div className="mt-6 paper-panel overflow-hidden">
              <div className="relative aspect-[4/5] bg-black">
                <Image
                  src={siteContent.about_image_url || "/brand/models/model-black-jacket.png"}
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
            <p>{siteContent.about_intro}</p>
            {siteContent.about_body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {siteContent.about_tags.map((tag) => (
              <span
                key={tag}
                className="mono-label stamped-label px-4 py-3 text-[11px] text-white/80"
              >
                {tag}
              </span>
            ))}
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
