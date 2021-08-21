import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store/store";

export type loginStatus = {
  isLogined: boolean;
  isLoginFailed: boolean;
  id: number | null;
  name: string;
  email: string;
  password: string;
};

export type userData = {
  id: number | null;
  name: string;
  email: string;
  password: string;
}

const initialState: loginStatus = {
  isLogined: false,
  isLoginFailed: false,
  id: null,
  name: "",
  email: "",
  password: ""
};

const failedLoginUser: userData = {
  id: 0,
  name: "",
  email: "",
  password: ""
}

export const getUserData = createAsyncThunk(
  "login/getUserData",
  async (requestUserName: string) => {
    const url = "https://my-json-server.typicode.com/cyoi0129/json-server/user";
    const response = await fetch(url).then((res) => res.json());
    const targetUser = response.find((item: userData) => item.name === requestUserName);
    const resultUser = targetUser ? targetUser : failedLoginUser;
    return resultUser;
  }
);

export const createNewUser = createAsyncThunk(
  "login/createNewUser",
  async (newUserData: userData) => {
    const response = await fetch('https://my-json-server.typicode.com/cyoi0129/json-server/user', {
      method: 'POST',
      body: JSON.stringify({
        name: newUserData.name,
        email: newUserData.email,
        password: newUserData.password
      }),
      headers: new Headers({ 'Content-type': 'application/json' })

    }).then((res) => res.json());
    return response;
  }
);

export const editUser = createAsyncThunk(
  "login/editUser",
  async (editUserData: userData) => {
    await fetch(`https://my-json-server.typicode.com/cyoi0129/json-server/user/${editUserData.id}`, {
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
      state.isLogined = true;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;

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
      }
    });
    builder.addCase(createNewUser.fulfilled, (state, action) => {
      state.isLogined = true;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
    });
  }
});

export default loginSlice.reducer;
export const selectLogin = (state: RootState) => state.login;
export const { editUserData } = loginSlice.actions;
