import { VFC } from "react";
import { useAppSelector } from '../store/hooks';
import { selectFood, foodList } from '../model/Food';
import { FoodItem } from '../components';
import { Container, Typography, makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: 96,
      paddingBottom: 96,
    },
  }),
);

const Menu: VFC = () => {
  const classes = useStyles();
  const foodSelector: foodList = useAppSelector(selectFood);
  return (
    <Container className={classes.root}>
      <Typography variant="h4" component="h2" gutterBottom>Foods Menu</Typography>
      {foodSelector? foodSelector.foodList.map((item,index) => <FoodItem key={index} item={item} />):<Typography variant="h5" gutterBottom>No food item.</Typography>}
    </Container>
  );
};

export default Menu;