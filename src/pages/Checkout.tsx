import React from "react";
import { ProductList } from "../components";
import { products } from "../consts";
import { useStore } from "../store";
import { Product } from "../types";

export function Checkout() {
  const { addToCart } = useStore();
  const onAddToCart = (product: Product) => {
    addToCart(product);
  };
  return <ProductList products={products} onAddToCard={onAddToCart} />;
}
