"use client";
import Image from "next/image";
import { useState } from "react";
import { ShoppingBag, Heart, Star, Eye, Zap } from "lucide-react";
import { useCartStore, useWishlistStore } from "@/store";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem } = useCartStore();
  const { toggle, has } = useWishlistStore();
  const isWishlisted = has(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  return (
    <div
      className="card-elevation group relative bg-white dark:bg-[#1e0d16] rounded-3xl overflow-hidden border border-pink-100 dark:border-rose-900/30"
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Discount Badge */}
      {product.discountPercentage > 0 && (
        <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs px-2.5 py-1 rounded-full font-semibold badge-pulse">
          -{Math.round(product.discountPercentage)}%
        </div>
      )}

      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          toggle(product.id);
        }}
        className={`absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
          isWishlisted
            ? "bg-rose-500 text-white scale-110"
            : "bg-white/80 dark:bg-rose-900/60 text-gray-400 hover:text-rose-400 hover:bg-white dark:hover:bg-rose-900/80"
        }`}
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
      </button>

      {/* Image */}
      <div className="img-zoom relative aspect-square bg-gradient-to-br from-pink-50 to-rose-100 dark:from-rose-900/20 dark:to-pink-900/20">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 25vw"
        />

        {/* Hover overlay with actions */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center pb-4 gap-3 transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={handleAddToCart}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
              addedToCart
                ? "bg-green-500 text-white scale-105"
                : "bg-white text-pink-600 hover:bg-pink-500 hover:text-white"
            }`}
          >
            {addedToCart ? (
              <>
                <Zap className="w-3 h-3" /> Ditambahkan!
              </>
            ) : (
              <>
                <ShoppingBag className="w-3 h-3" /> Tambah
              </>
            )}
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white/80 text-gray-700 hover:bg-white transition-all duration-300">
            <Eye className="w-3 h-3" /> Detail
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-pink-400 dark:text-pink-300 font-medium uppercase tracking-wide mb-1">
          {product.brand}
        </p>
        <h3 className="text-sm font-semibold text-gray-800 dark:text-rose-50 line-clamp-2 mb-2 group-hover:text-pink-600 dark:group-hover:text-pink-300 transition-colors">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-3 h-3 ${
                  star <= Math.round(product.rating)
                    ? "star-fill fill-current"
                    : "text-gray-300 fill-current"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400 dark:text-rose-400">
            ({product.rating})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-lg gradient-text">
            ${discountedPrice.toFixed(2)}
          </span>
          {product.discountPercentage > 0 && (
            <span className="text-sm text-gray-400 line-through">${product.price}</span>
          )}
        </div>

        {/* Stock indicator */}
        <div className="mt-2">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Stok</span>
            <span>{product.stock} tersisa</span>
          </div>
          <div className="h-1.5 bg-pink-100 dark:bg-rose-900/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-400 to-rose-400 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((product.stock / 100) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Mobile Add to Cart */}
        <button
          onClick={handleAddToCart}
          className={`mt-3 w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 sm:hidden ${
            addedToCart
              ? "bg-green-500 text-white"
              : "bg-gradient-to-r from-pink-400 to-rose-400 text-white hover:shadow-lg hover:shadow-pink-300/40"
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          {addedToCart ? "Ditambahkan!" : "Tambah ke Keranjang"}
        </button>
      </div>
    </div>
  );
}
