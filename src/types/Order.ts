import { Product } from ".";

export interface Order {
  product: Product;
  quantity: number;
}
