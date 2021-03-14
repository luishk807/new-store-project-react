import React from 'react';
import * as T from 'prop-types';
import {
  withStyles, 
  Grid,
  Link,
} from '@material-ui/core';

import Typography from '../Typography';
import Icons from '../../common/Icons';
import { FooterSample } from '../../../constants/samples/FooterSample';

const styles = (theme) => ({
  root: {
    backgroundColor: 'white',
    color: 'black',
  },
  footerLink: {
    color: 'white',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    }
  },
  contactUL: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center !important',
    }
  },
  firstLineContainer: {
    backgroundColor: 'black',
    color: 'white',
  },
  firstLine: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '25px 0px',
    [theme.breakpoints.down("sm")]: {
      margin: '15px 0px',
    }
  },
  firstLineItems: {
    padding: 5,
  },
  firstLineItemsCells: {
    padding: '3px 0px',
    margin: '0px auto',
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    lineHeight: '10px',
    '& ul': {
      margin: 0,
      padding: 0,
      display: 'flex',
      width: '80%',
      padding: 2,
    },
    '& ul li': {
      lineHeight: '20px',
      display: 'flex',
      padding: 10,
      justifyContent: 'space-between'
    }
  },

  localItems: {
    padding: 5,
    backgroundColor: '#323232',
  },
  localItemsCells: {
    padding: '3px 0px',
    margin: '0px auto',
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    lineHeight: '10px',
    [theme.breakpoints.down('sm')]: {
      display: 'inline-block',
      textAlign: 'center'
    },
    '& ul': {
      margin: 0,
      padding: 0,
      display: 'flex',
      width: '80%',
      padding: 2,
      [theme.breakpoints.down('sm')]: {
        display: 'inline-block',
        width: '100%',
      }
    },
    '& ul li': {
      color: 'white',
      display: 'flex',
      padding: 10,
      lineHeight: '20px',
      justifyContent: 'space-between',
      [theme.breakpoints.down('sm')]: {
        display: 'inline-block',
        lineHeight: '10px',
      }
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
    '&:hover': {
      textDecoration: 'underline',
      color: 'white',
    }
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


  socialLine: {
    textAlign: 'center',
    backgroundColor: 'black',
  },
  socialLineMain: {
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
      padding: '2px 20px',
      [theme.breakpoints.down('sm')]: {
        padding: 10,
      },
    },
  },
  socialLineItems: {
    padding: 5,
    fontSize: '.9em',
    color: 'white',
    '&:hover': {
      textDecoration: 'underline',
      color: 'white',
    }
  },
  socialIcons: {
    width: 20,
    height: 20,
    fill: 'white',
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
              <Grid item lg={12} xs={12} className={classes.firstLineItems}>
                <Grid container>
                  <Grid item lg={1} xs={7} className={classes.firstLineItemsCells}>
                    <img className={`img-fluid`} src="/images/logo-all-white.svg" />
                  </Grid>
                </Grid>
              </Grid>
              {/* start of section */}
              <Grid item lg={12} xs={12} className={`${classes.socialLine}`}>
                <Grid container>
                  <Grid item lg={6} md={6} xs={12} className={classes.socialLineMain}>
                    <ul>
                      <li>
                        <a href='/' className={classes.secondLastlineItems}>
                          <Icons name="facebook" classes={{icon: classes.socialIcons}} />
                        </a>
                      </li>
                      <li>
                        <a href='/' className={classes.secondLastlineItems}>
                          <Icons name="instagram" classes={{icon: classes.socialIcons}} />
                        </a>
                      </li>
                      <li>
                        <a href='/' className={classes.secondLastlineItems}>
                          <Icons name="whatssap" classes={{icon: classes.socialIcons}} />
                        </a>
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
                    <a href='/aboutus' className={classes.secondLastlineItems}>
                    About Us
                    </a>
                  </li>
                  <li>
                    <a href='/contactus' className={classes.secondLastlineItems}>
                    Contact Us
                    </a>
                  </li>
                  <li>
                    <a href='/terms' className={classes.secondLastlineItems}>
                    Terms & Privacy
                    </a>
                  </li>
                  <li>
                    <a href='/order' className={classes.secondLastlineItems}>
                      Order Status
                    </a>
                  </li>
                </ul>
              </Grid>              
            </Grid>
          </Grid>

          <Grid item lg={12} xs={12} className={classes.localItems} >
            <Grid container>
              <Grid item lg={12} xs={12} className={classes.localItemsCells}>
                <ul className={classes.contactUL}>
                  <li className={classes.liList}>
                    Phone: 6770-2400
                  </li>
                  <li className={classes.liList}>
                    Whatssap: 6770-2400
                  </li>
                  <li className={classes.liList}>
                    Direction: Plaza Dorado
                  </li>
                  <li className={classes.liList}>
                    Email: ventas@avenidaz.com
                  </li>
                </ul>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={12} xs={12} className={`${classes.lastLine}`}>
              <Typography align="center" variant="body1" component="p" className={classes.lastLineItems}>&copy; 2020 <a href="/" className={classes.footerLink}>AvenidaZ.com</a>  All right reserved.</Typography>
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