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
  Hidden,
  Divider,
  Typography,
  ButtonGroup
} from '@material-ui/core';
import moment from 'moment';

import { getImageUrlByType } from '../../utils/form';
import { checkDiscountPrice } from '../../utils/products';
import { formatNumber, isAroundTime } from '../../utils';
import { noImageUrl } from '../../../config';
import { ADMIN_SECTIONS } from '../../constants/admin';
import LayoutTemplate from '../../components/common/Layout/LayoutTemplate';
import { ProductSample } from '../../constants/samples/ProductSample';
import Select from '../../components/common/QuantitySelector';
import Icons from '../../components/common/Icons';
import Snackbar from '../../components/common/Snackbar';
import QuantitySelectorB from '../../components/common/QuantitySelectorB';
import { getItemById } from '../../api';
import { getProductById } from '../../api/products';
import { getProductItemById } from '../../api/productItems';
import ProgressBar from '../../components/common/ProgressBar';
import WishListIcon from '../../components/common/WishListIcon';
import ProductQuestionBox from '../../components/product/QuestionBox';
import RateBox from '../../components/rate/Simple';
import RateFullView from '../../components/rate/FullView';
import VendorBox from '../../components/vendorBox';
import { getDisplayName } from 'next/dist/next-server/lib/utils';

const styles = (theme) => ({
  root: {
    padding:10,
    [theme.breakpoints.down('sm')]: {
      '& p': {
        lineHeight: '2 !important',
      }
    }
  },
  productBrand: {
    fontSize: '1.5em',
    textAlign: 'left',
    color: 'rgba(0,0,0,.4)',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2em',
      margin: '10px 0px',
    }
  },
  productName: {
    fontSize: '2rem',
    fontWeight: 'bold',
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      fontSize: '3em',
      textAlign: 'center',
    }
  },
  productPriceContainer: {
    padding: '5px 0px'
  },
  productPrice: {
    fontSize: '1.5rem',
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2em',
      textAlign: 'center',
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
  variantRowContent: {
    margin: 0,
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
  productStock: {
    fontSize: '1.2em',
    fontWeight: 'bold',
  },
  productColorBox: {
    width: 50,
    height: 28,
    // cursor: 'pointer',
    border: '1px solid white',
    padding: 5,
    display: 'inline-block',
  },
  productColorLink: {
    margin: '3px',
    display: 'inline-block',
    lineHeight: '0px',
    outline: '1px solid rgba(0,0,0,.2)',
    '&:hover': {
      outline: '2px solid rgba(0,0,0)',
    },
  },
  productColorLinkSelected: {
    margin: '3px',
    display: 'inline-block',
    lineHeight: '0px',
    outline: '2px solid rgba(0,0,0)',
  },
  productSizeBox: {
    border: '1px solid white',
    display: 'flex',
    outline: '1px solid rgba(0,0,0,.09)',
    padding: '8px 10px',
    fontSize: '.8em',
    alignItems: 'center',
    justifyContent: 'center',
  },
  variantTitles: {
    margin: '10px 0px',
  },
  productSizeLink: {
    display: 'inline-block',
    color: 'grey',
    '&:hover': {
      backgroundColor: '#f8be15',
      color: 'white',
    }
  },
  productSizeLinkSelected: {
    display: 'inline-block',
    backgroundColor: '#f8be15',
    color: 'white',
    '&:hover': {
      color: 'white',
    }
  },
  productSizeLinkDisabled: {
    display: 'inline-block',
    color: 'rgba(0,0,0,.1)',
    cursor: 'not-allowed',
    '&:hover': {
      color: 'rgba(0,0,0,.1)',
    }
  },
  descriptionItem: {
    margin: '10px 0px',
  },
  descriptionTitle: {
    fontSize: '1.2em',
    margin: '10px 0px',
  }
});

