import { VFC, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { changeNavigation } from '../model/Navigator';
import { loginStatus, selectLogin } from "../model/Login";
import { selectShop, shopList } from "../model/Shop";
import { orderFood, selectCart, cartData, addOrderItem, orderItem } from "../model/Order";
import { CartItem, Loading } from '../components';
import { makeStyles, createStyles, Theme, Button, Typography, Select, MenuItem, FormControl, Container, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(0),
      minWidth: 120,
    },
    button: {
      margin: 32,
      width: 240,
    },
    total: {
      margin: 24,
    }

  }),
);

const Cart: VFC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const formatter = new Intl.NumberFormat('ja-JP');
  const cartSelector: cartData = useAppSelector(selectCart);
  const loginSelector: loginStatus = useAppSelector(selectLogin);
  const shopSelector: shopList = useAppSelector(selectShop);
  const shopList = shopSelector.shopList;
  const loginStatus = loginSelector.isLogined;
  const userID: number = loginSelector.id ? loginSelector.id : 0;
  const cartItems: orderFood[] = cartSelector.items;
  const cartTotal: number = cartSelector.total;
  const classes = useStyles();
  const [shop, setShop] = useState(cartSelector.shop);
  const [loading, setLoading] = useState(false);

  const shopChange = (event: any) => {
    setShop(() => event.target.value);
  }

  const checkOut = () => {
    let orderTime: string = getNowYMDhmsStr();
    let newTotal: number = 0;
    cartItems.forEach(item => newTotal += item.item.price * item.amount);
    const newOrder: orderItem = {
      id: 0,
      time: orderTime,
      ready: false,
      user: userID,
      shop: shop,
      total: cartTotal,
      items: cartItems

    }
    dispatch(addOrderItem(newOrder));
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
      dispatch(changeNavigation(1));
      history.push("/account");
    },2000);
  }

  const goToLogin = () => {
    dispatch(changeNavigation(0));
    history.push("/login");
  }

  const getNowYMDhmsStr = () => {
    console.log("called");
    const date = new Date();
    const Y: string = String(date.getFullYear());
    const M: string = ("00" + (date.getMonth() + 1)).slice(-2);
    const D: string = ("00" + date.getDate()).slice(-2);
    const h: string = ("00" + date.getHours()).slice(-2);
    const m: string = ("00" + date.getMinutes()).slice(-2);
    const s: string = ("00" + date.getSeconds()).slice(-2);
    const dateTime: string = Y + '/' + M + '/' + D + ' ' + h + ':' + m + ':' + s
    return dateTime;
  }

  return (
    <Container className={classes.root}>
      <Typography variant="h5" style={{ cursor: 'pointer' }}>
        <FormControl className={classes.formControl}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={shop}
            onChange={shopChange}
          >
            {shopList !== [] ? shopList.map((shopItem, index) =>
              <MenuItem value={shopItem.id}>{shopItem.name}</MenuItem>
            ) : <MenuItem value='0'>No available shop</MenuItem>}
          </Select>
        </FormControl>
      </Typography>
      {cartItems.length !== 0 ? cartItems.map((item, index) => <CartItem item={item} />) : null}
      <Divider variant="middle" />
      <Typography className={classes.total} variant="h5">{`Total: ¥${formatter.format(cartTotal)}`}</Typography>
      {loginStatus && cartItems.length !== 0 ? <Button className={classes.button} variant="contained" color="primary" onClick={checkOut}>Order</Button> : null}
      {!loginStatus ? <Button className={classes.button} variant="contained" color="primary" onClick={goToLogin}>Login</Button> : null}
      <Loading show={loading} />
    </Container>
  );
};

export default Cart;