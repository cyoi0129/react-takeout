import { FC, Fragment } from "react";
import { useAppSelector } from '../store/hooks';
import { orderItem } from "../model/Order";
import { selectShop, shopList } from '../model/Shop';
import { ItemHistory } from ".";
import { makeStyles, createStyles, Theme, Grid, Typography, Divider } from '@material-ui/core';

export type Props = {
  list: orderItem[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
    },
    link: {
      color: 'gray',
      textDecoration: 'none'
    },
    detail: {
      fontSize: 14,
    },
    item: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    image: {
      width: 128,
      height: 96,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    border: {
      marginBottom: 36,
    }
  }),
);

const OrderHistroy: FC<Props> = (Props) => {
  const classes = useStyles();
  const { list } = Props;
  const formatter = new Intl.NumberFormat('ja-JP');
  const shopSelector: shopList = useAppSelector(selectShop);
  const getShopName = (shopID: number) => {
    const targetShop = shopSelector.shopList.find(shop => shop.id === shopID);
    const shopName = targetShop ? targetShop.name : 'Not available shop';
    return shopName;
  }

  let sortedOrderList: orderItem[] = [...list];
  sortedOrderList.sort(function (a, b) {
    if (a.id < b.id) {
      return 1;
    } else {
      return -1;
    }
  });

  return (
    <>
      <Typography variant="h4" component="h2" gutterBottom>Order History</Typography>
      {sortedOrderList.map((order, key) =>
        <Fragment key={key}>
          <Typography variant="h5" component="h2" gutterBottom>Order No: {order.id}</Typography>
          <Grid container spacing={2} className={classes.detail}>
            <Grid item>
              Time: {order.time}
            </Grid>
            <Grid item>
              Status: {order.ready ? "Ready" : "Cooking"}
            </Grid>
            <Grid item>
              Pickup: {order.pickup}
            </Grid>
            <Grid item>
              Shop: {getShopName(order.shop)}
            </Grid>
            <Grid item>
              Payment: ¥{formatter.format(order.total)}
            </Grid>
            <Grid item>
              Method: {order.payment ? "Pay online" : "Pay in shop"}
            </Grid>
          </Grid>
          {order.items.map((foodItem, index) => <ItemHistory key={index} item={foodItem} />)}
          <Divider className={classes.border} variant="middle" />
        </Fragment>
      )}
    </>
  );
}

export default OrderHistroy;




