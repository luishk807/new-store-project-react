import { useState, useEffect, useMemo } from 'react';
import {
  withStyles,
  Grid
} from '@material-ui/core';
import { getActiveProductBundlesByProductItemId } from '@/api/productBundles';
import * as T from 'prop-types';
import { useTranslation } from 'next-i18next'
import {
  capitalize,
} from 'src/utils';
const styles = () => ({
  root: {
    width: '100%'
  },
  infoRowContent: {
    margin: '20px 0px',
    display: 'flex',
    alignItems: 'center',
  },
  productBundleLinkSelected: {
    marginRight: '2px',
    marginBottom: '2px',
    display: 'inline-block',
    backgroundColor: '#f8be15',
    color: 'white',
    borderRadius: '5px',
    '&:hover': {
      color: 'white',
      borderRadius: '5px',
    }
  },
  productBundleLink: {
    marginRight: '2px',
    marginBottom: '2px',
    display: 'inline-block',
    color: 'grey',
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: '#f8be15',
      color: 'white',
    }
  },
  productBundleBox: {
    border: '1px solid #f8be15',
    borderRadius: '5px',
    display: 'flex',
    padding: '8px 10px',
    fontSize: '.8em',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
});

const BundleSelection = ({ classes, bundle, product, productStock, onBundleChange }) => {
  const [bundleBlocks, setBundleBlock] = useState(null);
  const [showBundles, setShowBundles] = useState(false);

  const { t } = useTranslation(['common', 'product', 'colors']);

  const bundles = useMemo(async () => {
    if (product && Object.keys(product).length) {
      const getBundles = await getActiveProductBundlesByProductItemId(product.id)
      if (getBundles) {
        return getBundles;
      }
    } else {
      return [];
    }
  }, [product]);

  const createBundleBlock = () => {
    setShowBundles(false);
    if (bundles.length && product && Object.keys(product).length) {
      let stock = productStock;
      const validBundles = bundles.filter((bundle) => {
        return stock >= bundle.quantity
      })
      const blocks = validBundles.map((itemBundle, index) => {
        if (stock >= itemBundle.quantity) {
          stock -= itemBundle.quantity;
          if (bundle && bundle.id === itemBundle.id) {
            return (
              <a title={`Select ${capitalize(itemBundle.name)} for ${itemBundle.retailPrice}`} href="#" key={index} className={classes.productBundleLinkSelected} onClick={(e) => onBundleChange(e, itemBundle)}><div className={classes.productBundleBox}><span>{itemBundle.name}</span><span>{`$${itemBundle.retailPrice}`}</span></div></a>
            )
          } else {
            return (
              <a title={`Select ${capitalize(itemBundle.name)} for ${itemBundle.retailPrice}`} href="#" key={index} className={classes.productBundleLink} onClick={(e) => onBundleChange(e, itemBundle)}><div className={classes.productBundleBox}><span>{itemBundle.name}</span><span>{`$${itemBundle.retailPrice}`}</span></div></a>
            )
          }
        }
      })
      setBundleBlock(blocks);
      setShowBundles(true);
    }
  }

  useEffect(() => {
    if (bundles && bundles.length) {
      createBundleBlock();
    }
  }, [bundles]);

  useEffect(() => {
    createBundleBlock();
  }, [bundle, productStock]);

  return showBundles && (
    <div className={classes.root}>
      <Grid container>
        <Grid item lg={10} xs={12} className={classes.infoRowContent}>
          <Grid container>
            <Grid item lg={12} xs={12} className={classes.variantTitles}>{t('bundles')}</Grid>
            <Grid item lg={12} xs={12} >
              {
                bundleBlocks
              }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

BundleSelection.propTypes = {
  classes: T.object,
  bundles: T.array,
  bundle: T.object,
  product: T.object,
  productStock: T.number,
  onBundleChange: T.func,
}

export default withStyles(styles)(BundleSelection);