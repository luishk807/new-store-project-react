import React from 'react';
import * as T from 'prop-types';
import {
  withStyles, 
  Grid,
} from '@material-ui/core';

import Typography from '@/common/Typography';


const styles = (theme) => ({
  footerLink: {
    fontSize: '.7em',
  },
  footerBottomContent: {
    margin: '10px 0px',
    fontSize: '.9em',
    textAlign: 'center',
  }
});

const Footer = ({classes}) => {
  return (
    <footer className="footerAdmin">
      <div className={classes.root}>
        <Grid container>
          <Grid item lg={12}>
            <Typography align="center" variant="body1" component="p" className={classes.footerBottomContent}>&copy; {(new Date()).getFullYear()} AvenidaZ.com  All right reserverd.</Typography>
          </Grid>
        </Grid>
      </div>
    </footer>
  );
}

Footer.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Footer);