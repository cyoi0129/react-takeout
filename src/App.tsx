import { VFC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from './store/hooks';
import Cookies from 'js-cookie';
import { getFoodList } from './model/Food';
import { getShopList } from './model/Shop';
import { selectLogin, loginStatus, initUserData } from './model/Login';
import { getOrderList } from "./model/Order";
import { Switch, Route } from "react-router";
import { Home, Menu, Cart, Account, Login, Detail } from "./pages";
import {Header, Footer, ScrollToTop} from "./components";

const App: VFC = () => {
  const dispatch = useAppDispatch();
  const loginSelector: loginStatus = useAppSelector(selectLogin);
  const token:number = Cookies.get('token')? Number(Cookies.get('token')) : 0;
  const [userToken] = useState<number>(token);
  useEffect(() => {
    dispatch(getFoodList());
    dispatch(getShopList());
  }, [dispatch]);

  useEffect(() => {
    if (userToken !== 0) {
      dispatch(initUserData(userToken));
    }
  }, [userToken]);

  // Remove for Production Env
  useEffect(() => {
    if (loginSelector.id !== null) {
      dispatch(getOrderList(loginSelector.id));
    }
  }, [loginSelector.id, dispatch])

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