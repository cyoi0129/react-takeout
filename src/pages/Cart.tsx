import { VFC, useState, useEffect, ChangeEvent, SyntheticEvent } from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { changeNavigation } from '../model/Navigator';
import { loginStatus, selectLogin } from "../model/Login";
import { selectShop, shopList } from "../model/Shop";
import { orderFood, selectCart, cartData, addOrderItem, orderItem } from "../model/Order";
import { CartItem, Loading } from '../components';
import { makeStyles, createStyles, Theme, Button, Typography, Select, MenuItem, FormControl, Container, Divider, Radio, RadioGroup, FormControlLabel, FormLabel, Grid, Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

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
    paymentInfo: {
      marginTop: 8,
      marginLeft: 16,
    },
    paymentButton: {
      marginTop: 16,
      width: 240,
    },
    selectItem: {
      marginTop: 16,
      marginBottom: 16,
    },
    selectLabel: {
      width: 160,
      paddingTop: 8,
    },
    snackbar: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Cart: VFC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const classes = useStyles();
  const formatter = new Intl.NumberFormat('ja-JP');
  const cartSelector: cartData = useAppSelector(selectCart);
  const loginSelector: loginStatus = useAppSelector(selectLogin);
  const shopSelector: shopList = useAppSelector(selectShop);
  const shopList = shopSelector.shopList;
  const loginStatus = loginSelector.isLogined;
  const userID: number = loginSelector.id ? loginSelector.id : 0;
  const paymentInfo: string = loginSelector.cardNumber;
  const cartItems: orderFood[] = cartSelector.items;
  const cartTotal: number = cartSelector.total;
  const [shop, setShop] = useState<number>(cartSelector.shop);
  const [pickup, setPickup] = useState<string>("ASAP");
  const [payment, setPayment] = useState<string>("shop");
  const [loading, setLoading] = useState<boolean>(false);
  const [snackBar, setSnackBar] = useState<boolean>(false);

  const shopChange = (event: any) => {
    setShop(() => event.target.value);
  };

  const pickupChange = (event: any) => {
    setPickup(() => event.target.value);
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
      pickup: pickup,
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
      setSnackBar(true);
    }, 2000);
    setTimeout(() => {
      setSnackBar(false);
      dispatch(changeNavigation(1));
      history.push("/account");
    }, 3000);
  }

  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBar(false);
  };

  const goToLogin = () => {
    dispatch(changeNavigation(1));
    history.push("/login");
  }

  const goToAccount = () => {
    dispatch(changeNavigation(1));
    history.push("/account");
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

  const getCurrentTime = () => {
    const date = new Date();
    const currentHour: number = date.getHours();
    const currentMinute: number = date.getMinutes();
    const currentTime = {
      h: currentHour,
      m: currentMinute
    }
    return currentTime;
  }

  const selection = () => {
    const currentTime = getCurrentTime();
    let startMinute = Math.floor(currentTime.m / 10) + 2;
    const outOrder: boolean = (currentTime.h < 8) || (currentTime.h > 21) || (currentTime.h > 20 && currentTime.m > 40) || (currentTime.h < 9 && currentTime.m < 10);
    let timeSelection: string[] = outOrder ? ['Not available'] : ['ASAP'];
    for (let i = 0; i < 10; i++) {
      startMinute++;
      const tempMinute: number = startMinute % 6 * 10;
      const tempHour: number = currentTime.h + Math.floor(startMinute / 6);
      if ((tempHour === 22 && tempMinute === 0) || (tempHour > 10 && tempHour < 22)) {
        const newMinute: string = ("00" + tempMinute).slice(-2);
        const newHour: string = ("00" + tempHour).slice(-2);
        timeSelection = [...timeSelection, newHour + ':' + newMinute];
      }
    }
    return timeSelection;
  }

  useEffect(() => {
    const currentTime = getCurrentTime();
    if ((currentTime.h < 8) || (currentTime.h > 21) || (currentTime.h > 20 && currentTime.m > 40) || (currentTime.h < 9 && currentTime.m < 10)) {
      setPickup(() => "Not available")
    }
  }, [])

  return (
    <Container className={classes.root}>
      <Typography variant="h4" component="h2" gutterBottom>Cart</Typography>
      <Grid container className={classes.selectItem}>
        <Grid item><Typography variant="body2" className={classes.selectLabel}>Choose a store</Typography></Grid>
        <Grid item><Typography variant="h5" style={{ cursor: 'pointer' }}>
          <FormControl className={classes.formControl}>
            <Select value={shop} onChange={shopChange}>
              {shopList !== [] ? shopList.map((shopItem, index) =>
                <MenuItem key={index} value={shopItem.id}>{shopItem.name}</MenuItem>
              ) : <MenuItem value='0'>No available shop</MenuItem>}
            </Select>
          </FormControl>
        </Typography></Grid>
      </Grid>
      <Grid container className={classes.selectItem}>
        <Grid item><Typography variant="body2" className={classes.selectLabel}>Choose pickup time</Typography></Grid>
        <Grid item><Typography variant="h5" style={{ cursor: 'pointer' }}>
          <FormControl className={classes.formControl}>
            <Select value={pickup} onChange={pickupChange}>
              {selection().map((pickupTime, index) =>
                <MenuItem key={index} value={pickupTime}>{pickupTime}</MenuItem>
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
      {payment === "online" ?
        paymentInfo === "" ?
          <div className={classes.paymentInfo}>
            <Typography variant="body2">No available payment method</Typography>
            <Button className={classes.paymentButton} variant="contained" color="secondary" onClick={goToAccount}>Add a payment method</Button>
          </div>
          :
          <div className={classes.paymentInfo}>
            <Typography variant="body2">Card: {paymentInfo.slice(0, 12) + "xxxx"}</Typography>
          </div>
        :
        null
      }

      {cartItems.length !== 0 ?
        <>
          {cartItems.map((item, index) => <CartItem key={index} item={item} />)}
          <Divider variant="middle" className={classes.border} />
        </>
        : null}
      <Typography className={classes.total} variant="h5">{`Total: ¥${formatter.format(cartTotal)}`}</Typography>
      {loginStatus ? <Button className={classes.button} variant="contained" color="primary" onClick={checkOut} disabled={cartItems.length === 0 || (payment === "online" && paymentInfo === "")}>Order</Button> : null}
      {!loginStatus ? <Button className={classes.button} variant="contained" color="primary" onClick={goToLogin}>Login</Button> : null}
      <Loading show={loading} />
      <div className={classes.snackbar}>
        <Snackbar open={snackBar} autoHideDuration={3000} onClose={handleClose}>
          <Alert severity="success">Order Sucessed!</Alert>
        </Snackbar>
      </div>
    </Container>
  );
};

export default Cart;