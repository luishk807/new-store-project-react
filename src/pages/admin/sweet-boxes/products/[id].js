import React, { useEffect, useState } from 'react';
import { 
  Grid,
  Button,
  Hidden,
  makeStyles,
  Checkbox,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import Pagination from '@material-ui/lab/Pagination';

import { LIMIT } from '../../../../../config';
import Icons from '../../../../components/common/Icons';
import AdminLayoutTemplate from '../../../../components/common/Layout/AdminLayoutTemplate';
import Snackbar from '../../../../components/common/Snackbar';
import ProgressBar from '../../../../components/common/ProgressBar';
import { getImageBaseOnly } from '../../../../utils';
import { getAdminProducts } from '../../../../api/products';
import ProductBox from '../../../../components/common/ProductBox';
import { getSweetBoxById } from '../../../../api/sweetbox';
import { saveSweetBoxProductByProductIds } from '../../../../api/sweetBoxProduct';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
  },
  icon: {
    width: 25,
    height: 25,
  },
  deleteIcon: {
    width: 25,
    height: 25,
  },
  actionBtn: {
    margin: 2,
  },
  mainContainer: {
    padding: 5,
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 10px',
  },
  mainHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    borderBottom: '1px solid rgba(0,0,0,.08)',
  },
  mainItems: {
    textAlign: 'center',
    margin: '10px 0px',
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
  paginationItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paginationContainer: {
    padding: '20px 0px',
  },
  gridItemRoot: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      height: 400,
      margin: 5,
      overflowY: 'hidden',
    }
  },
  gridItemTitle: {
    margin: 5,
  },
  gridItemList: {
    margin: 5,
  }
}));

