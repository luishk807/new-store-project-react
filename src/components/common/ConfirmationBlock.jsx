import React from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
} from '@material-ui/core';
import Icons from '@/common/Icons';
import { useTranslation } from 'next-i18next'

const styles = (theme) => ({
  mainBlock: {
    width: '100%'
  },
  icons: {
    width: 80,
    height: 80,
    fill: 'green',
  },
  pageTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    fontWeight: 'bold',
    flexDirection: 'column',
  },
  linkStyle: {
    paddingTop: 30,
    display: 'inline-block',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  contentContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0px auto',
  },
  itemCont: {
    textAlign: 'center'
  }
});

const ConfirmationBlock = ({
  classes, 
  type, 
  data,
  url = null
}) => {
    const { t } = useTranslation('checkout');

    switch(type) {
      case "order_confirm": {
        return (
          <>
            <Grid container className={classes.mainBlock}>
              <Grid className={classes.pageTitle} item lg={12} xs={12}>
                <div><Icons name="success" classes={{icon: classes.icons}} /></div>
                <h1>Gracias!</h1>
              </Grid>
            </Grid>
            <Grid container className={classes.contentContainer}>
              <Grid item lg={6} xs={12} className={classes.itemCont}>
                <p>Hemos recibido su orden y su numero de confirmación es:<br/>
                <b>{data}</b>,<br/>le enviamos a su correo electrónico los datos para realizar el pago de acuerdo al método seleccionado</p>
                <p>Recuerde realizar su pago dentro de las 24 horas, de lo contrario su orden será cancelada automáticamente</p>
                <p>
                  <a href={url} className={classes.linkStyle}>{t('checkout:confirmation.back_to_home_page')}</a>
                </p>
              </Grid>
            </Grid>
          </>
        )
      }
      default:
        return (<Grid container><Grid>Empty</Grid></Grid>)
    }
}
ConfirmationBlock.protoTypes = {
  classes: T.object,
  type: T.string,
  data: T.string,
  url: T.string
} 


export default withStyles(styles)(ConfirmationBlock);