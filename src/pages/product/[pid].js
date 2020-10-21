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
  Typography
} from '@material-ui/core';

//import Typography from '../components/common/Typography';
import { getImageUrlByType } from '../../utils/form';
import { ADMIN_SECTIONS } from '../../constants/admin';
import LayoutTemplate from '../../components/common/Layout/LayoutTemplate';
import { ProductSample } from '../../constants/samples/ProductSample';
import Rate from '../../components/common/Rate';
import Select from '../../components/common/QuanitySelector';
import Icons from '../../components/common/Icons';
import Snackbar from '../../components/common/Snackbar';
import { getItemById } from '../../api';
import { setProducts } from '../../redux/actions/main';
import RateBox from '../../components/RateBoxSimple';
import QuestionsAnswers from '../../components/QuestionsAswers';

const styles = (theme) => ({
  root: {
    padding:10
  },
  deliveryText: {
    color: '#51DC55',
    margin: '10px 0px',
  },
  infoRowContent: {
    margin: '20px 0px',
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
    width: '100%'
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
    const imgs = data.product_images.map((img) => {
        return {
          original: `${imageUrl}/${img.img_url}`,
          thumbnail: `${imageUrl}/${img.img_url}`,
        }
    });
    console.log('image', imgs)
    setImages(imgs);
  }

  const onAddCart = async() => {
    console.log(productInfo)
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
      console.log('product', getProductInfo)
      loadImages(getProductInfo)
      setProductInfo(getProductInfo);
      setShowData(true);
    }
    loadProductInfo();
  }, [])

  return showData && (
    <LayoutTemplate>
      <div className={classes.root}>
        <Grid container>
          <Grid item lg={9} sm={12}>
            <Grid container spacing={2}>
              <Grid item lg={8} sm={12}>
                <Grid container>
                  <Grid item lg={12} sm={12}>
                    <ImageGallery items={images} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={4} sm={12}>
                <Grid container>
                  <Grid item>
                   <Typography align="center" variant="h4" component="h3">{productInfo.name}</Typography>
                  </Grid>
                  <Grid item lg={12}>
                    <Typography align="center" variant="h1" component="h2">US ${productInfo.amount}</Typography>
                  </Grid>
                  <Grid item lg={12}>
                    <Select onChange={handleSelectChange} className={classes.dropDown} title="quant" id="quant-select" />
                  </Grid>
                  <Grid item lg={12} className={classes.infoRowContent}>
                    <Button onClick={onAddCart} className={`mainButton ${classes.addCartBtn}`}>Add To Cart</Button>
                  </Grid>
                  <Grid item lg={12} className={classes.infoRowContent}>
                    <Typography align="left" variant="h5" component="h5">Disponibilidad: {productInfo.stock}</Typography>
                  </Grid>
                  <Grid item lg={12}>
                    <Typography className={classes.deliveryText} align="left" variant="body1" component="p">
                      <Icons name="delivery" classes={{icon: classes.deliveryIcon}}  />&nbsp;Entrega a todo Panama
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3} sm={12}>
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
            <Typography align="left" variant="body1" component="p">{`${productInfo.vendors.first_name} ${productInfo.vendors.last_name}`}[<Link href="#">Ver Mas</Link>]</Typography>
            <Typography align="left" variant="body1" component="div">
                <Rate data={4} disabled={true} />
            </Typography>
            <Typography align="left" variant="body1" component="p">{productInfo.vendors.description}</Typography>
          </Grid>
        </Grid>
        {/* Q&A section */}
        <QuestionsAnswers data={productInfo}/>
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