import { VFC } from "react";
import { useAppSelector } from '../store/hooks';
import { selectFood, foodList } from '../model/Food';
import { FoodItem } from '../components';

const Menu: VFC = () => {
  const foodSelector: foodList = useAppSelector(selectFood);
  return (
    <>
      {foodSelector? foodSelector.foodList.map((item,index) => <FoodItem key={index} item={item} />):"No food item."}
    </>
  );
};

export default Menu;