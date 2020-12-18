import React from 'react';
import * as T from 'prop-types';
import {
  withStyles, 
  Grid,
} from '@material-ui/core';

import Typography from '../Typography';

import { FooterSample } from '../../../constants/samples/FooterSample';

const styles = (theme) => ({
  root: {
    backgroundColor: 'white',
    color: 'black',
  },
  footerLink: {
    fontSize: '.8em',
  },
  firstLineContainer: {
    backgroundColor: 'black',
    color: 'white',
  },
  firstLine: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '40px 0px',
  },
  firstLineItems: {
    padding: 5,
  },
  firstLineItemsCellsTitle: {
    '& p': {
      fontWeight: 'bold',
      fontSize: '1.3em',
    }
  },
  firstLineItemsCells: {
    padding: '3px 0px',
    margin: '0px auto',
    '& ul': {
      justifyContent: 'center',
      margin: 0,
      display: 'block',
      padding: 0,
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        listStyleType: 'none',
      },
    },
    '& ul li': {
      display: 'block',
      padding: '5px 0px',
      [theme.breakpoints.down('sm')]: {
        display: 'inline-block',
        padding: 8,
      },
    }
  },
  secondLastline: {
    textAlign: 'center',
    backgroundColor: '#323232',
  },
  secondLastlineMain: {
    margin: '0px auto',
    '& a:not(:last-child)::after': {
      paddingRight: 50,
      borderRight: '1px solid rgba(255, 255, 255, 0.6)',
    },
    '& ul': {
      justifyContent: 'center',
      margin: 0,
      display: 'block',
      padding: 0,
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        listStyleType: 'none',
      },
    },
    '& ul li': {
      padding: '5px 0px',
      display: 'inline',
      padding: '2px 50px',
      [theme.breakpoints.down('sm')]: {
        padding: 10,
      },
    },
    '& ul li:not(:last-child)': {
      borderRight: '1px solid rgba(255, 255, 255, .5)',
      [theme.breakpoints.down('sm')]: {
        borderRight: 'none',
      },
    }
  },
  secondLastlineItems: {
    padding: 5,
    fontSize: '.9em',
    color: 'white',
  },
  lastLine: {
    fontSize: '.8em',
    backgroundColor: '#323232',
  },
  lastLineItems: {
    padding: '20px 0px',
    fontSize: '.9em',
    color: 'white',
    fontSize: '.8em',
    textTransform: 'uppercase',
  },
});

