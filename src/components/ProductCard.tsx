import type { Product } from '@prisma/client';

export default function ProductCard({ product }: { product: Product }) {
  const image = product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : '/placeholder.png';

  return (
    <article className="group relative flex flex-col rounded-2xl bg-white p-4 shadow-sm border border-slate-100 hover:shadow-lg transition">
      <div className="relative h-48 w-full overflow-hidden rounded-lg bg-slate-50">
        <img src={image} alt={product.name} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
      </div>

      <div className="mt-4 flex-1">
        <h3 className="text-lg font-semibold text-slate-900 truncate">{product.name}</h3>
        <p className="mt-2 text-sm text-slate-500 line-clamp-2">{product.description}</p>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex gap-2">
          <a
            href={`/product/${product.id}`}
            className="rounded-full bg-slate-900 px-3 py-1 text-sm font-semibold text-white hover:bg-slate-800 transition"
          >
            View
          </a>
        </div>
      </div>
    </article>
  );
}