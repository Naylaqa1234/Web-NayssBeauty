"use client";
import { useState, useEffect, useRef } from "react";
import { Search, BookOpen, Sparkles } from "lucide-react";
import type { BeautyTip } from "@/types";

export default function TipsClient({
  tips,
  categories,
}: {
  tips: BeautyTip[];
  categories: string[];
}) {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const filtered = tips.filter((tip) => {
    const matchCat = activeCategory === "Semua" || tip.category === activeCategory;
    const matchSearch =
      tip.title.toLowerCase().includes(search.toLowerCase()) ||
      tip.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div ref={ref} className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-rose-50 to-pink-50 dark:from-[#0d0610] dark:to-[#12080e] overflow-hidden">
      {/* Hero */}
      <section className="relative py-16 overflow-hidden">
        <div className="glow-orb w-72 h-72 bg-pink-200/30 dark:bg-pink-900/20 right-0 top-0" />
        <div className="glow-orb glow-orb-2 w-56 h-56 bg-rose-200/20 dark:bg-rose-900/15 left-10 bottom-0" />

        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <div className="inline-flex items-center gap-2 bg-pink-100 dark:bg-rose-900/30 px-4 py-1.5 rounded-full mb-6 reveal">
            <BookOpen className="w-4 h-4 text-pink-500" />
            <span className="text-pink-600 dark:text-pink-300 text-sm font-medium">
              Beauty Encyclopedia
            </span>
          </div>
          <h1 className="font-display font-bold text-5xl sm:text-6xl text-gray-800 dark:text-rose-50 mb-6 reveal">
            Beauty <span className="gradient-text">Tips & Tricks</span>
          </h1>
          <p className="text-lg text-gray-500 dark:text-rose-300/70 max-w-2xl mx-auto reveal">
            Kumpulan tips kecantikan terseleksi dari para ahli dermatologi, makeup artist, 
            dan beauty enthusiast untuk rutinitas cantikmu sehari-hari.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search */}
        <div className="relative max-w-lg mx-auto mb-8 reveal">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-400" />
          <input
            type="text"
            placeholder="Cari tips kecantikan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-[#1e0d16] border border-pink-200 dark:border-rose-900/40 text-gray-700 dark:text-rose-100 placeholder-gray-400 input-glow focus:border-pink-400 transition-all"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12 reveal">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-2xl text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-pink-400 to-rose-500 text-white shadow-lg shadow-pink-300/40 scale-105"
                  : "bg-white dark:bg-[#1e0d16] border border-pink-200 dark:border-rose-900/40 text-gray-600 dark:text-rose-200 hover:border-pink-400 hover:shadow-md"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tips count */}
        <p className="text-center text-sm text-gray-400 dark:text-rose-400/60 mb-8">
          Menampilkan <span className="text-pink-500 font-semibold">{filtered.length}</span> tips
        </p>

        {/* Tips Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-pink-300" />
            <p className="text-gray-400 dark:text-rose-400">
              Tips tidak ditemukan. Coba kata kunci lain.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((tip, i) => (
              <div
                key={tip.id}
                className="reveal card-elevation bg-white dark:bg-[#1e0d16] rounded-3xl overflow-hidden border border-pink-100 dark:border-rose-900/30 group cursor-pointer"
                style={{ transitionDelay: `${i * 80}ms` }}
                onClick={() => setExpanded(expanded === tip.id ? null : tip.id)}
              >
                {/* Card Header */}
                <div className={`bg-gradient-to-br ${tip.gradient} p-6 relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

                  <div className="relative flex items-start justify-between">
                    <div>
                      <span className="text-4xl">{tip.icon}</span>
                      <span className="ml-3 text-xs bg-white/20 px-3 py-1 rounded-full text-white font-medium">
                        {tip.category}
                      </span>
                    </div>
                    <div
                      className={`w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-sm transition-transform duration-300 ${
                        expanded === tip.id ? "rotate-180" : ""
                      }`}
                    >
                      ↓
                    </div>
                  </div>

                  <h3 className="font-display font-semibold text-xl text-white mt-4">
                    {tip.title}
                  </h3>
                </div>

                {/* Expandable content */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    expanded === tip.id ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-6">
                    <p className="text-gray-600 dark:text-rose-200/80 text-sm leading-relaxed">
                      {tip.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-pink-400" />
                      <span className="text-xs text-pink-400 font-medium">
                        Tip dari Beauty Expert NayssBeauty
                      </span>
                    </div>
                  </div>
                </div>

                {/* Preview if collapsed */}
                {expanded !== tip.id && (
                  <div className="px-6 py-4">
                    <p className="text-gray-500 dark:text-rose-300/60 text-sm line-clamp-2">
                      {tip.description}
                    </p>
                    <p className="text-pink-400 text-xs mt-2 font-medium">
                      Klik untuk baca selengkapnya →
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center reveal">
          <div className="bg-gradient-to-br from-pink-100 to-rose-100 dark:from-rose-900/30 dark:to-pink-900/20 rounded-3xl p-12 border border-pink-200 dark:border-rose-900/30 relative overflow-hidden">
            <div className="glow-orb w-48 h-48 bg-pink-300/40 dark:bg-pink-900/20 left-0 top-0" />
            <div className="glow-orb glow-orb-2 w-40 h-40 bg-rose-300/30 dark:bg-rose-900/15 right-0 bottom-0" />

            <div className="relative">
              <span className="text-4xl">💌</span>
              <h3 className="font-display font-bold text-3xl text-gray-800 dark:text-rose-50 mt-4 mb-3">
                Ada Pertanyaan tentang Kecantikan?
              </h3>
              <p className="text-gray-500 dark:text-rose-300/70 mb-8 max-w-md mx-auto">
                Konsultasikan kebutuhan kecantikanmu dengan beauty consultant profesional kami. 
                Gratis dan tanpa biaya!
              </p>
              <button className="px-8 py-4 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 text-white rounded-2xl font-semibold hover:shadow-xl hover:shadow-pink-300/40 transition-all duration-300 hover:-translate-y-1 shimmer-effect">
                ✨ Konsultasi Gratis Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
