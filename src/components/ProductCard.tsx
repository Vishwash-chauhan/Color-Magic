import type { Product } from '@prisma/client';

export default function ProductCard({ product }: { product: Product }) {
  const image = product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : '/placeholder.png';

  return (
    <article className="group relative flex flex-col rounded-2xl bg-white p-4 shadow-sm border border-slate-100 hover:shadow-lg transition">
      <div className="w-full aspect-square overflow-hidden rounded-lg bg-slate-50">
        <img src={image} alt={product.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
      </div>

      <div className="mt-4 flex-1">
        <h3 className="text-lg font-semibold text-slate-900 truncate">{product.name}</h3>
        <div className="mt-2 flex items-start gap-4 flex-wrap">
          <p className="flex-1 text-sm text-slate-500 line-clamp-2">{product.description}</p>
          <a
            href={`/product/${product.id}`}
            className="shrink-0 self-start rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition"
          >
            View
          </a>
        </div>
      </div>
    </article>
  );
}