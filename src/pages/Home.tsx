import { VFC } from "react";
import { useAppSelector } from '../store/hooks';
import { selectLogin, loginStatus } from '../model/Login';
import { selectFood, foodList } from '../model/Food';
import { selectShop, shopList } from '../model/Shop';
import { FoodItem, ShopItem } from '../components';
import { Container, Typography, makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: 24,
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
      {foodSelector? foodSelector.foodList.map((item,index) => <FoodItem key={index} item={item} />):"No food item."}
      <Typography variant="h4" component="h2" gutterBottom>Shops</Typography>
      {shopSelector? shopSelector.shopList.map((shop,index) => <ShopItem item={shop} /> ):"No available shop."}
    </Container>
  );
};

export default Home;
