"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FolderTree, LayoutDashboard, LogOut, Plus, Shirt } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Shirt },
  { href: "/admin/products/new", label: "Add new", icon: Plus },
  { href: "/admin/library", label: "Types & collections", icon: FolderTree },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="admin-card h-fit rounded-[1.8rem] p-4">
      <p className="text-lg font-semibold text-black">333XPPP admin</p>
      <p className="mt-1 text-sm text-zinc-500">Inventory and image management</p>

      <nav className="mt-6 flex flex-col gap-2">
        {links.map((link) => {
          const Icon = link.icon;
          const active =
            pathname === link.href ||
            (link.href !== "/admin" && pathname.startsWith(`${link.href}/`));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                active
                  ? "bg-black text-white"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-black",
              )}
            >
              <Icon size={17} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={handleLogout}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-black/10 px-4 py-3 text-sm font-medium text-black transition hover:bg-zinc-100"
      >
        <LogOut size={16} />
        Sign out
      </button>
    </aside>
  );
}
