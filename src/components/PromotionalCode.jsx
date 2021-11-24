import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
  Button,
  TextField,
} from '@material-ui/core';

import { getActivePromotionCodeByCode, getPromotionCodeById } from 'src/api/promotionCodes';
import Snackbar from './common/Snackbar';
import { useTranslation } from 'next-i18next'

const styles = (theme) => ({
  root: {

  },
  title: {
    margin: '10px 0px',
    '& h4': {
      fontSize: '1em',
      fontWeight: 'bold'
    }
  },
  button: {
    margin: '0px !important',
    height: '100%',
  },
  itemInput: {
    '& input': {
      background: 'white'
    }
  },
  itemBtn: {
    width: '100%',
    padding: '0px 5px',
  },
  selectedPromoCont: {
    border: 'dashed 2px rgba(0,0,0,.5)'
  },
  selectedPromoItem: {
    padding: 10,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'start',
  },
  selectedPromoButton: {
    padding: 5,
  }
});

const PromotionalCode = ({classes, onApply, couponId}) => {
  const [promoCode, setPromoCode] = useState(null);
  const [input, setInput] = useState('')
  const [showData, setShowData] = useState(false);
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });
  const { t } = useTranslation(['common', 'order', 'checkout'])

  const closePromoCode = async() => {
    setShowData(false);
    setPromoCode(null)
    onApply(null)
    setSnack({
      severity: 'error',
      open: true,
      text: 'Descuento removido',
    })
  }

  const loadPromo = async(evt) => {
    if (input && input.length > 5) {
      const getPromo = await getActivePromotionCodeByCode({
        code: input
      });
      if (getPromo) {
        setPromoCode(getPromo)
        onApply(getPromo)
        setSnack({
          severity: 'success',
          open: true,
          text: 'Descuento applicado',
        })
      }
    }
  }

  const handleClickApply = () => {
    loadPromo();
  }

  const loadPromoById = async(id) => {
    const getPromo = await getPromotionCodeById(id);
    if (getPromo) {
      setPromoCode(getPromo)
      onApply(getPromo)
      setSnack({
        severity: 'success',
        open: true,
        text: 'Descuento applicado',
      })
    }
  }
  
  useEffect(() => {
    if (promoCode) {
      setShowData(true);
    } else {
      setShowData(false);
    }
  }, [promoCode])

  useEffect(() => {
    if (couponId) {
      loadPromoById(couponId)
    }
  }, [couponId])

  return (
    <div className={classes.root} id="vendorSection">
      <Grid container>
          <Grid item lg={12} xs={12} className={classes.title}>
            <h4>{ t('checkout:apply_coupon') }</h4>
          </Grid>
          {
            showData ? (
              <Grid item lg={12} xs={12}>
                <Grid container className={classes.selectedPromoCont}>
                  <Grid item lg={10} className={classes.selectedPromoItem}>
                    {promoCode.name}
                  </Grid>
                  <Grid item lg={2} className={classes.selectedPromoButton}>
                    <Button onClick={closePromoCode} className={`mainButton`}>
                      {t('checkout:remove')}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <Grid item lg={12} xs={12}>
                <Grid container>
                  <Grid item lg={9} xs={9} className={classes.itemInput}>
                    <TextField 
                      fullWidth
                      variant="outlined" 
                      name="promoCode"
                      onChange={(e) => setInput(e.target.value) }
                      label={t('checkout:message.insert_coupon')}
                    />
                  </Grid>
                  <Grid item lg={3} xs={3} className={classes.itemBtn}>
                    <Button onClick={handleClickApply} className={`${classes.button} mainButton`}>
                        Aplicar
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            )
          }
        </Grid>
        <Snackbar open={snack.open} severity={snack.severity} content={snack.text} />
    </div>
  );
}

PromotionalCode.protoTypes = {
  couponId: T.number,
  classes: T.object,
  onApply: T.object,
}

export default withStyles(styles)(PromotionalCode);