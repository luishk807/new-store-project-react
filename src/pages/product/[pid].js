import React, {useState, useEffect } from 'react';
import * as T from 'prop-types';
import ImageGallery from 'react-image-gallery';
import { connect } from 'react-redux';
import { updateCart,addCart } from '../../redux/actions/main';
import { useRouter } from 'next/router';
import {
  Grid,
  withStyles,
  Link,
  Button,
  Divider,
  Typography
} from '@material-ui/core';

import { getImageUrlByType } from '../../utils/form';
import { noImageUrl } from '../../../config';
import { ADMIN_SECTIONS } from '../../constants/admin';
import LayoutTemplate from '../../components/common/Layout/LayoutTemplate';
import { ProductSample } from '../../constants/samples/ProductSample';
import Select from '../../components/common/QuanitySelector';
import Icons from '../../components/common/Icons';
import Snackbar from '../../components/common/Snackbar';
import { getItemById } from '../../api';
import WishListIcon from '../../components/common/WishListIcon';
import ProductQuestionBox from '../../components/product/QuestionBox';
import RateBox from '../../components/rate/Simple';
import RateFullView from '../../components/rate/FullView';
import VendorBox from '../../components/vendorBox';

const styles = (theme) => ({
  root: {
    padding:10,
    [theme.breakpoints.down('sm')]: {
      '& p': {
        lineHeight: '2 !important',
      }
    }
  },
  productName: {
    fontSize: '4rem',
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      fontSize: '3em',
    }
  },
  productPriceContainer: {
    padding: '5px 0px'
  },
  productPrice: {
    fontSize: '3.5rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2em',
    }
  },
  deliveryText: {
    color: '#51DC55',
    margin: '10px 0px',
  },
  infoRowContent: {
    margin: '20px 0px',
    display: 'flex',
    alignItems: 'center',
  },
  deliveryIcon: {
    width: 80,
    height: 80,
    fill: '#51DC55',
  },
  productBottomSec: {
    padding: 10,
  },
  dropDown: {
    width: '100%',
  },
  addCartBtn: {
    width: '100%',
    height: '100%',
  },
  qaTitleContainer: {
    margin: '20px 0px',
  },
  textInput: {
    width: '100%',
  },
  rateBox: {
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    }
  },
});

const Index = ({classes, data = ProductSample, cart, updateCart, addCart}) => {
  const router = useRouter()
  const id = router.query.pid;
  const [images, setImages] = useState({});
  const [productInfo, setProductInfo] = useState({});
  const [showData, setShowData] = useState(false);
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

  const handleSelectChange = async(resp) => {
    const index = resp.id.split("-")[1]
    setProductInfo({
      ...productInfo,
      'quantity': resp.value
    })
  };

  const loadImages = (data) => {
    const imageUrl = getImageUrlByType('product');
    let imgs = [];

    if (data.productImages.length) {
        imgs = data.productImages.map((img) => {
          return {
            original: `${imageUrl}/${img.img_url}`,
            thumbnail: `${imageUrl}/${img.img_url}`,
          }
      });
    }

    setImages(imgs);
  }

  const onAddCart = async() => {
    if (!productInfo.quantity) {
      setSnack({
        severity: 'error',
        open: true,
        text: 'Please choose quantity',
      })
    } else {
      await addCart(productInfo)
    }
  }

  useEffect(()=>{
    const loadProductInfo = async() => {
      const getProductInfo = await getItemById(ADMIN_SECTIONS.product.url, id)
      loadImages(getProductInfo)
      setProductInfo(getProductInfo);
      setShowData(true);
    }
    loadProductInfo();
  }, [id])

  return showData && (
    <LayoutTemplate>
      <div className={classes.root}>
        <Grid container>
          <Grid item lg={9} xs={12}>
            <Grid container spacing={2}>
              <Grid item lg={8} xs={12}>
                <Grid container>
                  <Grid item lg={12} xs={12} align="center">
                    {
                      images.length ? (
                        <ImageGallery items={images} />
                      ) : (
                        <img className={`img-fluid`} src={noImageUrl.img} alt={noImageUrl.alt} />
                      )
                    }
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={4} xs={12}>
                <Grid container>
                  <Grid item lg={12} xs={12}>
                   <Typography className={classes.productName} align="center" variant="h4" component="h3">{productInfo.name}</Typography>
                  </Grid>
                  <Grid item lg={12} xs={12} className={classes.productPriceContainer}>
                    <Typography  className={classes.productPrice} align="center" variant="h1" component="h2">US ${productInfo.amount}</Typography>
                  </Grid>
                  <Grid item lg={12} xs={12}>
                    <Select onChange={handleSelectChange} className={classes.dropDown} title="quant" id="quant-select" />
                  </Grid>
                  <Grid item lg={12}  xs={12} className={classes.infoRowContent}>
                    <Button onClick={onAddCart} className={`mainButton ${classes.addCartBtn}`}>Add To Cart</Button>
                    <WishListIcon product={productInfo.id} />
                  </Grid>
                  <Grid item lg={12}  xs={12} className={classes.infoRowContent}>
                    <Typography align="left" variant="h5" component="h5">Disponibilidad: {productInfo.stock}</Typography>
                  </Grid>
                  <Grid item lg={12}  xs={12} className={classes.infoRowContent}>
                    <Typography className={classes.deliveryText} align="left" variant="body1" component="p">
                      <Icons name="delivery" classes={{icon: classes.deliveryIcon}}  /> Entrega a todo Panama
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3} sm={12} className={classes.rateBox}>
            <RateBox data={productInfo} />
          </Grid>
        </Grid>
        {/* Review and Seller */}
        <Grid container spacing={2}>
          <Grid item lg={8} sm={12}>
            <Typography align="left" variant="h4" component="h4">Description</Typography>
            <Typography align="left" variant="body1" component="p">{productInfo.description}</Typography>
          </Grid>
          <Grid item lg={4} sm={12}>
            <Typography align="left" variant="h4" component="h4">Acerca del Vendedor</Typography>
            {
              productInfo.vendor && <VendorBox id={productInfo.vendor} />
            }
          </Grid>
        </Grid>
        {/* Q&A section */}
        <ProductQuestionBox data={productInfo}/>
         {/* Rate section */}
        <RateFullView data={productInfo} />
        {/* Gallery thumb */}
        <Grid container>
          <Grid item></Grid>
        </Grid>
        <Snackbar open={snack.open} severity={snack.severity} onClose={()=>{setSnack({...snack,open:false})}} content={snack.text} />
      </div>

    </LayoutTemplate>
  );
}

Index.protoTypes = {
  classes: T.object,
  data: T.object,
}
const mapStateToProps = state => ({
  cart: state.cart
}) // add reducer access to props
const mapDispatchToProps = {
  updateCart: updateCart,
  addCart: addCart
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Index));