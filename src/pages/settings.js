import React from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Link,
  Grid,
  makeStyles,
} from '@material-ui/core';

import LayoutTemplate from '../components/LayoutTemplate';
import { SettingSample } from '../constants/SettingSample';
import Order from '../../public/images/svg/order.svg';
import CardIcon from '../components/common/CardIcon';

const styles = (theme) => ({
  root: {
    padding: 5,
  },
  cardRoot: {
    padding: 10,
  },
  cardMediaCont: {
    textAlign: 'center',
    width: '60%',
    margin: '0px auto',
  },
  cardIconMedia: {
    width: '100%',
    height: 'auto',
  }
});

const Settings = ({classes}) => {
  const data = SettingSample;

  return (
    <LayoutTemplate>
      <div className={classes.root}>
        <Typography align="left" variant="h4" component="h3">Welcome {data.name}</Typography>
        <Grid container spacing={2}>
          <Grid item lg={3}>
            <Card className={classes.cardRoot} variant="outlined">
              <CardActionArea>
                <Link href="">
                  <CardMedia className={classes.cardMediaCont}>
                    <Order className={classes.cardIconMedia}/>
                  </CardMedia>
                  <CardContent>
                    <Typography align="center" variant="h5" component="h5">Your Order</Typography>
                  </CardContent>
                </Link>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item lg={3}>
            <Card className={classes.cardRoot} variant="outlined">
              <CardActionArea>
                <Link href="">
                  <CardMedia className={classes.cardMediaCont}>
                    <Order className={classes.cardIconMedia} />
                  </CardMedia>
                  <CardContent>
                    <Typography align="center" variant="h5" component="h5">Your Order</Typography>
                  </CardContent>
                </Link>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>

      </div>
    </LayoutTemplate>
  );
}
 
Settings.protoTypes = {
  classes: T.object,
}
export default withStyles(styles)(Settings);