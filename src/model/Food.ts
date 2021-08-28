import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { apiURL } from "../config";

export type foodItem = {
  id: number,
  name: string,
  image: string,
  price: number
};

export type foodList = {
  foodList: foodItem[];
}

const initialState: foodList = {
  foodList: [],
};

export const getFoodList = createAsyncThunk(
  "food/getFoodList",
  async () => {
    const url = apiURL + "food";
    const response = await fetch(url).then((res) => res.json());
    return response;
  }
);

const foodSlice = createSlice({
  name: "food",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
      builder.addCase(getFoodList.fulfilled, (state, action) => {
        state.foodList = action.payload;
      });
  }
});

export default foodSlice.reducer;
export const selectFood = (state: RootState) => state.food;