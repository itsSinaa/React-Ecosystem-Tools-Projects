import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../features/product/productsSlice";


const store = configureStore({
  reducer: {
    product: productsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDisptach = typeof store.dispatch;

export default store;
