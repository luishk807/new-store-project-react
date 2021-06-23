import React, { useEffect, useState } from 'react';
import { 
  Grid,
  Button,
  Hidden,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';

import { LIMIT } from '../../../../config';
import SearchBarPlain from '../../../components/common/SearchBarPlain';
import AdminLayoutTemplate from '../../../components/common/Layout/AdminLayoutTemplate';
import Snackbar from '../../../components/common/Snackbar';
import ProgressBar from '../../../components/common/ProgressBar';
import DialogModal from '../../../components/common/DialogModal';
import ProductModal from '../../../components/ProductModal';
import { getImageBaseThumbnail } from '../../../utils';
import { deleteProduct, getAdminProducts, searchProductsByFilter } from '../../../api/products';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
  },
  icon: {
    width: 30,
    height: 30,
    fill: 'black'
  },
  deleteIcon: {
    width: 25,
    height: 25,
  },
  actionBtn: {
    margin: 2,
  },
  headerTitle: {
    padding: 20
  },
  headerButton: {
    padding: 20
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  mainHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    borderBottom: '1px solid rgba(0,0,0,.08)',
  },
  mainItems: {
    textAlign: 'center',
    margin: '10px 0px',
    padding: 5
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
  fixHeader: {
    position: 'fixed',
    top: 72,
    display: 'flex',
    background: 'white',
    zIndex: 10,
    left: 0,
    width: '100%',
    padding: '2px 7px',
    textAlign: 'center',
    fontWeight: 'bold',
    borderBottom: '1px solid rgba(0,0,0,.08)',
  },
  searchParams: {
    padding: '5px 15px',
    border: '1px solid orange',
    color: 'orange',
    background: 'white',
    '&:hover': {
      background: 'orange',
      color: 'white !important'
    }
  },
  searchParamItem: {
    padding: 10,
  },
  itemHeaderFixed: {
    width: '100%',
    background: 'white',
  },
  emptyData: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
}));

