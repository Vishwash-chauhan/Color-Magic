import { prisma } from "@/src/lib/prisma";
import { Prisma } from "@prisma/client";
import ProductGrid from "@/src/components/ProductGrid";
import Link from "next/link";

export default async function ProductsPage({ searchParams }: { searchParams?: { q?: string } }) {
  const q = searchParams?.q ?? undefined;

  const where: Prisma.ProductWhereInput | undefined = q
    ? {
        OR: [
          { name: { contains: q, mode: Prisma.QueryMode.insensitive } },
          { description: { contains: q, mode: Prisma.QueryMode.insensitive } },
        ],
      }
    : undefined;

  const products = await prisma.product.findMany({ where, orderBy: { createdAt: "desc" } });

  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <main className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Products</h1>
            <p className="text-sm text-slate-500 mt-1">Browse Colour Magic's printing catalogue.</p>
          </div>

          <div className="w-full sm:w-auto">
            <form method="get" className="relative w-full max-w-xl mx-0 sm:mx-auto">
              <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-slate-400">
                  <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>

              <input
                name="q"
                defaultValue={q}
                placeholder="Search products, e.g. business cards"
                className="w-full pl-11 pr-28 py-3 rounded-full border border-slate-200 bg-white shadow-sm text-sm outline-none focus:ring-2 focus:ring-slate-300"
              />

              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-slate-800 transition"
                aria-label="Search products"
              >
                Search
              </button>
            </form>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 border border-slate-100 text-center">
            <p className="text-slate-500">No products found.</p>
            <Link href="/admin/add-product" className="mt-4 inline-block text-sm text-blue-600 hover:underline">
              Add a product
            </Link>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </main>
    </div>
  );
}
