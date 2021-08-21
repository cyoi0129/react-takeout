import { VFC } from "react";
import { useAppSelector } from '../store/hooks';
import { useParams, useRouteMatch } from "react-router";
import { selectFood, foodList, foodItem } from '../model/Food';
import { FoodItem } from '../components';
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