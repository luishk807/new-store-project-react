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
  cardRoot: {
    padding: 10,
    backgroundColor: 'rgb(239,239,239)',
    border: '1px solid orange',
    '& a:hover': {
      color: 'white',
      textDecoration: 'none',
    },
    '& a:hover svg': {
      fill: 'white',
    },
    '&:hover': {
      backgroundColor: 'orange',
    },
  },
  cardMediaCont: {
    textAlign: 'center',
    width: '60%',
    margin: '0px auto',
    fill: 'orange',
  },
  cardLink: {
    color: 'orange',
  }
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
                <CardIcon title={button.label} classes={{link: classes.cardLink, img: classes.cardMediaCont, root: classes.cardRoot}}>
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