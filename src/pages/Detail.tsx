import { VFC } from "react";
import { useAppSelector } from '../store/hooks';
import { useRouteMatch } from "react-router";
import { selectFood, foodList } from '../model/Food';
import { FoodItemOrder } from "../components";

const Detail: VFC = () => {
  const match = useRouteMatch();
  const { FoodID } = match.params as { FoodID: string };
  const DetailID = Number(FoodID);
  const foodSelector: foodList = useAppSelector(selectFood);
  const foodData = foodSelector.foodList.find(item => item.id === DetailID);
  return (
    <>
      {foodData? <FoodItemOrder key={DetailID} item={foodData} /> : 'No Item'}
    </>
  );
};

export default Detail;