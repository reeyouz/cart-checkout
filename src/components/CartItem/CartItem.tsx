import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Order } from "../../types";

export function CartItem(props: { order: Order }) {
  const { order } = props;
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{order.product.productName}</Typography>
        <Typography>
          {order.product.productPrice}&nbsp;*&nbsp;{order.quantity}&nbsp;=&nbsp;
          {order.quantity * order.product.productPrice}/-
        </Typography>
      </CardContent>
    </Card>
  );
}
