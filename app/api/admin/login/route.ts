import { NextResponse } from "next/server";
import { createAdminSession, isAdminAuthConfigured, verifyAdminPassword } from "@/lib/admin";

export async function POST(request: Request) {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json({ error: "Admin password is not configured." }, { status: 500 });
  }

  const { password } = (await request.json()) as { password?: string };

  if (!verifyAdminPassword(password || "")) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }

  await createAdminSession();
  return NextResponse.json({ success: true });
}