const Index = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [productModalContent, setProductModalContent] = useState(null);
  const [openProductModal, setOpenProductModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [searchParams, setSearchParams] = useState(null);
  const [showData, setShowData] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);
  const [paginationHtml, setPaginationHtml] = useState(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const router = useRouter();
  const [dialogContent, setDialogContent] = useState({
    open: false,
    value: null,
    title: "Deleting Item",
    content: "Are you sure, you want to delete this item?",
    actionLabels: {
      true: "Yes",
      false: "No"
    }
  })
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

  const handleWindowClose = () => {
    setSelectedProductId(null)
  }

  const loadProducts = async() => {
    const search = router.query.search;
    let getProducts = null;
    if (search) {
      setSearchParams(search);
      getProducts = await searchProductsByFilter({
        page: page,
        search: search,
        isFullDetail: true
      });
    } else {
      setSearchParams(null);
      getProducts = await getAdminProducts({
        page: page,
        isFullDetail: true
      });
    }
    if (getProducts) {
      setProducts('rows' in getProducts ? getProducts.rows : getProducts.items);
      setTotalCount(getProducts.count)
      if (!getProducts.count || !getProducts.rows) {
        setShowEmpty(true);
      }
    }
  };
  
  const handlePaginationChange = (event, value) => {
    setPage(value);
    setShowData(false)
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
  
  const handleActionMenu = (e) => {
    if (typeof e === "object") {
      setDialogContent({
        ...dialogContent,
        open: true,
        title: `Deleting ${e.name}`,
        value: e
      })
    } else {
      router.push(e)
    }
  }

  const handleDialogClick = (e) => {
    setDialogContent({
      ...dialogContent,
      open: false
    })
    if (e) {
      delItem(dialogContent.value.id)
    }
  }

  const delItem = async(id) => {
    const result = await deleteProduct(id);

    if (result && result.status) {
      setSnack({
        severity: 'success',
        open: true,
        text: `Product Deleted`,
      })
      loadProducts()
    } else {
      setSnack({
        severity: 'error',
        open: true,
        text: `ERROR: Product cannot be delete`,
      })
    }
  }

  const loadProductModal = async(e, productId) => {
    e.preventDefault();
    setSelectedProductId(productId);
  }

  const handleSearchEnterKey = (searchText) => {
    setShowData(false);
    if (searchText) {
      window.location.href=`/admin/products?search=${searchText}`
    } else {
      window.location.href=`/admin/products`
    }
  }

  useEffect(() => {
    loadPagination();
  }, [totalCount]);

  
  useEffect(() => {
    if (products && products.length) {
      setShowData(true);
    }
  }, [products]);

  useEffect(() => {
    loadProducts();
    loadPagination();
  }, [page]);

  useEffect(() => {
    setPage(1);
  }, []);

  return (
    <AdminLayoutTemplate>
      <Grid container className={classes.headerContainer}>
        <Grid item lg={7} className={classes.headerTitle}>
          <h3>Products</h3>
        </Grid>
        <Grid item lg={3} className={classes.headerTitle}>
          <Button className={`mainButton`} href={`/admin/products/add`}>Add Product</Button>
        </Grid>
        <Grid item lg={2} className={classes.headerTitle}>
          <Button className={`mainButton`} href={`/admin/products/import`}>Import</Button>
        </Grid>
        <Grid item lg={12} xs={12}>
          <SearchBarPlain onEnterKeyPress={handleSearchEnterKey}/>
        </Grid>
        {
          searchParams && (
            <Grid item lg={12} xs={12} className={classes.searchParamItem}>
              Searching For:&nbsp;&nbsp;<Button onClick={() => handleSearchEnterKey()} className={classes.searchParams}>
              {
                searchParams
              }
              &nbsp;
              &#10005;
              </Button>
            </Grid>
          )
        }
      </Grid>
      {
        paginationHtml && !showEmpty && paginationHtml
      }
      {
        showData ? (
          <Grid container>
            <Hidden smDown>
              <Grid item lg={12} xs={12} className={`${classes.itemHeaderFixed} adminProductStickyHeader`}>
              <Grid container className={classes.itemContainer}>
                <Grid item lg={3} className={classes.itemColumn}>
                    Name
                  </Grid>
                  <Grid item lg={2} className={classes.itemColumn}>
                    Categories
                  </Grid>
                  <Grid item lg={2} className={classes.itemColumn}>
                    Model
                  </Grid>
                  <Grid item lg={1} className={classes.itemColumn}>
                    Sku
                  </Grid>
                  <Grid item lg={2} className={classes.itemColumn}>
                    Brand
                  </Grid>
                  <Grid item lg={1} className={classes.itemColumn}>
                    Status
                  </Grid>
                  <Grid item lg={1} className={classes.itemAction}>
                    Action
                  </Grid>
                </Grid>
              </Grid>
            </Hidden>
            {
              products.map((product, index) => {
                const img = getImageBaseThumbnail(product);
                return (
                  <Grid key={index} item lg={12} xs={12} className={classes.mainItems}>
                    <Grid container className={classes.itemContainer}>
                      <Grid item lg={3} xs={11} className={classes.itemColumn}>
                        <Grid container>
                          <Grid item lg={5} xs={5}>
                          {
                            img
                          }
                          </Grid>
                          <Grid item lg={7} xs={7}>
                            <p>
                              <a href="#" onClick={(e) => loadProductModal(e, product.id)}>
                                { product.name }
                              </a>
                            </p>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Hidden xsDown>
                        <Grid item lg={2} xs={6} className={classes.itemColumn}>
                        {
                          product.categories && product.categories.name
                        }
                        </Grid>
                        <Grid item lg={2} xs={6} className={classes.itemColumn}>
                        { product.sku }
                        </Grid>
                        <Grid item lg={1} xs={6} className={classes.itemColumn}>
                        { product.model }
                        </Grid>
                        <Grid item lg={2} xs={6} className={classes.itemColumn}>
                        { product.productBrand && product.productBrand.name }
                        </Grid>
                        <Grid item lg={1} xs={6} className={classes.itemColumn}>
                        {
                          product.productStatus.name
                        }
                        </Grid>
                        <Grid item lg={1} className={classes.itemAction}>
                          <Button className={`smallMainButton ${classes.actionBtn}`} onClick={() => handleActionMenu(product)}>
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
          <Grid container>
            <Grid item lg={12} xs={12}>
              {
                showEmpty ? (
                  <div className={classes.emptyData}>No Products available</div>
                ) : (
                  <ProgressBar />
                )
              }
            </Grid>
          </Grid>
        )
      }
      {
        paginationHtml && !showEmpty && paginationHtml
      }
      <Snackbar open={snack.open} severity={snack.severity} onClose={() => setSnack({...snack, open: false })} content={snack.text} />
      <DialogModal open={dialogContent.open} onClick={handleDialogClick} title={dialogContent.title} content={dialogContent.content} actionLabels={dialogContent.actionLabels} />
      <ProductModal
        onOpen={openProductModal}
        productId={selectedProductId}
        onClose={handleWindowClose}
      />
    </AdminLayoutTemplate>
  );
}

/** This section is mandatory for next-18next translation to work */
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['colors']),
  },
})

export default Index;