"use client";
import { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Anastasia Putri",
    role: "Beauty Enthusiast",
    avatar: "A",
    rating: 5,
    text: "Produk dari Lumière benar-benar mengubah rutinitas skincare saya! Kulit terasa lebih lembap dan cerah dalam 2 minggu. Highly recommended untuk semua yang ingin glowing!",
    product: "Hydra Glow Serum",
    gradient: "from-pink-400 to-rose-500",
  },
  {
    name: "Kirana Dewi",
    role: "Makeup Artist",
    avatar: "K",
    rating: 5,
    text: "Sebagai MUA profesional, saya sangat selektif dengan produk yang saya rekomendasikan ke klien. Lumière selalu jadi pilihan utama — kualitas premium dengan harga yang reasonable!",
    product: "Velvet Matte Foundation",
    gradient: "from-fuchsia-400 to-pink-500",
  },
  {
    name: "Safira Ramadhani",
    role: "Skincare Addict",
    avatar: "S",
    rating: 5,
    text: "Pengiriman super cepat dan packaging-nya cantik banget! Produknya original terjamin dan hasilnya sesuai ekspektasi. Sudah jadi pelanggan setia Lumière selama 2 tahun!",
    product: "Rose Gold Eye Palette",
    gradient: "from-rose-400 to-pink-400",
  },
  {
    name: "Melissa Chen",
    role: "Influencer & Beauty Blogger",
    avatar: "M",
    rating: 5,
    text: "Lumière adalah brand favorit yang selalu saya rekomendasikan di channel saya. Customer service-nya responsif dan produknya selalu konsisten bagus. Love everything!",
    product: "24H Setting Powder",
    gradient: "from-amber-400 to-rose-400",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAutoplay) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isAutoplay]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const prev = () => {
    setIsAutoplay(false);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  };
  const next = () => {
    setIsAutoplay(false);
    setCurrent((c) => (c + 1) % testimonials.length);
  };

  const t = testimonials[current];

  return (
    <section
      ref={ref}
      className="py-24 bg-gradient-to-b from-rose-50 to-pink-100 dark:from-[#0d0610] dark:to-[#12080e] relative overflow-hidden"
    >
      <div className="glow-orb w-96 h-96 bg-pink-200/20 dark:bg-pink-900/10 left-0 top-1/2 -translate-y-1/2" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 reveal">
          <span className="text-pink-400 text-sm font-semibold uppercase tracking-widest">
            Testimoni
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-gray-800 dark:text-rose-50 mt-2">
            Kata Mereka tentang{" "}
            <span className="gradient-text">Lumière</span>
          </h2>
        </div>

        {/* Testimonial card */}
        <div className="reveal relative">
          <div className="bg-white dark:bg-[#1e0d16] rounded-3xl p-8 sm:p-12 shadow-xl shadow-pink-100/50 dark:shadow-rose-900/20 border border-pink-100 dark:border-rose-900/30 relative overflow-hidden">
            {/* Quote icon */}
            <Quote className="absolute top-6 right-6 w-16 h-16 text-pink-100 dark:text-rose-900/30" />

            <div className="flex flex-col sm:flex-row items-start gap-6">
              {/* Avatar */}
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${t.gradient} flex items-center justify-center text-2xl font-bold text-white flex-shrink-0 shadow-lg`}
              >
                {t.avatar}
              </div>

              <div className="flex-1">
                <div className="flex mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 star-fill fill-current" />
                  ))}
                </div>

                <p className="text-gray-600 dark:text-rose-200/80 text-lg leading-relaxed italic font-accent mb-6">
                  "{t.text}"
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-rose-50">{t.name}</p>
                    <p className="text-sm text-pink-400">{t.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 dark:text-rose-400">Produk dibeli:</p>
                    <p className="text-sm font-medium text-pink-500 dark:text-pink-300">{t.product}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white dark:bg-rose-900/30 border border-pink-200 dark:border-rose-900/40 flex items-center justify-center hover:bg-pink-50 dark:hover:bg-rose-900/50 hover:border-pink-400 transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-pink-500" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setIsAutoplay(false); setCurrent(i); }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-8 bg-gradient-to-r from-pink-400 to-rose-400"
                      : "w-2 bg-pink-200 dark:bg-rose-900/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-white dark:bg-rose-900/30 border border-pink-200 dark:border-rose-900/40 flex items-center justify-center hover:bg-pink-50 dark:hover:bg-rose-900/50 hover:border-pink-400 transition-all"
            >
              <ChevronRight className="w-5 h-5 text-pink-500" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
