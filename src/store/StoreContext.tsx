import React, { PropsWithChildren } from "react";
import { Order, Product } from "../types";

type TStoreContext = {
  orders: Order[];
  addToCart: (product: Product) => void;
  checkout: () => Promise<void>;
};
const StoreContext = React.createContext<TStoreContext | undefined>(undefined);

const ADD_PRODUCT = "ADD_PRODUCT";
const RESET_STORE = "RESET_STORE";

type Action =
  | {
      type: typeof ADD_PRODUCT;
      payload: Product;
    }
  | { type: typeof RESET_STORE };
const reducer = (state: Order[] = [], action: Action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      const order = state.find(
        (order) => order.product.productId === action.payload.productId
      );
      let output: Order[];
      if (order === null) {
        output = state.concat([{ product: action.payload, quantity: 1 }]);
      } else {
        output = state
          .filter(
            (order) => order.product.productId !== action.payload.productId
          )
          .concat([
            {
              product: action.payload,
              quantity: order ? order.quantity + 1 : 1,
            },
          ]);
      }
      // console.log({ output });
      return output;
    case "RESET_STORE":
      return [];
    default:
      return state;
  }
};

type StoreProps = PropsWithChildren<{
  initialValue?: Order[];
}>;
export function StoreProvider(props: StoreProps) {
  const { initialValue = [], ...rest } = props;
  const [state, dispatch] = React.useReducer(reducer, initialValue);
  const addToCart = (product: Product) => {
    dispatch({
      type: "ADD_PRODUCT",
      payload: product,
    });
  };
  const resetStore = () => {
    dispatch({ type: "RESET_STORE" });
  };
  const checkout = async () => {
    try {
      await fetch("https://janam.free.beeceptor.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: Date.now(),
          orderTotal: state.reduce(
            (total, order) =>
              total + order.quantity * order.product.productPrice,
            0
          ),
          orders: state,
        }),
      });
      resetStore();
    } catch (error) {
      console.log(error);
    }
  };

  const value = { orders: state, addToCart, checkout };
  return <StoreContext.Provider {...rest} value={value} />;
}

export function useStore() {
  const context = React.useContext(StoreContext);
  if (!context) {
    throw new Error("Cannot use useStore outside of StoreContext");
  }
  return context;
}
