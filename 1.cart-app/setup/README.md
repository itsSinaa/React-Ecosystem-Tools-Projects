redux typescript boilerplate setup : 

store.ts```

import { configureStore } from "@reduxjs/toolkit";
import couter from "./starter/09-rtk/appSlice";

const AppStore = configureStore({
  reducer: couter,
});

export type RootState = ReturnType<typeof AppStore.getState>;
export type AppDisptach = typeof AppStore.dispatch;

export default AppStore;

==================================================================================

hooks.ts```

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDisptach } from "./store";

export const useAppDisptach: () => AppDisptach = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> =
  useSelector;

==================================================================================

slice.ts```

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  count: number;
  status: AppStatus;
};

type AppStatus = "Pending" | "Active" | "Inactive";

const initialState: InitialState = {
  count: 0,
  status: "Pending",
};

const appSlice = createSlice({
  name: "couter",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    reset: (state) => {
      state.count = 0;
    },
    changStatus: (state, action: PayloadAction<AppStatus>) => {
      state.status = action.payload;
    },
  },
});

export default appSlice.reducer
export const {changStatus,decrement,increment,reset} = appSlice.actions

==================================================================================

indevitual Components that you need useDisptach or useSelector
for example index.tsx Component

import { changStatus, decrement, increment, reset } from "./appSlice";
import { useAppDisptach, useAppSelector } from "../../hooks";

function Component() {
  const { count, status } = useAppSelector((state) => state);
  const disptach = useAppDisptach()

  return (
    <div>
      <h2>Count: {count}</h2>
      <h2>Status: {status}</h2>

      <div className="btn-container">
        <button onClick={() => disptach(increment())} className="btn">
          Increment
        </button>
        <button onClick={() =>  disptach(decrement())}className="btn">
          Decrement
        </button>
        <button onClick={() =>  disptach(reset())}className="btn">
          Reset
        </button>
      </div>
      <div className="btn-container">
        <button onClick={() =>  disptach(changStatus("Active"))} className="btn">
          Set Status to Active
        </button>
        <button className="btn" onClick={() => disptach(changStatus("Inactive"))}>
          Set Status to Inactive
        </button>
      </div>
    </div>
  );
}
export default Component;

==================================================================================

main.tsx```

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AppStore from "./store.ts";

import { Provider } from "react-redux";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={AppStore}>
    <App />
  </Provider>
);
