import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Footer from "@/src/components/Footer";

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
            


            <a 
              href="https://wa.me/+91 89206 05061" 
              className="bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-all shadow-md"
            >
              Contact Us
            </a>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 min-h-[calc(100vh-160px)]">
          {children}
        </main>

        {/* site footer (moved to component) */}
        <Footer />
      </body>
    </html>
  );
}