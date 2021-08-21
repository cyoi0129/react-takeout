import { useState, FC } from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { foodItem } from "../model/Food";
import { addCartItem, changeCartItem, orderFood, selectCart, cartData } from "../model/Order";
import { changeNavigation } from "../model/Navigator";
import { Loading } from '.';
import { makeStyles, createStyles, Theme, Typography, MenuItem, FormControl, Select, Button, Card, CardActionArea, CardActions, CardContent, CardMedia } from '@material-ui/core';

export type Props = {
  item: foodItem;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
      margin: theme.spacing(2),
    },
    media: {
      height: 240,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
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
    formControl: {
      margin: theme.spacing(0),
      minWidth: 120,
    },
    button: {
      width: 100
    }
  }),
);

const FoodItemOrder: FC<Props> = (Props) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { item } = Props;
  const formatter = new Intl.NumberFormat('ja-JP');
  const jpPrice = formatter.format(item.price);
  const classes = useStyles();

  const cartSelector: cartData = useAppSelector(selectCart);
  const addedItem = cartSelector.items.find(cartItem => cartItem.item.id === item.id);
  const cartItemAmount: number = addedItem ? addedItem.amount : 0;
  const [amount, setAmount] = useState(cartItemAmount);
  const [loading, setLoading] = useState(false);

  const handleChange = (event: any) => {
    setAmount(() => event.target.value);
  }

  const addOrder = () => {
    const cartData: orderFood = {
      item: item,
      amount: amount
    }
    dispatch(addCartItem(cartData));
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      dispatch(changeNavigation(3));
      history.push("/cart");
    }, 2000);
  }

  const changeOrder = () => {
    const cartData: orderFood = {
      item: item,
      amount: amount
    }
    dispatch(changeCartItem(cartData));
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      dispatch(changeNavigation(3));
      history.push("/cart");
    }, 2000);
  }

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={`../images/${item.image}`}
            title={item.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {item.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {`¥${jpPrice}`}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            <Typography variant="body2" style={{ cursor: 'pointer' }}>
              <FormControl className={classes.formControl}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={amount}
                  onChange={handleChange}
                >
                  {[...Array(10)].map((_, i) =>
                    <MenuItem value={i + 1}>{i + 1}</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Typography>
          </Button>
          {cartItemAmount === 0 ? <Button size="small" className={classes.button} variant="contained" color="primary" onClick={addOrder}>Add</Button> : <Button size="small" className={classes.button} variant="contained" color="secondary" onClick={changeOrder}>Change</Button>}
        </CardActions>
      </Card>
      <Loading show={loading} />
    </>
  );
}

export default FoodItemOrder;