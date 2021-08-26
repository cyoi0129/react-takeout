import { VFC, useState, SyntheticEvent } from "react";
import { useHistory } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { changeNavigation } from '../model/Navigator';
import { selectLogin, removeUserData } from '../model/Login'
import { removeOrderData } from "../model/Order"
import { Loading } from '../components';
import { createStyles, makeStyles, Theme, AppBar, Toolbar, Typography, IconButton, Snackbar } from '@material-ui/core';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      position: 'fixed',
      width: '100%',
      zIndex: 10,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    snackbar: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Header: VFC = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const isLogined: boolean = useAppSelector(selectLogin).isLogined;
  const [loading, setLoading] = useState<boolean>(false);
  const [snackBar, setSnackBar] = useState<boolean>(false);

  const toTop = () => {
    history.push("/");
    dispatch(changeNavigation(0));
  }
  const toLogin = () => {
    history.push("login");
    dispatch(changeNavigation(1));
  }
  const logout = () => {
    setLoading(true);
    setTimeout(() => {
      setSnackBar(true);
      dispatch(removeUserData());
      dispatch(removeOrderData());
    }, 1000);
    setTimeout(() => {
      setLoading(false);
      history.push("/");
      dispatch(changeNavigation(0));
    }, 2000);
  }

  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBar(false);
  };

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toTop}>
              <FastfoodIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Takeout
            </Typography>
            {isLogined ?
              <IconButton className={classes.menuButton} color="inherit" aria-label="logout" onClick={logout}>
                <ExitToAppIcon />
              </IconButton>
              :
              <IconButton className={classes.menuButton} color="inherit" aria-label="login" onClick={toLogin}>
                <LockOpenIcon />
              </IconButton>
            }
          </Toolbar>
        </AppBar>

      </div>
      <Loading show={loading} />
      <div className={classes.snackbar}>
        <Snackbar open={snackBar} autoHideDuration={3000} onClose={handleClose}>
          <Alert severity="success">Logout Sucessed!</Alert>
        </Snackbar>
      </div>
    </>
  );
}

export default Header;
