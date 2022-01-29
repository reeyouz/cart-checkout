import { Grid } from "@mui/material";
import React from "react";
import "./App.css";
import { Cart, Checkout } from "./pages";
import { StoreProvider } from "./store";

function App() {
  return (
    <StoreProvider initialValue={[]}>
      <Grid
        container
        spacing={{ xs: 1, md: 3 }}
        style={{ height: "100vh", overflow: "scroll" }}
      >
        <Grid item xs={8} style={{ overflow: "scroll", height: "100vh" }}>
          <Checkout />
        </Grid>
        <Grid item xs={4} style={{ height: "100vh" }}>
          <Cart />
        </Grid>
      </Grid>
    </StoreProvider>
  );
}

export default App;
