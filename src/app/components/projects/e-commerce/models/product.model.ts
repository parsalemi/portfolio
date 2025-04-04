export interface Product{
  id: number;
  name: string;
  description: string;
  category: string;
  brand: string;
  code: string;
  image: string;
  thumbnail: string;
  price: number;
  discount: number;
  stock: number;
  weight: number;
  rating: number;
  tags: string[];
  reviews: {
    name: string;
    rating: number;
  }[];
}

export interface ProductDTO{
  products: Product[];
  total_products: number;
}