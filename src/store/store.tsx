import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./categories"
import productsSlice from "./products";
import userSlice from "./user";

import cartSlice from "./cart";
const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    products: productsSlice,
    cart: cartSlice,
    user: userSlice,
  },
  devTools: true,
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

