import React, { useState, useRef } from 'react';
import * as T from 'prop-types';
import { 
  withStyles, 
  Grid,
  Button,
} from '@material-ui/core';

import Icons from './common/Icons';
import CategoryModal from './category/Modal';

const styles = (theme) => ({
  root: {
    position: 'fixed',
    bottom: 0,
    color: 'white',
    width: '100%',
    height: 44,
    zIndex: 100,
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '.9em',
    padding: 8,
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
    }
  },
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 37,
    height: 37,
    fill: '#000',
    textAlign: 'center'
  },
  itemItems: {
    textAlign: 'center',
  },
})

const MobileFooter = ({classes}) => {
  const [openCategory, setOpenCategory] = useState(false);

  return ( 
    <>
    <CategoryModal open={openCategory} onClose={() => setOpenCategory(false)} />
    <div className={`AppBarBackColor ${classes.root}`}>
      <Grid container className={classes.mainContainer}>
        <Grid item xs={4} className={classes.itemItems}>
          <Button href="/">
            <Icons name="home" classes={{icon: classes.icon}}/>
          </Button>
        </Grid>
        <Grid item xs={4} className={classes.itemItems}>
          <Button onClick={() => setOpenCategory(true)}>
            <Icons name="listBullets" classes={{icon: classes.icon}}/>
          </Button>
        </Grid>
        <Grid item xs={4} className={classes.itemItems}>
          <Button href="/account" >
            <Icons name="user2" classes={{icon: classes.icon}}/>
          </Button>
        </Grid>
      </Grid>
    </div>
    </>
   );
}
 
MobileFooter.protoTypes = {
  classes: T.object,
}

export default withStyles(styles)(MobileFooter);