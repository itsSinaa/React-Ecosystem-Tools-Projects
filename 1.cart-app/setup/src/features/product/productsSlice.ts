import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./../../types/types";
import { client } from "../../api/query";
import { useAppSelector } from "../../hooks/hooks";
import { string } from "zod";
import { RootState } from "@reduxjs/toolkit/query";

export type UserCartType = {
  id: number;
  qty: number;
};

type TinitialValue = {
  products: Product[];
  userCart: UserCartType[];
  isLoading: boolean;
  error: null | string;
};

const initialState: TinitialValue = {
  error: null,
  isLoading: false,
  products: [],
  userCart: [],
};

export const getAllProduts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("productSlice/getAllProduts", async () => {
  try {
    const res = await client.get("/products");
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      return new Error(error.message);
    }
  }
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    increase: (state, action: PayloadAction<{ id: number }>) => {
      const selectedItem = state.userCart.find(
        (item) => item.id === action.payload.id
      );

      if (!selectedItem) {
        state.userCart.push({ id: action.payload.id, qty: 1 });
      } else {
        selectedItem.qty += 1;
      }
    },
    decrease: (state, action: PayloadAction<{ id: number }>) => {
      const selectedItem = state.userCart.find(
        (item) => item.id === action.payload.id
      );

      if (selectedItem) {
        if (selectedItem.qty > 1) {
          selectedItem.qty -= 1;
        } else {
          state.userCart = state.userCart.filter(
            (item) => item.id !== action.payload.id
          );
        }
      }
    },
    remove: (state, action: PayloadAction<{ id: number }>) => {
      state.userCart = state.userCart.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProduts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllProduts.rejected, (state, action) => {
      state.isLoading = false;
      state.error =
        (action.payload as string) || "network err : Faild to fetch";
    });
    builder.addCase(
      getAllProduts.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.isLoading = false;
        state.products = action.payload;
      }
    );
  },
});

export default productSlice.reducer;
export const { increase, decrease, remove } = productSlice.actions;
