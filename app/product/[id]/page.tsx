import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string } | Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  return (
    <div className="min-h-screen bg-zinc-50">
      <main className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <div>
            <div className="rounded-xl overflow-hidden border border-slate-100 bg-slate-50">
              <img src={product.imageUrls[0] ?? '/placeholder.png'} alt={product.name} className="w-full h-96 object-cover" />
            </div>

            {product.imageUrls.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-2">
                {product.imageUrls.map((url, i) => (
                  <img key={i} src={url} alt={`${product.name} ${i + 1}`} className="w-full h-24 object-cover rounded-lg border border-slate-200" />
                ))}
              </div>
            )}
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">{product.name}</h1>
            <p className="mt-4 text-slate-700">{product.description}</p>

            <div className="mt-6 text-2xl font-extrabold text-slate-900">{product.price ? `₹${product.price.toFixed(2)}` : 'Price on request'}</div>

            <div className="mt-6 flex gap-3">
              <button className="rounded-full bg-slate-900 text-white px-6 py-3 font-semibold hover:bg-slate-800" disabled>
                Add to cart
              </button>
              <a href={`/admin/edit-product/${product.id}`} className="rounded-full border px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                Edit (admin)
              </a>
            </div>

            <div className="mt-8 text-sm text-slate-500">
              <div>Category: {product.category ?? '—'}</div>
              <div className="mt-2">Added: {product.createdAt.toDateString()}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
