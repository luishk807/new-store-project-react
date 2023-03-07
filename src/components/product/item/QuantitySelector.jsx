import QuantitySelectorB from '@/common/QuantitySelectorB';
import {
  withStyles,
  Grid,
  Typography
} from '@material-ui/core';
import * as T from 'prop-types';
import { useTranslation } from 'next-i18next'
const styles = () => ({
  root: {
    width: '100%'
  },
  variantTitles: {
    margin: '10px 0px',
  },
  infoRowContent: {
    margin: '20px 0px',
    display: 'flex',
    alignItems: 'center',
  },
  infoRowContentQuantity: {
    alignItems: 'center'
  },
  productOutStock: {
    fontSize: '1.2em',
    color: 'red'
  },
  productStock: {
    fontSize: '1.2em',
    color: 'green'
  },
});

const QuantitySelector = ({
  product,
  classes,
  productStock,
  forceRefresh,
  onQuantityChange,
  outOfStock,
}) => {
  const { t } = useTranslation(['common', 'product', 'colors']);

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item lg={10} xs={12} className={classes.infoRowContent}>
          <Grid container className={classes.infoRowContentQuantity}>
            <Grid item lg={12} xs={12} className={classes.variantTitles}>{t('quantity')}</Grid>
            <Grid item lg={6} xs={6}>
              <QuantitySelectorB
                jump={product.bundle ? product.bundle.quantity : 0}
                stock={productStock}
                refresh={forceRefresh}
                onChange={onQuantityChange}
                id="quant-select"
              />
            </Grid>
            <Grid item lg={6} xs={6}>
              {
                outOfStock ? (
                  <Typography align="left" variant="h5" component="h5" className={classes.productOutStock}>{t('outofstock')}</Typography>
                ) : (
                  <Typography align="left" variant="h5" component="h5" className={classes.productStock}>{t('available')}</Typography>
                )
              }

            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

QuantitySelector.propTypes = {
  classes: T.object,
  product: T.object,
  forceRefresh: T.bool,
  onQuantityChange: T.func,
  outOfStock: T.bool,
}

export default withStyles(styles)(QuantitySelector);