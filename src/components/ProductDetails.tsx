import type { Product } from "@prisma/client";
import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";
import ImageCarousel from "@/src/components/ImageCarousel";

export default function ProductDetails({ product }: { product: Product }) {
  const safeDescription = DOMPurify.sanitize(product.description || "");

  return (
    <section>
      <nav className="mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center gap-3 rounded-full bg-white/60 px-3 py-1 shadow-sm">
          <li>
            <Link href="/products" className="text-slate-600 hover:underline text-sm font-medium">
              Products
            </Link>
          </li>
          <li className="text-slate-300">›</li>
          <li className="text-slate-700 font-semibold text-sm max-w-[60vw] truncate">{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-1 md:p-8 rounded-2xl border border-slate-100 shadow-sm">
        <div>
          {/* interactive carousel (client) */}
          <ImageCarousel images={product.imageUrls.length > 0 ? product.imageUrls : ["/placeholder.png"]} alt={product.name} />

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

          <div className="mt-4 text-slate-700 prose max-w-none" dangerouslySetInnerHTML={{ __html: safeDescription }} />

          <div className="mt-6 text-2xl font-extrabold text-slate-900">{product.price ? `₹${product.price.toFixed(2)}` : "Price on request"}</div>

          <div className="mt-6 flex gap-3">
            {/* WhatsApp enquiry with prefilled message */}
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`Hi, I would like to enquire about ${product.name}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-green-600 text-white px-5 py-3 font-semibold hover:bg-green-700 transition"
              aria-label={`Enquire about ${product.name} on WhatsApp`}
            >
              <img src="https://img.icons8.com/ios-filled/24/ffffff/whatsapp.png" alt="WhatsApp" className="w-4 h-4" />
              Check Price
            </a>
          </div>

          <div className="mt-8 text-sm text-slate-500">
            <div className="mt-2">Added: {product.createdAt.toDateString()}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
