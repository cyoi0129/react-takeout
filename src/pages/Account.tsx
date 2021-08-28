import { VFC, useState, useEffect, SyntheticEvent } from "react";
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { Redirect } from "react-router-dom";
import { selectLogin, loginStatus, userData, editUser } from '../model/Login';
import { getOrderList, selectOrder, orderList } from "../model/Order";
import { UserInfo, OrderHistory, Card, InfoEdit, Loading } from "../components";
import { makeStyles, Theme, Typography, Box, Checkbox, Button, Container, Divider, Snackbar, FormControlLabel } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    paddingTop: 96,
    paddingBottom: 96,
    paddingLeft: 16,
    paddingRight: 16,
  },
  item: {
    padding: theme.spacing(2),
  },
  input: {
    width: 300
  },
  button: {
    width: 120,
    margin: 5,
  },
  border: {
    marginTop: 32,
    marginBottom: 32,
  },
  snackbar: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  payment: {
    marginLeft: 0,
  }
}));

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Account: VFC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const loginSelector: loginStatus = useAppSelector(selectLogin);
  const orderSelector: orderList = useAppSelector(selectOrder);
  const [editing, setEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [snackBar, setSnackBar] = useState<boolean>(false);
  const [showPayment, setShowPayment] = useState<boolean>(false);

  // UserData State
  const [userName, setUserName] = useState<string>(loginSelector.name);
  const [userMail, setUserMail] = useState<string>(loginSelector.email);
  const [userPassword, setUserPassword] = useState<string>(loginSelector.password);
  const [cardNumber, setCardNumber] = useState<string>(loginSelector.cardNumber);
  const [cardName, setCardName] = useState<string>(loginSelector.cardName);
  const [cardExpiry, setCardExpiry] = useState<string>(loginSelector.cardExpiry);
  const [cardCvc, setCardCvc] = useState<string>(loginSelector.cardCvc);

  const userData: userData = {
    id: loginSelector.id,
    name: userName === undefined || "" ? "" : userName,
    email: userMail === undefined || "" ? "" : userMail,
    password: userPassword === undefined || "" ? "" : userPassword,
    cardNumber: cardNumber === undefined || "" ? "" : cardNumber,
    cardName: cardName === undefined || "" ? "" : cardName,
    cardExpiry: cardExpiry === undefined || "" ? "" : cardExpiry,
    cardCvc: cardCvc === undefined || "" ? "" : cardCvc
  }

  const setUserData = (item: string, value: string) => {
    switch (item) {
      case 'name':
        setUserName(value);
        break;
      case 'email':
        setUserMail(value);
        break;
      case 'password':
        setUserPassword(value);
        break;
      case 'cardNumber':
        setCardNumber(value);
        break;
      case 'cardName':
        setCardName(value);
        break;
      case 'cardExpriy':
        setCardExpiry(value);
        break;
      case 'cardCvc':
        setCardCvc(value);
        break;
      default:
        console.log('No item matched!')
    }
  }

  const saveUserData = () => {
    dispatch(editUser(userData));
    setLoading(true);
    setTimeout(() => {
      setSnackBar(true);
    }, 1000);
    setTimeout(() => {
      setLoading(false);
      setEditing(() => false);
    }, 2000);
  }

  useEffect(() => {
    if (userData.id !== null) {
      dispatch(getOrderList(userData.id));
    }
  }, [])

  const userEditor = () => {
    setEditing(() => true);
  }

  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBar(false);
  };

  return (
    <>
      {!loginSelector.isLogined ? <Redirect to="/login" /> :
        <Container className={classes.root}>
          <Typography variant="h4" component="h2" gutterBottom>Account Info</Typography>
          {!editing ?
            <>
              <UserInfo userData={userData} />
              <Box className={classes.item}>
                <Button className={classes.button} variant="contained" color="primary" onClick={() => setEditing(true)}>Change</Button>
              </Box>
              <Divider variant="middle" className={classes.border} />
              {orderSelector.order.length !== 0 ?
                <OrderHistory list={orderSelector.order} /> : <Typography variant="body2">No Order History</Typography>}
            </>
            :
            <>
              <InfoEdit userData={userData} setUserData={setUserData} />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showPayment}
                    onChange={() => setShowPayment(!showPayment)}
                    name="payment"
                    color="primary"
                  />
                }
                label="Edit Payment Info"
                className={classes.payment}
              />
              {showPayment ? <Card userData={userData} setUserData={setUserData} /> : null}
              <Box className={classes.item}>
                <Button className={classes.button} onClick={() => setEditing(false)}>Cancel</Button>
                <Button className={classes.button} variant="contained" color="primary" onClick={saveUserData}>Save</Button>
              </Box>
            </>}
          <Loading show={loading} />
          <div className={classes.snackbar}>
            <Snackbar open={snackBar} autoHideDuration={3000} onClose={handleClose}>
              <Alert severity="success">Update Sucessed!</Alert>
            </Snackbar>
          </div>
        </Container>
      }
    </>
  );
};

export default Account;