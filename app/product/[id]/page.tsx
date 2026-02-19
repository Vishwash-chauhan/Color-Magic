import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import ProductGrid from "@/src/components/ProductGrid";
import ProductDetails from "@/src/components/ProductDetails";

interface Props {
  params: { id: string } | Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  // fetch other products to show below the details
  const otherProducts = await prisma.product.findMany({
    where: { id: { not: id } },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: "desc" }],
    take: 4,
  });

  return (
    <div className="min-h-screen bg-zinc-50">
      <main className="mx-auto max-w-5xl px-6">
        {/* Product details and breadcrumb moved into reusable component */}
        <ProductDetails product={product} />

        {/* You might also like */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">You might also like</h2>
            <Link href="/products" className="text-sm text-slate-500 hover:underline">View all</Link>
          </div>

          {otherProducts.length > 0 ? (
            <ProductGrid products={otherProducts} />
          ) : (
            <div className="rounded-2xl bg-white p-8 border border-slate-100 text-center">
              <p className="text-slate-500 mb-4">No related products available right now.</p>
              <Link href="/products" className="inline-block rounded-full bg-slate-900 text-white px-5 py-2 text-sm font-semibold hover:bg-slate-800">Browse catalog</Link>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
