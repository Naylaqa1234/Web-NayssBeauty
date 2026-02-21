import Link from "next/link";
import { Sparkles, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-pink-100 dark:from-[#0d0610] dark:to-[#12080e]">
      <div className="text-center">
        <div className="text-8xl font-display font-bold gradient-text mb-4">404</div>
        <Sparkles className="w-16 h-16 text-pink-300 mx-auto mb-6 animate-sparkle" />
        <h2 className="text-2xl font-display font-semibold text-gray-800 dark:text-rose-50 mb-3">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-gray-500 dark:text-rose-300/70 mb-8">
          Sepertinya halaman yang kamu cari sudah tidak ada di sini.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-400 to-rose-500 text-white rounded-2xl font-semibold hover:shadow-xl hover:shadow-pink-300/40 transition-all"
        >
          <Home className="w-5 h-5" />
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
