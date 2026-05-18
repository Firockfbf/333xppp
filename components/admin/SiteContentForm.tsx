"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { SiteContentRecord } from "@/types/database";

function linesToText(value: string[]) {
  return value.join("\n");
}

function textToLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

type ImageFieldProps = {
  label: string;
  helpText?: string;
  value: string | null;
  onChange: (value: string | null) => void;
};

function ImageField({ label, helpText, value, onChange }: ImageFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedDraft, setUploadedDraft] = useState(false);

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setUploadedDraft(false);

    try {
      const response = await fetch("/api/admin/upload/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          files: [{ name: file.name }],
        }),
      });
      const result = await response.json();

      if (!response.ok || !result.uploads?.[0]) {
        throw new Error(result.error || "Unable to upload image.");
      }

      const upload = result.uploads[0] as {
        path: string;
        token: string;
        publicUrl: string;
      };

      const supabase = createClient();
      const { error } = await supabase.storage
        .from("product-images")
        .uploadToSignedUrl(upload.path, upload.token, file);

      if (error) {
        throw new Error(error.message);
      }

      onChange(upload.publicUrl);
      setUploadedDraft(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to upload image.");
    } finally {
      setUploading(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  return (
    <div className="space-y-3 rounded-[1.4rem] border border-black/8 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="text-sm font-medium text-black">{label}</p>
          {helpText ? <p className="text-xs leading-5 text-zinc-500">{helpText}</p> : null}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="rounded-full border border-black/10 px-4 py-2 text-sm text-black disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload image"}
          </button>
          {value ? (
            <button
              type="button"
              onClick={() => onChange(null)}
              className="rounded-full border border-red-200 px-4 py-2 text-sm text-red-600"
            >
              Remove
            </button>
          ) : null}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleUpload}
      />

      <input
        className="admin-input"
        value={value ?? ""}
        onChange={(event) => {
          setUploadedDraft(false);
          onChange(event.target.value || null);
        }}
        placeholder="https://..."
      />

      {uploadedDraft ? (
        <p className="text-xs text-emerald-600">
          Image loaded in the form. Click <span className="font-semibold">Save site content</span> to publish it on the website.
        </p>
      ) : null}

      {value ? (
        <div className="relative aspect-[4/5] max-w-[220px] overflow-hidden rounded-[1.2rem] border border-black/8 bg-zinc-100">
          <Image src={value} alt={label} fill className="object-cover" sizes="220px" />
        </div>
      ) : null}

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}

