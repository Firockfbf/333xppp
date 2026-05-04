import Link from "next/link";
import { getSiteContent } from "@/lib/site-content";

export async function AboutSection() {
  const siteContent = await getSiteContent();

  return (
    <section className="container-shell grid gap-6 py-10 md:grid-cols-[0.85fr_1.15fr] md:py-14">
      <div className="browser-window overflow-hidden">
        <div className="browser-bar">
          <span className="browser-dot" />
          <span className="browser-dot" />
          <span className="browser-dot" />
          <span>about-333xppp.exe</span>
        </div>
        <div className="bg-[#ffd7ef] p-6 text-black">
          <p className="font-serif text-4xl font-bold uppercase leading-none text-[#ff1493]">
            {siteContent.about_title}
            <span className="block text-black">{siteContent.about_subtitle}</span>
          </p>
          <p className="mt-4 text-sm leading-6 text-black/75">
            {siteContent.about_intro}
          </p>
        </div>
      </div>

      <div className="magazine-panel rounded-[1.2rem] p-6 sm:p-8">
        <div className="space-y-4">
          {siteContent.about_body.map((paragraph) => (
            <p key={paragraph} className="max-w-3xl text-base leading-8 text-white/78">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {siteContent.about_tags.map((tag) => (
            <span
              key={tag}
              className="mono-label stamped-label px-4 py-3 text-[11px] text-white/78"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          href="/about"
          className="brutal-button mt-7 inline-flex border border-white/20 px-5 py-3 text-sm font-medium text-white transition hover:border-accent hover:text-accent"
        >
          Read the full story
        </Link>
      </div>
    </section>
  );
}
