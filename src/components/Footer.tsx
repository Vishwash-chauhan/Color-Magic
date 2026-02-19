"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "not-configured" | "invalid">("idle");

  function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setStatus("invalid");
      return;
    }

    // placeholder behavior — user will wire webhook/server later
    setStatus("not-configured");
    setEmail("");
  }

  return (
    <footer className="bg-white text-slate-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="inline-block text-2xl font-bold tracking-tight text-slate-900">
              COLOUR <span className="bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent">MAGIC</span>
            </Link>
            <p className="mt-3 text-sm text-slate-600 max-w-sm">High‑quality custom printing & finishing. Fast responses via WhatsApp — perfect for large orders and colour matching.</p>

            <div className="mt-4 flex gap-3">
              <a
                href="https://wa.me/918920605061?text=Hi%20Colour%20Magic"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 rounded-full text-sm shadow-sm transition"
                aria-label="Contact on WhatsApp"
              >
                <img src="https://api.iconify.design/simple-icons/whatsapp.svg?color=%23ffffff" alt="whatsapp" className="w-4 h-4" />
                WhatsApp
              </a>

              <a href="mailto:color.magic02@gmail.com" className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 text-slate-700 px-3 py-2 rounded-full text-sm hover:bg-slate-100 transition">
                <img src="https://api.iconify.design/heroicons-outline/envelope.svg?color=%23cbd5e1" alt="email" className="w-4 h-4" />
                Email
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900">Contact</h4>
            <address className="not-italic mt-3 text-sm text-slate-600 space-y-2">
              <div>281 A, SANT NAGAR</div>
              <div>EAST OF KAILASH, NEW DELHI — 110065</div>
              <div>
                Phone: <a href="tel:+918920605061" className="text-slate-900 hover:underline">+91 89206 05061</a>
              </div>
              <div>
                Email: <a href="mailto:color.magic02@gmail.com" className="text-slate-900 hover:underline">color.magic02@gmail.com</a>
              </div>
              <div>Hours: Mon–Sat · 10:00 — 18:00</div>
            </address>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900">Quick links</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link href="/products" className="hover:text-slate-200">Products</Link></li>
              <li><Link href="/contact" className="hover:text-slate-200">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900">Get updates</h4>
            <p className="mt-2 text-sm text-slate-600">Subscribe for occasional news and offers. (disabled — webhook required)</p>

            <form onSubmit={handleSubscribe} className="mt-3 flex gap-2">
              <input
                type="email"
                aria-label="Email for updates"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
                className="flex-1 px-3 py-2 rounded-md bg-white border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-slate-300"
              />
              <button type="submit" className="px-4 py-2 bg-slate-900 text-white rounded-md text-sm font-semibold">Subscribe</button>
            </form>

            {status === "invalid" && <div className="mt-2 text-xs text-rose-600">Please enter a valid email.</div>}
            {status === "not-configured" && <div className="mt-2 text-xs text-yellow-600">Subscription not configured yet.</div>}
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6 text-sm text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} Colour Magic. All rights reserved.</div>
          <div>Made with <span aria-hidden>♥</span> in India</div>
        </div>
      </div>
    </footer>
  );
}
