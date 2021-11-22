import React, { useState, useEffect, useRef } from 'react';
import * as T from 'prop-types';
import { 
  withStyles, 
  Grid,
  Link
} from '@material-ui/core';

import { getProducts } from 'src/api/products';
import { getImageBaseThumbnail, getSortPriceRange } from 'src/utils';
import Rate from '@/components/common/Rate/Rate';
import ProgressBar from '@/components/common/ProgressBar';
import { useTranslation } from 'next-i18next'
import TextEllipsis from '@/components/common/TextEllipsis'

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  mainContainer: {
    justifyContent: 'space-between',
  },
  item: {
    padding: 8,
    flexDirection: 'column',
    alignItems: 'center',
    display: 'flex',
    border: '1px solid rgba(0,0,0,.08)',
    margin: 14,
    width: '17%',
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
  // const imageUrl = getImageUrlByType('product');
  const loader = useRef(null);
  const [products, setProducts] = useState([]);
  const [showData, setShowData] = useState(false);
  const [page, setPage] = useState(1);
  const [endData, setEndData] = useState(false);
  const { t } = useTranslation('home')

  const loadProducts = async() => {
    setShowData(false);
    const gProduct = await getProducts({
      page: page
    });
    setProducts(gProduct.rows);
    // setShowData(true);

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
    setShowData(true);
  }, [products])

  useEffect(() => {
      // here we simulate adding new posts to List
      const loadMore = async() => {
        const gProduct =  await getProducts({
          page: page
        });
        if (gProduct && !gProduct.rows.length) {
          setEndData(true)
        }
        const newProducts = products.concat(gProduct.rows);
        setProducts(newProducts)
      }
      loadMore()
  }, [page])

  useEffect(() => {
    loadProducts()
  }, [])

  return ( 
   <div className={classes.root}>
      <Grid container className={classes.mainContainer} spacing={1}>
        <Grid item lg={12} xs={12} className={classes.sectionTitle}>
          { t('message.products_you_might_like') }
        </Grid>
        {
          showData && products.map((product, index) => {
            const image = getImageBaseThumbnail(product);
            const rangePrice = getSortPriceRange(product)
            return (
              <Grid key={index} item className={classes.item}>
                <Link href={`/product/${product.slug}`} className={classes.linkItem}>
                  <div className={classes.imgHolder}>
                    {
                      image
                    }
                  </div>
                  <div className={classes.infoHolder}>
                    <TextEllipsis classes={classes.title} limit={40} variant="body1" type="p" text={product.name} />
                    <p className={classes.amount}>
                      {rangePrice}
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
            !endData && (
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