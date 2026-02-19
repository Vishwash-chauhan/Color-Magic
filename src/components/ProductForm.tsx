"use client";

import React, { useEffect, useRef, useState } from "react";

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

const MAX_IMAGES = 8;

export default function ProductForm({ onSubmit, initialData, isEdit = false }: ProductFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Selected new files (not yet uploaded)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  // Existing images when editing — user can remove some before submit
  const [keptExistingUrls, setKeptExistingUrls] = useState<string[]>(() => initialData?.imageUrls ?? []);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // generate previews for selectedFiles
    const urls = selectedFiles.map((f) => URL.createObjectURL(f));
    setPreviews(urls);

    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [selectedFiles]);

  useEffect(() => {
    // keep initial existing urls in sync if initialData changes
    setKeptExistingUrls(initialData?.imageUrls ?? []);
  }, [initialData?.imageUrls]);

  // Keep the native file input in sync with selectedFiles (so FormData picks correct files)
  function syncInputFiles(files: File[]) {
    if (!fileInputRef.current) return;
    const dt = new DataTransfer();
    files.forEach((f) => dt.items.add(f));
    fileInputRef.current.files = dt.files;
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []).filter((f) => f.type.startsWith("image/"));

    const totalAllowed = Math.max(0, MAX_IMAGES - keptExistingUrls.length);
    const toTake = files.slice(0, totalAllowed);

    const next = [...selectedFiles, ...toTake].slice(0, MAX_IMAGES - keptExistingUrls.length);

    setSelectedFiles(next);
    syncInputFiles(next);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"));
    const totalAllowed = Math.max(0, MAX_IMAGES - keptExistingUrls.length - selectedFiles.length);
    if (totalAllowed <= 0) return;
    const toTake = files.slice(0, totalAllowed);
    const next = [...selectedFiles, ...toTake].slice(0, MAX_IMAGES - keptExistingUrls.length);
    setSelectedFiles(next);
    syncInputFiles(next);
  }

  function handleRemoveSelected(index: number) {
    const next = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(next);
    syncInputFiles(next);
  }

  function handleRemoveExisting(url: string) {
    setKeptExistingUrls((s) => s.filter((u) => u !== url));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    // validation: require at least one image for new product
    if (!isEdit && selectedFiles.length + keptExistingUrls.length === 0) {
      alert("Please upload at least one image.");
      setIsSubmitting(false);
      return;
    }

    // Build FormData from the form element. Hidden inputs for `keepImageUrls` are rendered
    // for kept existing images, so we don't append them again here (avoids duplicates).
    const form = new FormData(e.currentTarget);

    try {
      await onSubmit(form);
    } catch (err) {
      console.error("Error submitting form:", err);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-xl border border-slate-100">
      <h1 className="text-3xl font-bold mb-2">{isEdit ? "Edit Product" : "Add New Product"}</h1>
      <p className="text-slate-500 mb-8">Fill in the details for the {isEdit ? "updated" : "new"} printing item.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-2">Product Name</label>
          <input name="name" type="text" required defaultValue={initialData?.name} placeholder="e.g. Premium Business Cards" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition" />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Description</label>
          <textarea name="description" required defaultValue={initialData?.description} placeholder="Describe the print quality, GSM, size, etc." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition h-32" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Price (₹) <span className="text-slate-400 text-xs">(Optional)</span></label>
            <input name="price" type="number" step="0.01" defaultValue={initialData?.price} placeholder="0.00" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Product Images (up to {MAX_IMAGES})</label>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center flex-col gap-2 px-4 py-6 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100 transition text-center"
            >
              <input
                ref={fileInputRef}
                name="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-slate-400">
                <path d="M12 5v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="text-sm text-slate-500">Drag & drop images here, or click to select</div>
              <div className="text-xs text-slate-400">{keptExistingUrls.length + selectedFiles.length}/{MAX_IMAGES} selected</div>
            </div>

            {/* Existing images (edit mode) */}
            {isEdit && keptExistingUrls.length > 0 && (
              <div className="mt-3">
                <label className="block text-sm font-semibold mb-2">Existing images</label>
                <div className="grid grid-cols-4 gap-2">
                  {keptExistingUrls.map((url) => (
                    <div key={url} className="relative">
                      <input type="hidden" name="keepImageUrls" value={url} />
                      <img src={url} alt="existing" className="w-full h-20 object-cover rounded-lg border border-slate-200" />
                      <button type="button" onClick={() => handleRemoveExisting(url)} className="absolute -top-1 -right-1 bg-white rounded-full p-1 shadow text-red-500 border border-slate-100">
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Selected new images preview */}
            {selectedFiles.length > 0 && (
              <div className="mt-3">
                <label className="block text-sm font-semibold mb-2">Selected images</label>
                <div className="grid grid-cols-4 gap-2">
                  {previews.map((src, i) => (
                    <div key={src} className="relative">
                      <img src={src} alt={`preview-${i}`} className="w-full h-20 object-cover rounded-lg border border-slate-200" />
                      <button type="button" onClick={() => handleRemoveSelected(i)} className="absolute -top-1 -right-1 bg-white rounded-full p-1 shadow text-red-500 border border-slate-100">✕</button>
                      <div className="absolute left-1 bottom-1 bg-black/50 text-white text-xs px-2 py-0.5 rounded">New</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <p className="text-xs text-slate-400 mt-2">You can upload up to {MAX_IMAGES} images; files will be uploaded to Cloudinary.</p>
          </div>
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transform active:scale-[0.98] transition shadow-lg mt-4 disabled:opacity-50 disabled:cursor-not-allowed">
          {isSubmitting ? "Saving..." : isEdit ? "Update Product" : "Add to Shop"}
        </button>
      </form>
    </div>
  );
}
