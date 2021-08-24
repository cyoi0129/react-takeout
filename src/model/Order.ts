import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store/store";
import { foodItem } from "./Food";

export type orderFood = {
  item: foodItem;
  amount: number;
};

export type orderItem = {
  id: number;
  time: string;
  receipt: string;
  payment: boolean;
  ready: boolean;
  user: number;
  shop: number;
  total: number;
  items: orderFood[];
};

export type cartData = {
  items: orderFood[]|[];
  shop: number;
  total: number;
}

export type orderList = {
  order: orderItem[] | [];
  cart: cartData;
};

const initialState: orderList = {
  order: [],
  cart: {
    items: [],
    shop: 1,
    total: 0
  }
};

export const getOrderList = createAsyncThunk(
  "order/getOrderList",
  async (targetUserID: number) => {
    const url = "https://my-json-server.typicode.com/cyoi0129/json-server/order";
    const response = await fetch(url).then((res) => res.json());
    const targetOrderList = response.filter((item: orderItem) => item.user === targetUserID);
    return targetOrderList;
  }
);

export const addOrderItem = createAsyncThunk(
  "order/addOrderItem",
  async (targetOrderItem: orderItem) => {
    const response = await fetch('https://my-json-server.typicode.com/cyoi0129/json-server/order', {
      method: 'POST',
      body: JSON.stringify({
        ready: targetOrderItem.ready,
        time: targetOrderItem.time,
        receipt: targetOrderItem.receipt,
        payment: targetOrderItem.payment,
        user: targetOrderItem.user,
        shop: targetOrderItem.shop,
        total: targetOrderItem.total,
        items: targetOrderItem.items
      }),
      headers: new Headers({ 'Content-type' : 'application/json' })
    }).then((res) => res.json());
    return response;
  }
)

const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<orderFood>) => {
      state.cart.items = [...state.cart.items, action.payload];
      state.cart.total = calculateTotal(state.cart.items);
    },
    changeCartItem: (state, action: PayloadAction<orderFood>) => {
      if (state.cart.items.find(item => item.item.id === action.payload.item.id)) {
        state.cart.items = state.cart.items.filter(item => item.item.id !== action.payload.item.id);
      }
      state.cart.items = [...state.cart.items, action.payload];
      state.cart.total = calculateTotal(state.cart.items);
    },
    removeCartItem: (state, action: PayloadAction<number>) => {
      if(state.cart.items !== []) {
        state.cart.items = state.cart.items.filter(item => item.item.id !== action.payload);
      }
      state.cart.total = calculateTotal(state.cart.items);
    },
    changeCartShop: (state, action: PayloadAction<number>) => {
      state.cart.shop = action.payload;
    },
    removeOrderData: (state) => {
      state.order = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrderList.fulfilled, (state, action) => {
      state.order = action.payload;
    });
    builder.addCase(addOrderItem.fulfilled, (state, action) => {
      state.order = [...state.order, action.payload];
      state.cart.items = [];
      state.cart.total = 0;
    });
  }
});

const calculateTotal = (cartItems:orderFood[]) => {
  let newTotal: number = 0;
  cartItems.forEach(item => newTotal += item.item.price * item.amount);
  return newTotal;
}

export default orderSlice.reducer;
export const selectOrder = (state: RootState) => state.order;
export const selectCart = (state: RootState) => state.order.cart;
export const { addCartItem, changeCartItem, removeCartItem, changeCartShop, removeOrderData } = orderSlice.actions;
