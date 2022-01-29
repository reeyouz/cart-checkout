import { Typography } from "@mui/material";
import React from "react";
import { CartItem } from "..";
import { Order } from "../../types";

export function CartItemList(props: { orders: Order[] }) {
  const { orders } = props;

  return (
    <div style={{ width: "100%" }}>
      {orders.map((order) => (
        <CartItem order={order} key={order.product.productId} />
      ))}
    </div>
  );
}
