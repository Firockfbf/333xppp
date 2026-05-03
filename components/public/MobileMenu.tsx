"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="browser-window p-2 text-black"
        aria-label="Toggle navigation"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {open ? (
        <div className="browser-window absolute inset-x-4 top-18 z-50 overflow-hidden shadow-2xl">
          <div className="browser-bar">
            <span className="browser-dot" />
            <span className="browser-dot" />
            <span className="browser-dot" />
            <span>menu.html</span>
          </div>
          <div className="paper-grid bg-[#ffd7ef] p-5">
          <nav className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="brutal-button border border-black/15 bg-white/70 px-4 py-3 text-sm text-black transition hover:border-black/45 hover:bg-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          </div>
        </div>
      ) : null}
    </div>
  );
}
