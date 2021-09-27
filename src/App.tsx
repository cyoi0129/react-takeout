import { VFC, useEffect, useState } from "react";
import { useAppDispatch } from './store/hooks';
import Cookies from 'js-cookie';
import { getFoodList } from './model/Food';
import { getShopList } from './model/Shop';
import { initUserData } from './model/Login';
import { getOrderList } from "./model/Order";
import { Switch, Route } from "react-router";
import { Home, Menu, Cart, Account, Login, Detail } from "./pages";
import {Header, Footer, ScrollToTop} from "./components";

const App: VFC = () => {
  const dispatch = useAppDispatch();
  const token:number = Cookies.get('token')? Number(Cookies.get('token')) : 0;
  const [userToken] = useState<number>(token);
  useEffect(() => {
    dispatch(getFoodList());
    dispatch(getShopList());
  }, [dispatch]);

  useEffect(() => {
    if (userToken !== 0) {
      dispatch(initUserData(userToken));
      dispatch(getOrderList(userToken));
    }
  }, [userToken, dispatch]);

  return (
    <>
      <ScrollToTop />
      <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/menu" component={Menu} />
          <Route path="/cart" component={Cart} />
          <Route path="/account" component={Account} />
          <Route path="/login" component={Login} />
          <Route path="/detail/:FoodID" component={Detail} />
        </Switch>
      <Footer />
    </>
  );
};

export default App;