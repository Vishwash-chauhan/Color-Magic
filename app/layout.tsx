import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

export const metadata: Metadata = {
  title: "Colour Magic | Custom Printing & Design",
  description: "High-quality custom printing services. Order your prints via WhatsApp.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="font-sans">
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold tracking-tighter">
              COLOUR <span className="bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent font-extrabold">MAGIC</span>
            </Link>
            
            <nav className="hidden md:flex gap-8 text-sm font-medium">
              <Link href="/" className="hover:text-blue-600 transition">Products</Link>
              <Link href="/admin" className="text-slate-400 hover:text-slate-600">Admin</Link>
            </nav>

            <a 
              href="https://wa.me/YOUR_PHONE_NUMBER" 
              className="bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-all shadow-md"
            >
              Contact Us
            </a>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 min-h-[calc(100vh-160px)]">
          {children}
        </main>

        <footer className="bg-white border-t py-10 mt-20">
          <div className="container mx-auto px-4 text-center">
            <p className="font-bold text-slate-800">COLOUR MAGIC</p>
            <p className="text-sm text-slate-500 mt-2">© 2026 Premium Printing Services. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}