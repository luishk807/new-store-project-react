import React from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Link,
  Grid,
  makeStyles,
} from '@material-ui/core';

import Typography from '../components//common/Typography';
import LayoutTemplate from '../components/LayoutTemplate';
import { 
  SettingSample,
  SettingButtonsSample,
} from '../constants/SettingSample';
import CardIcon from '../components/common/CardIcon';
import Icons from '../components/common/Icons';

const styles = (theme) => ({
  root: {
    padding: 5,
  },
});

const Settings = ({classes}) => {
  const data = SettingSample;

  return (
    <LayoutTemplate>
      <div className={classes.root}>
        <Typography align="left" variant="h4" component="h3">Welcome {data.name}</Typography>
        <Grid container spacing={2}>
        {
          SettingButtonsSample.map((button, index) => {
            return (
              <Grid key={index} item lg={3}>
                <CardIcon title={button.label} classes={{link: `cardLink`, img: `cardMediaCont`, root: `cardRoot`}}>
                  <Icons name={button.name} />
                </CardIcon>
              </Grid>
            )
          })
        }
        </Grid>
      </div>
    </LayoutTemplate>
  );
}
 
Settings.protoTypes = {
  classes: T.object,
}
export default withStyles(styles)(Settings);