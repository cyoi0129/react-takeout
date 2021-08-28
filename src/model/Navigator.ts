import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

const initialState = {
  currentPage: 0
}

const navigatorSlice = createSlice({
  name: "navigator",
  initialState: initialState,
  reducers: {
    changeNavigation: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    }
  }
});

export default navigatorSlice.reducer;
export const selectNavigation = (state: RootState) => state.navigator;
export const { changeNavigation } = navigatorSlice.actions;
