import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import CursorGlow from "@/components/CursorGlow";
import Footer from "@/components/Footer";
import MarqueeBanner from "@/components/MarqueeBanner";

export const metadata: Metadata = {
  title: "NayssBeauty — Glow Beyond Limits",
  description:
    "Temukan koleksi produk kecantikan premium terpilih. Skincare, makeup, dan haircare terbaik untuk kulit bercahaya setiap hari.",
  keywords: "beauty, skincare, makeup, haircare, produk kecantikan, NayssBeauty",
  openGraph: {
    title: "NayssBeauty",
    description: "Glow Beyond Limits",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="bg-rose-50 dark:bg-[#0d0610] text-gray-900 dark:text-rose-50 transition-colors duration-500">
        <ThemeProvider>
          <CursorGlow />
          <MarqueeBanner />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <CartDrawer />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
