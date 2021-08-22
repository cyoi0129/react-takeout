import { VFC } from "react";
import { useAppSelector } from '../store/hooks';
import { selectFood, foodList } from '../model/Food';
import { selectShop, shopList } from '../model/Shop';
import { FoodItem, ShopItem } from '../components';
import { Container, Typography, makeStyles, createStyles, Theme, Grid, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: 96,
      paddingBottom: 96,
    },
    border: {
      marginTop: 32,
      marginBottom: 32,
    },
    shops: {
      flexGrow: 1,
      justifyContent: 'center',
    }
  }),
);

const Home: VFC = () => {
  const classes = useStyles();
  const foodSelector: foodList = useAppSelector(selectFood);
  const shopSelector: shopList = useAppSelector(selectShop);
  return (
    <Container className={classes.root}>
      <Typography variant="h4" component="h2" gutterBottom>Foods</Typography>
      {foodSelector ? foodSelector.foodList.map((item, index) => <FoodItem key={index} item={item} />) : null}
      <Divider variant="middle" className={classes.border} />
      <Typography variant="h4" component="h2" gutterBottom>Shops</Typography>
      <Grid container className={classes.shops}>
          {shopSelector ? shopSelector.shopList.map((shop, index) => <Grid key={index} item><ShopItem item={shop} /></Grid>) : null}
      </Grid>
    </Container>
  );
};

export default Home;
