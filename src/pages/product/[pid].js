import React, {useState, useEffect } from 'react';
import * as T from 'prop-types';
import ImageGallery from 'react-image-gallery';
import { connect } from 'react-redux';
import { updateCart,addCart } from 'src/redux/actions/main';
import { useRouter } from 'next/router';
import {
  Grid,
  withStyles,
  Button,
  Typography
} from '@material-ui/core';
import moment from 'moment';

import { getImageUrlByType } from 'src/utils/form';
import { checkDiscountPrice, setBundleDiscount, checkBundlePrice, isOutOfStock, getLiveStock } from 'src/utils/products';
import { formatNumber, isAroundTime, capitalize, sortOptions, getCartTotalItems, removeDuplicatesByProperty, getCartItemById } from 'src/utils';
import { noImageUrl } from 'config';
import LayoutTemplate from '@/common/Layout/LayoutTemplate';
import { ProductSample } from '@/constants/samples/ProductSample';
import Snackbar from '@/common/Snackbar';
import QuantitySelectorB from '@/common/QuantitySelectorB';
import { getActiveProductBundlesByProductItemId } from '@/api/productBundles';
import { getProductBySlug, getProductById } from '@/api/products';
import { getSizesByProductId } from '@/api/sizes';
import { getColorsByProductId } from '@/api/productColors';
import { getProductItemById } from '@/api/productItems';
import ProgressBar from '@/common/ProgressBar';
import RateFullView from '@/components/rate/FullView';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getThumbnail } from '@/utils/helpers/image'
import CartSwipe from '@/components/cart/Swipe';
import { getColorName } from '@/utils/helpers/product'

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
      fontSize: '2em',
      textAlign: 'center',
    }
  },
  productPriceContainerMain: {
    padding: '5px 0px'
  },
  productPriceContainer: {
    padding: '5px 0px'
  },
  productPriceInContainer: {
    alignItems: 'center'
  },
  productPriceMain: {
    fontSize: '1.5rem',
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2em',
      textAlign: 'left',
    }
  },
  productPrice: {
    fontSize: '1.2rem',
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2em',
      textAlign: 'left',
    }
  },
  productPriceNumber: {
    fontWeight: 'bold',
    color: '#B12704',
    fontSize: '1.2rem'
  },
  productPriceDeal: {
    fontSize: '1.2rem',
    textAlign: 'left',
    fontWeight: '600',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1em',
      textAlign: 'center',
    }
  },
  productPriceScratch: {
    textDecoration: 'line-through',
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
  variantRowContentNoShow: {
    margin: '10px 0px',
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
    color: 'green'
  },
  productOutStock: {
    fontSize: '1.2em',
    color: 'red'
  },
  priceSave: {
    color: 'red',
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
    border: '1px solid #f8be15',
    borderRadius: '5px',
    display: 'flex',
    padding: '8px 10px',
    fontSize: '.8em',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  variantTitles: {
    margin: '10px 0px',
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
  descriptionItem: {
    whiteSpace: 'pre-line',
    lineHeight: '1.7',
  },
  descriptionTitle: {
    fontSize: '1.2em',
    margin: '10px 0px',
  },
  infoRowContentQuantity: {
    alignItems: 'center'
  }
});

const Index = ({classes, data = ProductSample, cart, updateCart, addCart}) => {
  const router = useRouter()
  const id = router.query.pid;
  const [forceRefresh, setForceRefresh] = useState(false);
  const [forceSwipeRefresh, setForceSwipeRefresh] = useState(false);
  const [cartSwipeData, setCartSwipeData] = useState(null)
  
  const [showData, setShowData] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const [showSizes, setShowSizes] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [showBundles, setShowBundles] = useState(false);

  const [selectedProductStock, setSelectedProductStock] = useState(null);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedBundle, setSelectedBundle] = useState(null);
  const [selectedProductItem, setSelectedProductItem] = useState({});

  const [discountHtml, setDiscountHtml] = useState(null);
  const [sizeBlocks, setSizeBlock] = useState(null);
  const [bundleBlocks, setBundleBlock] = useState(null);
  const [priceBlock, setPriceBlock] = useState(null);

  const [images, setImages] = useState({});
  const [productInfo, setProductInfo] = useState(null);
  const [dealPrice, setDealPrice] = useState(0);
  const [colors, setColors] = useState(null);
  const [bundles, setBundles] = useState(null);
  const [sizes, setSizes] = useState(null);
  const [outOfStock, setOutofStock] = useState(false);

  const [cartData, setCartData] = useState(null);

  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });
  const { t } = useTranslation(['common', 'product', 'colors'])

  const handQuantitySelect = async(resp) => {
      if (Object.keys(selectedProductItem).length) {
        if (!selectedProductItem.bundle) {
          const getDiscountItem = await checkDiscountPrice(productInfo, selectedProductItem, resp.value);
          setDealPrice(getDiscountItem.retailPrice);
          setProductItem(getDiscountItem);
        } else if (selectedProductItem.bundle) {
          const getDiscountItem = await checkBundlePrice(productInfo, selectedProductItem, resp.value);
          setDealPrice(getDiscountItem.retailPrice);
          setProductItem(getDiscountItem);
        }
      }
  };

  const setProductItem = async(item) => {
    if (Object.keys(item).length && !item.productImages.length && item.productItemProduct) {
      item.productImages = productInfo.productImages;
      item.slug = productInfo.slug
    }

    setSelectedProductItem(item);
  }

  const getGalleryImage = (original, thumbnail) => {
    return {
      original: original,
      thumbnail: thumbnail
    }
  }

  const loadImages = (data) => {
    const imageUrl = getImageUrlByType('product');
    let imgs = [];

    if (data && data.productImages) {
      imgs = imgs.concat(data.productImages.map((img) => {
        return getGalleryImage(`${imageUrl}/${img.img_url}`, `${imageUrl}/${getThumbnail(img)}`);
      }));
    }

    if (productInfo && productInfo.productImages && productInfo.productImages.length) {
      imgs = imgs.concat(productInfo.productImages.map((img) => {
        return getGalleryImage(`${imageUrl}/${img.img_url}`, `${imageUrl}/${getThumbnail(img)}`)
      }));
    } else {
      if (!data) {
        imgs.push(getGalleryImage(`${noImageUrl.svg}`,`${noImageUrl.svg}`));
      }
    }
    // Remove any duplicate images
    imgs = removeDuplicatesByProperty(imgs, 'original');
    setImages(imgs);
  }

  const onAddCart = async() => {
    if (!selectedProductItem.quantity) {
      setSnack({
        severity: 'error',
        open: true,
        text: t('choose_cantidad'),
      })
    } else if (!selectedColor) {
      setSnack({
        severity: 'error',
        open: true,
        text: t('choose_color'),
      })
    } else if (!selectedSize) {
      setSnack({
        severity: 'error',
        open: true,
        text: t('choose_size'),
      })
    } else {
      let total = getCartTotalItems(cartData, selectedProductItem);
      total = total ? total : 0;
      const itemAdd = Object.assign({}, selectedProductItem);
      const currQuantity = Number(itemAdd.quantity);
      const newQuantity = Number(total);
      itemAdd.quantity = currQuantity + newQuantity;
      await addCart(itemAdd);
      
      setForceSwipeRefresh(!forceSwipeRefresh)
      setCartSwipeData(selectedProductItem)
      setForceRefresh(!forceRefresh)
      setSnack({
        severity: 'success',
        open: true,
        text: t('product:messages.added_to_cart'),
      })

      if (itemAdd.id == selectedProductItem.id) {
        const outOfStockReached = isOutOfStock(itemAdd, cart);
        if (outOfStockReached) {
          setOutofStock(true);
        }
      }

      if (cart && Object.keys(cart).length) {
        const curtotal = getLiveStock(itemAdd, cart);
      }
    }
  }

  useEffect(() => {
    if (Object.keys(cart).length) {
      const outOfStockReached = isOutOfStock(selectedProductItem, cart);

      let curtotal = 0;
      if (cart && Object.keys(cart).length) {
        curtotal = getLiveStock(selectedProductItem, cart);
      }

      if ((selectedProductItem.bundle && selectedProductItem.bundle.quantity > curtotal) || outOfStockReached) {
        setOutofStock(true);
      }

      setCartData(Object.values(cart));
    }
  }, [cart]);

  const handleColorChange = (e, color) => {
    if (e) {
      e.preventDefault();
    }
    setForceRefresh(!forceRefresh)
    setSelectedColor(color);
    setSelectedSize(null);
    setSelectedBundle(null);
    setProductItem({})
  }

  const loadBundles = async() => {
    if (selectedProductItem && Object.keys(selectedProductItem).length) {
      const getBundles = await getActiveProductBundlesByProductItemId(selectedProductItem.id)
      if (getBundles) {
        setBundles(getBundles);
      }
    } else {
      setBundles(null);
    }
  }

  const handleBundleChange = async(e, bundle) => {
    if (e) {
      e.preventDefault();
    }

    let currBundle = bundle;

    if (selectedBundle && selectedBundle.id == currBundle.id) {
      setSelectedBundle(null);
      currBundle = null;
    } else {
      setSelectedBundle(currBundle);
    }

    setForceRefresh(!forceRefresh)
    if (selectedProductItem) {
         const searchItem = selectedProductItem;
        searchItem['quantity'] = 1;
        if (!currBundle) {
          searchItem.bundle = null;
          const getDiscountItem = await setBundleDiscount(productInfo, searchItem, currBundle);
          setProductItem(getDiscountItem);
          setDealPrice(null);
        } else {
          const getDiscountItem = await setBundleDiscount(productInfo, selectedProductItem, currBundle);
          setDealPrice(getDiscountItem.retailPrice);
          setProductItem(getDiscountItem);
        }
    }
  }

  const handleSizeChange = async(e, size) => {
    if (e) {
      e.preventDefault();
    }

    setSelectedSize(size)

    setSelectedBundle(null);
    
    setShowBundles(false)

    const itemsAvailable = productInfo.productProductItems;

    setForceRefresh(!forceRefresh)

    if (itemsAvailable && itemsAvailable.length) {
      const getItem = productInfo.productProductItems.filter(item => item.productColorId === selectedColor.id && item.productSizeId === size.id)
      if (getItem && getItem.length) {
        const searchItem = await getProductItemById(getItem[0].id);
        searchItem['quantity'] = 1;

        const getTotal = formatNumber(searchItem.retailPrice);
        setProductItem(searchItem);
        setDealPrice(getTotal)
      }
    }
  }

  const createBundleBlock = () => {
    if(bundles && selectedProductItem && Object.keys(selectedProductItem).length) {
      let stock = selectedProductStock;
      const validBundles = bundles.filter((bundle) => {
        return stock >= bundle.quantity
      })
      const blocks = validBundles.map((bundle, index) => {
        if (stock >= bundle.quantity) {
          stock -= bundle.quantity;
          if (selectedBundle && selectedBundle.id === bundle.id) {
            return (
              <a title={`Select ${capitalize(bundle.name)} for ${bundle.retailPrice}`} href="#" key={index} className={classes.productSizeLinkSelected} onClick={(e) => handleBundleChange(e, bundle)}><div className={classes.productSizeBox}><span>{bundle.name}</span><span>{`$${bundle.retailPrice}`}</span></div></a>
            )
          } else {
            return (
              <a title={`Select ${capitalize(bundle.name)} for ${bundle.retailPrice}`} href="#" key={index} className={classes.productSizeLink} onClick={(e) => handleBundleChange(e, bundle)}><div className={classes.productSizeBox}><span>{bundle.name}</span><span>{`$${bundle.retailPrice}`}</span></div></a>
            )
          }
        }
      })
      setBundleBlock(blocks);
    }
  }

  const createSizeBlock = (color = null) => {
      if(sizes && color) {
        let sizesArry = [];
        sizes.forEach((size) => {
            let sizeArry = size;
            const found = productInfo.productProductItems.filter(item => {
              return item.productSize === size.id && item.productColor == color.id;
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
    const getProductInfo = await getProductBySlug(id, {
      isFullDetail: true
    });
    const [getProductColor, getProductSizes] = await Promise.all([
      getColorsByProductId(getProductInfo.id),
      getSizesByProductId(getProductInfo.id)
    ])



    if (getProductInfo.productProductDiscount && getProductInfo.productProductDiscount.length) {
      setShowDiscount(true);
      getDiscountHtml(getProductInfo);
    }

    if (getProductInfo) {
      setProductInfo(getProductInfo);
    }

    if (getProductColor && getProductColor.length && getProductInfo.productProductItems &&  getProductInfo.productProductItems.length) {
      const validColors = getProductInfo.productProductItems.filter(item => Number(item.status) == 1).map(item => item.productColorId);
      const getTrueColors = getProductColor.filter(item => validColors.includes(item.id))
      setColors(getTrueColors);
    }

    if (getProductSizes && getProductSizes.length) {
      const validSizes = getProductInfo.productProductItems.filter(item => Number(item.status) == 1).map(item => item.productSizeId);
      const getTrueSizes = getProductSizes.filter(item => validSizes.includes(item.id))
      setSizes(getTrueSizes);
    }
  }
  
  useEffect(() => {
    if (sizes && colors) {
       setShowData(true);
    }
  }, [sizes, colors]);

  useEffect(() => {
    if (colors && colors.length) {
      handleColorChange(null, colors[0])
      setShowColors(true)
    }
  }, [colors]);

  useEffect(() => {
    if (sizes && sizes.length) {
      createSizeBlock();
    }
  }, [sizes]);

  useEffect(() => {
    if (bundles && bundles.length) {
      createBundleBlock();
    }
  }, [bundles]);

  useEffect(() => {
      createBundleBlock();
  }, [selectedBundle, selectedProductStock]);

  useEffect(() => {
    if (bundleBlocks && bundleBlocks.length) {
      setShowBundles(true)
    }
  }, [bundleBlocks]);

  useEffect(() => {
    if (sizeBlocks && sizeBlocks.length) {
      setShowSizes(true)
    }
  }, [sizeBlocks]);

  useEffect(() => {
    if (selectedColor || selectedSize) {
      createSizeBlock(selectedColor);
    }
  }, [selectedColor, selectedSize]);

  useEffect(() => {
    loadImages(selectedProductItem)
    loadBundles()
    if (selectedProductItem && Object.keys(selectedProductItem).length) {
      const getProductPriceComponent = (value, isScratched = false) => {
        return (
          <>
            <Grid item lg={4} xs={4} className={classes.productPrice}>
              <span>{ t('unit_price') }:</span>
            </Grid>
            <Grid item lg={8} xs={8} className={[(isScratched) ? classes.productPriceScratch : {}, classes.productPriceNumber].join(' ')}>
              <span>&nbsp;$ {value}</span>
            </Grid>
          </>)
      }
      
      const getProductPriceDealComponent = (value) => {
        return (
          <>
            <Grid item lg={4} xs={4} className={classes.productPriceDeal}>
              <span>{ t('price_with_discount') }:</span>
            </Grid>
            <Grid item lg={8} xs={8} className={classes.productPriceDeal}>
              <span>&nbsp;$ {value}</span>
            </Grid>
          </>)
      }
      
      const getProductPriceSavings = (value) => {
        return (
          <>
            <Grid item lg={4} xs={4} className={classes.productPrice}>
              <span>{ t('savings') }:</span>
            </Grid>
            <Grid item lg={8} xs={8} className={classes.priceSave}>
              <span>&nbsp;$ {value}</span>
            </Grid>
          </>
        )
      }

      if (selectedProductItem.discount) {
        setPriceBlock(
          <Grid container className={classes.productPriceInContainer}>
            {getProductPriceComponent(selectedProductItem.originalPrice, true)}
            {getProductPriceDealComponent(dealPrice)}
            {getProductPriceSavings(`-${selectedProductItem.save_price} (${selectedProductItem.save_percentag_show})`)}
        </Grid>)
      } else {
        setPriceBlock(    
         <Grid container className={classes.productPriceInContainer}>
           {getProductPriceComponent(selectedProductItem.retailPrice ? selectedProductItem.retailPrice : `0.00`)}
        </Grid>
        )
      }

      if (!selectedProductItem.stock) {
        setOutofStock(true);
      } else {
        setOutofStock(false);
      }

      if (cart && Object.keys(cart).length) {
        const getCartItem = getCartItemById(cart, selectedProductItem);

        const outOfStockReached = isOutOfStock(getCartItem, cart);
        if (outOfStockReached) {
          setOutofStock(true);
        }
      }

      const total = getLiveStock(selectedProductItem, cart);

      setSelectedProductStock(total);
    }
  }, [selectedProductItem]);

  useEffect(() => {
    if (productInfo) {
      setShowProduct(true);
    }
  }, [productInfo]);

  useEffect(() => {
    const outOfStockReached = isOutOfStock(selectedProductItem, cart);
    const total = getLiveStock(selectedProductItem, cart);
    if (!total) {
      setOutofStock(true);
    } else {
      setOutofStock(false);
    }
  }, [selectedProductStock]);

  useEffect(()=>{
    loadProductInfo();
  }, [id, showData])

  return showProduct && (
    <LayoutTemplate>
      <CartSwipe data={cartSwipeData} forceUpdate={forceSwipeRefresh} />
      <div className={classes.root}>
        <Grid container>
          <Grid item lg={12} xs={12}>
            <Grid container spacing={5}>
              <Grid item lg={1} />
              <Grid item lg={3} xs={12}>
              {
                images.length ? (
                  <ImageGallery items={images} />
                ) : (
                  <ProgressBar />
                )
              }
              </Grid>
              <Grid item lg={2} />
              <Grid item lg={5} xs={12}>
                <Grid container>
                  <Grid item lg={12} xs={12}>
                   <Typography className={classes.productName} variant="h3" component="h3">{productInfo.name}</Typography>
                  </Grid>
                  <Grid item lg={12} xs={12}  className={classes.productPriceContainer}>
                    {
                      priceBlock
                    }
                  </Grid>
                  {
                      showDiscount && (
                      <Grid item lg={12} xs={12}>
                        <Typography align="left" variant="h4" component="h4" className={classes.descriptionTitle}>{ t('deals') }</Typography>
                        <ul>
                          {
                            discountHtml && discountHtml
                          }
                        </ul>
                      </Grid>
                    )
                  }
                  {
                    showColors && (
                      <Grid item lg={12}  xs={12} className={classes.variantRowContent}>
                        <Grid container>
                          <Grid item lg={12} xs={12} className={classes.variantTitles}>{ t('colors') }: { selectedColor ? getColorName(selectedColor, t, 'colors') : '' }</Grid>
                          <Grid item lg={12} xs={12}>
                            {
                              colors.map((item, index) => {
                                return (
                                  <a title={`Select ${capitalize(item.name)}`} key={index} href="#" className={selectedColor.id === item.id ? classes.productColorLinkSelected : classes.productColorLink} onClick={(e) => handleColorChange(e, item)}><div className={classes.productColorBox} style={{backgroundColor: item.color}}></div></a>
                                )
                              })
                            }
                          </Grid>
                        </Grid>
                      </Grid>
                    )
                  }
                  {
                    showSizes && (
                      <Grid item lg={12}  xs={12} className={classes.variantRowContent}>
                        <Grid container>
                          <Grid item lg={12} xs={12} className={classes.variantTitles}>{ t('sizes') }: { selectedSize ? selectedSize.name : '' }</Grid>
                          <Grid item lg={12} xs={12} >
                            {
                              sizeBlocks
                            }
                          </Grid>
                        </Grid>
                      </Grid>
                    )
                  }
                  {
                    showBundles && (
                      <Grid item lg={12}  xs={12} className={classes.variantRowContent}>
                        <Grid container>
                          <Grid item lg={12} xs={12} className={classes.variantTitles}>{ t('bundles') }</Grid>
                          <Grid item lg={12} xs={12} >
                            {
                              bundleBlocks
                            }
                          </Grid>
                        </Grid>
                      </Grid>
                    )
                  }
                  {
                    Object.keys(selectedProductItem).length ? (
                      <Grid item lg={12} xs={12}  className={classes.infoRowContent}>
                        <Grid container className={classes.infoRowContentQuantity}>
                          <Grid item lg={12} xs={12} className={classes.variantTitles}>{ t('quantity') }</Grid>
                          <Grid item lg={6} xs={6}>
                            <QuantitySelectorB 
                              jump={selectedProductItem.bundle ? selectedProductItem.bundle.quantity : 0} 
                              stock={selectedProductStock} 
                              refresh={forceRefresh} 
                              onChange={handQuantitySelect} 
                              id="quant-select"
                            />
                          </Grid>
                          <Grid item lg={6} xs={6}>
                            {
                              outOfStock ? (
                                <Typography align="left" variant="h5" component="h5" className={classes.productOutStock}>{ t('outofstock') }</Typography>
                              ) : (
                                <Typography align="left" variant="h5" component="h5" className={classes.productStock}>{ t('available') }</Typography>
                              )
                            }
    
                          </Grid>
                        </Grid>
                      </Grid>
                    ) : (
                      <Grid item lg={12} xs={12}  className={classes.infoRowContent}></Grid>
                    )
                  }
                  <Grid item lg={10}  xs={12} className={classes.infoRowContent}>
                    {
                      outOfStock || !Object.keys(selectedProductItem).length ? (
                        <Button disabled className={`cartButtonDisabled ${classes.addCartBtn}`}>{ t('add_to_cart') }</Button>
                      ) : (
                        <Button onClick={onAddCart} className={`mainButton ${classes.addCartBtn}`}>{ t('add_to_cart') }</Button>
                      )
                    }
                    {/* <WishListIcon product={productInfo.id} /> */}
                  </Grid>
                  <Grid item lg={12} xs={12}>
                    <Typography align="left" variant="h4" component="h4" className={classes.descriptionTitle}>{ t('description') }</Typography>
                    <Typography align="left" variant="body1" component="p" className={classes.descriptionItem}>{productInfo.description}</Typography>
                  </Grid>
                  {/* <Grid item lg={12}  xs={12} className={classes.infoRowContent}>
                    <Typography className={classes.deliveryText} align="left" variant="body1" component="p">
                      <Icons name="delivery" classes={{icon: classes.deliveryIcon}}  /> Entrega a todo Panama
                    </Typography>
                  </Grid> */}
                </Grid>
              </Grid>
              <Grid item lg={1} />
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

/**
 * This section is mandatory for next-18next translation to work, only inside /pages.
 * Use get ServerSideProps instead of getStaticProps because it's a dinamic route
 */
export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'product', 'footer', 'colors']),
  },
})

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Index));