const Index = () => {
  const classes = useStyles();
  const [checkedProducts, setCheckedProducts] = useState([]);
  const [productBoxes, setProductBoxes] = useState([]);
  const [products, setProducts] = useState([]);
  const [showData, setShowData] = useState(false);
  const [showProductBoxes, setShowProductBoxes] = useState(false);
  const [showProductData, setShowProductData] = useState(false);
  const [paginationHtml, setPaginationHtml] = useState(null);
  const [page, setPage] = useState(1);
  const [sweetbox, setSweetbox] = useState({});
  const [totalCount, setTotalCount] = useState(0);
  const router = useRouter();
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });


  const createHtmlItem = () => {
    const htmlItem = checkedProducts.map((prod, index) => {
      return (
        <Grid item lg={2} key={index} className={classes.gridItemList}>
          <ProductBox  key={index} id={prod} onDelete={handleCheckboxChange} />
        </Grid>
      )
    })
    setProductBoxes(htmlItem);
    setShowProductBoxes(true)
  }
  
  const handleCheckboxChange = (event, prod) => {
    let value =  null;
    if (typeof event === "boolean") {
      value = event
    } else {
      value =  event.target.checked;
    }
    if (checkedProducts && checkedProducts.length) 
    {
      setShowProductBoxes(false);
      const itemFound = checkedProducts.indexOf(prod.id);
      const items = [...checkedProducts];
      if (itemFound > -1 && !value) {
        items.splice(itemFound, 1);
      } else if (itemFound === -1 && value) { 
        if (checkedProducts.length > 8) {
          setSnack({
            severity: 'error',
            open: true,
            text: `You can only add 9 items`,
          })
        } else {
          items.push(prod.id);
        }
      }
      setCheckedProducts(items);
   } else {
     if (value) {
      setCheckedProducts(arr => [
        ...arr,
        prod.id
      ]);
     }
   }
  };

  const loadProducts = async() => {
    const getProducts = await getAdminProducts({
      page: page
    });
    if (getProducts) {
      setProducts(getProducts.rows);
      setTotalCount(getProducts.count)
    }
  };
  
  const handlePaginationChange = (event, value) => {
    setPage(value);
    setShowProductData(false)
  }

  const loadPagination = () => {
    setPaginationHtml(
      <Grid container className={classes.paginationContainer}>
        <Grid item lg={12} xs={12} className={classes.paginationItem}>
          <Pagination onChange={handlePaginationChange} size="large" showFirstButton showLastButton count={Math.round(totalCount / LIMIT )} page={page} variant="outlined" shape="rounded" />
        </Grid>
      </Grid>
    )
  }

  const loadSweetBox = async() => {
    const id = router.query.id; 
    const gSweet = await getSweetBoxById(id);
    if (gSweet) {
      setSweetbox(gSweet);
      setPage(1);
    }
  }

  const submitSweetBox = async() => {
    if (checkedProducts && checkedProducts.length) {
      const resp = await saveSweetBoxProductByProductIds(sweetbox.id, checkedProducts);
      if (resp && resp.status) {
        setSnack({
          severity: 'success',
          open: true,
          text: `Product updated`,
        })
        loadProducts()
      } else {
        setSnack({
          severity: 'error',
          open: true,
          text: `ERROR: Product cannot be updated`,
        })
      }
    } else {
      setSnack({
        severity: 'error',
        open: true,
        text: 'Please select at least one product add',
      });
    }
  }

  useEffect(() => {
    loadPagination();
  }, [totalCount]);

  useEffect(() => {
    setShowData(true);
  }, [sweetbox])

  useEffect(() => {
    createHtmlItem();
  }, [checkedProducts])
  
  useEffect(() => {
    if (products && products.length) {
      if (!checkedProducts || !checkedProducts.length && ( sweetbox.sweetBoxSweetboxProduct && sweetbox.sweetBoxSweetboxProduct.length)) {
          const sweetProductId = sweetbox.sweetBoxSweetboxProduct.map(item => item.product);
          setCheckedProducts(sweetProductId);
      }
      setShowProductData(true);
    }
  }, [products]);

  useEffect(() => {
    loadProducts();
    loadPagination();
  }, [page]);

  useEffect(() => {
    loadSweetBox();
  }, []);

  return showData && (
    <AdminLayoutTemplate>
      <Grid container className={classes.headerContainer}>
        <Grid item lg={9} xs={8}>
          <h3><Button href={`/admin/sweet-boxes/${sweetbox.id}`}><Icons classes={{icon: classes.icon}} name="backArrow" /></Button>Products for {sweetbox.name}</h3>
        </Grid>
        <Grid item lg={3} xs={4} className={classes.headerBtn}>
          <Button className={`mainButton`} onClick={submitSweetBox}>Add To {sweetbox.name}</Button>
        </Grid>
      </Grid>
      {
        showProductBoxes ? (
          <Grid item lg={12} xs={12}>
            <Grid container className={classes.gridItemRoot}>
              {
                productBoxes.map(item => item)
              }
            </Grid>
          </Grid>
        ) : (
          <ProgressBar />
        )
      }
      {
        paginationHtml && paginationHtml
      }
      {
        showProductData ? (
          <Grid container className={classes.mainContainer}>
            <Hidden smDown>
              <Grid item lg={12} xs={12} className={classes.mainHeader}>
                <Grid container className={classes.itemContainer}>
                  <Grid item lg={1} className={classes.itemColumn}>
                    
                  </Grid>
                  <Grid item lg={1} className={classes.itemColumn}>
                    Img
                  </Grid>
                  <Grid item lg={4} className={classes.itemColumn}>
                    Name
                  </Grid>
                  <Grid item lg={2} className={classes.itemColumn}>
                    Categories
                  </Grid>
                  <Grid item lg={1} className={classes.itemColumn}>
                    Sku
                  </Grid>
                  <Grid item lg={1} className={classes.itemColumn}>
                    Model
                  </Grid>
                  <Grid item lg={2} className={classes.itemColumn}>
                    Status
                  </Grid>
                </Grid>
              </Grid>
            </Hidden>
            {
              products.map((product, index) => {
                const img = getImageBaseOnly(product);
                return (
                  <Grid key={index} item lg={12} xs={12} className={classes.mainItems}>
                    <Grid container className={classes.itemContainer}>
                      <Grid item lg={1} xs={1} className={classes.itemColumn}>
                        <Checkbox 
                          onChange={(e) => handleCheckboxChange(e, product)} 
                          checked={checkedProducts && checkedProducts.indexOf(product.id) > -1 ? true : false}
                          inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} 
                        />
                      </Grid>
                      <Grid item lg={1} xs={4} className={classes.itemColumn}>
                        {
                          img
                        }
                      </Grid>
                      <Grid item lg={4} xs={6} className={classes.itemColumn}>
                          { product.name }
                      </Grid>

                      <Hidden xsDown>
                        <Grid item lg={2} xs={6} className={classes.itemColumn}>
                          {
                            product.categories && product.categories.name
                          }
                        </Grid>
                        <Grid item lg={1} xs={6} className={classes.itemColumn}>
                          {
                            product.sku
                          }
                        </Grid>
                        <Grid item lg={1} xs={6} className={classes.itemColumn}>
                          {
                            product.model
                          }
                        </Grid>
                        <Grid item lg={2} xs={6} className={classes.itemColumn}>
                          {
                            product.productStatus.name
                          }
                        </Grid>
                      </Hidden>
                    </Grid>
                  </Grid>
                )
              })
            }
          </Grid>
        ) : (
          <Grid container>
            <Grid item lg={12} xs={12}>
              <ProgressBar />
            </Grid>
          </Grid>
        )
      }
      {
        paginationHtml && paginationHtml
      }
      <Snackbar open={snack.open} severity={snack.severity} onClose={() => setSnack({...snack, open: false })} content={snack.text} />
    </AdminLayoutTemplate>
  );
}

export default Index;