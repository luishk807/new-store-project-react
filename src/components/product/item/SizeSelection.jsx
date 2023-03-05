import { useEffect, useCallback, useState } from 'react';
import { useTranslation } from 'next-i18next'
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import {
  formatNumber,
  capitalize,
  sortOptions,
} from 'src/utils';
import * as T from 'prop-types';

const styles = () => ({
  root: {
    width: '100%'
  },
  variantTitles: {
    margin: '10px 0px',
  },
  productSizeBox: {
    border: '1px solid #f8be15',
    borderRadius: '5px',
    display: 'flex',
    padding: '8px 10px',
    fontSize: '.8em',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  productSizeLink: {
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
  productSizeLinkSelected: {
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
  productSizeLinkDisabled: {
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

const SizeSelection = ({
  classes,
  sizes = [],
  size,
  color,
  product,
  onSizeChange
}) => {
  const [sizeBlocks, setSizeBlock] = useState(null);
  const { t } = useTranslation(['common', 'product', 'colors'])

  const createSizeBlock = useCallback((color = null) => {
    if (sizes && color) {
      let sizesArry = [];
      sizes.forEach((size) => {
        let sizeArry = size;
        const found = product.productProductItems.filter(item => {
          return item.productSize === size.id && item.productColor == color.id;
        })
        if (found && found.length) {
          // only get valid variants
          sizeArry['price'] = found[0].retailPrice ? Number(found[0].retailPrice) : 0;
          sizesArry.push(sizeArry);
        }

      })
      const sizesAndPrices = sortOptions(sizesArry, 'price');

      if (!size) {
        onSizeChange(null, sizesArry[0])
      }

      const blocks = sizesAndPrices.map((itemSize, index) => {
        const foundPrice = itemSize.price ? `$${formatNumber(itemSize.price)}` : `N/A`;
        if (size && size.id === itemSize.id) {
          return (
            <a title={`Select ${capitalize(itemSize.name)} for ${foundPrice}`} key={index} className={classes.productSizeLinkSelected}><div className={classes.productSizeBox}><span>{itemSize.name}</span><span>{`${foundPrice}`}</span></div></a>
          )
        } else {
          return (
            <a title={`Select ${capitalize(itemSize.name)} for ${foundPrice}`} href="#" key={index} className={classes.productSizeLink} onClick={(e) => onSizeChange(e, itemSize)}><div className={classes.productSizeBox}><span>{itemSize.name}</span><span>{`${foundPrice}`}</span></div></a>
          )
        }
      })

      setSizeBlock(blocks);

    } else {
      if (sizes && sizes.length) {
        const blocks = sizes.map((size, index) => {
          return (
            <a key={index} className={classes.productSizeLinkDisabled}><div className={classes.productSizeBox}>{size.name}</div></a>
          )
        })
        setSizeBlock(blocks);
      }
    }
  }, [size, color]);

  useEffect(() => {
    if (sizes && sizes.length) {
      createSizeBlock();
    }
  }, [sizes]);

  useEffect(() => {
    if (color || size) {
      createSizeBlock(color);
    }
  }, [color, size]);

  if (!sizes.length) {
    return;
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item lg={10} xs={12} className={classes.infoRowContent}>
          <Grid container>
            <Grid item lg={12} xs={12} className={classes.variantTitles}>{t('sizes')}: {size ? size.name : ''}</Grid>
            <Grid item lg={12} xs={12} >
              {sizeBlocks}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

SizeSelection.propTypes = {
  classes: T.object,
  sizes: T.array,
  color: T.object,
  size: T.object,
  product: T.object,
  onSizeChange: T.func,
}


export default withStyles(styles)(SizeSelection);