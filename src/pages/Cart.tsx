import { VFC, useState, ChangeEvent, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { changeNavigation } from '../model/Navigator';
import { loginStatus, selectLogin } from "../model/Login";
import { selectShop, shopList } from "../model/Shop";
import { orderFood, selectCart, cartData, addOrderItem, orderItem } from "../model/Order";
import { CartItem, Loading } from '../components';
import { makeStyles, createStyles, Theme, Button, Typography, Select, MenuItem, FormControl, Container, Divider, Radio, RadioGroup, FormControlLabel, FormLabel, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      paddingTop: 96,
      paddingBottom: 96,
      paddingLeft: 16,
      paddingRight: 16,
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
    },
    border: {
      marginTop: 32,
    },
    payment: {
      marginTop: 32,
      margintBottom: 16,
    },
    selectItem: {
      marginTop: 16,
      marginBottom: 16,
    },
    selectLabel: {
      width: 160,
      paddingTop:8,
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
  const [receipt, setReceipt] = useState("");
  const [payment, setPayment] = useState("shop");
  const [loading, setLoading] = useState(false);

  const shopChange = (event: any) => {
    setShop(() => event.target.value);
  };

  const receiptChange = (event: any) => {
    setReceipt(() => event.target.value);
  };

  const handlePayment = (event: ChangeEvent<HTMLInputElement>) => {
    setPayment((event.target as HTMLInputElement).value);
  };

  const checkOut = () => {
    let orderTime: string = getNowYMDhmsStr();
    let newTotal: number = 0;
    cartItems.forEach(item => newTotal += item.item.price * item.amount);
    const newOrder: orderItem = {
      id: 0,
      time: orderTime,
      receipt: receipt,
      payment: payment === "online" ? true : false,
      ready: false,
      user: userID,
      shop: shop,
      total: cartTotal,
      items: cartItems

    }
    dispatch(addOrderItem(newOrder));
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      dispatch(changeNavigation(1));
      history.push("/account");
    }, 2000);
  }

  const goToLogin = () => {
    dispatch(changeNavigation(0));
    history.push("/login");
  }

  const getNowYMDhmsStr = () => {
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



  const selection = () => {
    const date = new Date();
    let timeSelection: string[] = [];
    let currentMinute = Math.floor(date.getMinutes() / 10) + 2;
    for (let i = 0; i < 10; i++) {
      currentMinute++;
      const newMinute: string = ("00" + (currentMinute % 6 * 10)).slice(-2);
      const newHour: string = ("00" + (date.getHours() + Math.floor(currentMinute / 6))).slice(-2);
      timeSelection = [...timeSelection, newHour + ':' + newMinute];
    }
    return timeSelection;
  }

  return (
    <Container className={classes.root}>
      <Grid container className={classes.selectItem}>
        <Grid item><Typography variant="body2" className={classes.selectLabel}>Choose a store</Typography></Grid>
        <Grid item><Typography variant="h5" style={{ cursor: 'pointer' }}>
          <FormControl className={classes.formControl}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={shop}
              onChange={shopChange}
            >
              {shopList !== [] ? shopList.map((shopItem, index) =>
                <MenuItem key={index} value={shopItem.id}>{shopItem.name}</MenuItem>
              ) : <MenuItem value='0'>No available shop</MenuItem>}
            </Select>
          </FormControl>
        </Typography></Grid>
      </Grid>
      <Grid container className={classes.selectItem}>
        <Grid item><Typography variant="body2" className={classes.selectLabel}>Choose receipt time</Typography></Grid>
        <Grid item><Typography variant="h5" style={{ cursor: 'pointer' }}>
          <FormControl className={classes.formControl}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={receipt}
              onChange={receiptChange}
            >
              {selection().map((receiptTime, index) =>
                <MenuItem key={index} value={receiptTime}>{receiptTime}</MenuItem>
              )}
            </Select>
          </FormControl>
        </Typography></Grid>
      </Grid>
      <FormControl component="fieldset" className={classes.payment}>
        <FormLabel component="legend">Payment</FormLabel>
        <RadioGroup aria-label="payment" name="payment" value={payment} onChange={handlePayment}>
          <FormControlLabel value="shop" control={<Radio color="primary" />} label="Pay in shop" />
          <FormControlLabel value="online" control={<Radio color="primary" />} label="Pay online" />
        </RadioGroup>
      </FormControl>

      {cartItems.length !== 0 ?
        <>
          {cartItems.map((item, index) => <CartItem key={index} item={item} />)}
          <Divider variant="middle" className={classes.border} />
        </>
        : null}
      <Typography className={classes.total} variant="h5">{`Total: ¥${formatter.format(cartTotal)}`}</Typography>
      {loginStatus && cartItems.length !== 0 ? <Button className={classes.button} variant="contained" color="primary" onClick={checkOut}>Order</Button> : null}
      {!loginStatus ? <Button className={classes.button} variant="contained" color="primary" onClick={goToLogin}>Login</Button> : null}
      <Loading show={loading} />
    </Container>
  );
};

export default Cart;