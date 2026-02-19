import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";
import { uploadFileToCloudinary } from "@/src/lib/cloudinary";
import ProductForm from "@/src/components/ProductForm";

export default function AddProductPage() {
  // This is a Server Action - it runs securely on the server
  async function addProduct(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    let description = formData.get("description") as string;
    const priceStr = formData.get("price") as string;
    const price = priceStr ? parseFloat(priceStr) : undefined;

    // sanitize description HTML before storing
    const DOMPurify = (await import('isomorphic-dompurify')).default;
    description = DOMPurify.sanitize(description || '');

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

    // set sortOrder to be the current max + 1 so new products appear at the end
    const max = await prisma.product.findFirst({ orderBy: { sortOrder: 'desc' } });
    const nextOrder = (max?.sortOrder ?? 0) + 1;

    const createData: any = { name, description, imageUrls, sortOrder: nextOrder };
    if (price !== undefined) createData.price = price;

    await prisma.product.create({
      data: createData,
    });

    redirect("/"); // Go back to the homepage after saving
  }

  return <ProductForm onSubmit={addProduct} />;
}
