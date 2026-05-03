import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin";
import { PRODUCT_BUCKET } from "@/lib/constants";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseAdminConfigured } from "@/lib/supabase/config";
import { extractStoragePathFromPublicUrl } from "@/lib/utils";
import { productSchema } from "@/lib/validations";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseAdminConfigured()) {
    return NextResponse.json({ error: "Supabase admin is not configured." }, { status: 500 });
  }

  const { id } = await params;
  const body = await request.json();
  const parsed = productSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid product payload." }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { error, data } = await supabase
    .from("products")
    .update(parsed.data)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ product: data });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseAdminConfigured()) {
    return NextResponse.json({ error: "Supabase admin is not configured." }, { status: 500 });
  }

  const supabase = createAdminClient();
  const { id } = await params;
  const { data: product } = await supabase
    .from("products")
    .select("main_image_url, gallery_image_urls")
    .eq("id", id)
    .single();

  if (product) {
    const paths = [product.main_image_url, ...(product.gallery_image_urls || [])]
      .filter(Boolean)
      .map((url: string) => extractStoragePathFromPublicUrl(url))
      .filter(Boolean) as string[];

    if (paths.length) {
      await supabase.storage.from(PRODUCT_BUCKET).remove(paths);
    }
  }

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
