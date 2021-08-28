import { FC } from "react";
import { userData } from '../model/Login';
import { createStyles, Theme, makeStyles, Box, TextField } from '@material-ui/core';

export type Props = {
  userData: userData;
  setUserData: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 300,
      backgroundColor: theme.palette.background.paper,
    },
    item: {
      padding: theme.spacing(2),
    },
    input: {
      width: 300
    },
  }),
);

const InfoEdit: FC<Props> = (Props) => {
  const { userData, setUserData } = Props;
  const classes = useStyles();
  const changeUserData = (item: string, value: string) => {
    setUserData(item, value);
  }

  return (
    <>
      <Box className={classes.item}>
        <TextField
          className={classes.input}
          required id="standard-required"
          label="User"
          value={userData.name}
          onChange={(event) => changeUserData('name', event.target.value)}
        />
      </Box>
      <Box className={classes.item}>
        <TextField
          className={classes.input}
          required id="standard-required"
          label="Email"
          value={userData.email}
          onChange={(event) => changeUserData('email', event.target.value)}
        />
      </Box>
      <Box className={classes.item}>
        <TextField
          className={classes.input}
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={userData.password}
          onChange={(event) => changeUserData('password', event.target.value)}
        />
      </Box>
    </>
  );
}

export default InfoEdit;