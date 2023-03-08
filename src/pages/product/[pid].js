import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import {
  Grid,
  withStyles,
  Typography
} from '@material-ui/core';

import { checkDiscountPrice, setBundleDiscount, checkBundlePrice, isOutOfStock, getLiveStock } from 'src/utils/products';
import {
  formatNumber,
  getCartItemById
} from 'src/utils';
import LayoutTemplate from '@/common/Layout/LayoutTemplate';
import { ProductSample } from '@/constants/samples/ProductSample';
import Snackbar from '@/common/Snackbar';
import { getProductBySlug } from '@/api/products';
import { getSizesByProductId } from '@/api/sizes';
import { getColorsByProductId } from '@/api/productColors';
import { getProductItemById } from '@/api/productItems';
import RateFullView from '@/components/rate/FullView';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import CartSwipe from '@/components/cart/Swipe';
import AddCartButton from '@/src/components/product/item/AddCartButton';
import QuantitySelector from '@/src/components/product/item/QuantitySelector';
import SizeSelection from '@/src/components/product/item/SizeSelection';
import ColorSelection from '@/src/components/product/item/ColorSelection';
import PriceBlock from '@/src/components/product/item/PriceBlock';
import BundleSelection from '@/src/components/product/item/BundleSelection';
import DiscountItem from '@/src/components/product/item/DiscountItem';
import ImageComp from '@/src/components/product/item/ImageComp';

const styles = (theme) => ({
  root: {
    padding: 10,
    [theme.breakpoints.down('sm')]: {
      '& p': {
        lineHeight: '2 !important',
      }
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
  descriptionItem: {
    whiteSpace: 'pre-line',
    lineHeight: '1.7',
  },
  descriptionTitle: {
    fontSize: '1.2em',
    margin: '10px 0px',
  },
});

const Index = ({
  classes,
  data = ProductSample,
  cart
}) => {
  const router = useRouter()
  const id = router.query.pid;
  const [forceRefresh, setForceRefresh] = useState(false);
  const [forceSwipeRefresh, setForceSwipeRefresh] = useState(false);
  const [cartSwipeData, setCartSwipeData] = useState(null)

  const [showData, setShowData] = useState(false);
  const [showProduct, setShowProduct] = useState(false);

  const [selectedProductStock, setSelectedProductStock] = useState(null);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedBundle, setSelectedBundle] = useState(null);
  const [selectedProductItem, setSelectedProductItem] = useState({});

  const [productInfo, setProductInfo] = useState(null);
  const [dealPrice, setDealPrice] = useState(0);
  const [colors, setColors] = useState(null);
  const [sizes, setSizes] = useState(null);
  const [outOfStock, setOutofStock] = useState(false);

  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });
  const { t } = useTranslation(['common', 'product', 'colors'])

  const handQuantitySelect = async (resp) => {
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

  const setProductItem = async (item) => {
    if (Object.keys(item).length && !item.productImages.length && item.productItemProduct) {
      item.productImages = productInfo.productImages;
      item.slug = productInfo.slug
    }

    setSelectedProductItem(item);
  }

  const onAddCart = async (itemAdd = {}) => {
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
      getLiveStock(itemAdd, cart);
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

  const handleBundleChange = async (e, bundle) => {
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

  const handleSizeChange = async (e, size) => {
    if (e) {
      e.preventDefault();
    }

    setSelectedSize(size)

    setSelectedBundle(null);

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

  const loadProductInfo = async () => {
    const getProductInfo = await getProductBySlug(id, {
      isFullDetail: true
    });
    const [getProductColor, getProductSizes] = await Promise.all([
      getColorsByProductId(getProductInfo.id),
      getSizesByProductId(getProductInfo.id)
    ])

    if (getProductInfo) {
      setProductInfo(getProductInfo);
    }

    if (getProductColor && getProductColor.length && getProductInfo.productProductItems && getProductInfo.productProductItems.length) {
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
    }
  }, [colors]);

  useEffect(() => {
    if (selectedProductItem && Object.keys(selectedProductItem).length) {
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

  useEffect(() => {
    loadProductInfo();
  }, [id, showData])

  return showProduct && (
    <LayoutTemplate>
      <CartSwipe data={cartSwipeData} forceUpdate={forceSwipeRefresh} />
      <div className={classes.root}>
        <Grid container>
          <Grid item lg={12} xs={12}>
            <Grid container>
              <Grid item lg={1} />
              <Grid item lg={3} xs={12}>
                <ImageComp products={productInfo} selectedProduct={selectedProductItem} />
              </Grid>
              <Grid item lg={2} />
              <Grid item lg={5} xs={12}>
                <Grid container>
                  <Grid item lg={12} xs={12}>
                    <Typography className={classes.productName} variant="h3" component="h3">{productInfo.name}</Typography>
                  </Grid>
                  <PriceBlock product={selectedProductItem} />
                  <DiscountItem product={productInfo} dealPrice={dealPrice} />
                  <ColorSelection
                    onColorChange={handleColorChange}
                    color={selectedColor}
                    colors={colors}
                  />
                  <SizeSelection
                    product={productInfo}
                    sizes={sizes}
                    size={selectedSize}
                    color={selectedColor}
                    onSizeChange={handleSizeChange}
                  />
                  <BundleSelection
                    bundle={selectedBundle}
                    product={selectedProductItem}
                    onBundleChange={handleBundleChange}
                    productStock={selectedProductStock}
                  />
                  <QuantitySelector
                    product={selectedProductItem}
                    productStock={selectedProductStock}
                    onQuantityChange={handQuantitySelect}
                    forceRefresh={forceRefresh}
                    outOfStock={outOfStock}
                  />
                  <AddCartButton
                    outOfStock={outOfStock}
                    color={selectedColor}
                    size={selectedSize}
                    product={selectedProductItem}
                    onAddCart={onAddCart}
                  />
                  <Grid item lg={12} xs={12}>
                    <Typography align="left" variant="h4" component="h4" className={classes.descriptionTitle}>{t('description')}</Typography>
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
        <Snackbar open={snack.open} severity={snack.severity} onClose={() => { setSnack({ ...snack, open: false }) }} content={snack.text} />
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
// const mapDispatchToProps = {
//   addCart: addCart
// }

/**
 * This section is mandatory for next-18next translation to work, only inside /pages.
 * Use get ServerSideProps instead of getStaticProps because it's a dinamic route
 */
export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'product', 'footer', 'colors']),
  },
})

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(withStyles(styles)(Index));