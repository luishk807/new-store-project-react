import React, { useState, useEffect, useRef } from 'react';
import * as T from 'prop-types';
import { 
  withStyles, 
  Grid,
  Link,
  Button,
} from '@material-ui/core';
import NumberFormat from 'react-number-format';

import { getProducts } from '../../api/products';
import { getImageUrlByType } from '../../utils/form';
import { noImageUrl } from '../../../config';
import Icons from '../common/Icons';
import Rate from '../common/Rate/Rate';
import ProgressBar from '../common/ProgressBar';

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  mainContainer: {
    justifyContent: 'flex-start',
  },
  item: {
    padding: 8,
    flexDirection: 'column',
    alignItems: 'center',
    display: 'flex',
    border: '1px solid rgba(0,0,0,.08)',
    margin: 14,
    width: '23%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: 5,
    }
  },
  linkItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
    }
  },
  itemContainer: {
    alignItems: 'center'
  },
  imgHolder: {
    width: '100%',
    padding: 8,
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '40%',
    }
  }, 
  infoHolder: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 8,
    [theme.breakpoints.down('sm')]: {
      width: '60%',
    }
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: '1.5em',
    padding: 8,
  },
  loadBar: {
    display: 'flex',
    alignItems: 'center',
    padding: 9,
    justifyContent: 'center'
  }
})

const ProductScroller = ({classes}) => {
  const imageUrl = getImageUrlByType('product');
  const loader = useRef(null);
  const [products, setProducts] = useState([]);
  const [showData, setShowData] = useState(false);
  const [page, setPage] = useState(1);
  const [endData, setEndData] = useState(false);

  const loadProducts = async() => {
    const gProduct = await getProducts({
      page: page
    });

    setProducts(gProduct);
    setShowData(true);

    var options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0
    };
  // initialize IntersectionObserver
  // and attaching to Load More div
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current)
    }
  }


  // here we handle what happens when user scrolls to Load More div
  // in this case we just update page variable
  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {   
      setPage((page) => page + 1)
    }
  }

  useEffect(() => {
      // here we simulate adding new posts to List
      const loadMore = async() => {
        const gProduct =  await getProducts({
          page: page
        });
        if (gProduct && !gProduct.length) {
          setEndData(true)
        }
        const newProducts = products.concat(gProduct);
        setProducts(newProducts)
      }
      loadMore()
  }, [page])

  useEffect(() => {
    loadProducts()
  }, [])

  return showData && ( 
   <div className={classes.root}>
      <Grid container className={classes.mainContainer} spacing={1}>
        <Grid item lg={12} xs={12} className={classes.sectionTitle}>
          Product you might like
        </Grid>
        {
          products.map((product, index) => {
            const image = product.productImages && product.productImages.length ? (
              <img className={`img-fluid`} src={`${imageUrl}/${product.productImages[0].img_url}`} alt={product.name}/>
            ) : (
              <img className={`img-fluid`} src={`${noImageUrl.img}`} alt={noImageUrl.alt} />
            )
            return (
              <Grid key={index} item className={classes.item}>
                <Link href={`/product/${product.id}`} className={classes.linkItem}>
                  <div className={classes.imgHolder}>
                    {
                      image
                    }
                  </div>
                  <div className={classes.infoHolder}>
                    <p className={classes.title}>
                      {
                        product.name
                      }
                    </p>
                    <p className={classes.amount}>
                      <NumberFormat value={product.amount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                    </p>
                    <Rate data={0} disabled={true} />
                  </div>
                </Link>
              </Grid>
            )
          })
        }
        <Grid item lg={12} xs={12} ref={loader} className={classes.loadBar}>
          {
            endData ? (
              <h3>End of Products</h3>
            ) : (
              <ProgressBar />
            )
          }
        </Grid>
      </Grid>
   </div>
   );
}
 
ProductScroller.protoTypes = {
  classes: T.object,
}

export default withStyles(styles)(ProductScroller);