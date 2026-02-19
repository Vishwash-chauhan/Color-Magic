import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";
import { uploadFileToCloudinary } from "@/src/lib/cloudinary";

export default function AddProductPage() {
  // This is a Server Action - it runs securely on the server
  async function addProduct(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);

    // Get files (can be up to 8)
    const rawFiles = formData.getAll("images");
    const files = rawFiles.filter((f) => f instanceof File) as File[];
    const selected = files.slice(0, 8); // enforce max 8

    // Upload all selected images to Cloudinary in parallel
    const imageUrls: string[] = await Promise.all(
      selected.map(async (file) => {
        return await uploadFileToCloudinary(file);
      })
    );

    await prisma.product.create({
      data: {
        name,
        description,
        price,
        imageUrls,
      },
    });

    redirect("/"); // Go back to the homepage after saving
  }

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-xl border border-slate-100">
      <h1 className="text-3xl font-bold mb-2">Add New Product</h1>
      <p className="text-slate-500 mb-8">Fill in the details for the new printing item.</p>

      <form action={addProduct} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-2">Product Name</label>
          <input
            name="name"
            type="text"
            required
            placeholder="e.g. Premium Business Cards"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Description</label>
          <textarea
            name="description"
            required
            placeholder="Describe the print quality, GSM, size, etc."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition h-32"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Price (₹)</label>
            <input
              name="price"
              type="number"
              step="0.01"
              required
              placeholder="0.00"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Product Images (up to 8)</label>
            <input
              name="images"
              type="file"
              accept="image/*"
              multiple
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            />
            <p className="text-xs text-slate-400 mt-2">You can upload up to 8 images; files will be uploaded to Cloudinary.</p>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transform active:scale-[0.98] transition shadow-lg mt-4"
        >
          Add to Shop
        </button>
      </form>
    </div>
  );
}
