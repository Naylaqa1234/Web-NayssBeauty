export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface BeautyTip {
  id: number;
  title: string;
  description: string;
  category: string;
  icon: string;
  gradient: string;
}

export interface CartItem extends Product {
  quantity: number;
}
