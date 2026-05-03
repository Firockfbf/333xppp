import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { INSTAGRAM_URL } from "@/lib/constants";
import { siteEditorial } from "@/lib/site-content";

export function HeroSection() {
  return (
    <section className="container-shell overflow-x-clip py-6 md:py-10">
      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="min-w-0 space-y-5">
          <div className="browser-window public-frame star-sparkle animate-rise overflow-hidden">
            <div className="browser-bar">
              <span className="browser-dot" />
              <span className="browser-dot" />
              <span className="browser-dot" />
              <span>www.333xppp.online / welcome to the nostalgia</span>
            </div>

            <div className="grid gap-5 bg-[#f5b7df] p-4 sm:p-5 2xl:grid-cols-[0.85fr_1.15fr]">
              <div className="min-w-0 space-y-4 rounded-[1.1rem] border-2 border-black/30 bg-[#ef83c7] p-4 text-black shadow-[inset_0_0_0_2px_rgba(255,255,255,0.3)]">
                <p className="font-mono text-[11px] uppercase tracking-[0.25em]">
                  {siteEditorial.issueTitle}
                </p>
                <div className="chrome-logo-wrap flex items-center justify-center rounded-[1rem] border-2 border-black/20 bg-white/30 p-4">
                  <Image
                    src="/brand/logos/logo-chrome.png"
                    alt="333XPPP chrome logo"
                    width={560}
                    height={420}
                    className="h-auto w-full max-w-[320px] object-contain"
                    priority
                  />
                </div>
                <p className="text-sm leading-6 text-black/75">
                  {siteEditorial.issueCopy}
                </p>
              </div>

              <div className="min-w-0 space-y-4">
                <div className="soft-card rounded-[1rem] p-3 text-black">
                  <p className="magazine-title break-words font-serif text-[1.7rem] font-bold uppercase leading-none tracking-wide text-[#ff1493] sm:text-[2.25rem] lg:text-[2.6rem]">
                    Cool girl alert!
                  </p>
                  <p className="mt-2 text-sm leading-6 text-black/75">
                    333XPPP CLOTHES is an upcycled, handmade and no-gender fashion
                    project. Each piece is reworked by hand through sewing,
                    painting, embroidery, knitting and textile experimentation.
                  </p>
                </div>

                <div className="grid gap-3 lg:grid-cols-[1.05fr_0.95fr]">
                  <div className="pixel-frame overflow-hidden bg-black">
                    <Image
                      src="/brand/models/model-black-jacket.png"
                      alt="333XPPP editorial model"
                      width={706}
                      height={768}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="grid min-w-0 gap-3">
                    <div className="pixel-frame overflow-hidden bg-black">
                      <Image
                        src="/brand/models/model-camo.png"
                        alt="Y2K model look"
                        width={386}
                        height={551}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="magazine-panel rounded-[1rem] p-4">
                      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/55">
                        moodboard
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {siteEditorial.moodTags.map((tag) => (
                          <span
                            key={tag}
                            className="stamped-label px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/shop"
                    className="brutal-button inline-flex items-center justify-center gap-2 bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#181818]"
                  >
                    Shop the pieces
                    <ArrowUpRight size={16} />
                  </Link>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="brutal-button inline-flex items-center justify-center gap-2 border border-black/30 bg-white/65 px-6 py-3 text-sm font-semibold text-black transition hover:bg-white"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="ticker">
            <div className="ticker-track">
              {new Array(2).fill(0).map((_, index) => (
                <div key={index} className="inline-flex gap-10 px-4">
                  {[
                    "333XPPP clothes with soul",
                    "upcycled handmade no gender",
                    "cool girl alert",
                    "drop archive issue 01",
                    "kitsch magazine portal",
                  ].map((item) => (
                    <span
                      key={`${index}-${item}`}
                      className="mono-label text-[11px] text-white/75"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid min-w-0 gap-5">
          <div className="magazine-panel rounded-[1.2rem] p-4">
            <p className="break-words font-serif text-4xl font-bold uppercase leading-none text-white">
              2000s
              <span className="block text-accent">website aesthetic</span>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/72">
              Dark portal, brat archive, upcycled pieces and hand-touched
              textures. Less boutique, more online issue.
            </p>
          </div>

          <div className="grid gap-4 2xl:grid-cols-2">
            <div className="soft-card min-w-0 rounded-[1rem] p-4">
              <p className="font-serif text-2xl font-bold uppercase text-[#ffc8e8]">
                manifesto
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-white/74">
                {siteEditorial.manifesto.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
            <div className="pixel-frame min-w-0 overflow-hidden bg-black">
              <Image
                src="/brand/models/model-jeans-graffiti.png"
                alt="333XPPP editorial model in jeans"
                width={341}
                height={604}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
