"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Star } from "lucide-react";

const floatingWords = ["Glow", "Shine", "Radiate", "Bloom", "Luminous"];

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % floatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 dark:from-[#0d0610] dark:via-[#1a0a10] dark:to-[#120814]"
    >
      {/* Animated gradient orbs */}
      <div
        className="glow-orb w-96 h-96 bg-pink-300/40 dark:bg-pink-900/30"
        style={{
          top: "10%",
          left: `${10 + mousePos.x * 5}%`,
          transition: "left 0.5s ease",
        }}
      />
      <div
        className="glow-orb glow-orb-2 w-80 h-80 bg-rose-300/30 dark:bg-rose-900/20"
        style={{
          bottom: "15%",
          right: `${5 + (1 - mousePos.x) * 5}%`,
          transition: "right 0.5s ease",
        }}
      />
      <div className="glow-orb w-64 h-64 bg-fuchsia-200/30 dark:bg-fuchsia-900/20" style={{ top: "50%", left: "45%" }} />

      {/* Morphing blob */}
      <div className="absolute top-20 right-[15%] w-48 h-48 bg-gradient-to-br from-pink-200/40 to-rose-300/30 dark:from-pink-900/20 dark:to-rose-900/10 morphing-blob" />

      {/* Animated light rays */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <div
          key={i}
          className="absolute top-1/2 left-1/2 opacity-10 dark:opacity-5"
          style={{
            width: "1px",
            height: "600px",
            background: "linear-gradient(180deg, transparent, #f9a8d4, transparent)",
            transform: `rotate(${deg}deg) translateX(-50%)`,
            transformOrigin: "top center",
            animation: `lightRay ${8 + i}s linear infinite`,
            animationDelay: `${i * 1.2}s`,
          }}
        />
      ))}

      {/* Floating sparkles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-sparkle pointer-events-none"
          style={{
            top: `${10 + Math.random() * 80}%`,
            left: `${5 + Math.random() * 90}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        >
          <Star className="w-3 h-3 text-pink-300/60 dark:text-pink-400/40 fill-current" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/70 dark:bg-rose-900/30 backdrop-blur-sm border border-pink-200 dark:border-rose-800/50 rounded-full px-4 py-1.5 mb-8 animate-slide-up">
          <span className="w-2 h-2 bg-pink-400 rounded-full animate-ping" />
          <span className="text-sm text-pink-600 dark:text-pink-300 font-medium">
            🎀 Koleksi Terbaru 2026 Telah Hadir
          </span>
        </div>

        {/* Heading */}
        <h1 className="font-display font-bold leading-none mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <span className="block text-5xl sm:text-7xl lg:text-8xl text-gray-800 dark:text-rose-50">
            Your Glow,
          </span>
          <span className="block text-5xl sm:text-7xl lg:text-8xl mt-2">
            <span className="gradient-text inline-block">
              {floatingWords[wordIndex]}
            </span>
          </span>
          <span className="block text-5xl sm:text-7xl lg:text-8xl text-gray-800 dark:text-rose-50 mt-2">
            Beyond Limits
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg sm:text-xl text-gray-500 dark:text-rose-300/70 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          Temukan rangkaian produk kecantikan premium yang dipilih khusus untuk memancarkan cahaya 
          alami Anda setiap hari. Dari skincare hingga makeup, semuanya ada di{" "}
          <span className="text-pink-500 dark:text-pink-300 font-semibold font-accent italic">NayssBeauty</span>.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up"
          style={{ animationDelay: "0.3s" }}
        >
          <Link
            href="/catalog"
            className="group btn-glow px-8 py-4 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 text-white rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-pink-300/50 transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Belanja Sekarang
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/tips"
            className="px-8 py-4 bg-white/70 dark:bg-rose-900/30 backdrop-blur-sm border border-pink-200 dark:border-rose-800/50 text-gray-700 dark:text-rose-100 rounded-2xl font-semibold text-lg hover:bg-white dark:hover:bg-rose-900/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            Beauty Tips ✨
          </Link>
        </div>

        {/* Stats */}
        <div
          className="flex flex-wrap items-center justify-center gap-8 mt-16 animate-slide-up"
          style={{ animationDelay: "0.4s" }}
        >
          {[
            { value: "10K+", label: "Pelanggan Puas" },
            { value: "500+", label: "Produk Premium" },
            { value: "4.9★", label: "Rating Rata-rata" },
            { value: "99%", label: "Authentic Products" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display font-bold text-2xl sm:text-3xl gradient-text">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-rose-300/60 mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-gray-400 dark:text-rose-400/60">Scroll</span>
        <div className="w-5 h-8 border-2 border-pink-300 dark:border-rose-700 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-pink-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
