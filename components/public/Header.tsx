import Image from "next/image";
import Link from "next/link";
import { AtSign } from "lucide-react";
import { INSTAGRAM_URL } from "@/lib/constants";
import { MobileMenu } from "@/components/public/MobileMenu";
import { getSiteContent } from "@/lib/site-content";

export async function Header() {
  const siteContent = await getSiteContent();

  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-black/72 backdrop-blur-xl">
      <div className="container-shell flex items-center justify-between py-4">
        <Link href="/" className="inline-flex items-center gap-3">
          <Image
            src={siteContent.brand_logo_url || "/brand/logos/logo-chrome.png"}
            alt="333XPPP logo"
            width={120}
            height={60}
            className="h-11 w-auto object-contain sm:h-13"
          />
          <span className="mono-label hidden text-[10px] text-white/55 sm:inline-flex">
            portal / archive / drop
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-white/75 md:flex">
          <Link href="/shop" className="mono-label text-[11px] transition hover:text-accent">
            Shop
          </Link>
          <Link href="/about" className="mono-label text-[11px] transition hover:text-accent">
            About
          </Link>
          <Link href="/contact" className="mono-label text-[11px] transition hover:text-accent">
            Contact
          </Link>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="brutal-button inline-flex items-center gap-2 border border-white/15 bg-accent/10 px-4 py-2 text-white transition hover:border-accent hover:text-accent"
          >
            <AtSign size={16} />
            Instagram
          </a>
        </nav>

        <MobileMenu />
      </div>
    </header>
  );
}
