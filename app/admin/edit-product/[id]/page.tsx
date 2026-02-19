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
    const files = rawFiles.filter((f) => f instanceof File && (f as File).size > 0) as File[];
    const selected = files.slice(0, 8); // enforce max 8

    // keepImageUrls: which existing urls the user wants to keep
    let keepImageUrls = (formData.getAll("keepImageUrls") as string[])?.map((v) => String(v)) || [];

    // dedupe keepImageUrls in case of accidental duplication
    keepImageUrls = Array.from(new Set(keepImageUrls));

    // Fetch current product to get existing images
    const currentProduct = await prisma.product.findUnique({
      where: { id },
    });

    // start with kept existing images (may be empty if user removed all)
    let imageUrls: string[] = keepImageUrls.length > 0 ? keepImageUrls : (currentProduct?.imageUrls || []);

    // If new files were selected, upload and append to kept images (enforce max 8)
    if (selected.length > 0) {
      const uploaded = await Promise.all(selected.map(async (file) => uploadFileToCloudinary(file)));
      imageUrls = Array.from(new Set([...(keepImageUrls || []), ...uploaded])).slice(0, 8);
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
