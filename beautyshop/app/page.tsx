// SSG - Static generation for home page hero content
import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BrandValues from "@/components/home/BrandValues";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import TipsPreview from "@/components/home/TipsPreview";
import { getBeautyProducts } from "@/lib/api";

// ISR - revalidate every hour
import type { Product } from "@/types";
export const revalidate = 3600;

export default async function HomePage() {
   let products: Product[] = []; // ← tambah : Product[] di sini
  try {
    const data = await getBeautyProducts(4, 0);
    products = data.products;
  } catch {
    products = [];
  }

  return (
    <div className="overflow-hidden">
      <HeroSection />
      <BrandValues />
      <FeaturedProducts initialProducts={products} />
      <TipsPreview />
      <TestimonialsSection />
    </div>
  );
}
