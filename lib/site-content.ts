import { cache } from "react";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient as createServerSupabaseClient } from "@/lib/supabase/server";
import type { SiteContentPayload, SiteContentRecord } from "@/types/database";

export const defaultSiteContent: SiteContentRecord = {
  id: "main",
  updated_at: new Date(0).toISOString(),
  hero_issue_title: "Issue 01 / Bubble Threat",
  hero_issue_copy:
    "A dark-cute Y2K portal for upcycled clothes, one-of-one drops and anti-clean styling.",
  hero_card_title: "Cool girl alert!",
  hero_card_body:
    "333XPPP CLOTHES is an upcycled, handmade and no-gender fashion project. Each piece is reworked by hand through sewing, painting, embroidery, knitting and textile experimentation.",
  hero_notes: [
    "2000s website aesthetic",
    "kitsch magazine",
    "upcycled handmade clothing",
  ],
  hero_mood_tags: ["cool girl alert", "drop archive", "teen portal", "clubwear", "DIY"],
  hero_manifesto: [
    "Offer alternatives to capitalism fashion.",
    "Clothes and objects thought as artworks.",
    "Trashy over clean. Human over mass production.",
  ],
  hero_primary_image_url: "/brand/models/model-black-jacket.png",
  hero_secondary_image_url: "/brand/models/model-camo.png",
  hero_manifesto_image_url: "/brand/models/model-jeans-graffiti.png",
  latest_drop_image_url: "/brand/models/model-camo.png",
  about_title: "upcycling",
  about_subtitle: "as attitude",
  about_intro: "Handmade, anti-fast fashion, no-gender and rooted in underground culture.",
  about_body: [
    "333XPPP works from reclaimed garments and materials, pushing them into a darker editorial and internet-born space through hand sewing, painting, embroidery, knitting and experimental surface treatment.",
    "The project is no-gender, anti-normative and deeply opposed to fast fashion logic.",
  ],
  about_tags: ["Handmade", "No gender", "One of one", "DIY", "Underground"],
  about_image_url: "/brand/models/model-black-jacket.png",
  contact_title: "DM to buy",
  contact_subtitle: "DM to commission",
  contact_body:
    "Orders happen through Instagram DM in this first version. Custom pieces are open on request depending on materials, timeline and concept.",
};

function normalizeSiteContent(
  row: Partial<SiteContentRecord> | null | undefined,
): SiteContentRecord {
  return {
    id: row?.id ?? defaultSiteContent.id,
    updated_at: row?.updated_at ?? defaultSiteContent.updated_at,
    hero_issue_title: row?.hero_issue_title ?? defaultSiteContent.hero_issue_title,
    hero_issue_copy: row?.hero_issue_copy ?? defaultSiteContent.hero_issue_copy,
    hero_card_title: row?.hero_card_title ?? defaultSiteContent.hero_card_title,
    hero_card_body: row?.hero_card_body ?? defaultSiteContent.hero_card_body,
    hero_notes: Array.isArray(row?.hero_notes) ? row.hero_notes : defaultSiteContent.hero_notes,
    hero_mood_tags: Array.isArray(row?.hero_mood_tags)
      ? row.hero_mood_tags
      : defaultSiteContent.hero_mood_tags,
    hero_manifesto: Array.isArray(row?.hero_manifesto)
      ? row.hero_manifesto
      : defaultSiteContent.hero_manifesto,
    hero_primary_image_url:
      row?.hero_primary_image_url ?? defaultSiteContent.hero_primary_image_url,
    hero_secondary_image_url:
      row?.hero_secondary_image_url ?? defaultSiteContent.hero_secondary_image_url,
    hero_manifesto_image_url:
      row?.hero_manifesto_image_url ?? defaultSiteContent.hero_manifesto_image_url,
    latest_drop_image_url:
      row?.latest_drop_image_url ?? defaultSiteContent.latest_drop_image_url,
    about_title: row?.about_title ?? defaultSiteContent.about_title,
    about_subtitle: row?.about_subtitle ?? defaultSiteContent.about_subtitle,
    about_intro: row?.about_intro ?? defaultSiteContent.about_intro,
    about_body: Array.isArray(row?.about_body) ? row.about_body : defaultSiteContent.about_body,
    about_tags: Array.isArray(row?.about_tags) ? row.about_tags : defaultSiteContent.about_tags,
    about_image_url: row?.about_image_url ?? defaultSiteContent.about_image_url,
    contact_title: row?.contact_title ?? defaultSiteContent.contact_title,
    contact_subtitle: row?.contact_subtitle ?? defaultSiteContent.contact_subtitle,
    contact_body: row?.contact_body ?? defaultSiteContent.contact_body,
  };
}

export const getSiteContent = cache(async (): Promise<SiteContentRecord> => {
  if (!isSupabaseConfigured()) {
    return defaultSiteContent;
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("site_content")
    .select("*")
    .eq("id", "main")
    .maybeSingle();

  if (error || !data) {
    return defaultSiteContent;
  }

  return normalizeSiteContent(data as Partial<SiteContentRecord>);
});

export function getSiteContentPayload(): SiteContentPayload {
  return {
    id: defaultSiteContent.id,
    hero_issue_title: defaultSiteContent.hero_issue_title,
    hero_issue_copy: defaultSiteContent.hero_issue_copy,
    hero_card_title: defaultSiteContent.hero_card_title,
    hero_card_body: defaultSiteContent.hero_card_body,
    hero_notes: defaultSiteContent.hero_notes,
    hero_mood_tags: defaultSiteContent.hero_mood_tags,
    hero_manifesto: defaultSiteContent.hero_manifesto,
    hero_primary_image_url: defaultSiteContent.hero_primary_image_url,
    hero_secondary_image_url: defaultSiteContent.hero_secondary_image_url,
    hero_manifesto_image_url: defaultSiteContent.hero_manifesto_image_url,
    latest_drop_image_url: defaultSiteContent.latest_drop_image_url,
    about_title: defaultSiteContent.about_title,
    about_subtitle: defaultSiteContent.about_subtitle,
    about_intro: defaultSiteContent.about_intro,
    about_body: defaultSiteContent.about_body,
    about_tags: defaultSiteContent.about_tags,
    about_image_url: defaultSiteContent.about_image_url,
    contact_title: defaultSiteContent.contact_title,
    contact_subtitle: defaultSiteContent.contact_subtitle,
    contact_body: defaultSiteContent.contact_body,
  };
}
