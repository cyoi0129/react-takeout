import { VFC, useState } from "react";
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { useHistory } from 'react-router-dom';
import { changeNavigation, selectNavigation } from '../model/Navigator';
import { selectCart } from '../model/Order';
import { makeStyles, createStyles, Theme, BottomNavigation, BottomNavigationAction, Badge } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      background: "#efefef",
      position: "fixed",
      width: "100%",
      bottom: 0,
      paddingBottom: 32,
      zIndex: 10,
    },
  }),
);

const Footer: VFC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const currentPage: number = useAppSelector(selectNavigation).currentPage;
  const cartAmount: number = useAppSelector(selectCart).items.length;
  const [index, setIndex] = useState(currentPage);
  const path = ["/", "/account", "/menu", "cart"];

  return (
    <BottomNavigation
      value={index}
      onChange={(event, newIndex) => {
        setIndex(newIndex);
        dispatch(changeNavigation(newIndex));
        history.push(path[newIndex]);
      }}
      showLabels
      className={classes.footer}
    >
      <BottomNavigationAction label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction label="Account" icon={<PersonIcon />} />
      <BottomNavigationAction label="Menu" icon={<FastfoodIcon />} />
      <BottomNavigationAction label="Cart" icon={
        cartAmount === 0 ?
          <ShoppingCartIcon /> :
          <Badge badgeContent={cartAmount} color="secondary"><ShoppingCartIcon /></Badge>
      } />
    </BottomNavigation>
  );
}

export default Footer;