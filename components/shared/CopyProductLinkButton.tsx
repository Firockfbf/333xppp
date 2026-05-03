"use client";

import { useState } from "react";

export function CopyProductLinkButton() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="rounded-full border border-white/20 px-5 py-3 text-sm font-medium text-white transition hover:border-accent hover:text-accent"
    >
      {copied ? "Link copied" : "Copy product link"}
    </button>
  );
}
