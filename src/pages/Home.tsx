import { VFC } from "react";
import { useAppSelector } from '../store/hooks';
import { selectFood, foodList } from '../model/Food';
import { selectShop, shopList } from '../model/Shop';
import { FoodItem, ShopItem } from '../components';
import { Container, Typography, makeStyles, createStyles, Theme, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: 96,
      paddingBottom: 96,
    },
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
      <Typography variant="h4" component="h2" gutterBottom>Shops</Typography>
      <Grid container>
        <Grid item>
          {shopSelector ? shopSelector.shopList.map((shop, index) => <ShopItem key={index} item={shop} />) : null}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
