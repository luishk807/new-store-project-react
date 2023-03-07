
import { useState, useMemo } from 'react';
import {
  withStyles,
  Grid,
  Button,
} from '@material-ui/core';
import { 
  getCartTotalItems, 
} from 'src/utils';
import * as T from 'prop-types';
import { useTranslation } from 'next-i18next'
import { connect } from 'react-redux';
import Snackbar from '@/common/Snackbar';
import { addCart} from 'src/redux/actions/main';
const styles = () => ({
  root: {
    width: '100%',
  },
  addCartBtn: {
    width: '100%',
    height: '100%',
  },
  infoRowContent: {
    margin: '20px 0px',
    display: 'flex',
    alignItems: 'center',
  },
});

const AddCartButton = ({
  classes, 
  product, 
  color, 
  size,
  cart, 
  addCart,
  onAddCart: handleAddCart, 
  outOfStock 
}) => {
  const { t } = useTranslation(['common', 'product', 'colors']);
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });
  
  const cartData = useMemo(() => {
    if (Object.keys(cart).length) {
      return Object.values(cart);
    } else {
      return null;
    }
  }, [cart])

  const onAddCart = async() => {
    if (!product.quantity) {
      setSnack({
        severity: 'error',
        open: true,
        text: t('choose_cantidad'),
      })
    } else if (!color) {
      setSnack({
        severity: 'error',
        open: true,
        text: t('choose_color'),
      })
    } else if (!size) {
      setSnack({
        severity: 'error',
        open: true,
        text: t('choose_size'),
      })
    } else {
      let total = getCartTotalItems(cartData, product);
      total = total ? total : 0;
      const itemAdd = Object.assign({}, product);
      const currQuantity = Number(itemAdd.quantity);
      const newQuantity = Number(total);
      itemAdd.quantity = currQuantity + newQuantity;
      await addCart(itemAdd);
      handleAddCart && handleAddCart(itemAdd);
    }
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item lg={10} xs={12} className={classes.infoRowContent}>
        {
          outOfStock || !Object.keys(product).length ? (
            <Button disabled className={`cartButtonDisabled ${classes.addCartBtn}`}>{ t('add_to_cart') }</Button>
          ) : (
            <Button onClick={onAddCart} className={`mainButton ${classes.addCartBtn}`}>{ t('add_to_cart') }</Button>
          )
        }
        {/* <WishListIcon product={productInfo.id} /> */}
        </Grid>
      </Grid>
      <Snackbar open={snack.open} severity={snack.severity} onClose={()=>{setSnack({...snack,open:false})}} content={snack.text} />
    </div>

  )
}

AddCartButton.propTypes = {
  onAddCart: T.func,
  classes: T.object,
  product: T.object,
  outOfStock: T.bool,
}

const mapStateToProps = state => ({
  cart: state.cart
}) // add reducer access to props
const mapDispatchToProps = {
  addCart: addCart
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(AddCartButton));