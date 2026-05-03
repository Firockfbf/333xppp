import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { isAdminAuthenticated } from "@/lib/admin";
import { PRODUCT_BUCKET } from "@/lib/constants";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseAdminConfigured } from "@/lib/supabase/config";
import { extractStoragePathFromPublicUrl, slugify } from "@/lib/utils";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseAdminConfigured()) {
    return NextResponse.json({ error: "Supabase admin is not configured." }, { status: 500 });
  }

  const formData = await request.formData();
  const files = formData.getAll("files").filter((entry) => entry instanceof File) as File[];

  if (!files.length) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const supabase = createAdminClient();
  const urls: string[] = [];

  for (const file of files) {
    const path = `${Date.now()}-${randomUUID()}-${slugify(file.name)}`;
    const { error } = await supabase.storage
      .from(PRODUCT_BUCKET)
      .upload(path, file, { cacheControl: "3600", upsert: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const { data } = supabase.storage.from(PRODUCT_BUCKET).getPublicUrl(path);
    urls.push(data.publicUrl);
  }

  return NextResponse.json({ urls });
}

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseAdminConfigured()) {
    return NextResponse.json({ error: "Supabase admin is not configured." }, { status: 500 });
  }

  const { url } = (await request.json()) as { url?: string };

  if (!url) {
    return NextResponse.json({ error: "Missing image URL." }, { status: 400 });
  }

  const path = extractStoragePathFromPublicUrl(url);
  if (!path) {
    return NextResponse.json({ error: "Invalid image URL." }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase.storage.from(PRODUCT_BUCKET).remove([path]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
