"use client";
import { useEffect, useRef } from "react";
import { Leaf, Shield, Truck, Headphones } from "lucide-react";

const values = [
  {
    icon: Leaf,
    title: "Eco-Friendly",
    desc: "Produk ramah lingkungan dan berkelanjutan",
    gradient: "from-emerald-400 to-green-500",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
  },
  {
    icon: Shield,
    title: "100% Authentic",
    desc: "Semua produk terjamin keasliannya",
    gradient: "from-pink-400 to-rose-500",
    bg: "bg-pink-50 dark:bg-rose-900/20",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Pengiriman cepat ke seluruh Indonesia",
    gradient: "from-violet-400 to-purple-500",
    bg: "bg-violet-50 dark:bg-purple-900/20",
  },
  {
    icon: Headphones,
    title: "Beauty Consultant",
    desc: "Konsultasi kecantikan gratis 24/7",
    gradient: "from-amber-400 to-orange-500",
    bg: "bg-amber-50 dark:bg-amber-900/20",
  },
];

export default function BrandValues() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = ref.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 bg-white dark:bg-[#12080e] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-300 dark:via-rose-800 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-300 dark:via-rose-800 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <span className="text-pink-400 text-sm font-semibold uppercase tracking-widest">Kenapa NayssBeauty?</span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-gray-800 dark:text-rose-50 mt-2">
            Keunggulan <span className="gradient-text">Kami</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val, i) => (
            <div
              key={val.title}
              className={`reveal card-elevation p-8 rounded-3xl ${val.bg} border border-pink-100 dark:border-rose-900/20 text-center group`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${val.gradient} flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}
              >
                <val.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-display font-semibold text-lg text-gray-800 dark:text-rose-50 mb-2">
                {val.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-rose-300/70 leading-relaxed">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
