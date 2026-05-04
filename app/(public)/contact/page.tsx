import { CONTACT_EMAIL, INSTAGRAM_URL } from "@/lib/constants";
import { getSiteContent } from "@/lib/site-content";

export default async function ContactPage() {
  const siteContent = await getSiteContent();

  return (
    <section className="container-shell py-10 md:py-14">
      <div className="browser-window overflow-hidden">
        <div className="browser-bar">
          <span className="browser-dot" />
          <span className="browser-dot" />
          <span className="browser-dot" />
          <span>contact-portal.html</span>
        </div>
        <div className="paper-grid bg-[#ffd7ef] p-6 text-black sm:p-8 md:p-10">
          <p className="mono-label text-xs text-black/55">Contact</p>
          <h1 className="mt-3 font-serif text-4xl font-bold uppercase leading-none text-[#ff1493] sm:text-6xl">
            {siteContent.contact_title}
            <span className="block text-black">{siteContent.contact_subtitle}</span>
          </h1>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="paper-panel p-5">
              <p className="mono-label text-[11px] text-black/45">Instagram</p>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-3 block text-lg font-semibold text-black"
              >
                {INSTAGRAM_URL.replace("https://", "")}
              </a>
            </div>

            {CONTACT_EMAIL ? (
              <div className="paper-panel p-5">
                <p className="mono-label text-[11px] text-black/45">Email</p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="mt-3 block text-lg font-semibold text-black"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            ) : null}
          </div>

          <p className="mt-6 max-w-2xl text-base leading-8 text-black/72">
            {siteContent.contact_body}
          </p>
        </div>
      </div>
    </section>
  );
}
