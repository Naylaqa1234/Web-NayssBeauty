"use client";
import { X, ShoppingBag, Trash2, Plus, Minus, Sparkles } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/store";

export default function CartDrawer() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, totalPrice, clearCart } =
    useCartStore();

  return (
    <>
      {/* Overlay */}
      <div
        onClick={toggleCart}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 z-[70] bg-white dark:bg-[#1a0a10] shadow-2xl transition-transform duration-500 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-pink-100 dark:border-rose-900/30">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-pink-500" />
            <h2 className="font-display font-semibold text-lg text-gray-800 dark:text-rose-50">
              Keranjang Belanja
            </h2>
            {items.length > 0 && (
              <span className="bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">
                {items.length}
              </span>
            )}
          </div>
          <button
            onClick={toggleCart}
            className="w-8 h-8 rounded-full bg-pink-100 dark:bg-rose-900/40 flex items-center justify-center hover:bg-pink-200 transition-colors"
          >
            <X className="w-4 h-4 text-pink-500" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-20 h-20 rounded-full bg-pink-50 dark:bg-rose-900/20 flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-pink-300" />
              </div>
              <div>
                <p className="font-medium text-gray-500 dark:text-rose-300">
                  Keranjang masih kosong
                </p>
                <p className="text-sm text-gray-400 dark:text-rose-400 mt-1">
                  Tambahkan produk favoritmu!
                </p>
              </div>
              <button
                onClick={toggleCart}
                className="px-6 py-2 bg-gradient-to-r from-pink-400 to-rose-500 text-white rounded-full text-sm font-medium hover:shadow-lg hover:shadow-pink-300/40 transition-all"
              >
                Mulai Belanja
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 p-3 rounded-2xl bg-pink-50 dark:bg-rose-900/20 border border-pink-100 dark:border-rose-900/30"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-white flex-shrink-0">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-rose-50 truncate">
                    {item.title}
                  </p>
                  <p className="text-pink-500 dark:text-pink-300 font-semibold text-sm">
                    ${item.price}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-full bg-pink-200 dark:bg-rose-800 flex items-center justify-center hover:bg-pink-300 transition-colors"
                    >
                      <Minus className="w-3 h-3 text-pink-600 dark:text-rose-200" />
                    </button>
                    <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-full bg-pink-200 dark:bg-rose-800 flex items-center justify-center hover:bg-pink-300 transition-colors"
                    >
                      <Plus className="w-3 h-3 text-pink-600 dark:text-rose-200" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="self-start p-1.5 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-rose-400" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-pink-100 dark:border-rose-900/30 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-rose-300">Total</span>
              <span className="font-display font-bold text-xl gradient-text">
                ${totalPrice().toFixed(2)}
              </span>
            </div>
            <button className="w-full py-3 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 text-white rounded-2xl font-semibold hover:shadow-xl hover:shadow-pink-300/40 dark:hover:shadow-rose-900/40 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2 shimmer-effect">
              <Sparkles className="w-4 h-4" />
              Checkout Sekarang
            </button>
            <button
              onClick={clearCart}
              className="w-full py-2 text-sm text-gray-400 hover:text-rose-400 transition-colors"
            >
              Kosongkan Keranjang
            </button>
          </div>
        )}
      </div>
    </>
  );
}
