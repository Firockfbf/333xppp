"use client";

type Props = {
  open: boolean;
  productName: string;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export function ConfirmDeleteModal({
  open,
  productName,
  loading = false,
  onCancel,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4">
      <div className="admin-card w-full max-w-md rounded-[1.8rem] p-6">
        <h3 className="text-xl font-semibold text-black">Delete product</h3>
        <p className="mt-3 text-sm leading-6 text-zinc-600">
          This will remove <strong>{productName}</strong> from the catalogue.
          Make sure you really want to delete it.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-full border border-black/10 px-4 py-3 text-sm font-medium text-black"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 rounded-full bg-black px-4 py-3 text-sm font-medium text-white disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
