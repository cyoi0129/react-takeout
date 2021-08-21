import { useState, FC } from "react";
import { useAppDispatch } from '../store/hooks';
import { orderFood, removeCartItem } from "../model/Order";
import { makeStyles, Theme, createStyles, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Avatar, IconButton, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }),
);

export type Props = {
  item: orderFood;
}

const CartItem: FC<Props> = (Props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { item } = Props;
  const formatter = new Intl.NumberFormat('ja-JP');
  const itemPrice = formatter.format(item.amount * item.item.price);
  const removeOrder = () => {
    dispatch(removeCartItem(item.item.id));
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <div className={classes.demo}>
            <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar alt={item.item.name} src={`images/${item.item.image}`} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.item.name}
                    secondary={`(${item.amount}) ¥ ${itemPrice}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={removeOrder}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default CartItem;