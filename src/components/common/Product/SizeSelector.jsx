import React, { useEffect, useState, useMemo } from 'react';
import * as T from 'prop-types';
import { 
  Grid,
  withStyles 
} from '@material-ui/core';

import { useTranslation } from 'next-i18next';
import { capitalize, formatNumber, sortOptions } from 'src/utils';

const styles = (theme) => ({
  root: {
    width: '100%',
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

const SizeSelector = React.memo(({ classes, data, selected, onSelect, index }) => {
  const [selectedSize, setSelectedSize] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [showData, setShowData] = useState(false);
  const [sizeBlocks, setSizeBlock] = useState(null);

  const { t } = useTranslation(['common', 'order'])

  const handleSizeChange = async(e, size) => {
    if (e) {
      e.preventDefault();
    }

    setSelectedSize(size)
    onSelect(size, index);
  }

  const createSizeBlock = () => {
      if(sizes && selected) {
        let sizesArry = [];
        sizes.forEach((size) => {
            let sizeArry = size;
            const found = data.productProductItems.filter(item => {
              return item.productSize === size.id && item.productColor == selected.id;
            })
            if (found && found.length) {
              // only get valid variants
              sizeArry['price'] = found[0].retailPrice ? Number(found[0].retailPrice) : 0;
              sizesArry.push(sizeArry);
            }

        })
        const sizesAndPrices = sortOptions(sizesArry, 'price');

        if (!selectedSize) {
          handleSizeChange(null, sizesArry[0])
        }

        const blocks = sizesAndPrices.map((size, index) => {
            const foundPrice = size.price ? `$${formatNumber(size.price)}` : `N/A`;
            if (selectedSize && selectedSize.id === size.id) {
              return (
                <a title={`Select ${capitalize(size.name)} for ${foundPrice}`} key={index} className={classes.productSizeLinkSelected}><div className={classes.productSizeBox}><span>{size.name}</span><span>{`${foundPrice}`}</span></div></a>
              )
            } else {
              return (
                <a title={`Select ${capitalize(size.name)} for ${foundPrice}`} href="#" key={index} className={classes.productSizeLink} onClick={(e) => handleSizeChange(e, size)}><div className={classes.productSizeBox}><span>{size.name}</span><span>{`${foundPrice}`}</span></div></a>
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
  }

  
  const loadSizes = async() => {
    if (data) {
      const validSizes = data.productProductItems.filter(item => Number(item.status) == 1).map(item => item.productSizeId);
      const getTrueSizes = data.productSizes.filter(item => validSizes.includes(item.id))
      setSizes(getTrueSizes);
    }
  }

  const checkChanges = useMemo(() => {
    createSizeBlock();
  },[selected, sizes, selectedSize]);

  useEffect(() => {
    if (sizeBlocks && sizeBlocks.length) {
      const getSelectSize = data.selectedSize ? data.selectedSize : sizes[0];
      setSelectedSize(getSelectSize)
      setShowData(true)
    }
  }, [sizeBlocks]);

  useEffect(() => {
    loadSizes();
  }, []);

  return showData && (
    <Grid container>
      <Grid item lg={12} xs={12} className={classes.variantTitles}>{ t('sizes') }: { selectedSize ? selectedSize.name : '' }</Grid>
      <Grid item lg={12} xs={12} >
        {
          sizeBlocks
        }
      </Grid>
    </Grid>
  )
})

SizeSelector.propTypes = {
  classes: T.object,
  data: T.object,
  selected: T.object,
  onSelect: T.func,
  index: T.number
}

export default withStyles(styles)(SizeSelector);