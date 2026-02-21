"use client";
import { useState, useEffect, useCallback, Suspense } from "react";
import { Search, SlidersHorizontal, X, Sparkles, Grid, List } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";
import type { Product } from "@/types";

const SORT_OPTIONS = [
  { value: "default", label: "Paling Relevan" },
  { value: "price-asc", label: "Harga Terendah" },
  { value: "price-desc", label: "Harga Tertinggi" },
  { value: "rating", label: "Rating Terbaik" },
  { value: "discount", label: "Diskon Terbesar" },
];

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const LIMIT = 12;

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const skip = (page - 1) * LIMIT;
      let url = searchQuery
        ? `https://dummyjson.com/products/search?q=${encodeURIComponent(searchQuery)}&limit=${LIMIT}&skip=${skip}`
        : `https://dummyjson.com/products/category/beauty?limit=${LIMIT}&skip=${skip}`;

      const res = await fetch(url);
      const data = await res.json();
      setProducts(data.products || []);
      setTotal(data.total || 0);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-asc": return a.price - b.price;
      case "price-desc": return b.price - a.price;
      case "rating": return b.rating - a.rating;
      case "discount": return b.discountPercentage - a.discountPercentage;
      default: return 0;
    }
  }).filter(
    (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
  );

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-pink-50 dark:from-[#0d0610] dark:to-[#12080e] pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-pink-400 text-sm font-semibold uppercase tracking-widest">
            Koleksi Lengkap
          </span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-gray-800 dark:text-rose-50 mt-2">
            Beauty <span className="gradient-text">Catalog</span>
          </h1>
          <p className="text-gray-500 dark:text-rose-300/70 mt-4">
            Temukan {total}+ produk kecantikan premium pilihan
          </p>
        </div>

        {/* Search & Filters Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-400" />
            <input
              type="text"
              placeholder="Cari produk kecantikan..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-[#1e0d16] border border-pink-200 dark:border-rose-900/40 text-gray-700 dark:text-rose-100 placeholder-gray-400 dark:placeholder-rose-400/50 input-glow focus:border-pink-400 transition-all text-sm"
            />
            {searchInput && (
              <button
                onClick={() => setSearchInput("")}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <X className="w-4 h-4 text-gray-400 hover:text-pink-500 transition-colors" />
              </button>
            )}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3.5 rounded-2xl bg-white dark:bg-[#1e0d16] border border-pink-200 dark:border-rose-900/40 text-gray-700 dark:text-rose-100 input-glow focus:border-pink-400 transition-all text-sm min-w-[180px]"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          {/* Filter toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-5 py-3.5 rounded-2xl border transition-all text-sm font-medium ${
              showFilters
                ? "bg-pink-500 text-white border-pink-500"
                : "bg-white dark:bg-[#1e0d16] border-pink-200 dark:border-rose-900/40 text-gray-700 dark:text-rose-100 hover:border-pink-400"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filter
          </button>

          {/* View mode */}
          <div className="hidden sm:flex gap-1 p-1 bg-white dark:bg-[#1e0d16] rounded-2xl border border-pink-200 dark:border-rose-900/40">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2.5 rounded-xl transition-all ${viewMode === "grid" ? "bg-pink-500 text-white" : "text-gray-400 hover:text-pink-500"}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2.5 rounded-xl transition-all ${viewMode === "list" ? "bg-pink-500 text-white" : "text-gray-400 hover:text-pink-500"}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mb-8 p-6 bg-white dark:bg-[#1e0d16] rounded-3xl border border-pink-100 dark:border-rose-900/30 animate-slide-up">
            <h3 className="font-semibold text-gray-700 dark:text-rose-100 mb-4">
              Rentang Harga
            </h3>
            <div className="flex items-center gap-4">
              <span className="text-sm text-pink-500">${priceRange[0]}</span>
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="flex-1 accent-pink-500"
              />
              <span className="text-sm text-pink-500">${priceRange[1]}</span>
            </div>
          </div>
        )}

        {/* Results info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500 dark:text-rose-300/70">
            Menampilkan{" "}
            <span className="font-semibold text-pink-500">
              {sortedProducts.length}
            </span>{" "}
            produk
            {searchQuery && ` untuk "${searchQuery}"`}
          </p>
          {loading && (
            <div className="flex items-center gap-2 text-sm text-pink-400">
              <Sparkles className="w-4 h-4 animate-spin" />
              Memuat...
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div
          className={`grid gap-4 sm:gap-6 ${
            viewMode === "grid"
              ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              : "grid-cols-1 sm:grid-cols-2"
          }`}
        >
          {loading ? (
            <ProductSkeleton count={LIMIT} />
          ) : sortedProducts.length > 0 ? (
            sortedProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <div className="w-20 h-20 rounded-full bg-pink-50 dark:bg-rose-900/20 flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-pink-300" />
              </div>
              <p className="font-medium text-gray-500 dark:text-rose-300">
                Produk tidak ditemukan
              </p>
              <p className="text-sm text-gray-400 dark:text-rose-400 mt-1">
                Coba kata kunci yang berbeda
              </p>
              <button
                onClick={() => { setSearchInput(""); setSearchQuery(""); }}
                className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-xl text-sm hover:bg-pink-600 transition-colors"
              >
                Reset Pencarian
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && !loading && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-xl bg-white dark:bg-[#1e0d16] border border-pink-200 dark:border-rose-900/40 text-sm text-gray-700 dark:text-rose-100 disabled:opacity-40 hover:border-pink-400 transition-all"
            >
              ← Sebelumnya
            </button>

            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${
                  page === p
                    ? "bg-gradient-to-r from-pink-400 to-rose-500 text-white shadow-lg shadow-pink-300/40"
                    : "bg-white dark:bg-[#1e0d16] border border-pink-200 dark:border-rose-900/40 text-gray-700 dark:text-rose-100 hover:border-pink-400"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-xl bg-white dark:bg-[#1e0d16] border border-pink-200 dark:border-rose-900/40 text-sm text-gray-700 dark:text-rose-100 disabled:opacity-40 hover:border-pink-400 transition-all"
            >
              Berikutnya →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
