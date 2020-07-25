import React from 'react';
import * as T from 'prop-types';
import {
  withStyles, 
  Grid,
} from '@material-ui/core';

import Typography from '../common/Typography';

import { FooterSample } from '../../constants/FooterSample';

const styles = (theme) => ({
  footerLink: {
    fontSize: '.7em',
  },
  footerBottomContent: {
    margin: '60px 0px 5px 0px',
    fontSize: '.7em',
  }
});

const Footer = ({classes}) => {
  const data = FooterSample; 

  return (
    <footer className="footer">
      <div className={classes.root}>
        <Grid container>
          <Grid item lg={12}>
            <Grid container>
              {
                data.map((footer, index) => {
                  return (
                    <Grid key={index} item lg={2}>
                      <Grid container>
                        <Grid item lg={12}>
                          <Typography align="center" variant="subtitle1" component="p">{footer.name}</Typography>
                        </Grid>
                        {
                          footer.links.map((links, index) => {
                            return (
                              <Grid item key={index} lg={12}>
                                <Typography align="center" variant="body1" component="p" className={classes.footerLink}>{links.name}</Typography>
                              </Grid>
                            );
                          })
                        }
                      </Grid>
                    </Grid>
                  )
                })
              }
            </Grid>
          </Grid>
          <Grid item lg={12}>
            <Typography align="center" variant="body1" component="p" className={classes.footerBottomContent}>&copy; 2020 AvenidaZ.  All right reserverd.</Typography>
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