import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Product as TProduct } from "../../types";

export interface ProductProps extends TProduct {
  onAddToCard: (productId: TProduct) => void;
}
export function Product(props: ProductProps) {
  const { productImageURL, productId, productName, productPrice, onAddToCard } =
    props;
  const onClickHandler = React.useCallback(
    () =>
      onAddToCard({ productImageURL, productId, productName, productPrice }),
    []
  );

  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        width="140"
        image={productImageURL}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {productName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {productPrice}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onClickHandler}>
          Add
        </Button>
      </CardActions>
    </Card>
  );
}
