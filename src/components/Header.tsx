import { VFC } from "react";
import { useHistory } from 'react-router-dom';
import { createStyles, makeStyles, Theme, AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import FastfoodIcon from '@material-ui/icons/Fastfood';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

const Header: VFC = () => {
  const classes = useStyles();
  const history = useHistory();
  const toTop = () => {
    history.push("/")
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toTop}>
            <FastfoodIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Takeout
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
