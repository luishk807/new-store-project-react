import { useState, useEffect } from 'react';
import {
  withStyles,
  Grid,
  Typography,
} from '@material-ui/core';
import * as T from 'prop-types';
import moment from 'moment';
import { isAroundTime } from 'src/utils';
import { useTranslation } from 'next-i18next'

const styles = () => ({
  root: {
    width: '100%',
  },
  descriptionTitle: {
    fontSize: '1.2em',
    margin: '10px 0px',
  },
});

const DiscountItem = ({ classes, product }) => {
  const [discountHtml, setDiscountHtml] = useState(null);
  const [showDiscount, setShowDiscount] = useState(false);
  const { t } = useTranslation(['common', 'product', 'colors'])

  const getDiscountHtml = (product) => {
    setShowDiscount(false);
    const discounts = product.productProductDiscount.filter((item) => {
      if (item.useDate) {
        if (isAroundTime(item.startDate, item.endDate)) {
          return item
        }
      } else {
        return item
      }
    })
    if (discounts) {
      const discountBlocks = discounts.map((item, index) => {
        let hitem = <li key={index}>{item.name}</li>;
        if (item.useDate) {
          hitem = <li key={index}>{`${item.name} hasta ${moment(item.endDate).format('DD-MM-YYYY')}`}</li>;
        }
        return hitem
      })
      setDiscountHtml(discountBlocks);
      setShowDiscount(true);
    }
  }


  useEffect(() => {
    if (product.productProductDiscount && product.productProductDiscount.length) {
      getDiscountHtml(product);
    }
  }, [product])

  return showDiscount && (
    <div className={classes.root}>
      <Typography align="left" variant="h4" component="h4" className={classes.descriptionTitle}>{t('deals')}</Typography>
      <ul>
        {discountHtml && discountHtml}
      </ul>
    </div>
  )
}

DiscountItem.propTypes = {
  classes: T.object,
  product: T.object,
}

export default withStyles(styles)(DiscountItem);