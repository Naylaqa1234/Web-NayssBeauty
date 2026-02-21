import Link from "next/link";
import { Sparkles, Instagram, Twitter, Youtube, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-rose-50 to-pink-100 dark:from-[#0d0610] dark:to-[#1a0a10] border-t border-pink-200/50 dark:border-rose-900/30 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-xl gradient-text">NayssBeauty</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-rose-300/70 leading-relaxed mb-6">
              Temukan kecantikan terbaik Anda. Produk premium pilihan untuk memancarkan cahaya dari dalam.
            </p>
            <div className="flex gap-3">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-pink-200 dark:bg-rose-900/40 flex items-center justify-center hover:bg-pink-300 dark:hover:bg-rose-800/40 hover:scale-110 transition-all duration-300"
                >
                  <Icon className="w-4 h-4 text-pink-600 dark:text-pink-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-display font-semibold text-gray-800 dark:text-rose-50 mb-4">
              Navigasi
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Catalog", href: "/catalog" },
                { label: "Beauty Tips", href: "/tips" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 dark:text-rose-300/70 hover:text-pink-500 dark:hover:text-pink-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-display font-semibold text-gray-800 dark:text-rose-50 mb-4">
              Kategori
            </h3>
            <ul className="space-y-2">
              {["Skincare", "Makeup", "Hair Care", "Body Care", "Fragrance"].map((cat) => (
                <li key={cat}>
                  <a
                    href="#"
                    className="text-sm text-gray-500 dark:text-rose-300/70 hover:text-pink-500 dark:hover:text-pink-300 transition-colors"
                  >
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display font-semibold text-gray-800 dark:text-rose-50 mb-4">
              Newsletter
            </h3>
            <p className="text-sm text-gray-500 dark:text-rose-300/70 mb-4">
              Subscribe untuk tips kecantikan eksklusif dan promo terbaru.
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="email@contoh.com"
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-rose-900/20 border border-pink-200 dark:border-rose-900/40 text-sm text-gray-700 dark:text-rose-100 placeholder-gray-400 input-glow focus:border-pink-400 transition-all"
              />
              <button className="w-full py-2.5 bg-gradient-to-r from-pink-400 to-rose-500 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-pink-300/40 transition-all flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-pink-200/50 dark:border-rose-900/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 dark:text-rose-400/60">
            © 2024 Lumière Beauty. All rights reserved.
          </p>
          <div className="flex gap-4">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-gray-400 dark:text-rose-400/60 hover:text-pink-500 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
          <p className="text-xs text-gray-400 dark:text-rose-400/60 flex items-center gap-1">
            Made with <span className="text-pink-400">♥</span> for beauty lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
