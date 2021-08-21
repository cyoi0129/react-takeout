import { FC } from "react";
import { Link } from "react-router-dom";
import { foodItem } from "../model/Food";
import { makeStyles, createStyles, Theme, Grid, Paper, Typography, ButtonBase } from '@material-ui/core';

export type Props = {
  item: foodItem;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
    },
    link: {
      color: 'gray',
      textDecoration: 'none'
    },
    image: {
      width: 128,
      height: 96,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }),
);

const FoodItem: FC<Props> = (Props) => {
  const { item } = Props;
  const formatter = new Intl.NumberFormat('ja-JP');
  const jpPrice = formatter.format(item.price);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Link className={classes.link} to={`/detail/${item.id}`}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={`images/${item.image}`} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {item.name} is very yummy!
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{`¥${jpPrice}`}</Typography>
            </Grid>
          </Grid>
        </Grid>
        </Link>
      </Paper>
    </div>
  );
}

export default FoodItem;