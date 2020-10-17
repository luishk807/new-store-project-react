import React from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
} from '@material-ui/core';

import Icons from '../components/common/Icons';
import Typography from './common/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import PhoneIcon from '@material-ui/icons/Phone';
import RoomIcon from '@material-ui/icons/Room';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
const styles = (theme) => ({
  root: {
    width: '100%',
    height: '100%',
    position: 'fixed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainFont: {
    color: 'white',
    fontFamily: 'Arial',
    fontSize: '3em',
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2em',
    },
  },
  sectionlist: {
    display: 'inline'
  },
  mainSub: {
    color: 'white',
    fontFamily: 'Arial',
    fontSize: '1.3em',
    fontWeight: 'bold',
    display: 'inline-block',
    padding: 10,
    verticalAlign: 'middle'
  },
  container: {
    width: '100%',
    height: '100%',
    position: 'fixed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fill: 'white',
    verticalAlign: 'center',
  },
  miniItems: {
    verticalAlign: 'middle',
    padding: 5
  },
  item: {
    width: '40%',
    [theme.breakpoints.down('md')]: {
      width: '50%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '80%',
    },
  },
  sectionRoot: {
    position: 'relative',
    display: 'flex'
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
  
});

const Maintenance = ({classes, data, title}) => {
  return (
    <div className={`container-fluid AppBarBackColor ${classes.root}`}>
      <Grid container className={classes.container}>
        <Grid item className={classes.item}>
          <Icons name="logoWhite"/>
          <Typography className={classes.mainFont} align="center" variant="p">Proximamente....</Typography>
        </Grid>
        <Grid item lg={12} align="center">
          <Grid container className={classes.flexContainer}>
            <Grid item className={classes.miniItems}>
              <PhoneIcon className={classes.icon}/>
              <Typography className={classes.mainSub} align="center" variant="p">6770-2400</Typography>
            </Grid>
            <Grid item className={classes.miniItems}>
              <RoomIcon className={classes.icon}/>
              <Typography className={classes.mainSub} align="center" variant="p">Plaza El Dorado</Typography>
            </Grid>
            <Grid item className={classes.miniItems}>
              <AlternateEmailIcon className={classes.icon}/>
              <Typography className={classes.mainSub} align="center" variant="p">info@avenidaz.com</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

Maintenance.protoTypes = {
  classes: T.object,
  data: T.object,
  title: T.string,
}

export default withStyles(styles)(Maintenance);