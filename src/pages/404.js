import React from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  Button, 
  TextField,
} from '@material-ui/core';

import LayoutTemplate from '../components/common/Layout/LayoutTemplate';
import Typography from '../components/common/Typography';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Icons from '../components/common/Icons';

const styles = (theme) => ({
  root: {
    padding: 20,
  },
  mainContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: '50px 0px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
    },
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    '& h3': {
      fontSize: '5em',
      fontWeight: 'bold',
      color: 'rgb(248,190,21)'
    },
    '& p': {
      width: '60%',
      fontSize: '1.5em',
      textAlign: 'right',
      [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
        width: '100%',
      },
    },
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  image: {
    display: 'flex',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  icon: {
    width: 150,
    height: 150,
  },
});

const notFound = ({classes, data}) => {
  const { t } = useTranslation('common');

  return (
    <LayoutTemplate>
      <div className={classes.root}>
        <Grid container spacing={2} alignItems="center" justify="center" direction="row" className={classes.mainContent}>
          <Grid item lg={5} xs={12} className={classes.info}>
            <h3>404</h3>
            <p>
            { t('page_not_found') }
            </p>
            <Button href="/" className={`mainButtonNaked`}>{t('back_home_page')}</Button>
          </Grid>
          <Grid item lg={6} xs={12} className={classes.image}>
            <Icons name="sad" classes={{icon: classes.icon}}/>
          </Grid>
        </Grid>
      </div>
    </LayoutTemplate>
  );
}

notFound.protoTypes = {
  classes: T.object,
  data: T.object
}

/** This section is mandatory for next-18next translation to work */
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'footer']),
  },
})
 
export default withStyles(styles)(notFound);