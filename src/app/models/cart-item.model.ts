import { Product } from './product.model';

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  addedAt: Date;
}

export interface CartSummary {
  totalItems: number;
  totalPrice: number;
  items: CartItem[];
}
