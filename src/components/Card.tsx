import { FC, useRef, useEffect, useState, useCallback } from "react";
import { userData } from '../model/Login';
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { makeStyles, Theme, Box, Typography } from '@material-ui/core';

export type Props = {
  userData: userData;
  setUserData: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    maxWidth: 320,
    padding: theme.spacing(2),
  },
  form: {
    marginTop: 32,
    display: 'flex',
    flexFlow: 'column',
  },
  formItem: {
    marginTop: 16,
    padding: 8,
    fontSize: 16,
  },
}));

const Card: FC<Props> = (Props) => {
  const classes = useStyles();
  const { userData, setUserData } = Props;
  const changeUserData = (item: string, value: string) => {
    setUserData(item, value);
  }

  const [focus, setFocus] = useState<"number" | "name" | "expiry" | "cvc">("number");

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const target = ref.current;
    if (target) {
      target.focus();
    }
  }, []);

  return (
    <Box className={classes.card}>
      <Cards
        number={userData.cardNumber}
        name={userData.cardName}
        expiry={userData.cardExpiry}
        cvc={userData.cardCvc}
        focused={focus}
      />
      <form className={classes.form}>
        <input
          className={classes.formItem}
          type="tel"
          maxLength={16}
          name="number"
          placeholder="Card Number"
          value={userData.cardNumber}
          onChange={(e) => changeUserData('cardNumber', e.target.value)}
          onFocus={() => setFocus("number")}
          ref={ref}
        />
        <input
          className={classes.formItem}
          type="text"
          maxLength={30}
          name="name"
          placeholder="Name"
          value={userData.cardName}
          onChange={(e) => changeUserData('cardName', e.target.value)}
          onFocus={() => setFocus("name")}
        />
        <input
          className={classes.formItem}
          type="tel"
          maxLength={4}
          name="expiry"
          placeholder="MM/YY"
          value={userData.cardExpiry}
          onChange={(e) => changeUserData('cardExpriy', e.target.value)}
          onFocus={() => setFocus("expiry")}
        />
        <input
          className={classes.formItem}
          type="tel"
          maxLength={3}
          name="cvc"
          placeholder="CVC"
          value={userData.cardCvc}
          onChange={(e) => changeUserData('cardCvc', e.target.value)}
          onFocus={() => setFocus("cvc")}
        />
      </form>
    </Box>
  );

}

export default Card;