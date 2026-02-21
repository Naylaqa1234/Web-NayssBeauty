import type { Product, ProductsResponse } from "@/types";

const BASE = "https://dummyjson.com";

export async function getBeautyProducts(limit = 12, skip = 0): Promise<ProductsResponse> {
  const res = await fetch(
    `${BASE}/products/category/beauty?limit=${limit}&skip=${skip}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getProductById(id: number): Promise<Product> {
  const res = await fetch(`${BASE}/products/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export async function searchProducts(query: string): Promise<ProductsResponse> {
  const res = await fetch(`${BASE}/products/search?q=${encodeURIComponent(query)}&limit=12`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to search products");
  return res.json();
}

export async function getAllCategories(): Promise<string[]> {
  const res = await fetch(`${BASE}/products/categories`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}
