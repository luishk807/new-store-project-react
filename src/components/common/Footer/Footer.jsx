import React from 'react';
import * as T from 'prop-types';
import {
  withStyles, 
  Grid,
  Link,
} from '@material-ui/core';

import Typography from '../Typography';
import Icons from '../../common/Icons';
import { config } from '../../../../config';
import { FooterSample } from '../../../constants/samples/FooterSample';
import { useTranslation } from 'next-i18next'

const styles = (theme) => ({
  root: {
    backgroundColor: 'white',
    color: 'black',
  },
  footerMain: {
    [theme.breakpoints.down('sm')]: {
      paddingBottom: 40
    }
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
        listStyleType: 'none',
      },
    },
    '& ul li': {
      padding: '5px 0px',
      display: 'inline',
      padding: '2px 50px',
      [theme.breakpoints.down('sm')]: {
        padding: 10,
        display: 'inline-block',
      },
    },
    '& ul li:not(:last-child)': {
      borderRight: '1px solid rgba(255, 255, 255, .5)',
      [theme.breakpoints.down('sm')]: {
        borderRight: 'none',
      },
    },
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
  const { t } = useTranslation('footer')

  return (
    <footer className={`footer ${classes.footerMain}`}>
      <div className={classes.root}>
        <Grid container>
          <Grid item lg={12} xs={12} className={classes.firstLineContainer}>
            <Grid container className={classes.firstLine}>
              {/* start of section */}
              <Grid item lg={12} xs={12} className={classes.firstLineItems}>
                <Grid container>
                  <Grid item lg={1} xs={7} className={classes.firstLineItemsCells}>
                    <a href="/"><img className={`img-fluid`} src="/images/logo-all-white.svg" /></a>
                  </Grid>
                </Grid>
              </Grid>
              {/* start of section */}
              <Grid item lg={12} xs={12} className={`${classes.socialLine}`}>
                <Grid container>
                  <Grid item lg={6} md={6} xs={12} className={classes.socialLineMain}>
                    <ul>
                      <li>
                        <a href={config.socialLinks.facebook} target="_blank" className={classes.secondLastlineItems}>
                          <Icons name="facebook" classes={{icon: classes.socialIcons}} />
                        </a>
                      </li>
                      <li>
                        <a href={config.socialLinks.instagram} target="_blank" className={classes.secondLastlineItems}>
                          <Icons name="instagram" classes={{icon: classes.socialIcons}} />
                        </a>
                      </li>
                      <li>
                        <a href={config.socialLinks.whatssap} target="_blank" className={classes.secondLastlineItems}>
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
              <Grid item lg={8} md={8} xs={12} className={classes.secondLastlineMain}>
                <ul>
                  {/* <li>
                    <a href="/aboutus" className={classes.secondLastlineItems}>
                    { t('about_us') }
                    </a>
                  </li> */}
                  <li>
                    <a href="/contactus" className={classes.secondLastlineItems}>
                    { t('contact_us') }
                    </a>
                  </li>
                  <li>
                    <a href="/terms" className={classes.secondLastlineItems}>
                    { t('terms_privacy') }
                    </a>
                  </li>
                  <li>
                    <a href="/order" className={classes.secondLastlineItems}>
                      { t('order_status') }
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
                    { t('phone') }: { config.phone }
                  </li>
                  <li className={classes.liList}>
                    Whatssap: { config.whatssap }
                  </li>
                  <li className={classes.liList}>
                    { t('address') }: { config.address }
                  </li>
                  <li className={classes.liList}>
                    { t('email') }: { config.emails.sales }
                  </li>
                </ul>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={12} xs={12} className={`${classes.lastLine}`}>
              <Typography align="center" variant="body1" component="p" className={classes.lastLineItems}>&copy; {(new Date().getFullYear())} <a href="/" className={classes.footerLink}>AvenidaZ.com</a>  { t('all_rights_reserved') }.</Typography>
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