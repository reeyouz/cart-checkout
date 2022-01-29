import React from "react";
import Button from "@mui/material/Button";
import { CartItemList } from "../components";
import { useStore } from "../store";
import { Grid, Typography } from "@mui/material";

export function Cart() {
  const [subTotal, setSubtotal] = React.useState(0);
  const { orders, checkout } = useStore();

  React.useEffect(() => {
    setSubtotal(
      orders.reduce(
        (total, order) => total + order.quantity * order.product.productPrice,
        0
      )
    );
  }, [orders]);

  return (
    <>
      <CartItemList orders={orders}></CartItemList>
      <Typography>SubTotal:&nbsp;{subTotal}/-</Typography>
      <Button onClick={checkout}>Checkout</Button>
    </>
  );
}
