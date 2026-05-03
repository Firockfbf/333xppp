import type { ProductStatus } from "@/types/database";
import { cn } from "@/lib/utils";

const statusStyles: Record<ProductStatus, string> = {
  available: "border-[#0d0d0d]/15 bg-white/78 text-black",
  reserved: "border-[#0d0d0d]/15 bg-[#dff8ff] text-black",
  sold: "border-[#0d0d0d]/15 bg-[#ffd1ea] text-black",
};

export function StatusBadge({
  status,
  admin = false,
}: {
  status: ProductStatus;
  admin?: boolean;
}) {
  return (
    <span
      className={cn(
        "mono-label inline-flex rounded-full border px-3 py-1 text-[11px]",
        statusStyles[status],
        admin && "border-black/10 bg-black/5 text-black",
      )}
    >
      {status}
    </span>
  );
}
