import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loginReducer from "../model/Login";
import foodReducer from "../model/Food";
import shopReducer from "../model/Shop";
import navigatorReducer from "../model/Navigator";
import orderReducer from "../model/Order"

export const store = configureStore({
  reducer: {
    login: loginReducer,
    food: foodReducer,
    shop: shopReducer,
    order: orderReducer,
    navigator: navigatorReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
