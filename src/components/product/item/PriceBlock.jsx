import { useEffect, useState } from "react";
import {
  withStyles,
  Grid,
} from '@material-ui/core';
import * as T from 'prop-types';
import { useTranslation } from 'next-i18next'

const styles = (theme) => ({
  root: {
    width: '100%'
  },
  infoRowContent: {
    margin: '20px 0px',
    display: 'flex',
    alignItems: 'center',
  },
  productPriceContainer: {
    padding: '5px 0px'
  },
  productPriceInContainer: {
    alignItems: 'center'
  },
  productPrice: {
    fontSize: '1.2rem',
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2em',
      textAlign: 'left',
    }
  },
  productPriceNumber: {
    fontWeight: 'bold',
    color: '#B12704',
    fontSize: '1.2rem'
  },
  productPriceDeal: {
    fontSize: '1.2rem',
    textAlign: 'left',
    fontWeight: '600',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1em',
      textAlign: 'center',
    }
  },
  priceSave: {
    color: 'red',
  },
  productPriceScratch: {
    textDecoration: 'line-through',
  },
  previousPriceBoxSaved: {
    background: 'red',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '.7em',
    padding: '5px 7px',
    margin: '8px 0px',
  },
  previousPriceBox: {
    margin: '10px 0px'
  },
})

const PriceBlock = ({ classes, product, dealPrice = '' }) => {
  const { t } = useTranslation(['common', 'product', 'colors'])
  const [priceBlock, setPriceBlock] = useState(null);

  useEffect(() => {
    if (product && Object.keys(product).length) {
      const getProductPriceComponent = (value, isScratched = false) => {
        return (
          <>
            <Grid item lg={4} xs={5} className={classes.productPrice}>
              <span>{t('unit_price')}:</span>
            </Grid>
            <Grid item lg={8} xs={7} className={[(isScratched) ? classes.productPriceScratch : {}, classes.productPriceNumber].join(' ')}>
              <span>&nbsp;$ {value}</span>
            </Grid>
            {
              product.prevRetailPrice && (
                <Grid item lg={12} xs={12} className={classes.previousPriceBox}>
                  <span>
                    <span className={classes.previousPriceBoxSaved}
                    >{t('product:saved_previous', {
                      total: formatNumber(product.prevRetailPrice -
                        Number(product.originalPrice ? product.originalPrice : product.retailPrice))
                    })}
                    </span>&nbsp;
                    {
                      t('product:retail_previous', {
                        total: formatNumber(product.prevRetailPrice)
                      })
                    }
                  </span>
                </Grid>
              )
            }
          </>)
      }

      const getProductPriceDealComponent = (value) => {
        return (
          <>
            <Grid item lg={4} xs={4} className={classes.productPriceDeal}>
              <span>{t('price_with_discount')}:</span>
            </Grid>
            <Grid item lg={8} xs={8} className={classes.productPriceDeal}>
              <span>&nbsp;$ {value}</span>
            </Grid>
          </>)
      }

      const getProductPriceSavings = (value) => {
        return (
          <>
            <Grid item lg={4} xs={4} className={classes.productPrice}>
              <span>{t('savings')}:</span>
            </Grid>
            <Grid item lg={8} xs={8} className={classes.priceSave}>
              <span>&nbsp;$ {value}</span>
            </Grid>
          </>
        )
      }

      if (product.discount) {
        setPriceBlock(
          <Grid container className={classes.productPriceInContainer}>
            {getProductPriceComponent(product.originalPrice, true)}
            {getProductPriceDealComponent(dealPrice)}
            {getProductPriceSavings(`-${product.save_price} (${product.save_percentag_show})`)}
          </Grid>)
      } else {
        setPriceBlock(
          <Grid container className={classes.productPriceInContainer}>
            {getProductPriceComponent(product.retailPrice ? product.retailPrice : `0.00`)}
          </Grid>
        )
      }
    }
  }, [product, dealPrice])

  useEffect(() => {
  }, [priceBlock])
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item lg={10} xs={12} className={classes.infoRowContent}>
          {priceBlock}
        </Grid>
      </Grid>
    </div>
  );
}

PriceBlock.propTypes = {
  classes: T.object,
  product: T.object,
  dealPrice: T.string,
}

export default withStyles(styles)(PriceBlock);