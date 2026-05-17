import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { isAdminAuthenticated } from "@/lib/admin";
import { PRODUCT_BUCKET } from "@/lib/constants";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseAdminConfigured } from "@/lib/supabase/config";
import { slugify } from "@/lib/utils";

type UploadFilePayload = {
  name: string;
};

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseAdminConfigured()) {
    return NextResponse.json({ error: "Supabase admin is not configured." }, { status: 500 });
  }

  const body = (await request.json()) as { files?: UploadFilePayload[] };
  const files = Array.isArray(body.files) ? body.files : [];

  if (!files.length) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const supabase = createAdminClient();
  const uploads: Array<{ path: string; token: string; publicUrl: string }> = [];

  for (const file of files) {
    if (!file?.name?.trim()) {
      return NextResponse.json({ error: "Invalid file payload." }, { status: 400 });
    }

    const path = `${Date.now()}-${randomUUID()}-${slugify(file.name)}`;
    const { data, error } = await supabase.storage
      .from(PRODUCT_BUCKET)
      .createSignedUploadUrl(path);

    if (error || !data?.token) {
      return NextResponse.json({ error: error?.message || "Unable to sign upload." }, { status: 400 });
    }

    const { data: publicData } = supabase.storage.from(PRODUCT_BUCKET).getPublicUrl(path);
    uploads.push({
      path,
      token: data.token,
      publicUrl: publicData.publicUrl,
    });
  }

  return NextResponse.json({ uploads });
}
