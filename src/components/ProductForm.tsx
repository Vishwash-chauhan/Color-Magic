"use client";

import { useState } from "react";

interface ProductFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  initialData?: {
    name: string;
    description: string;
    price?: number;
    imageUrls?: string[];
  };
  isEdit?: boolean;
}

export default function ProductForm({ onSubmit, initialData, isEdit = false }: ProductFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-xl border border-slate-100">
      <h1 className="text-3xl font-bold mb-2">
        {isEdit ? "Edit Product" : "Add New Product"}
      </h1>
      <p className="text-slate-500 mb-8">
        Fill in the details for the {isEdit ? "updated" : "new"} printing item.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-2">Product Name</label>
          <input
            name="name"
            type="text"
            required
            defaultValue={initialData?.name}
            placeholder="e.g. Premium Business Cards"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Description</label>
          <textarea
            name="description"
            required
            defaultValue={initialData?.description}
            placeholder="Describe the print quality, GSM, size, etc."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition h-32"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Price (₹) <span className="text-slate-400 text-xs">(Optional)</span></label>
            <input
              name="price"
              type="number"
              step="0.01"
              defaultValue={initialData?.price}
              placeholder="0.00"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Product Images (up to 8)
            </label>
            <input
              name="images"
              type="file"
              accept="image/*"
              multiple
              required={!isEdit}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            />
            <p className="text-xs text-slate-400 mt-2">
              You can upload up to 8 images; files will be uploaded to Cloudinary.
              {isEdit && " Leave empty to keep existing images."}
            </p>
          </div>
        </div>

        {isEdit && initialData?.imageUrls && initialData.imageUrls.length > 0 && (
          <div>
            <label className="block text-sm font-semibold mb-2">Current Images</label>
            <div className="grid grid-cols-4 gap-2">
              {initialData.imageUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Product ${index + 1}`}
                  className="w-full h-20 object-cover rounded-lg border border-slate-200"
                />
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transform active:scale-[0.98] transition shadow-lg mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Saving..." : isEdit ? "Update Product" : "Add to Shop"}
        </button>
      </form>
    </div>
  );
}
