import React from "react";
import Grid from "@mui/material/Grid";
import { Product as TProduct } from "../../types";
import { Product } from "..";

export interface ProductListProps {
  products: TProduct[];
  onAddToCard: (productId: TProduct) => void;
}
export function ProductList(props: ProductListProps) {
  const { products = [], onAddToCard } = props;
  const mappedProducts = products.map((product) => {
    const onClick = () => onAddToCard(product);
    return (
      <Grid item xs={4} key={product.productId}>
        <Product
          productId={product.productId}
          productImageURL={product.productImageURL}
          productName={product.productName}
          productPrice={product.productPrice}
          onAddToCard={onClick}
        />
      </Grid>
    );
  });
  return (
    <Grid container spacing={{ xs: 1, md: 3 }}>
      {mappedProducts}
    </Grid>
  );
}
