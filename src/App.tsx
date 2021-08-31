import { VFC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from './store/hooks';
import { getFoodList } from './model/Food';
import { getShopList } from './model/Shop';
import { selectLogin, loginStatus, userData } from './model/Login';
import { getOrderList } from "./model/Order";
import { Switch, Route } from "react-router";
import { Home, Menu, Cart, Account, Login, Detail } from "./pages";
import {Header, Footer, ScrollToTop} from "./components";

const App: VFC = () => {
  const dispatch = useAppDispatch();
  const loginSelector: loginStatus = useAppSelector(selectLogin);
  useEffect(() => {
    dispatch(getFoodList());
    dispatch(getShopList());
  }, [dispatch]);

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