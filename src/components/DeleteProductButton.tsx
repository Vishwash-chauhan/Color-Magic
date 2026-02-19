"use client";

interface DeleteProductButtonProps {
  productId: string;
  productName: string;
  onDelete: (formData: FormData) => Promise<void>;
}

export default function DeleteProductButton({ productId, productName, onDelete }: DeleteProductButtonProps) {
  async function handleDelete(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    if (!confirm(`Are you sure you want to delete "${productName}"?`)) {
      return;
    }

    const formData = new FormData(e.currentTarget);
    await onDelete(formData);
  }

  return (
    <form onSubmit={handleDelete} className="inline">
      <input type="hidden" name="id" value={productId} />
      <button
        type="submit"
        className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition"
      >
        Delete
      </button>
    </form>
  );
}
