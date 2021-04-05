import React, { useEffect, useState, useRef } from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
  Link,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import Pagination from '@material-ui/lab/Pagination';

import { getImage } from '../utils';
import Rate from '../components/common/Rate/Rate';
import Typography from '../components/common/Typography';
import LayoutTemplate from '../components/common/Layout/LayoutTemplate';
import { searchProductsByFilter } from '../api/products';
import ProgressBar from '../components/common/ProgressBar';
import TextEllipsis from '../components/common/TextEllipsis';

const styles = (theme) => ({
  root: {
    padding: 5,
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  mainTitle: {
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  mainTitleTitle: {
    padding: 5,
  },
  mainTitleSub: {
    padding: 5,
  },
  pagination: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
  cardRoot: {
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      margin: 0,
    }
  },
  media: {
    height: 'auto',
    width: '100%',
    padding: 10,
  },
  itemsContainer: {
    padding: '5px 0px',
  },
  itemMain: {
    // border: '1px solid rgba(0,0,0,.09)',
    // margin: 8,
    [theme.breakpoints.down('sm')]: {
      borderTop: '1px solid rgba(0,0,0,.09)',
      border: 'none',
      padding: '5px 0px',
      margin: 'auto',
    }
  },
  itemImg: {
    padding: 15,
    [theme.breakpoints.down('sm')]: {
      padding: 9,
    }
  },
  itemInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 9,
    '& p': {
      marginBottom: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
      alignItems: 'flex-start',
      lineHeight: 'auto',
      '& p': {
        marginBottom: 0,
      }
    }
  },
  itemAmount: {
    fontWeight: 'bold',
    fontSize: '2em',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2em',
      textAlign: 'left',
    }
  },
  itemTitle: {
    fontSize: '2em',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2em',
      textAlign: 'left',
      fontWeight: 'bold',
    }
  },
  itemDesc: {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
    },
    textAlign: 'center',
  },
  rateItem: {
    padding: '8px 0px'
  },
  itemsItemContainer: {
    justifyContent: 'center',
  }
});

const SearchResult = ({classes}) => {
  const router = useRouter();
  const { str, cat, catn, page } = router.query;
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPages] = useState(0);
  const [showData, setShowData] = useState(false);

  const loadSearchStr = async() => {
    const pageIndex = page ? +page : 1;
    const filters = {
      'search': str,
      'category': cat,
      'page': pageIndex,
    }
    const { count, items: fetchData, pages } = await searchProductsByFilter(filters);
    if (fetchData) {
      setTotalCount(count);
      setPages(+pages);
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
    let cpage = page ? +page : 1;
    setCurrentPage(cpage);
    loadSearchStr();
  }, [str, cat, page, showData])

  return (
    <LayoutTemplate>
      <div className={classes.root}>
        <Grid container>
          <Grid item lg={12} xs={12} className={classes.mainTitle}>
            <Typography align="left" variant="h4" component="span" className={classes.mainTitleTitle}>
              Searching for &ldquo;{str || catn}&rdquo;
            </Typography>
            <Typography align="left" variant="h6" component="span" className={classes.mainTitleSub}>{totalCount} Resultados</Typography>
          </Grid>
          {
            showData ? data.length ? (
                <>
                <Grid item lg={12} xs={12} className={classes.pagination}>
                  <Pagination onChange={onPageChange} page={currentPage} count={pageCount} variant="outlined" size="large" shape="rounded" />
                </Grid>
                <Grid item lg={12} xs={12} className={classes.itemsContainer}>
                  <Grid container className={classes.itemsItemContainer}>
                    {
                      data.map((data, index) => {
                        const prodImage = getImage(data);
                        return (
                          <Grid key={index} item lg={3} xs={12} className={classes.itemMain}>
                            <Link href={`/product/${data.id}`} color="inherit" underline="none">
                              <Grid container className={classes.cardRoot} >
                                <Grid item xs={5} lg={12 } className={classes.itemImg}>
                                  {
                                    prodImage
                                  }
                                </Grid>
                                <Grid item xs={7} lg={12} className={classes.itemInfo}>
                                  <p className={classes.itemAmount}>US ${data.amount}</p>
                                  <p align="center" variant="h4" component="h4" className={classes.itemTitle}>{data.name}</p>
                                  <TextEllipsis text={data.description} limit={100} classes={classes.itemDesc}/>
                                  <Rate className={classes.rateItem} data={0} disabled={true} />
                                </Grid>
                              </Grid>
                            </Link>
                          </Grid>     
                        );
                      })
                    }
                  </Grid>
                </Grid>
                <Grid item lg={12} xs={12} className={classes.pagination}>
                  <Pagination onChange={onPageChange} count={pageCount} page={currentPage} variant="outlined" size="large" shape="rounded" />
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