import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  Grid,
  withStyles 
} from '@material-ui/core';

import { useTranslation } from 'next-i18next';
import { capitalize } from 'src/utils';

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  variantTitles: {
    margin: '10px 0px',
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
  productBundleLink: {
    marginRight: '2px',
    marginBottom: '2px',
    display: 'inline-block',
    color: 'grey',
    '&:hover': {
      backgroundColor: '#f8be15',
      color: 'white',
    }
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
  productBundleLinkDisabled: {
    textAlign: 'center',
    display: 'inline-block',
    color: 'rgba(0,0,0,.1)',
    cursor: 'not-allowed',
    borderRadius: '5px',
    '&:hover': {
      color: 'rgba(0,0,0,.1)',
      borderRadius: '5px',
    }
  },
});

const BundleSelector = React.memo(({ classes, data, onSelect, index, selected }) => {
  const [selectedBundle, setSelectedBundle] = useState(null);
  const [bundleBlocks, setBundleBlock] = useState(null);
  const [bundles, setBundles] = useState(null);
  const [showData, setShowData] = useState(false);

  const { t } = useTranslation(['common', 'order'])

  const loadBundles = async() => {
    const getBundles = data.selectedItem.productItemProductBundles
    if (getBundles) {
      setBundles(getBundles);
    }
  }

  const handleBundleChange = async(e, bundle) => {
    if (e) {
      e.preventDefault();
    }
    let currBundle = bundle;

    if (selectedBundle && selectedBundle.id === currBundle.id) {
      setSelectedBundle(null);
      currBundle = null;
    } else {
      setSelectedBundle(currBundle);
    }
    onSelect(bundle, index)
  }

  const createBundleBlock = () => {
    if(bundles && data.selectedItem) {
      let stock = data.selectedItem.stock;
      const validBundles = bundles.filter((bundle) => {
        return stock >= bundle.quantity
      })
      const blocks = validBundles.map((bundle, index) => {
        if (stock >= bundle.quantity) {
          stock -= bundle.quantity;
          if (selectedBundle && selectedBundle.id === bundle.id) {
            return (
              <a title={`Select ${capitalize(bundle.name)} for ${bundle.retailPrice}`} href="#" key={index} className={classes.productBundleLinkSelected} onClick={(e) => handleBundleChange(e, bundle)}><div className={classes.productBundleBox}><span>{bundle.name}</span><span>{`$${bundle.retailPrice}`}</span></div></a>
            )
          } else {
            return (
              <a title={`Select ${capitalize(bundle.name)} for ${bundle.retailPrice}`} href="#" key={index} className={classes.productBundleLink} onClick={(e) => handleBundleChange(e, bundle)}><div className={classes.productBundleBox}><span>{bundle.name}</span><span>{`$${bundle.retailPrice}`}</span></div></a>
            )
          }
        }
      })
      setBundleBlock(blocks);
    }
  }

  useEffect(() => {
    if (bundles && bundles.length) {
      createBundleBlock();
    }
  }, [bundles]);

  useEffect(() => {
      createBundleBlock();
  }, [selectedBundle]);

  useEffect(() => {
    if (bundleBlocks && bundleBlocks.length) {
      const getSelectBundle = data.bundle ? data.bundle : null;
      setSelectedBundle(getSelectBundle)
      setShowData(true)
    }
  }, [bundleBlocks]);

  useEffect(() => {
    loadBundles();
  }, []);

  return showData && (
    <div className={classes.root}>
      <Grid container>
        <Grid item lg={12} xs={12} className={classes.variantTitles}>{ t('bundles') }</Grid>
        <Grid item lg={12} xs={12} >
          {
            bundleBlocks
          }
        </Grid>
      </Grid>
    </div>
  );
})

BundleSelector.propTypes = {
  classes: T.object,
  data: T.object,
  onSelect: T.func,
  index: T.number,
  selected: T.object
}

export default withStyles(styles)(BundleSelector);