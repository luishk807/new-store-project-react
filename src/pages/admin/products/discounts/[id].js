import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  Hidden,
  Button,
} from '@material-ui/core';
import moment from 'moment';
import { useRouter } from 'next/router';

import AdminLayoutTemplate from 'src/components/common/Layout/AdminLayoutTemplate';
import { deleteProductDiscountsById, getProductDiscountsByProductId } from 'src/api/productDiscounts';
import Snackbar from 'src/components/common/Snackbar';
import HeaderSub from 'src/components/product/HeaderSub';

const styles = (theme) => ({
  root: {
    padding: 10,
  },
  icon: {
    width: 30,
    height: 30,
    fill: 'black'
  },
  noData: {
    color: 'red',
    fontSize: '1.5em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 0px',
  },
  actionBtn: {
    margin: 2,
  },
  mainContainer: {
    padding: 5,
  },
  mainHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  mainItems: {
    textAlign: 'center',
    borderTop: '1px solid rgba(0,0,0,.08)',
    '&:last-child': {
      borderBottom: '1px solid rgba(0,0,0,.08)',
    }
  },
  itemContainer: {
    textAlign: 'center'
  },
  itemIndex: {
    textAlign: 'left',
    padding: 5,
  },
  itemColumn: {
    textAlign: 'center',
    padding: 5,
  },
  itemAction: {
    textAlign: 'right',
    padding: 5,
  },
  discountBlock: {
    width: '10%',
    height: 20,
    background: 'red',
    border: '2px solid black',
    margin: '0px auto',
  }
});

const Index = ({classes}) => {
  const router = useRouter();
  const [discounts, setDiscounts] = useState([]);
  const [product, setProduct] = useState(null);
  const [showData, setShowData] = useState(false);
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

  const loadDiscounts = async() => {
    const pid = router.query.id;
    setProduct(pid);
    if (pid) {
      const gDiscounts = await getProductDiscountsByProductId(pid);
      if (gDiscounts) {
        setDiscounts(gDiscounts);
        setShowData(true);
      }
    }
  };

  const delItem = async(id) => {
    deleteProductDiscountsById(id).then((data) => {
      setSnack({
        severity: 'success',
        open: true,
        text: `Discount Deleted`,
      })
      loadDiscounts()
    }).catch((err) => {
      setSnack({
        severity: 'error',
        open: true,
        text: `ERROR: Discount cannot be delete`,
      })
    })
  }

  useEffect(() => {
    loadDiscounts()
  }, []);

  return (
    <AdminLayoutTemplate>
      <HeaderSub id={product} name="discounts" />
      {
        discounts.length ? (
          <Grid container className={classes.mainContainer}>
            <Hidden smDown>
            <Grid item lg={12} xs={12} className={classes.mainHeader}>
              <Grid container className={classes.itemContainer}>
                <Grid item lg={1} className={classes.itemIndex}></Grid>
                <Grid item lg={3} className={classes.itemColumn}>
                  Name
                </Grid>
                <Grid item lg={2} className={classes.itemColumn}>
                  Deal
                </Grid>
                <Grid item lg={2} className={classes.itemColumn}>
                  Deal Starts
                </Grid>
                <Grid item lg={2} className={classes.itemColumn}>
                  Deal Ends
                </Grid>
                <Grid item lg={2} className={classes.itemAction}>
                  Action
                </Grid>
              </Grid>
            </Grid>
            </Hidden>
            {
              discounts.map((discount, index) => {
                return (
                  <Grid key={index} item lg={12} xs={12} className={classes.mainItems}>
                    <Grid container className={classes.itemContainer}>
                      <Grid item lg={1} xs={2} className={classes.itemIndex}>
                        {
                          index + 1
                        }
                      </Grid>
                      <Grid item lg={3} xs={6} className={classes.itemColumn}>
                        <a href={`/admin/products/discounts/edit/${discount.id}`}>
                          {discount.name}
                        </a>
                      </Grid>
                      <Grid item lg={2} xs={6} className={classes.itemColumn}>
                        {
                          discount.percentage ? `%${discount.percentage * 100}` : 'N/A'
                        }
                      </Grid>
                      <Grid item lg={2} xs={6} className={classes.itemColumn}>
                        {
                          discount.startDate ? moment(discount.startDate).format('YYYY-MM-DD') : "N/A"
                        }
                      </Grid>
                      <Grid item lg={2} xs={6} className={classes.itemColumn}>
                        {
                          discount.endDate ? moment(discount.endDate).format('YYYY-MM-DD') : "N/A"
                        }
                      </Grid>
                      <Hidden smDown>
                      <Grid item lg={2} className={classes.itemAction}>
                        <Button className={`smallMainButton ${classes.actionBtn}`} href={`/admin/products/discounts/edit/${discount.id}`}>
                          Edit
                        </Button>
                        <Button className={`smallMainButton ${classes.actionBtn}`} onClick={() => delItem(discount.id)}>
                          Delete
                        </Button>
                      </Grid>
                      </Hidden>
                    </Grid>
                  </Grid>
                )
              })
            }
          </Grid>
        ) : (
          <Grid container className={classes.mainContainer}>
            <Grid item lg={12} xs={12} className={classes.noData}>
              No discount found
            </Grid>
          </Grid>
        )
      }
      <Snackbar open={snack.open} severity={snack.severity} onClose={() => setSnack({...snack, open: false })} content={snack.text} />
    </AdminLayoutTemplate>
  );
}

Index.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Index);