import {
  withStyles,
  Grid,
  Link,
  Button,
  Divider,
  Hidden,
} from '@material-ui/core';
import * as T from 'prop-types';
import Typography from '@/common/Typography';
import { formatNumber, getImage } from 'src/utils';
import { useTranslation } from 'next-i18next';
import QuantitySelectorB from '@/common/QuantitySelectorB';
import { getColorName } from 'src/utils/helpers/product';
import Icons from '@/common/Icons';

const styles = (theme) => ({
  root: {
    width: '100%'
  },
  cartImage: {
    padding: 10,
    [theme.breakpoints.down('sm')]: {
      padding: 1,
    }
  },
  cartItemDivider: {
    [theme.breakpoints.down('sm')]: {
      padding: '15px 0px',
    }
  },
  deleteBtn: {
    [theme.breakpoints.down('sm')]: {
      height: '57px !important',
    }
  },
  deleteIcon: {
    width: 35,
    height: 35,
  },
  cartItemTotal: {
    // borderRight: '1px solid #ccc',
    fontWeight: 'bold',
    padding: 9,
  },
  cartActionCont: {
    padding: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      padding: '2px 0px 2px 10px',
    },
    '& button': {
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        height: '100%',
      }
    }
  },
  productPriceScratch: {
    textDecoration: 'line-through',
  },
  cartSelectCont: {
    textAlign: 'center',
    padding: '0px 10px',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    }
  },
  cartDescCont: {
    padding: 10,
    [theme.breakpoints.down('sm')]: {
      padding: 8,
    }
  },
  cardDescTitle: {
    fontSize: '1.2em',
    lineHeight: 1.5,
    textTransform: 'capitalize',
    '& a': {
      color: 'black',
    }
  },
  previousPriceBoxSaved: {
    background: 'red',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '.7em',
    padding: '5px 7px',
    margin: '8px 0px',
  },
  previousPriceBox: {
    margin: '10px 0px'
  },
  cartPrice: {
    lineHeight: 2
  },
  cartPriceSave: {
    fontWeight: 600
  },
});

