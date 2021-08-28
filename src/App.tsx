import { VFC, useEffect } from "react";
import { useAppDispatch } from './store/hooks';
import { getFoodList } from './model/Food';
import { getShopList } from './model/Shop';
import { Switch, Route } from "react-router";
import { Home, Menu, Cart, Account, Login, Detail } from "./pages";
import {Header, Footer, ScrollToTop} from "./components";

const App: VFC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getFoodList());
    dispatch(getShopList());
  }, [dispatch]);

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