import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles, 
  Fade,
  Backdrop,
  Grid,
  IconButton,
  Paper,
} from '@material-ui/core';
import { getImageUrlByType } from '../../utils/form';
import { getProductById } from '../../api/products';
import Icons from './Icons';
import Typography from './Typography';
import { noImageUrl } from '../../../config';

const styles = (theme) => ({
  root: {
    width: '100%',
    margin: 5,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    position: 'relative',
  },
  icon: {
    color: 'black',
    width: '30%',
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
    backgroundImage: 'linear-gradient(transparent, rgba(0,0,0,.5))',
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

const ProductBox = React.memo(({classes, title, id, onDelete}) => {
  const [product, setProduct] = useState({});
  const [showData, setShowData] = useState(false);

  const fetchProduct = async(id) => {
    const prod = await getProductById(id);
    if (prod) {
      setProduct(prod);
      setShowData(true);
    }
  };

  useEffect(() => {
    fetchProduct(id);
  }, [id]);
  
  const imgMainUrl = getImageUrlByType(title);
  
  let productImg = `${noImageUrl}`;

  if (product && product.productImages && product.productImages.length) {
    productImg = `${imgMainUrl}/${product.productImages[0].img_url}`;
  }

  return showData && (
    <div className={classes.root}>
      <Grid container>
        <Grid item lg={12} xs={12}>
          <Typography className={classes.productTitle}>{product.name}</Typography>
          <img className="img-fluid" src={productImg} />
          <div className={classes.iconCont}>
            <IconButton className={classes.icon} onClick={()=>onDelete(id)}>
              <Icons name="close" />
            </IconButton>
          </div>
        </Grid>
      </Grid>
    </div>
   );
})
 
ProductBox.protoTypes = {
  classes: T.object,
  id: T.object,
  onDelete: T.func.isRequired,
}

export default withStyles(styles)(ProductBox);