"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Sun, Moon, Menu, X, Heart, Sparkles } from "lucide-react";
import { useThemeStore, useCartStore, useWishlistStore } from "@/store";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/catalog", label: "Catalog" },
  { href: "/tips", label: "Beauty Tips" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { isDark, toggleTheme } = useThemeStore();
  const { toggleCart, totalItems } = useCartStore();
  const { items: wishlist } = useWishlistStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-8 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "navbar-blur bg-white/80 dark:bg-[#1a0a10]/80 shadow-lg shadow-pink-200/30 dark:shadow-pink-900/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center animate-glow group-hover:scale-110 transition-transform">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-xl gradient-text">
                NayssBeauty
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors duration-300 group ${
                    pathname === link.href
                      ? "text-pink-500 dark:text-pink-300"
                      : "text-gray-700 dark:text-rose-100 hover:text-pink-500 dark:hover:text-pink-300"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-pink-400 to-rose-400 transition-all duration-300 ${
                      pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-full bg-pink-100 dark:bg-rose-900/40 flex items-center justify-center hover:bg-pink-200 dark:hover:bg-rose-800/40 transition-all duration-300 hover:scale-110 tooltip"
                data-tip={isDark ? "Light Mode" : "Dark Mode"}
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-pink-500" />
                )}
              </button>

              {/* Wishlist */}
              <Link
                href="/catalog"
                className="relative w-9 h-9 rounded-full bg-pink-100 dark:bg-rose-900/40 flex items-center justify-center hover:bg-pink-200 dark:hover:bg-rose-800/40 transition-all duration-300 hover:scale-110 tooltip"
                data-tip="Wishlist"
              >
                <Heart className="w-4 h-4 text-pink-500" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center badge-pulse">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={toggleCart}
                className="relative w-9 h-9 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg shadow-pink-300/40 dark:shadow-rose-900/40 tooltip"
                data-tip="Keranjang"
              >
                <ShoppingBag className="w-4 h-4 text-white" />
                {totalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-600 text-white text-xs rounded-full flex items-center justify-center font-bold badge-pulse">
                    {totalItems()}
                  </span>
                )}
              </button>

              {/* Mobile Menu */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-9 h-9 rounded-full bg-pink-100 dark:bg-rose-900/40 flex items-center justify-center"
              >
                {mobileOpen ? (
                  <X className="w-4 h-4 text-pink-500" />
                ) : (
                  <Menu className="w-4 h-4 text-pink-500" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            mobileOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="navbar-blur bg-white/90 dark:bg-[#1a0a10]/90 px-4 py-4 flex flex-col gap-3 border-t border-pink-100 dark:border-rose-900/30">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-sm font-medium py-2 px-4 rounded-xl transition-colors ${
                  pathname === link.href
                    ? "bg-pink-100 dark:bg-rose-900/40 text-pink-600 dark:text-pink-300"
                    : "text-gray-700 dark:text-rose-100 hover:bg-pink-50 dark:hover:bg-rose-900/20"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Offset for marquee banner */}
      <div className="h-8" />
    </>
  );
}
