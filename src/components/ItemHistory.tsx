import { VFC, FC } from "react";
import { orderFood } from "../model/Order";
import { makeStyles, createStyles, Theme, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';

export type Props = {
  item: orderFood;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
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
  }),
);

const ItemHistroy: FC<Props> = (Props) => {
  const classes = useStyles();
  const { item } = Props;
  const formatter = new Intl.NumberFormat('ja-JP');
  return (
    <List className={classes.item}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={item.item.name} src={`images/${item.item.image}`} />
        </ListItemAvatar>
        <ListItemText
          primary={item.item.name}
          secondary={`(${item.amount}) ¥ ${formatter.format(item.item.price * item.amount)}`}
        />
      </ListItem>
    </List>
  );
}

export default ItemHistroy;




