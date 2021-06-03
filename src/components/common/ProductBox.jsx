import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles, 
  Grid,
  IconButton,
} from '@material-ui/core';
import { getImageBaseOnly } from '../../utils';
import { getProductById } from '../../api/products';
import Icons from './Icons';
import Typography from './Typography';

const styles = (theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    position: 'relative',
    border: '1px solid rgba(0,0,0,.09)',
  },
  icon: {
    color: 'black',
    width: '20%',
    [theme.breakpoints.down('sm')]: {
      width: '20%',
    },
  },
  productTitle: {
    position: 'absolute',
    bottom: '0',
    padding: '5px',
    width: '100%',
    color: 'white',
    background: 'black',
    fontSize: '.9em',
  },
  iconCont: {
    top: 0,
    right: 0,
    position: 'absolute',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  gridItemList: {
    position: 'relative',
    padding: 10,
  }
})

const ProductBox = ({classes, id, onDelete}) => {
  const [productImg, setProductImg] = useState(null);
  const [product, setProduct] = useState({});
  const [showData, setShowData] = useState(false);

  const loadProduct = async() => {
    const gProd = await getProductById(id)
    if (gProd) {
      setProduct(gProd);
      const img = getImageBaseOnly(gProd);
      setProductImg(img);
      setShowData(true);
    }
  }

  useEffect(() => {
    loadProduct();
  }, []);

  return showData && (
    <div className={classes.root}>
      <Grid container>
        <Grid item lg={12} xs={12}>
          <Typography className={classes.productTitle}>{product.name}</Typography>
          {
            productImg
          }
          <div className={classes.iconCont}>
            <IconButton className={classes.icon} onClick={(e)=>onDelete(false, product)}>
              <Icons name="close" />
            </IconButton>
          </div>
        </Grid>
      </Grid>
    </div>
   );
}
 
ProductBox.protoTypes = {
  classes: T.object,
  id: T.string,
  onDelete: T.func.isRequired,
}

export default withStyles(styles)(ProductBox);