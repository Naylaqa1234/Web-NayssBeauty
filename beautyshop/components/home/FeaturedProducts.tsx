"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types";

export default function FeaturedProducts({ initialProducts }: { initialProducts: Product[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-rose-50 to-pink-50 dark:from-[#0d0610] dark:to-[#12080e] relative overflow-hidden">
      {/* Orb */}
      <div className="glow-orb w-72 h-72 bg-pink-200/30 dark:bg-pink-900/15 right-0 top-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
          <div className="reveal">
            <span className="text-pink-400 text-sm font-semibold uppercase tracking-widest">
              Pilihan Terbaik
            </span>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-gray-800 dark:text-rose-50 mt-2">
              Featured <span className="gradient-text">Products</span>
            </h2>
          </div>
          <Link
            href="/catalog"
            className="reveal group flex items-center gap-2 px-6 py-3 bg-white dark:bg-rose-900/30 border border-pink-200 dark:border-rose-900/40 rounded-2xl text-sm font-medium text-gray-700 dark:text-rose-100 hover:border-pink-400 hover:shadow-lg transition-all duration-300"
          >
            Lihat Semua
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {initialProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {initialProducts.map((product, i) => (
              <div key={product.id} className="reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <ProductCard product={product} index={i} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-pink-300" />
            <p>Produk sedang dimuat...</p>
          </div>
        )}
      </div>
    </section>
  );
}
