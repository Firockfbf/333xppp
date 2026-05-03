import { LoginForm } from "@/components/admin/LoginForm";
import { isAdminAuthConfigured } from "@/lib/admin";
import { isSupabaseAdminConfigured } from "@/lib/supabase/config";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const initialError =
    params.error === "invalid-password"
      ? "Wrong password."
      : null;

  return (
    <div className="admin-surface min-h-screen px-4 py-10">
      <div className="mx-auto flex w-full max-w-md flex-col gap-5">
        {!isSupabaseAdminConfigured() || !isAdminAuthConfigured() ? (
          <div className="admin-card rounded-[2rem] p-6 text-sm leading-7 text-zinc-600">
            Configure <code>NEXT_PUBLIC_SUPABASE_URL</code>,{" "}
            <code>SUPABASE_SERVICE_ROLE_KEY</code>, <code>ADMIN_PASSWORD</code>{" "}
            and <code>ADMIN_SESSION_SECRET</code> in <code>.env.local</code>.
          </div>
        ) : null}
        <LoginForm initialError={initialError} />
      </div>
    </div>
  );
}
