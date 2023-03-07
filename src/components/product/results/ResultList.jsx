import * as T from 'prop-types';
import {
  withStyles,
  Grid,
} from '@material-ui/core';
import Typography from '@/common/Typography';
import { useTranslation } from 'next-i18next'
import ProductItem from './ProductItem';
import { useMemo } from 'react';

const styles = () => ({
  itemsItemContainer: {
    justifyContent: 'center',
  },
});

const ResultList = ({ products = [], classes }) => {
  const { t } = useTranslation(['search'])
  const showProducts = useMemo(() => products.length ? true : false, [products])
  return (
    <Grid container className={classes.itemsItemContainer}>
      {
        showProducts ? products.map((data, index) => {
          return <ProductItem product={data} index={index} />
        }) : (
          <Grid item lg={12} xs={12}>
            <Typography align="center" variant="h4" component="h4" >{t('message.no_results_found')}</Typography>
          </Grid>
        )
      }
    </Grid>
  )
}

ResultList.propTypes = {
  products: T.array,
  classes: T.object,
}

export default withStyles(styles)(ResultList);