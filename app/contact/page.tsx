import ContactForm from "@/src/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 py-12">
      <main className="mx-auto max-w-6xl px-6">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-50 via-white to-sky-50 p-8 shadow-lg">
          {/* decorative blob */}
          <svg className="pointer-events-none absolute -right-20 -top-20 opacity-30 w-72 h-72 text-rose-200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path fill="currentColor" d="M44.7,-59.6C58.2,-50.8,70,-37.1,74.2,-21.6C78.5,-6.2,75.3,11,67.9,24.9C60.5,38.8,48.8,49.4,34.4,57.6C20,65.9,2.9,71.8,-12.4,74.3C-27.7,76.8,-41.2,75.9,-53.5,67.8C-65.9,59.6,-77.2,44.3,-80.3,27.1C-83.4,9.8,-78.4,-9.4,-69.6,-26.6C-60.8,-43.8,-48.2,-58.9,-32.8,-67.3C-17.5,-75.7,-8.7,-77.4,6.4,-85.3C21.5,-93.1,43,-107.5,44.7,-59.6Z" transform="translate(100 100)"/>
          </svg>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="pt-2">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">Contact Colour Magic</h1>
              <p className="mt-4 text-slate-600 max-w-xl">Custom colours, large orders, or a quick pricing check — we’re here to help. Choose your preferred way to contact us below.</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href="mailto:color.magic02@gmail.com" className="inline-flex items-center gap-2 bg-white/90 border border-slate-100 text-slate-800 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition">
                  <img src="https://api.iconify.design/heroicons-outline/envelope.svg?color=%23475569" alt="email icon" className="w-4 h-4" loading="lazy" />
                  Email
                </a>

                <a href="https://wa.me/918920605061?text=Hi%20Colour%20Magic%2C%20I%27d%20like%20a%20price%20check" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-full shadow-sm hover:bg-emerald-700 transition">
                  <img src="https://api.iconify.design/simple-icons/whatsapp.svg?color=%23ffffff" alt="whatsapp icon" className="w-4 h-4" loading="lazy" />
                  WhatsApp
                </a>
              </div>

              <div className="mt-8 hidden sm:grid sm:grid-cols-2 gap-4">
                <div className="bg-white/90 p-4 rounded-xl border border-slate-100 shadow-sm">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase">Address</h3>
                  <p className="mt-2 text-slate-700 text-sm">281 A, SANT NAGAR<br/>EAST OF KAILASH<br/>NEW DELHI-110065</p>
                </div>

                <div className="bg-white/90 p-4 rounded-xl border border-slate-100 shadow-sm">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase">Hours</h3>
                  <p className="mt-2 text-slate-700 text-sm">Mon–Sat · 10:00 — 18:00<br/>Sun · Closed</p>
                </div>

                <div className="bg-white/90 p-4 rounded-xl border border-slate-100 shadow-sm">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase">Phone</h3>
                  <p className="mt-2 text-slate-700 text-sm"><a href="tel:+918920605061" className="hover:underline">+91 89206 05061</a></p>
                </div>

                <div className="bg-white/90 p-4 rounded-xl border border-slate-100 shadow-sm">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase">Response</h3>
                  <p className="mt-2 text-slate-700 text-sm">Typical response time: <strong>within 24 hours</strong></p>
                </div>
              </div>
            </div>

            <div className="lg:pt-4">
              <div className="max-w-xl mx-auto">
                <div className="mb-4 text-sm text-slate-500">Send us a message — we'll reply within 24 hours.</div>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8 text-center text-sm text-slate-400">Prefer visiting? <a href="https://www.google.com/maps/search/?api=1&query=281+A+SANT+NAGAR+EAST+OF+KAILASH+NEW+DELHI" className="underline">Get directions on Google Maps</a></div>
      </main>
    </div>
  );
}
