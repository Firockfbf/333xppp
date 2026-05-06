"use client";

import { cn } from "@/lib/utils";

type Props = {
  categories: readonly string[];
  statuses: readonly string[];
  activeCategory: string;
  activeStatus: string;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
};

export function ProductFilters({
  categories,
  statuses,
  activeCategory,
  activeStatus,
  onCategoryChange,
  onStatusChange,
}: Props) {
  return (
    <div className="browser-window overflow-hidden">
      <div className="browser-bar">
        <span className="browser-dot" />
        <span className="browser-dot" />
        <span className="browser-dot" />
        <span>filter-by-type.exe</span>
      </div>
      <div className="paper-grid bg-[#ffd7ef] p-4 sm:p-5">
        <div>
          <p className="section-kicker mono-label mb-3 text-[11px] text-black/55">Category</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => onCategoryChange(category)}
                className={cn(
                  "brutal-button border px-4 py-2 text-sm transition",
                  activeCategory === category
                    ? "border-black bg-black text-white"
                    : "border-black/15 bg-white/70 text-black hover:border-black/45 hover:bg-white",
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <p className="section-kicker mono-label mb-3 text-[11px] text-black/55">Status</p>
          <div className="flex flex-wrap gap-2">
            {statuses.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => onStatusChange(status)}
                className={cn(
                  "brutal-button border px-4 py-2 text-sm transition",
                  activeStatus === status
                    ? "border-[#ff1493] bg-[#ff1493] text-white"
                    : "border-black/15 bg-white/70 text-black hover:border-black/45 hover:bg-white",
                )}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
