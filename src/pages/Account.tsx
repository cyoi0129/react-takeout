import { VFC, useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { Redirect } from "react-router-dom";
import { selectLogin, loginStatus, userData, editUser } from '../model/Login';
import { getOrderList, selectOrder, orderList } from "../model/Order";
import { UserInfo, OrderHistory } from "../components";
import { makeStyles, Theme, Typography, Box, TextField, Button, Container } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    paddingTop: 24,
    paddingBottom: 96,
    paddingLeft:16,
    paddingRight: 16,
  },
  item: {
    padding: theme.spacing(2),
  },
  input: {
    width: 300
  },
  button: {
    width: 160
  }
}));

const Account: VFC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const loginSelector: loginStatus = useAppSelector(selectLogin);
  const orderSelector: orderList = useAppSelector(selectOrder);
  const [userName, setUserName] = useState(loginSelector.name);
  const [userMail, setUserMail] = useState(loginSelector.email);
  const [userPassword, setUserPassword] = useState(loginSelector.password);
  const [userID] = useState(loginSelector.id);
  const [editing, setEditing] = useState(false);

  const userInfo: userData = {
    id: userID,
    name: userName,
    email: userMail,
    password: userPassword
  }

  const userNameChange = (event: any) => {
    setUserName(() => event.target.value);
  }

  const userMailChange = (event: any) => {
    setUserMail(() => event.target.value);
  }

  const userPasswordChange = (event: any) => {
    setUserPassword(() => event.target.value);
  }

  const handleChange = () => {
    const editUserData: userData = {
      id: userID,
      name: userName,
      email: userMail,
      password: userPassword
    }
    dispatch(editUser(editUserData));
    setEditing(() => false);
  }

  const userEditor = () => {
    setEditing(() => true);
  }

  useEffect(() => {
    if (userInfo.id !== null) {
      dispatch(getOrderList(userInfo.id));
    }
  }, [])

  return (
    <>
      {!loginSelector.isLogined ? <Redirect to="/login" /> :
        <Container className={classes.root}>
          <Typography variant="h4" component="h2" gutterBottom>Account Info</Typography>
          {!editing ?
            <>
              <UserInfo userData={userInfo} />
              <Box className={classes.item}>
                <Button className={classes.button} variant="contained" color="primary" onClick={userEditor}>Edit</Button>
              </Box>
              {orderSelector.order.length !== 0 ?
                <OrderHistory list={orderSelector.order} /> : " No Order History "}
            </>
            :
            <>
              <Box className={classes.item}>
                <TextField className={classes.input} required id="standard-required" label="User" value={userName} onChange={userNameChange} />
              </Box>
              <Box className={classes.item}>
                <TextField className={classes.input} required id="standard-required" label="Email" value={userMail} onChange={userMailChange} />
              </Box>
              <Box className={classes.item}>
                <TextField
                  className={classes.input}
                  id="standard-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  value={userPassword}
                  onChange={userPasswordChange}
                />
              </Box>
              <Box className={classes.item}>
                <Button className={classes.button} variant="contained" color="primary" onClick={handleChange}>Save</Button>
              </Box>
            </>}
        </Container>
      }
    </>
  );
};

export default Account;