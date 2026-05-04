import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin";
import { getSiteContentPayload } from "@/lib/site-content";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseAdminConfigured } from "@/lib/supabase/config";
import { siteContentSchema } from "@/lib/validations";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseAdminConfigured()) {
    return NextResponse.json({ error: "Supabase admin is not configured." }, { status: 500 });
  }

  const body = await request.json();
  const parsed = siteContentSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const supabase = createAdminClient();
  const payload = {
    ...getSiteContentPayload(),
    ...parsed.data,
  };

  const { data, error } = await supabase
    .from("site_content")
    .upsert(payload, { onConflict: "id" })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ siteContent: data });
}
