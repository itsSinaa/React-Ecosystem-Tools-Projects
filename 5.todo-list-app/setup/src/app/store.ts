import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "../features/todoSlice";

const store = configureStore({
  reducer: {
    todos: todoSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDisptach = typeof store.dispatch;
