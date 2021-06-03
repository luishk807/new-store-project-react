import React from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
  Button,
} from '@material-ui/core';
import { useTranslation } from 'next-i18next'

const styles = (theme) => ({
  root: {
    width: '100%'
  },
  container: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  leftItem: {

  },
  ul: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    '& li': {
      borderTop: '1px solid rgba(0,0,0,.05)',
      borderLeft: '1px solid rgba(0,0,0,.05)',
      borderRight: '1px solid rgba(0,0,0,.05)',
    },
    '& li:last-child': {
      borderBottom: '1px solid rgba(0,0,0,.05)',
    },
    '& li a': {
      width: '100%',
      display: 'inline-block',
      padding: 10,
      '&:hover': {
        background: 'black',
        color: 'white'
      },
    },
  }
});

const OrderLeftColumn = ({classes, children}) => {
  const { t } = useTranslation('order')
  return (
    <div>
      <Grid container className={classes.container}>
        <Grid item lg={2} xs={12} className={classes.leftItem}>
          <ul className={classes.ul}>
            <li><a href="/account/orders">{ t('order_page') }</a></li>
          </ul>
        </Grid>
        <Grid item lg={7} xs={12}>
          { 
            children
          }
        </Grid>
      </Grid>
    </div>
  );
}
 
OrderLeftColumn.protoTypes = {
  classes: T.object,
  children: T.node,
}

export default withStyles(styles)(OrderLeftColumn);