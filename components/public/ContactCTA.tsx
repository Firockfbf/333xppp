import { Mail, MessageCircle } from "lucide-react";
import { CONTACT_EMAIL, INSTAGRAM_URL } from "@/lib/constants";

export function ContactCTA() {
  return (
    <section className="container-shell py-10 md:py-14">
      <div className="browser-window overflow-hidden">
        <div className="browser-bar">
          <span className="browser-dot" />
          <span className="browser-dot" />
          <span className="browser-dot" />
          <span>dm-to-buy.html</span>
        </div>
        <div className="bg-[#ff9ed6] p-6 sm:p-8 md:p-10">
        <p className="section-kicker mono-label text-xs text-accent-soft">Contact / custom work</p>
        <div className="mt-4 grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="font-serif text-4xl font-bold uppercase leading-none text-black sm:text-6xl">
              DM to buy
              <span className="block text-white">DM to commission</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-black/75">
              Orders happen through Instagram DM in this first version. Custom
              pieces are open on request depending on materials, timeline and
              concept.
            </p>
          </div>

          <div className="space-y-3">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="glitch-hover cut-corners-soft flex items-center justify-between border border-black/20 bg-white/65 px-5 py-4 text-black transition hover:border-accent"
            >
              <span className="inline-flex items-center gap-3">
                <MessageCircle size={18} />
                Instagram DM
              </span>
              <span className="mono-label text-[11px] text-black/55">Open</span>
            </a>
            {CONTACT_EMAIL ? (
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="glitch-hover cut-corners-soft flex items-center justify-between border border-black/20 bg-white/65 px-5 py-4 text-black transition hover:border-accent"
              >
                <span className="inline-flex items-center gap-3">
                  <Mail size={18} />
                  {CONTACT_EMAIL}
                </span>
                <span className="mono-label text-[11px] text-black/55">Mail</span>
              </a>
            ) : null}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
