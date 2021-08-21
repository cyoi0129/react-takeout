import { useState, FC } from 'react';
import { makeStyles, createStyles, Theme, Backdrop, CircularProgress } from '@material-ui/core';

export type Props = {
  show: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);

const Loading:FC<Props> = (Props) => {
  const classes = useStyles();
  const { show } = Props;

  return (
    <div>
      <Backdrop className={classes.backdrop} open={show}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default Loading;