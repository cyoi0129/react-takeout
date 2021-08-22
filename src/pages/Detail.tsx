import { VFC } from "react";
import { useAppSelector } from '../store/hooks';
import { useRouteMatch } from "react-router";
import { selectFood, foodList } from '../model/Food';
import { FoodItemOrder } from "../components";
import { Container, makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: 96,
      paddingBottom: 96,
      paddingLeft: 16,
      paddingRight: 16,
    },
  }),
);

const Detail: VFC = () => {
  const match = useRouteMatch();
  const classes = useStyles();
  const { FoodID } = match.params as { FoodID: string };
  const DetailID = Number(FoodID);
  const foodSelector: foodList = useAppSelector(selectFood);
  const foodData = foodSelector.foodList.find(item => item.id === DetailID);
  return (
    <Container className={classes.root}>
      {foodData? <FoodItemOrder key={DetailID} item={foodData} /> : 'No Item'}
    </Container>
  );
};

export default Detail;