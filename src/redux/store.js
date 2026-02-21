import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/cartSlice"

export const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
})

store.subscribe(() => {
  const state = store.getState();
  const cartItems = state.cart.items;

  localStorage.setItem("cart", JSON.stringify(cartItems));
});