export function SiteContentForm({
  initialContent,
}: {
  initialContent: SiteContentRecord;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [heroIssueTitle, setHeroIssueTitle] = useState(initialContent.hero_issue_title);
  const [heroIssueCopy, setHeroIssueCopy] = useState(initialContent.hero_issue_copy);
  const [heroCardTitle, setHeroCardTitle] = useState(initialContent.hero_card_title);
  const [heroCardBody, setHeroCardBody] = useState(initialContent.hero_card_body);
  const [heroNotes, setHeroNotes] = useState(linesToText(initialContent.hero_notes));
  const [heroMoodTags, setHeroMoodTags] = useState(linesToText(initialContent.hero_mood_tags));
  const [heroManifesto, setHeroManifesto] = useState(linesToText(initialContent.hero_manifesto));
  const [brandLogoUrl, setBrandLogoUrl] = useState(initialContent.brand_logo_url);
  const [heroPrimaryImageUrl, setHeroPrimaryImageUrl] = useState(initialContent.hero_primary_image_url);
  const [heroSecondaryImageUrl, setHeroSecondaryImageUrl] = useState(initialContent.hero_secondary_image_url);
  const [heroManifestoImageUrl, setHeroManifestoImageUrl] = useState(initialContent.hero_manifesto_image_url);
  const [latestDropImageUrl, setLatestDropImageUrl] = useState(initialContent.latest_drop_image_url);
  const [aboutTitle, setAboutTitle] = useState(initialContent.about_title);
  const [aboutSubtitle, setAboutSubtitle] = useState(initialContent.about_subtitle);
  const [aboutIntro, setAboutIntro] = useState(initialContent.about_intro);
  const [aboutBody, setAboutBody] = useState(linesToText(initialContent.about_body));
  const [aboutTags, setAboutTags] = useState(linesToText(initialContent.about_tags));
  const [aboutImageUrl, setAboutImageUrl] = useState(initialContent.about_image_url);
  const [contactTitle, setContactTitle] = useState(initialContent.contact_title);
  const [contactSubtitle, setContactSubtitle] = useState(initialContent.contact_subtitle);
  const [contactBody, setContactBody] = useState(initialContent.contact_body);

  const payload = useMemo(
    () => ({
      id: "main" as const,
      hero_issue_title: heroIssueTitle,
      hero_issue_copy: heroIssueCopy,
      hero_card_title: heroCardTitle,
      hero_card_body: heroCardBody,
      hero_notes: textToLines(heroNotes),
      hero_mood_tags: textToLines(heroMoodTags),
      hero_manifesto: textToLines(heroManifesto),
      brand_logo_url: brandLogoUrl || null,
      hero_primary_image_url: heroPrimaryImageUrl || null,
      hero_secondary_image_url: heroSecondaryImageUrl || null,
      hero_manifesto_image_url: heroManifestoImageUrl || null,
      latest_drop_image_url: latestDropImageUrl || null,
      about_title: aboutTitle,
      about_subtitle: aboutSubtitle,
      about_intro: aboutIntro,
      about_body: textToLines(aboutBody),
      about_tags: textToLines(aboutTags),
      about_image_url: aboutImageUrl || null,
      contact_title: contactTitle,
      contact_subtitle: contactSubtitle,
      contact_body: contactBody,
    }),
    [
      aboutBody,
      aboutImageUrl,
      aboutIntro,
      aboutSubtitle,
      aboutTags,
      aboutTitle,
      contactBody,
      brandLogoUrl,
      contactSubtitle,
      contactTitle,
      heroCardBody,
      heroCardTitle,
      heroIssueCopy,
      heroIssueTitle,
      latestDropImageUrl,
      heroManifesto,
      heroManifestoImageUrl,
      heroMoodTags,
      heroNotes,
      heroPrimaryImageUrl,
      heroSecondaryImageUrl,
    ],
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/admin/site-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to save content.");
      }

      setSuccess("Site content updated.");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save content.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <section className="admin-card rounded-[2rem] p-6">
        <h2 className="text-xl font-semibold text-black">Hero</h2>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          Main homepage texts and the model images shown in the first screen.
        </p>

        <div className="mt-5 grid gap-4">
          <div>
            <label className="admin-label">Issue title</label>
            <input className="admin-input" value={heroIssueTitle} onChange={(event) => setHeroIssueTitle(event.target.value)} />
          </div>
          <div>
            <label className="admin-label">Issue copy</label>
            <textarea className="admin-input min-h-28" value={heroIssueCopy} onChange={(event) => setHeroIssueCopy(event.target.value)} />
          </div>
          <div>
            <label className="admin-label">Main pink card title</label>
            <input className="admin-input" value={heroCardTitle} onChange={(event) => setHeroCardTitle(event.target.value)} />
          </div>
          <div>
            <label className="admin-label">Main pink card body</label>
            <textarea className="admin-input min-h-32" value={heroCardBody} onChange={(event) => setHeroCardBody(event.target.value)} />
          </div>
          <div>
            <label className="admin-label">Right-side notes</label>
            <textarea className="admin-input min-h-28" value={heroNotes} onChange={(event) => setHeroNotes(event.target.value)} />
            <p className="mt-2 text-xs text-zinc-500">One line = one item.</p>
          </div>
          <div>
            <label className="admin-label">Mood tags</label>
            <textarea className="admin-input min-h-28" value={heroMoodTags} onChange={(event) => setHeroMoodTags(event.target.value)} />
            <p className="mt-2 text-xs text-zinc-500">One line = one tag.</p>
          </div>
          <div>
            <label className="admin-label">Manifesto lines</label>
            <textarea className="admin-input min-h-32" value={heroManifesto} onChange={(event) => setHeroManifesto(event.target.value)} />
            <p className="mt-2 text-xs text-zinc-500">One line = one sentence.</p>
          </div>

          <ImageField
            label="Main brand logo"
            helpText="Used in both the header and the big logo area in the homepage hero."
            value={brandLogoUrl}
            onChange={setBrandLogoUrl}
          />

          <div className="grid gap-4 lg:grid-cols-3">
            <ImageField
              label="Hero main model image"
              helpText="Homepage hero: large image on the left of the image duo."
              value={heroPrimaryImageUrl}
              onChange={setHeroPrimaryImageUrl}
            />
            <ImageField
              label="Hero secondary model image"
              helpText="Homepage hero: smaller stacked image on the right, above the moodboard tags."
              value={heroSecondaryImageUrl}
              onChange={setHeroSecondaryImageUrl}
            />
            <ImageField
              label="Manifesto model image"
              helpText="Homepage hero: image next to the manifesto block lower on the first screen."
              value={heroManifestoImageUrl}
              onChange={setHeroManifestoImageUrl}
            />
          </div>
        </div>
      </section>

      <section className="admin-card rounded-[2rem] p-6">
        <h2 className="text-xl font-semibold text-black">Homepage latest drop</h2>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          Controls the big image inside the “Latest drop / Kitsch magazine / New collection” section.
        </p>

        <div className="mt-5 grid gap-4">
          <ImageField
            label="Latest drop main image"
            helpText="Homepage: big image on the left of the product cards in the latest drop block."
            value={latestDropImageUrl}
            onChange={setLatestDropImageUrl}
          />
        </div>
      </section>

      <section className="admin-card rounded-[2rem] p-6">
        <h2 className="text-xl font-semibold text-black">About</h2>
        <div className="mt-5 grid gap-4">
          <div>
            <label className="admin-label">About title</label>
            <input className="admin-input" value={aboutTitle} onChange={(event) => setAboutTitle(event.target.value)} />
          </div>
          <div>
            <label className="admin-label">About subtitle</label>
            <input className="admin-input" value={aboutSubtitle} onChange={(event) => setAboutSubtitle(event.target.value)} />
          </div>
          <div>
            <label className="admin-label">About intro</label>
            <textarea className="admin-input min-h-24" value={aboutIntro} onChange={(event) => setAboutIntro(event.target.value)} />
          </div>
          <div>
            <label className="admin-label">About body paragraphs</label>
            <textarea className="admin-input min-h-36" value={aboutBody} onChange={(event) => setAboutBody(event.target.value)} />
            <p className="mt-2 text-xs text-zinc-500">One line = one paragraph.</p>
          </div>
          <div>
            <label className="admin-label">About tags</label>
            <textarea className="admin-input min-h-28" value={aboutTags} onChange={(event) => setAboutTags(event.target.value)} />
            <p className="mt-2 text-xs text-zinc-500">One line = one tag.</p>
          </div>
          <ImageField
            label="About page image"
            helpText="Used in the public About section/page."
            value={aboutImageUrl}
            onChange={setAboutImageUrl}
          />
        </div>
      </section>

      <section className="admin-card rounded-[2rem] p-6">
        <h2 className="text-xl font-semibold text-black">Contact</h2>
        <div className="mt-5 grid gap-4">
          <div>
            <label className="admin-label">Contact title</label>
            <input className="admin-input" value={contactTitle} onChange={(event) => setContactTitle(event.target.value)} />
          </div>
          <div>
            <label className="admin-label">Contact subtitle</label>
            <input className="admin-input" value={contactSubtitle} onChange={(event) => setContactSubtitle(event.target.value)} />
          </div>
          <div>
            <label className="admin-label">Contact body</label>
            <textarea className="admin-input min-h-28" value={contactBody} onChange={(event) => setContactBody(event.target.value)} />
          </div>
        </div>
      </section>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {success ? <p className="text-sm text-emerald-600">{success}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-black px-5 py-3 text-sm font-medium text-white disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save site content"}
      </button>
    </form>
  );
}
