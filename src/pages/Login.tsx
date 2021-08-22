import { VFC, useState, SyntheticEvent } from "react";
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { useHistory } from "react-router-dom";
import { getUserData, userData, createNewUser, selectLogin } from "../model/Login";
import { changeNavigation } from '../model/Navigator';
import SwipeableViews from 'react-swipeable-views';
import { Loading } from '../components';
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
  const dispatch = useAppDispatch();
  const loginStatus = useAppSelector(selectLogin);
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [userName, setUserName] = useState('');
  const [userMail, setUserMail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackBar, setSnackBar] = useState(false);

  const isLogined: boolean = loginStatus.isLogined;
  const isLoginfailed: boolean = loginStatus.isLoginFailed;

  const userNameChange = (event: any) => {
    setUserName(() => event.target.value);
  }

  const userMailChange = (event: any) => {
    setUserMail(() => event.target.value);
  }

  const userPasswordChange = (event: any) => {
    setUserPassword(() => event.target.value);
  }

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

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
    const newUserData: userData = {
      id: null,
      name: userName,
      email: userMail,
      password: userPassword
    }
    dispatch(createNewUser(newUserData));
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
          value={value}
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
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Typography variant="h4" component="h2" gutterBottom>Login</Typography>
          {isLoginfailed ? <Typography variant="body2" color="secondary" gutterBottom>Invalid user name or password.</Typography> : null}
          <Box className={classes.item}>
            <TextField className={classes.input} required id="standard-required" label="User" value={userName} helperText="Use [User: tester1, Password: tester1] for trial" onChange={userNameChange} />
          </Box>
          <Box className={classes.item}>
            <TextField
              className={classes.input}
              id="standard-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
          </Box>
          <Box className={classes.item}>
            <Button className={classes.button} variant="contained" color="primary" onClick={handleLogin}>Login</Button>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Typography variant="h4" component="h2" gutterBottom>Sign Up</Typography>
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
            <Button className={classes.button} variant="contained" color="primary" onClick={handleSignUp}>Sign Up</Button>
          </Box>
        </TabPanel>
      </SwipeableViews>
      <Loading show={loading} />
      <div className={classes.snackbar}>
        <Snackbar open={snackBar} autoHideDuration={6000} onClose={handleClose}>
          {isLoginfailed ? <Alert severity="error">Login Failed!</Alert> : <Alert severity="success">Login(Sign up) Sucessed!</Alert>
          }
        </Snackbar>
      </div>
    </div>
  );
}
export default Login;