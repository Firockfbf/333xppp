"use client";

import { useState } from "react";
import { ImagePlus, LoaderCircle, Star, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Props = {
  images: string[];
  mainImage: string | null;
  onChange: (images: string[]) => void;
  onMainImageChange: (value: string | null) => void;
};

export function ImageUploader({
  images,
  mainImage,
  onChange,
  onMainImageChange,
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    setUploading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/upload/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          files: files.map((file) => ({ name: file.name })),
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Image upload failed.");
      }

      const uploads = result.uploads as Array<{
        path: string;
        token: string;
        publicUrl: string;
      }>;

      const supabase = createClient();
      const uploadedUrls: string[] = [];

      for (const [index, file] of files.entries()) {
        const upload = uploads[index];
        if (!upload) {
          throw new Error("Missing upload slot.");
        }

        const { error } = await supabase.storage
          .from("product-images")
          .uploadToSignedUrl(upload.path, upload.token, file);

        if (error) {
          throw new Error(error.message);
        }

        uploadedUrls.push(upload.publicUrl);
      }

      const nextImages = [...images, ...uploadedUrls];
      onChange(nextImages);
      if (!mainImage && uploadedUrls[0]) {
        onMainImageChange(uploadedUrls[0]);
      }
      event.target.value = "";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Image upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function removeImage(image: string) {
    await fetch("/api/admin/upload", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: image }),
    });

    const nextImages = images.filter((entry) => entry !== image);
    onChange(nextImages);
    if (mainImage === image) {
      onMainImageChange(nextImages[0] ?? null);
    }
  }

  return (
    <div className="space-y-4">
      <label className="admin-label">Images</label>
      <label className="flex cursor-pointer items-center justify-center gap-3 rounded-[1.2rem] border border-dashed border-black/15 bg-zinc-50 px-5 py-4 text-sm text-zinc-600 transition hover:border-pink-500 hover:text-black">
        {uploading ? <LoaderCircle className="animate-spin" size={18} /> : <ImagePlus size={18} />}
        {uploading ? "Uploading..." : "Upload images"}
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleUpload}
        />
      </label>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image) => (
          <div
            key={image}
            className="overflow-hidden rounded-[1.35rem] border border-black/10 bg-white"
          >
            <img src={image} alt="" className="aspect-[4/5] w-full object-cover" />
            <div className="flex gap-2 p-3">
              <button
                type="button"
                onClick={() => onMainImageChange(image)}
                className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-2 text-xs font-medium ${
                  mainImage === image
                    ? "bg-black text-white"
                    : "border border-black/10 text-black"
                }`}
              >
                <Star size={14} />
                {mainImage === image ? "Main image" : "Set main"}
              </button>
              <button
                type="button"
                onClick={() => void removeImage(image)}
                className="inline-flex items-center justify-center rounded-full border border-black/10 px-3 py-2 text-black"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
