import React, {useState, useEffect} from 'react';
import * as T from 'prop-types';
import ImageGallery from 'react-image-gallery';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { updateCart,addCart } from '../../redux/actions/main';
import { useRouter } from 'next/router';
import {
  Grid,
  withStyles,
  Link,
  FormControl,
  Button,
  TextField,
  Typography,
  Divider,
} from '@material-ui/core';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';

//import Typography from '../components/common/Typography';
import { getImageUrlByType } from '../../utils/form';
import { calculateRate } from '../../utils';
import { ADMIN_SECTIONS } from '../../constants/admin';
import LayoutTemplate from '../../components/common/Layout/LayoutTemplate';
import { ProductSample } from '../../constants/samples/ProductSample';
import Rate from '../../components/common/Rate';
import RateBox from '../../components/common/RateBox';
import Select from '../../components/common/QuanitySelector';
import Icons from '../../components/common/Icons';
import Snackbar from '../../components/common/Snackbar';
import { getItemById } from '../../api';
import { setProducts } from '../../redux/actions/main';

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
  qaItem: {
    display: 'flex',
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
  qaDivider: {
    margin: '5px 0px',
  },
  textContainer: {
    width: '100%',
    margin: '20px 0px',
  },
  textInput: {
    // flexGrow: 2,
    width: '100%',

  },
  textButton: {
    width: '100%',
    height: '100%'
  }
});

const Index = ({classes, data = ProductSample, cart, updateCart, addCart}) => {
  const router = useRouter()
  const id = router.query.pid;
  const [images, setImages] = useState({});
  const [rate, setRate] = useState(2);
  const [productInfo, setProductInfo] = useState({});
  const [hover, setHover] = useState(-1);
  const [showData, setShowData] = useState(false);
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

  const handleSelectChange = async(resp) => {
    const index = resp.id.split("-")[1]
    productInfo['quantity'] = resp.value;
    // await updateCart(cart[index])
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
      const rate = calculateRate(getProductInfo);
      setRate(rate);
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
            <Grid container>
              <Grid item lg={12} sm={12}>
                <Typography align="center" variant="h4" component="h3">Opiniones del Cliente</Typography>
              </Grid>
              <Grid item lg={12} sm={12} align="center">
                <Rate data={rate} onChange={(event, newValue)=>setRate(newValue)} onChangeActive={(event, newHover)=>setHover(newHover)} />
              </Grid>
              <Grid item lg={12} sm={12}>
                <RateBox data={productInfo} />
              </Grid>
            </Grid>
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
                {/* <Rate data={productInfo.seller.rate} disabled={true} /> */}
            </Typography>
            {/* <Typography align="left" variant="body1" component="p">{productInfo.seller.desc}</Typography> */}
          </Grid>
        </Grid>
        {/* Q&A section */}
        <Grid container>
          <Grid item lg={12}>
            <Typography align="left" variant="h4" component="h4">Preguntas y respuestas</Typography>
          </Grid>
          <Grid item lg={12}>
            <FormControl className={classes.textContainer}>
              <Grid container spacing={2}>
                <Grid item lg={10} sm={12}>
                  <TextField className={classNames(classes.textInput)} id="outlined-basic" label="Tu pregunta" variant="outlined" />
                </Grid>
                <Grid item lg={2} sm={12}>
                  <Button className={classNames(classes.textButton)} variant="contained" color="primary" component="span">
                    Preguntar
                  </Button>
                </Grid>
              </Grid>
            </FormControl>
          </Grid>
          <Grid item lg={12} sm={12} className={classes.qaTitleContainer}>
            <Typography align="left" variant="h5" component="h5">Ultima Preguntas</Typography>
            <Divider className={classes.qaDivider} />
          </Grid>
          <Grid item lg={12}>
            <Grid container spacing={2}>
            {
              productInfo.product_questions.map((question, index) => {
                return (index % 2 !== 0) ? (
                  <Grid key={index} item lg={12}>
                    <Grid container>
                      <Grid item lg={12} className={classes.qaItem}>
                        <MessageOutlinedIcon width="20" height="20"/>
                         &nbsp;&nbsp;<Typography align="left" variant="body1" component="div">{question.question}</Typography>
                      </Grid>
                      <Grid item lg={12}>
                        <Typography align="left" variant="caption" component="legend">{question.name}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid key={index} item lg={12}>
                    <Grid container>
                      <Grid item lg={12} className={classes.qaItem}>
                        <CommentOutlinedIcon width="20" height="20"/>
                         &nbsp;&nbsp;<Typography align="left" variant="body1" component="div">{question.question}</Typography>
                      </Grid>
                      <Grid item lg={12}>
                        <Typography align="left" variant="caption" component="legend">{question.name}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                )
              })
            }
            </Grid>
          </Grid>
        </Grid>
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