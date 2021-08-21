import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store/store";

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
    const url = "https://my-json-server.typicode.com/cyoi0129/json-server/food";
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