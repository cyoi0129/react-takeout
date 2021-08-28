import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { apiURL } from "../config";

export interface userData {
  id: number | null;
  name: string;
  email: string;
  password: string;
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvc: string;
}

export interface loginStatus extends userData {
  isLogined: boolean;
  isLoginFailed: boolean;
};


const initialState: loginStatus = {
  isLogined: false,
  isLoginFailed: false,
  id: null,
  name: "",
  email: "",
  password: "",
  cardNumber: "",
  cardName: "",
  cardExpiry: "",
  cardCvc: "",
};

const failedLoginUser: userData = {
  id: 0,
  name: "",
  email: "",
  password: "",
  cardNumber: "",
  cardName: "",
  cardExpiry: "",
  cardCvc: "",
}

export const getUserData = createAsyncThunk(
  "login/getUserData",
  async (requestUserName: string) => {
    const url = apiURL + "user";
    const response = await fetch(url).then((res) => res.json());
    const targetUser = response.find((item: userData) => item.name === requestUserName);
    const resultUser = targetUser ? targetUser : failedLoginUser;
    return resultUser;
  }
);

export const createNewUser = createAsyncThunk(
  "login/createNewUser",
  async (newUserData: userData) => {
    const response = await fetch(apiURL + "user", {
      method: 'POST',
      body: JSON.stringify({
        name: newUserData.name,
        email: newUserData.email,
        password: newUserData.password,
        cardNumber: newUserData.cardNumber,
        cardName: newUserData.cardName,
        cardExpiry: newUserData.cardExpiry,
        cardCvc: newUserData.cardCvc,
      }),
      headers: new Headers({ 'Content-type': 'application/json' })

    }).then((res) => res.json());
    return response;
  }
);

export const editUser = createAsyncThunk(
  "login/editUser",
  async (editUserData: userData) => {
    await fetch(`${apiURL}user/${editUserData.id}`, {
      method: 'PUT',
      body: JSON.stringify(editUserData),
      headers: new Headers({ 'Content-type': 'application/json' })
    })
    return editUserData;
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    editUserData: (state, action: PayloadAction<userData>) => {
      const newState = {isLogined: true, isLoginFailed: false}
      state = Object.assign(newState, action.payload);
    },
    removeUserData: (state) => {
      state.isLogined = false;
      state.name = "";
      state.email = "";
      state.password = "";
      state.cardNumber = "";
      state.cardName = "";
      state.cardExpiry = "";
      state.cardCvc = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserData.fulfilled, (state, action) => {
      if (action.payload.id === 0) {
        state.isLogined = false;
        state.isLoginFailed = true;
      } else {
        state.isLogined = true;
        state.isLoginFailed = false;
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.password = action.payload.password;
        state.cardNumber = action.payload.cardNumber;
        state.cardName = action.payload.cardName;
        state.cardExpiry = action.payload.cardExpiry;
        state.cardCvc = action.payload.cardCvc;
      }
    });
    builder.addCase(createNewUser.fulfilled, (state, action) => {
      state.isLogined = true;
      state.isLoginFailed = false;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.cardNumber = action.payload.cardNumber;
      state.cardName = action.payload.cardName;
      state.cardExpiry = action.payload.cardExpiry;
      state.cardCvc = action.payload.cardCvc;
    });
  }
});

export default loginSlice.reducer;
export const selectLogin = (state: RootState) => state.login;
export const { editUserData, removeUserData } = loginSlice.actions;
