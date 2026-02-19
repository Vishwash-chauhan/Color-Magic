export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-50 via-amber-50 to-sky-50 p-12 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">Colour Magic — Print that pops ✨</h2>
          <p className="mt-4 text-slate-600 max-w-xl">
            High-quality printing for businesses and creators — business cards, flyers, stickers,
            bespoke stationery and more. Fast turnarounds, vivid colours and finishes that stand out.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href="/products"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-slate-800 transition"
            >
              Shop now
            </a>
            <a
              href="/admin/add-product"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
            >
              Sell with us
            </a>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <div className="relative rounded-xl overflow-hidden border border-slate-100 bg-white shadow-lg">
            <img
              src="https://placehold.co/550x320"
              alt="Colourful printed products"
              className="w-full h-64 object-cover sm:h-80"
            />
          </div>
        </div>
      </div>
    </section>
  );
}