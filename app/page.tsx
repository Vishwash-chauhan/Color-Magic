import { prisma } from "@/src/lib/prisma";
import Hero from "@/src/components/Hero";
import ProductGrid from "@/src/components/ProductGrid";

export default async function Home() {
  const featured = await prisma.product.findMany({ orderBy: { createdAt: "desc" }, take: 6 });

  return (
    <div className="min-h-screen bg-zinc-50 font-sans py-12">
      <main className="mx-auto max-w-7xl px-6">
        <Hero />

        <section className="mt-12">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Featured products</h2>
            <a href="/products" className="text-sm font-medium text-slate-500 hover:underline">
              View all
            </a>
          </div>

          <div className="mt-6">
            <ProductGrid products={featured} />
          </div>
        </section>

      </main>
    </div>
  );
}
