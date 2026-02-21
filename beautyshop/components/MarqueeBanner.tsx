"use client";
import { Sparkles } from "lucide-react";

const messages = [
  "✨ FREE ONGKIR untuk pembelian di atas Rp200.000",
  "💎 Produk Premium 100% Authentic",
  "🌹 Dapatkan FREE Gift setiap pembelian",
  "⭐ Rating 4.9/5 dari 10.000+ pelanggan",
  "💖 Konsultasi kecantikan GRATIS",
  "🎀 Kemasan Eco-Friendly & Sustainable",
];

export default function MarqueeBanner() {
  const doubled = [...messages, ...messages];
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-8 bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 overflow-hidden shimmer-effect">
      <div className="marquee-track h-full flex items-center">
        {doubled.map((msg, i) => (
          <span
            key={i}
            className="text-white text-xs font-medium whitespace-nowrap mx-8 flex items-center gap-2"
          >
            {msg}
            <Sparkles className="w-3 h-3 text-pink-200 animate-sparkle inline" />
          </span>
        ))}
      </div>
    </div>
  );
}
