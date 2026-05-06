"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function ProductGallery({
  name,
  images,
}: {
  name: string;
  images: string[];
}) {
  const safeImages = images.length
    ? images
    : ["/placeholder-product.svg", "/placeholder-product.svg"];
  const [activeImage, setActiveImage] = useState(safeImages[0]);

  return (
    <div className="space-y-4">
      <div className="browser-window overflow-hidden">
        <div className="browser-bar">
          <span className="browser-dot" />
          <span className="browser-dot" />
          <span className="browser-dot" />
          <span>{name.toLowerCase().replace(/\s+/g, "-")}.jpg</span>
        </div>
        {activeImage === "/placeholder-product.svg" ? (
          <div className="archive-grid flex aspect-[4/5] items-end bg-[linear-gradient(180deg,rgba(255,45,166,0.16),rgba(255,255,255,0.04)),linear-gradient(180deg,#151515,#080808)] p-6">
            <span className="display-title text-5xl text-white/70">333XPPP</span>
          </div>
        ) : (
          <div className="relative aspect-[4/5] bg-black">
            <Image src={activeImage} alt={name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-3">
        {safeImages.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setActiveImage(image)}
            data-active={activeImage === image}
            className={cn("thumbnail-frame", activeImage === image ? "translate-y-[-2px]" : "opacity-90 hover:opacity-100")}
          >
            {image === "/placeholder-product.svg" ? (
              <div className="aspect-[4/5] bg-[linear-gradient(180deg,rgba(255,45,166,0.16),rgba(255,255,255,0.04)),linear-gradient(180deg,#151515,#080808)]" />
            ) : (
              <div className="relative aspect-[4/5] bg-black">
                <Image
                  src={image}
                  alt={`${name} view ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
