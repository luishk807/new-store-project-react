import React, { useEffect, useState, useRef } from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Link,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import Pagination from '@material-ui/lab/Pagination';

import Rate from '../components/common/Rate/Rate';
import Typography from '../components/common/Typography';
import LayoutTemplate from '../components/common/Layout/LayoutTemplate';
import ProductCategoryIcons from '../components/ProductCategoryIcons'
import { getImageUrlByType } from '../utils/form';
import { searchProductsByFilter } from '../api/products';
import ProgressBar from '../components/common/ProgressBar';

const styles = (theme) => ({
  root: {
    padding: 5,
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  pagination: {
    alignItems: 'center',
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
  cardRoot: {
    margin: 10,
    textAlign: 'center',
  },
  media: {
    height: 'auto',
    width: '100%',
    padding: 10,
  },
});

const SearchResult = ({classes}) => {
  const router = useRouter();
  const { str, cat, catn, page } = router.query;
  const imageUrl = getImageUrlByType('product');
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [showData, setShowData] = useState(false);

  const loadSearchStr = async() => {
    const pageIndex = page ? page : 0;
    const filters = {
      'search': str,
      'category': cat,
      'page': pageIndex,
    }
    const { count, items: fetchData, pages } = await searchProductsByFilter(filters);
    if (fetchData) {
      setTotalCount(count);
      setPages(pages);
      setShowData(true);
      setData(fetchData);
    }
  }

  const onPageChange = (evt, val) => {
    let urlParam = "?";
    if (cat) {
      urlParam += `cat=${cat}&catn=${catn}&page=${val}`
    } else if (str) {
      urlParam += `str=${str}&page=${val}`
    }
    setCurrentPage(val);
    router.push(`/searchResult${urlParam}`)
  }

  useEffect(() => {
    let cpage = page ? page : 1;
    setCurrentPage(cpage);
    loadSearchStr();
  }, [str, cat, page, showData])

  return (
    <LayoutTemplate>
      <div className={classes.root}>
        <Grid container>
          <Grid item lg={12}>
            <ProductCategoryIcons />
          </Grid>
          <Grid item lg={12} xs={12}>
            <Typography align="left" variant="h4" component="span">Searching for &ldquo;{str || catn}&rdquo;</Typography>
          </Grid>
          {
            showData ? data.length ? (
                <>
                <Typography align="left" variant="h6" component="span">{totalCount} Resultados</Typography>
                <Grid item lg={12} xs={12} className={classes.pagination}>
                  <Pagination onChange={onPageChange} page={currentPage} count={pages} variant="outlined" size="large" shape="rounded" />
                </Grid>
                <Grid item lg={12} xs={12}>
                  <Grid container spacing={2}>
                    {
                      data.map((data, index) => {
                        let prodImage = data.productImages.length ? `${imageUrl}/${data.productImages[0].img_url}` : `/images/no-image.jpg`;
                        return (
                          <Grid key={index} item lg={3} sm={12}>
                            <Card className={classes.cardRoot} variant="outlined">
                              <CardActionArea>
                                <Link href={`/product/${data.id}`} color="inherit" underline="none">
                                  <CardMedia
                                    className={classes.media}
                                    image={prodImage}
                                    title={data.name}
                                    component="img"
                                  />
                                  <CardContent>
                                    <Typography align="center" variant="h3" component="h3">US ${data.amount}</Typography>
                                    <Typography align="center" variant="h4" component="h4">{data.name}</Typography>
                                    <Typography align="center" variant="body1" component="p">{data.description}</Typography>
                                    <Rate data={0} disabled={true} />
                                  </CardContent>
                                </Link>
                              </CardActionArea>
                            </Card>
                          </Grid>     
                        );
                      })
                    }
                  </Grid>
                </Grid>
                <Grid item lg={12} xs={12} className={classes.pagination}>
                  <Pagination count={pages} page={currentPage} variant="outlined" size="large" shape="rounded" />
                </Grid>
              </>
              ) : (
                <Grid item lg={12} xs={12}>
                  <Typography align="center" variant="h4" component="h4" >No Result Found</Typography>
                </Grid>
              ) : (
              <ProgressBar />
            )
          }
        </Grid>
      </div>
    </LayoutTemplate>
  );
}

SearchResult.protoTypes = {
  classes: T.object,
};

export default withStyles(styles)(SearchResult);