const Footer = ({classes}) => {
  const data = FooterSample; 

  return (
    <footer className="footer">
      <div className={classes.root}>
        <Grid container>
          <Grid item lg={12} xs={12} className={classes.firstLineContainer}>
            <Grid container className={classes.firstLine}>
              {/* start of section */}
              <Grid item lg={2} md={6} xs={12} className={classes.firstLineItems}>
                <Grid container>
                  <Grid item lg={12} xs={12} className={classes.firstLineItemsCellsTitle}>
                    <Typography align="center" variant="subtitle1" component="p">Venenatis</Typography>
                  </Grid>
                  <Grid item lg={4} xs={12} className={classes.firstLineItemsCells}>
                    <ul className={classes.ulList}>
                      <li className={classes.liList}>
                        <Typography align="center" variant="body1" component="p" className={classes.footerLink}>
                          Pellentesque
                        </Typography>
                      </li>
                      <li className={classes.liList}>
                        <Typography align="center" variant="body1" component="p" className={classes.footerLink}>
                          Pellentesque
                        </Typography>
                      </li>
                      <li className={classes.liList}>
                        <Typography align="center" variant="body1" component="p" className={classes.footerLink}>
                          Pellentesque
                        </Typography>
                      </li>
                      <li className={classes.liList}>
                        <Typography align="center" variant="body1" component="p" className={classes.footerLink}>
                          Pellentesque
                        </Typography>
                      </li>
                    </ul>
                  </Grid>
                </Grid>
              </Grid>
              {/* start of section */}
              <Grid item lg={2} md={6} xs={12} className={classes.firstLineItems}>
                <Grid container>
                  <Grid item lg={12} xs={12} className={classes.firstLineItemsCellsTitle}>
                    <Typography align="center" variant="subtitle1" component="p">Venenatis</Typography>
                  </Grid>
                  <Grid item lg={4} xs={12} className={classes.firstLineItemsCells}>
                    <ul className={classes.ulList}>
                      <li className={classes.liList}>
                        <Typography align="center" variant="body1" component="p" className={classes.footerLink}>
                          Pellentesque
                        </Typography>
                      </li>
                      <li className={classes.liList}>
                        <Typography align="center" variant="body1" component="p" className={classes.footerLink}>
                          Pellentesque
                        </Typography>
                      </li>
                      <li className={classes.liList}>
                        <Typography align="center" variant="body1" component="p" className={classes.footerLink}>
                          Pellentesque
                        </Typography>
                      </li>
                      <li className={classes.liList}>
                        <Typography align="center" variant="body1" component="p" className={classes.footerLink}>
                          Pellentesque
                        </Typography>
                      </li>
                    </ul>
                  </Grid>
                </Grid>
              </Grid>
               {/* start of section */}
               <Grid item lg={2} md={6} xs={12} className={classes.firstLineItems}>
                <Grid container>
                  <Grid item lg={12} xs={12} className={classes.firstLineItemsCellsTitle}>
                    <Typography align="center" variant="subtitle1" component="p">Venenatis</Typography>
                  </Grid>
                  <Grid item lg={4} xs={12} className={classes.firstLineItemsCells}>
                    <ul className={classes.ulList}>
                      <li className={classes.liList}>
                        <Typography align="center" variant="body1" component="p" className={classes.footerLink}>
                          Pellentesque
                        </Typography>
                      </li>
                      <li className={classes.liList}>
                        <Typography align="center" variant="body1" component="p" className={classes.footerLink}>
                          Pellentesque
                        </Typography>
                      </li>
                      <li className={classes.liList}>
                        <Typography align="center" variant="body1" component="p" className={classes.footerLink}>
                          Pellentesque
                        </Typography>
                      </li>
                      <li className={classes.liList}>
                        <Typography align="center" variant="body1" component="p" className={classes.footerLink}>
                          Pellentesque
                        </Typography>
                      </li>
                    </ul>
                  </Grid>
                </Grid>
              </Grid>
              {/* start of section */}
              <Grid item lg={2} md={6} xs={12} className={classes.firstLineItems}>
                <Grid container>
                  <Grid item lg={12} xs={12} className={classes.firstLineItemsCellsTitle}>
                    <Typography align="center" variant="subtitle1" component="p">Venenatis</Typography>
                  </Grid>
                  <Grid item lg={4} xs={12} className={classes.firstLineItemsCells}>
                    <ul className={classes.ulList}>
                      <li className={classes.liList}>
                        <Typography align="center" variant="body1" component="p" className={classes.footerLink}>
                          Pellentesque
                        </Typography>
                      </li>
                      <li className={classes.liList}>
                        <Typography align="center" variant="body1" component="p" className={classes.footerLink}>
                          Pellentesque
                        </Typography>
                      </li>
                      <li className={classes.liList}>
                        <Typography align="center" variant="body1" component="p" className={classes.footerLink}>
                          Pellentesque
                        </Typography>
                      </li>
                      <li className={classes.liList}>
                        <Typography align="center" variant="body1" component="p" className={classes.footerLink}>
                          Pellentesque
                        </Typography>
                      </li>
                    </ul>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={12} xs={12} className={`${classes.secondLastline}`}>
            <Grid container>
              <Grid item lg={6} md={6} xs={12} className={classes.secondLastlineMain}>
                <ul>
                  <li>
                    <a href='/' className={classes.secondLastlineItems}>
                      Aenean
                    </a>
                  </li>
                  <li>
                    <a href='/' className={classes.secondLastlineItems}>
                      Aenean
                    </a>
                  </li>
                  <li>
                    <a href='/' className={classes.secondLastlineItems}>
                      Aenean
                    </a>
                  </li>
                </ul>
              </Grid>              
            </Grid>
          </Grid>
          <Grid item lg={12} xs={12} className={`${classes.lastLine}`}>
              <Typography align="center" variant="body1" component="p" className={classes.lastLineItems}>&copy; 2020 AvenidaZ.  All right reserverd.</Typography>
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