import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { apiURL } from "../config";

export type shopItem = {
  id: number,
  name: string,
  station: string,
  address: string,
  lat: number,
  lng: number
};

export type shopList = {
  shopList: shopItem[];
}

const initialState: shopList = {
  shopList: [],
};

export const getShopList = createAsyncThunk(
  "shop/getShopList",
  async () => {
    const url = apiURL + "shop";
    const response = await fetch(url).then((res) => res.json());
    return response;
  }
);

const shopSlice = createSlice({
  name: "shop",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
      builder.addCase(getShopList.fulfilled, (state, action) => {
        state.shopList = action.payload;
      });
  }
});

export default shopSlice.reducer;
export const selectShop = (state: RootState) => state.shop;