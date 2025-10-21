export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: ProductCategory;
  inStock: boolean;
  rating: number;
  reviews: number;
  specifications?: ProductSpecification[];
  images?: string[];
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export type ProductCategory = 
  | 'electronics'
  | 'clothing'
  | 'books'
  | 'home'
  | 'sports'
  | 'beauty'
  | 'automotive'
  | 'food';

export interface ProductSpecification {
  name: string;
  value: string;
  unit?: string;
}

export interface ProductFilter {
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  minRating?: number;
  search?: string;
}

export interface ProductSort {
  field: 'name' | 'price' | 'rating' | 'createdAt';
  direction: 'asc' | 'desc';
}
