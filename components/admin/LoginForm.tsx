"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm({ initialError }: { initialError?: string | null }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(initialError ?? null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to sign in.");
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="admin-card rounded-[2rem] p-8">
      <div className="space-y-2">
        <p className="text-sm font-semibold text-pink-600">Admin access</p>
        <h1 className="text-3xl font-semibold text-black">333XPPP admin login</h1>
        <p className="text-sm leading-6 text-zinc-600">
          Open the link, enter the admin password, then start adding pieces.
        </p>
      </div>

      <div className="mt-6 space-y-5">
        <div>
          <label className="admin-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="admin-input"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
      </div>

      {error ? (
        <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-black px-5 py-3 font-medium text-white transition hover:bg-zinc-800 disabled:opacity-50"
      >
        {loading ? "Opening admin..." : "Enter admin"}
      </button>
    </form>
  );
}
