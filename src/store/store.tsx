import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./categories"
import productsSlice from "./products";
import userSlice from "./user";

import cartSlice from "./cart";
export const createStore = () =>{ 
  return configureStore({
  reducer: {
    categories: categoriesSlice,
    products: productsSlice,
    cart: cartSlice,
    user: userSlice,
  },
  devTools: true,
});
}
const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

