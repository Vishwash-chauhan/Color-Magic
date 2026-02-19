import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";
import { uploadFileToCloudinary } from "@/src/lib/cloudinary";
import ProductForm from "@/src/components/ProductForm";
import { notFound } from "next/navigation";

interface EditProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    notFound();
  }

  async function updateProduct(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const priceStr = formData.get("price") as string;
    const price = priceStr ? parseFloat(priceStr) : undefined;

    // Get files (optional for edit)
    const rawFiles = formData.getAll("images");
    const files = rawFiles.filter((f) => f instanceof File && f.size > 0) as File[];
    const selected = files.slice(0, 8); // enforce max 8

    // Fetch current product to get existing images
    const currentProduct = await prisma.product.findUnique({
      where: { id },
    });

    let imageUrls = currentProduct?.imageUrls || []; // Keep existing images by default

    // Only upload new images if files were selected
    if (selected.length > 0) {
      imageUrls = await Promise.all(
        selected.map(async (file) => {
          return await uploadFileToCloudinary(file);
        })
      );
    }

    const updateData: any = { name, description, imageUrls };
    if (price !== undefined) updateData.price = price;

    await prisma.product.update({
      where: { id },
      data: updateData,
    });

    redirect("/admin/products");
  }

  return (
    <ProductForm
      onSubmit={updateProduct}
      initialData={{
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrls: product.imageUrls,
      }}
      isEdit={true}
    />
  );
}
