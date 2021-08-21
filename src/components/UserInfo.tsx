import { FC } from "react";
import { userData } from '../model/Login';
import { createStyles, Theme, makeStyles, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import MailIcon from '@material-ui/icons/Mail';

export type Props = {
  userData: userData;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 300,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

const UserInfo: FC<Props> = (Props) => {
  const { userData } = Props;
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <PersonIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={userData.name} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <MailIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={userData.email} />
      </ListItem>
    </List>
  );
}

export default UserInfo;