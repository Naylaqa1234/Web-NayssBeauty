"use client";
import { useEffect, useRef } from "react";
import { Heart, Award, Users, Leaf } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  gradient: string;
}

interface Milestone {
  year: string;
  title: string;
  desc: string;
}

export default function AboutClient({
  teamMembers,
  milestones,
}: {
  teamMembers: TeamMember[];
  milestones: Milestone[];
}) {
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
    <div ref={ref} className="min-h-screen pt-24 pb-16 overflow-hidden">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 dark:from-[#0d0610] dark:via-[#1a0a10] dark:to-[#12080e] overflow-hidden">
        <div className="glow-orb w-80 h-80 bg-pink-300/30 dark:bg-pink-900/20 right-10 top-0" />
        <div className="glow-orb glow-orb-2 w-64 h-64 bg-rose-200/30 dark:bg-rose-900/15 left-0 bottom-0" />

        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <span className="text-pink-400 text-sm font-semibold uppercase tracking-widest reveal">
            Tentang Kami
          </span>
          <h1 className="font-display font-bold text-5xl sm:text-6xl text-gray-800 dark:text-rose-50 mt-3 mb-6 reveal">
            Behind the{" "}
            <span className="gradient-text">Glow</span>
          </h1>
          <p className="text-lg text-gray-500 dark:text-rose-300/70 leading-relaxed reveal max-w-2xl mx-auto">
            NayssBeauty lahir dari keyakinan sederhana: setiap orang berhak memancarkan kecantikan 
            alami mereka. Kami hadir dengan produk premium yang terjangkau, formulasi inovatif, 
            dan komitmen penuh terhadap kecantikan yang berkelanjutan.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white dark:bg-[#12080e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-800 dark:text-rose-50 mb-6">
                Misi & <span className="gradient-text">Visi</span> Kami
              </h2>
              <div className="space-y-6">
                {[
                  {
                    icon: Heart,
                    title: "Misi",
                    desc: "Memberdayakan setiap individu untuk menemukan dan memancarkan kecantikan autentik mereka melalui produk premium yang aman, efektif, dan accessible.",
                    color: "text-rose-500",
                    bg: "bg-rose-50 dark:bg-rose-900/20",
                  },
                  {
                    icon: Award,
                    title: "Visi",
                    desc: "Menjadi brand kecantikan terpercaya nomor satu di Asia Tenggara yang dikenal karena inovasi, kualitas, dan komitmen terhadap kecantikan berkelanjutan.",
                    color: "text-pink-500",
                    bg: "bg-pink-50 dark:bg-pink-900/20",
                  },
                ].map((item) => (
                  <div key={item.title} className={`flex gap-4 p-6 rounded-2xl ${item.bg}`}>
                    <div className={`${item.color} flex-shrink-0`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-rose-50 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 dark:text-rose-300/70 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="reveal grid grid-cols-2 gap-4">
              {[
                { icon: Users, value: "10K+", label: "Pelanggan Setia", gradient: "from-pink-400 to-rose-500" },
                { icon: Award, value: "500+", label: "Produk Premium", gradient: "from-fuchsia-400 to-pink-500" },
                { icon: Leaf, value: "100%", label: "Eco Friendly", gradient: "from-emerald-400 to-teal-500" },
                { icon: Heart, value: "4.9★", label: "Customer Rating", gradient: "from-amber-400 to-orange-500" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className={`card-elevation p-6 rounded-3xl bg-gradient-to-br ${stat.gradient} text-white text-center`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-3 opacity-80" />
                  <p className="font-display font-bold text-3xl">{stat.value}</p>
                  <p className="text-white/80 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gradient-to-b from-rose-50 to-pink-50 dark:from-[#0d0610] dark:to-[#12080e]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 reveal">
            <span className="text-pink-400 text-sm font-semibold uppercase tracking-widest">
              Perjalanan Kami
            </span>
            <h2 className="font-display font-bold text-4xl text-gray-800 dark:text-rose-50 mt-2">
              Milestone <span className="gradient-text">NayssBeauty</span>
            </h2>
          </div>

          <div className="relative">
            {/* Line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-300 to-rose-400 dark:from-rose-700 dark:to-pink-800" />

            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`reveal flex items-center gap-8 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                    <div className="bg-white dark:bg-[#1e0d16] p-5 rounded-2xl border border-pink-100 dark:border-rose-900/30 shadow-lg shadow-pink-100/30 dark:shadow-rose-900/10 card-elevation inline-block max-w-xs">
                      <span className="text-pink-400 text-xs font-semibold">{m.year}</span>
                      <h3 className="font-semibold text-gray-800 dark:text-rose-50 mt-1">{m.title}</h3>
                      <p className="text-gray-500 dark:text-rose-300/70 text-sm mt-1">{m.desc}</p>
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex-shrink-0 relative z-10 shadow-lg shadow-pink-300/50" />

                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white dark:bg-[#12080e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 reveal">
            <span className="text-pink-400 text-sm font-semibold uppercase tracking-widest">Tim Kami</span>
            <h2 className="font-display font-bold text-4xl text-gray-800 dark:text-rose-50 mt-2">
              The <span className="gradient-text">Dream Team</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <div
                key={member.name}
                className="reveal card-elevation bg-white dark:bg-[#1e0d16] rounded-3xl p-6 border border-pink-100 dark:border-rose-900/30 text-center group"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div
                  className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-3xl font-bold text-white mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xl`}
                >
                  {member.avatar}
                </div>
                <h3 className="font-display font-semibold text-gray-800 dark:text-rose-50">
                  {member.name}
                </h3>
                <p className="text-pink-400 text-sm font-medium mb-3">{member.role}</p>
                <p className="text-gray-500 dark:text-rose-300/70 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
