"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { beautyTips } from "@/lib/tips-data";
import { useEffect, useRef } from "react";

export default function TipsPreview() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const preview = beautyTips.slice(0, 3);

  return (
    <section ref={ref} className="py-24 bg-white dark:bg-[#12080e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <span className="text-pink-400 text-sm font-semibold uppercase tracking-widest">
            Tips & Trik
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-gray-800 dark:text-rose-50 mt-2">
            Beauty <span className="gradient-text">Secrets</span>
          </h2>
          <p className="text-gray-500 dark:text-rose-300/70 mt-4 max-w-xl mx-auto">
            Tips kecantikan dari para ahli untuk merawat kulit dan penampilan Anda setiap hari.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {preview.map((tip, i) => (
            <div
              key={tip.id}
              className={`reveal card-elevation bg-gradient-to-br ${tip.gradient} p-6 rounded-3xl text-white relative overflow-hidden group`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
              <div className="text-3xl mb-4">{tip.icon}</div>
              <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-medium">
                {tip.category}
              </span>
              <h3 className="font-display font-semibold text-lg mt-3 mb-2">{tip.title}</h3>
              <p className="text-white/80 text-sm leading-relaxed line-clamp-3">{tip.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center reveal">
          <Link
            href="/tips"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-400 to-rose-500 text-white rounded-2xl font-semibold hover:shadow-xl hover:shadow-pink-300/40 transition-all duration-300 hover:-translate-y-1"
          >
            Lihat Semua Tips
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
