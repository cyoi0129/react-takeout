import { VFC, FC } from "react";
import { shopItem } from "../model/Shop";
import { makeStyles, createStyles, Theme, Grid, Paper, Typography, ButtonBase } from '@material-ui/core';
import { MapItem } from ".";

export type Props = {
  item: shopItem;
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

const ShopItem: FC<Props> = (Props) => {
  const { item } = Props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" color="textSecondary">{item.name}</Typography>
      <Typography variant="body2" color="textSecondary">{item.address}</Typography>
      <Typography variant="body2" color="textSecondary">Station: {item.station}</Typography>
      <MapItem item={item} />
    </div>
  );
}

export default ShopItem;