const Index = ({classes, data = ProductSample, cart, updateCart, addCart}) => {
  const router = useRouter()
  const id = router.query.pid;
  const [forceRefresh, setForceRefresh] = useState(false);
  const [images, setImages] = useState({});
  const [productInfo, setProductInfo] = useState({});
  const [showData, setShowData] = useState(false);
  const [discountHtml, setDiscountHtml] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [showDiscount, setShowDiscount] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeBlocks, setSizeBlock] = useState(null);
  const [dealPrice, setDealPrice] = useState(0);
  const [selectedProductItem, setSelectedProductItem] = useState({});
  const [colors, setColors] = useState(null)
  const [outOfStock, setOutofStock] = useState(false);
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

  const handQuantitySelect = async(resp) => {
      const getDiscountItem = await checkDiscountPrice(productInfo, selectedProductItem, resp.value);
      setDealPrice(getDiscountItem.retailPrice);
      setProductItem(getDiscountItem);
  };

  const setProductItem = async(item) => {
    if (Object.keys(item).length && !item.productImages.length && item.productItemProduct) {
      item.productImages = productInfo.productImages;
    }
    setSelectedProductItem(item);
  }

  const loadImages = (data) => {
    const imageUrl = getImageUrlByType('product');
    let imgs = [];

    if (data && data.productImages) {
      if (data.productImages.length) {
        imgs = data.productImages.map((img) => {
          return {
            original: `${imageUrl}/${img.img_url}`,
            thumbnail: `${imageUrl}/${img.img_url}`,
          }
        });
      } else if (productInfo.productImages && productInfo.productImages.length) {
        imgs = productInfo.productImages.map((img) => {
          return {
            original: `${imageUrl}/${img.img_url}`,
            thumbnail: `${imageUrl}/${img.img_url}`,
          }
        });
      } else {
        console.log(`${noImageUrl.img}`)
        imgs.push({
          original: `${noImageUrl.img}`,
          thumbnail: `${noImageUrl.img}`,
        })
      }

      setImages(imgs);
    }
  }

  const onAddCart = async() => {
    if (!selectedProductItem.quantity) {
      setSnack({
        severity: 'error',
        open: true,
        text: 'Please choose quantity',
      })
    } else if (!selectedColor) {
      setSnack({
        severity: 'error',
        open: true,
        text: 'Please choose color',
      })
    } else if (!selectedSize) {
      setSnack({
        severity: 'error',
        open: true,
        text: 'Please choose size',
      })
    } else {
      await addCart(selectedProductItem);
    }
  }

  const handleColorChange = (e, color) => {
    if (e) {
      e.preventDefault();
    }
    setForceRefresh(!forceRefresh)
    setSelectedColor(color);
    setSelectedSize(null);
    setProductItem({})
  }

  const handleDefaultSize = () => {
    if (productInfo && selectedColor) {
      const items = productInfo.productProductItems;
      if (items && items.length) {
        const getItem = items.filter(item => item.productColor === selectedColor.id)
        if (getItem && getItem.length) {
          const getSize = productInfo.productSizes.filter(size => size.id === getItem[0].productSize)
          handleSizeChange(null, getSize[0])
        }
      }
    }
  }

  const handleSizeChange = async(e, size) => {
    if (e) {
      e.preventDefault();
    }

    setSelectedSize(size)
    
    const itemsAvailable = productInfo.productProductItems;

    if (itemsAvailable && itemsAvailable.length) {
      const getItem = productInfo.productProductItems.filter(item => item.productColorId === selectedColor.id && item.productSizeId === size.id)
      if (getItem && getItem.length) {
        const searchItem = await getProductItemById(getItem[0].id);
        searchItem['quantity'] = 1;
        setForceRefresh(!forceRefresh)
        const getTotal = formatNumber(searchItem.retailPrice);
        setProductItem(searchItem);
        setDealPrice(getTotal)
        // check if variant is out of stock
        if (!getItem[0].stock) {
          setOutofStock(true);
        } else {
          setOutofStock(false);
        }
      }
    }
  }

  const createSizeBlock = (color) => {
    if (showData) {
      if(productInfo.productSizes && color) {
        const blocks = productInfo.productSizes.map((size, index) => {
            const found = productInfo.productProductItems.filter(item => {
              return item.productSize === size.id && item.productColor == color.id;
            })
            if (found && found.length) {
              if (selectedSize && selectedSize.id === size.id) {
                return (
                  <a key={index} className={classes.productSizeLinkSelected}><div className={classes.productSizeBox}>{size.name}</div></a>
                )
              } else {
                return (
                  <a href="#" key={index} className={classes.productSizeLink} onClick={(e) => handleSizeChange(e, size)}><div className={classes.productSizeBox}>{size.name}</div></a>
                )
              }
            } else {
              return (
                <a key={index} className={classes.productSizeLinkDisabled}><div className={classes.productSizeBox}>{size.name}</div></a>
              )
            }
        })
        setSizeBlock(blocks);
      } else {
        const blocks = productInfo.productSizes.map((size, index) => {
            return (
              <a key={index} className={classes.productSizeLinkDisabled}><div className={classes.productSizeBox}>{size.name}</div></a>
            )
        })
        setSizeBlock(blocks);
      }
    }
  }

  const getDiscountHtml = (product) => {
    const discounts = product.productProductDiscount.filter((item) => {
      if (item.useDate) {
        if (isAroundTime(item.startDate, item.endDate)) {
          return item
        }
      } else {
        return item
      }
    })

    if (discounts) {
      const discountBlocks = discounts.map((item, index) => {
        let hitem = <li key={index}>{item.name}</li>;
        if (item.useDate) {
          hitem = <li key={index}>{`${item.name} hasta ${moment(item.endDate).format('DD-MM-YYYY')}`}</li>;
        }
        return hitem
      })
      setDiscountHtml(discountBlocks);
    }
  }

  const loadProductInfo = async() => {
    const getProductInfo = await getProductById(id)
    await setProductInfo(getProductInfo);
    if (getProductInfo.productColors && getProductInfo.productColors.length) {
      if (getProductInfo.productProductDiscount && getProductInfo.productProductDiscount.length) {
        setShowDiscount(true)
      }
      setColors(getProductInfo.productColors);
      getDiscountHtml(getProductInfo);
      handleColorChange(null, getProductInfo.productColors[0])
    }
    setShowData(true);
  }
  
  useEffect(() => {
    createSizeBlock(selectedColor);
  }, [selectedColor, selectedSize]);

  useEffect(() => {
    loadImages(selectedProductItem)
  }, [selectedProductItem]);

  useEffect(() => {
    handleDefaultSize()
  }, [productInfo, selectedColor]);

  useEffect(()=>{

    loadProductInfo();
  }, [id, showData])

  return showData && (
    <LayoutTemplate>
      <div className={classes.root}>
        <Grid container>
          <Grid item lg={12} xs={12}>
            <Grid container spacing={2}>
              <Grid item lg={8} xs={12}>
                <Grid container>
                  <Grid item lg={12} xs={12} align="center">
                    {
                      images.length ? (
                        <ImageGallery items={images} />
                      ) : (
                        <ProgressBar />
                      )
                    }
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={4} xs={12}>
                <Grid container>
    
                  <Grid item lg={12} xs={12}>
                   <Typography className={classes.productName} variant="h4" component="h3">{productInfo.name}</Typography>
                  </Grid>
                  <Grid item lg={12} xs={12} className={classes.productPriceContainer}>
                    <Typography  className={classes.productPrice} variant="h1" component="h2">Price: US ${dealPrice}</Typography>
                  </Grid>
                  {
                    colors && (
                      <Grid item lg={12}  xs={12} className={classes.variantRowContent}>
                        <Grid container>
                          <Grid item lg={12} xs={12} className={classes.variantTitles}>Colors</Grid>
                          <Grid item lg={12} xs={12}>
                            {
                              colors.map((item, index) => {
                                return (
                                  <a key={index} href="#" className={selectedColor.id === item.id ? classes.productColorLinkSelected : classes.productColorLink} onClick={(e) => handleColorChange(e, item)}><div className={classes.productColorBox} style={{backgroundColor: item.color}}></div></a>
                                )
                              })
                            }
                          </Grid>
                        </Grid>
                      </Grid>
                    )
                  }
                  {
                    sizeBlocks && (
                      <Grid item lg={12}  xs={12} className={classes.variantRowContent}>
                        <Grid container>
                          <Grid item lg={12} xs={12} className={classes.variantTitles}>Sizes</Grid>
                          <Grid item lg={12} xs={12} >
                            {
                              sizeBlocks
                            }
                          </Grid>
                        </Grid>
                      </Grid>
                    )
                  }
                  <Grid item lg={12} xs={12}  className={classes.infoRowContent}>
                    <QuantitySelectorB stock={selectedProductItem.stock} refresh={forceRefresh} onChange={handQuantitySelect} className={classes.dropDown} id="quant-select"/>
                  </Grid>
                  <Grid item lg={12}  xs={12} className={classes.infoRowContent}>
                    {
                      outOfStock ? (
                        <Button disabled className={`cartButtonDisabled ${classes.addCartBtn}`}>Add To Cart</Button>
                      ) : (
                        <Button onClick={onAddCart} className={`mainButton ${classes.addCartBtn}`}>Add To Cart</Button>
                      )
                    }
                    <WishListIcon product={productInfo.id} />
                  </Grid>
                  <Grid item lg={12} xs={12}>
                    <Typography align="left" variant="h4" component="h4" className={classes.descriptionTitle}>Description</Typography>
                    <Typography align="left" variant="body1" component="p">{productInfo.description}</Typography>
                  </Grid>
                  {
                      showDiscount && (
                      <Grid item lg={12} xs={12}>
                        <Typography align="left" variant="h4" component="h4" className={classes.descriptionTitle}>Deals</Typography>
                        <ul>
                          {
                            discountHtml && discountHtml
                          }
                        </ul>
                      </Grid>
                    )
                  }
                  <Grid item lg={12}  xs={12} className={classes.infoRowContent}>
                    <Typography align="left" variant="h5" component="h5" className={classes.productStock}>{!outOfStock ? 'Available' : 'Out of Stock'}</Typography>
                  </Grid>
                  {/* <Grid item lg={12}  xs={12} className={classes.infoRowContent}>
                    <Typography align="left" variant="h5" component="h5">Disponibilidad: {productInfo.stock}</Typography>
                  </Grid> */}
                  {/* <Grid item lg={12}  xs={12} className={classes.infoRowContent}>
                    <Typography className={classes.deliveryText} align="left" variant="body1" component="p">
                      <Icons name="delivery" classes={{icon: classes.deliveryIcon}}  /> Entrega a todo Panama
                    </Typography>
                  </Grid> */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid item lg={3} sm={12} className={classes.rateBox}>
            <RateBox data={productInfo} />
          </Grid> */}
        </Grid>
        {/* Review and Seller */}
        {/* <Grid container spacing={2}>
          <Grid item lg={4} sm={12}>
            <Typography align="left" variant="h4" component="h4">Acerca del Vendedor</Typography>
            {
              productInfo.vendor && <VendorBox id={productInfo.vendor} />
            }
          </Grid>
        </Grid> */}
        {/* Q&A section */}
        {/* <ProductQuestionBox data={productInfo}/> */}
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