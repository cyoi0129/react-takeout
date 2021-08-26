import { VFC, useState, SyntheticEvent } from "react";
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { useHistory } from "react-router-dom";
import { getUserData, userData, createNewUser, selectLogin } from "../model/Login";
import { changeNavigation } from '../model/Navigator';
import SwipeableViews from 'react-swipeable-views';
import { Loading, InfoEdit, Card } from '../components';
import { makeStyles, Theme, useTheme, AppBar, Tabs, Tab, Typography, Box, TextField, Button, Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    paddingTop: 64,
    paddingBottom: 96,
  },
  item: {
    padding: theme.spacing(2),
  },
  input: {
    width: 300
  },
  button: {
    width: 160
  },
  snackbar: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login: VFC = () => {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const loginStatus = useAppSelector(selectLogin);
  const [tab, setTab] = useState<number>(0);

  // UserData State
  const [userName, setUserName] = useState<string>('');
  const [userMail, setUserMail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardName, setCardName] = useState<string>('');
  const [cardExpiry, setCardExpiry] = useState<string>('');
  const [cardCvc, setCardCvc] = useState<string>('');


  const [loading, setLoading] = useState<boolean>(false);
  const [snackBar, setSnackBar] = useState<boolean>(false);
  const isLoginfailed: boolean = loginStatus.isLoginFailed;

  const userData: userData = {
    id: null,
    name: userName,
    email: userMail,
    password: userPassword,
    cardNumber: cardNumber,
    cardName: cardName,
    cardExpiry: cardExpiry,
    cardCvc: cardCvc,
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
  // API async methods
  const handleLogin = () => {
    dispatch(getUserData(userName));
    setLoading(true);
    setTimeout(() => {
      setSnackBar(true);
    }, 1000);
    setTimeout(() => {
      setLoading(false);
      dispatch(changeNavigation(1));
      history.push("/account");
    }, 2000);
  }

  const handleSignUp = () => {
    dispatch(createNewUser(userData));
    setLoading(true);
    setTimeout(() => {
      setSnackBar(true);
    }, 1000);
    setTimeout(() => {
      setLoading(false);
      dispatch(changeNavigation(0));
      history.push("/");
    }, 2000);
  }

  // Design usage methods
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setTab(index);
  };

  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBar(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={tab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Login" {...a11yProps(0)} />
          <Tab label="Sign Up" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={tab}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={tab} index={0} dir={theme.direction}>
          <Typography variant="h4" component="h2" gutterBottom>Login</Typography>
          {isLoginfailed ? <Typography variant="body2" color="secondary" gutterBottom>Invalid user name or password.</Typography> : null}
          <Box className={classes.item}>
            <TextField className={classes.input} required id="standard-required" label="User" value={userName} helperText="Use [User: tester1, Password: tester1] for trial" name="nameTest" onChange={(event) => setUserName(event.target.value)} />
          </Box>
          <Box className={classes.item}>
            <TextField
              className={classes.input}
              label="Password"
              type="password"
              autoComplete="current-password"
            />
          </Box>
          <Box className={classes.item}>
            <Button className={classes.button} variant="contained" color="primary" onClick={handleLogin}>Login</Button>
          </Box>
        </TabPanel>
        <TabPanel value={tab} index={1} dir={theme.direction}>
          <Typography variant="h4" component="h2" gutterBottom>Sign Up</Typography>
          <InfoEdit userData={userData} setUserData={setUserData} />
          <Card userData={userData} setUserData={setUserData} />
          <Box className={classes.item}>
            <Button className={classes.button} variant="contained" color="primary" onClick={handleSignUp}>Sign Up</Button>
          </Box>
        </TabPanel>
      </SwipeableViews>
      <Loading show={loading} />
      <div className={classes.snackbar}>
        <Snackbar open={snackBar} autoHideDuration={3000} onClose={handleClose}>
          {isLoginfailed ? <Alert severity="error">Login Failed!</Alert> : <Alert severity="success">Login(Sign up) Sucessed!</Alert>
          }
        </Snackbar>
      </div>
    </div>
  );
}
export default Login;