const CartItem = ({
  classes,
  onDelete,
  onQuantityChange,
  cart,
}) => {
  const { t } = useTranslation(['common', 'colors'])

  const loadPriceInfo = (data) => {
    if (data.discount) {
      return (
        <>
          <Grid item lg={12} xs={12} className={classes.cartPrice}>
            <Typography align="left" component="p" className={classes.productPriceScratch}>
              {t('unit_price')}: ${data.originalPrice}
            </Typography>
          </Grid>
          <Grid item lg={12} xs={12} className={`${classes.cartPrice} ${classes.cartPriceSave}`}>
            <Typography align="left" component="p">
              {t('price_with_discount')}: ${data.retailPrice}
            </Typography>
          </Grid>
          <Grid item lg={12} xs={12} className={classes.cartPrice}>
            <Typography align="left" component="p" className={classes.priceSave}>
              {t('saves')}: {`$${data.save_price} (${data.save_percentag_show})`}
            </Typography>
          </Grid>
        </>
      )
    } else {
      return (
        <Grid item lg={12} xs={12} className={classes.cartPrice}>
          <Typography align="left" component="p">
            {t('price')}: ${data.retailPrice}
          </Typography>
        </Grid>
      )
    }
  }

  if (!cart || !Object.keys(cart).length) {
    return;
  }

  return (
    <div className={classes.root}>
      {
        Object.keys(cart).map((key, index) => {
          const item = cart[key];
          const imgUrl = getImage(item)

          return (
            <Grid item key={index} lg={12} xs={12}>
              <Grid container>
                <Grid item lg={12} xs={12} className={classes.cartItemDivider} >
                  <Divider />
                </Grid>
                <Grid item lg={2} xs={5} className={classes.cartImage}>
                  <Link href={`/product/${item.slug}`}>
                    {
                      imgUrl && imgUrl
                    }
                  </Link>
                </Grid>
                <Grid item lg={6} xs={7} className={classes.cartDescCont}>
                  <Grid container>
                    <Grid item lg={12} xs={12}>
                      <Typography align="left" component="h4" className={classes.cardDescTitle}>
                        { // If there is an productItemProduct, or it will crash page
                          item.productItemProduct ? (
                            <Link href={`/product/${item.slug}`}>{item.productItemProduct.name}</Link>
                          ) : <></>
                        }
                      </Typography>
                    </Grid>
                    {
                      loadPriceInfo(item)
                    }
                    {
                      item.prevRetailPrice && (
                        <Grid item lg={12} xs={12} className={classes.previousPriceBox}>
                          <span>
                            <span className={classes.previousPriceBoxSaved}
                            >{t('product:saved_previous', {
                              total: formatNumber(item.prevRetailPrice -
                                Number(item.originalPrice ? item.originalPrice : item.retailPrice))
                            })}
                            </span>&nbsp;
                            {
                              t('product:retail_previous', {
                                total: formatNumber(item.prevRetailPrice)
                              })
                            }
                          </span>
                        </Grid>
                      )
                    }
                    <Grid item lg={12} xs={12} className={classes.cartPrice}>
                      <Typography align="left" component="p">
                        Sku: {item.sku}
                      </Typography>
                    </Grid>
                    {
                      item.productItemColor ? (
                        <Grid item lg={12} xs={12} className={classes.cartPrice}>
                          <Typography align="left" component="p">
                            {t('common:color')}: {getColorName(item.productItemColor, t, 'colors')}
                          </Typography>
                        </Grid>
                      ) : <></>
                    }
                    {
                      item.productItemSize ? (
                        <Grid item lg={12} xs={12} className={classes.cartPrice}>
                          <Typography align="left" component="p">
                            {t('size')}: {item.productItemSize.name}
                          </Typography>
                        </Grid>
                      ) : <></>
                    }
                    {
                      item.discount && (
                        <Grid item lg={12} xs={12}>
                          {t('message.discount_applied')}: {item.discount.name}
                        </Grid>
                      )
                    }
                    {
                      item.bundle && (
                        <Grid item lg={12} xs={12}>
                          {t('message.discount_applied')}: {item.bundle.name}
                        </Grid>
                      )
                    }
                    <Hidden smUp>
                      <strong>Total</strong>: {
                        `$${formatNumber(item.retailPrice * parseInt(item.quantity))}`
                      }
                    </Hidden>
                  </Grid>
                </Grid>
                <Grid item lg={2} xs={9} className={classes.cartSelectCont}>
                  <QuantitySelectorB
                    jump={item.bundle ? item.bundle.quantity : 0}
                    stock={item.stock}
                    data={item.quantity}
                    cart={cart}
                    product={item}
                    classes={{ root: classes.cartDropRoot }}
                    onChange={onQuantityChange}
                    id={`select-${key}`}
                  />
                </Grid>
                <Hidden xsDown>
                  <Grid item lg={2} xs={12} >
                    <Typography align="right" className={classes.cartItemTotal} variant="body1" component="p">
                      ${formatNumber(item.retailPrice * parseInt(item.quantity))}
                    </Typography>
                  </Grid>
                </Hidden>
                <Grid item lg={12} align="right" xs={3} className={classes.cartActionCont}>
                  <Hidden xsDown>
                    <Button onClick={() => onDelete(index)} className={`${classes.deleteBtn} smallMainButton my-2`}>{t('delete')}</Button>
                  </Hidden>
                  <Hidden lgUp>
                    <a href="#" onClick={(e) => onDelete(index, e)}>
                      <Icons name="delete" classes={{ icon: `iconMainColor ${classes.deleteIcon}` }} />
                    </a>
                  </Hidden>
                </Grid>
              </Grid>
            </Grid>
          )
        })
      }
    </div>
  );
}

CartItem.propTypes = {
  classes: T.object,
  item: T.object,
  cart: T.object,
  onDelete: T.func,
  key: T.string,
  index: T.number,
  onQuantityChange: T.func,
}
export default withStyles(styles)(CartItem);