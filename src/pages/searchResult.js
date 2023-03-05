import React, { useEffect, useState, lazy, Suspense } from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import Typography from '@/common/Typography';
import LayoutTemplate from '@/common/Layout/LayoutTemplate';
import { searchProductsByFilter } from '@/api/products';
import { useTranslation } from 'next-i18next'
import ProgressBar from '@/common/ProgressBar';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Pagination from '@/components/product/results/Pagination';

const ResultList = lazy(() => import('../components/product/results/ResultList'));

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
  media: {
    height: 'auto',
    width: '100%',
    padding: 10,
  },
  itemsContainer: {
    padding: '5px 0px',
  },
});

const SearchResult = ({classes}) => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPages] = useState(0);
  const { str, cat, catn, page } = router.query;
  const { t } = useTranslation(['product', 'search', 'footer'])

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
    loadSearchStr()
  }, [str, cat, page]);

  useEffect(() => {
    setCurrentPage(1);
    loadSearchStr();
  }, [])

  return (
    <LayoutTemplate>
      <div className={classes.root}>
        <Grid container>
          <Grid item lg={12} xs={12} className={classes.mainTitle}>
            <Typography align="left" variant="h4" component="span" className={classes.mainTitleTitle}>
              { t('search:searching_for') } &ldquo;{str || catn}&rdquo;
            </Typography>
            <Typography align="left" variant="h6" component="span" className={classes.mainTitleSub}>{totalCount} { t('results') }</Typography>
          </Grid>
          <Grid item lg={12} xs={12} className={classes.pagination}>
            <Pagination onChange={onPageChange} count={pageCount} page={currentPage} />
          </Grid>
          <Grid item lg={12} xs={12} className={classes.itemsContainer}>
            <Suspense fallback={<ProgressBar />}>
              <ResultList products={data} />
            </Suspense>
          </Grid>
          <Grid item lg={12} xs={12} className={classes.pagination}>
            <Pagination onChange={onPageChange} count={pageCount} page={currentPage} />
          </Grid>
        </Grid>
      </div>
    </LayoutTemplate>
  );
}

SearchResult.protoTypes = {
  classes: T.object,
};

/** This section is mandatory for next-18next translation to work, only inside /pages */
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['search', 'footer', 'product']),
  },
})

export default withStyles(styles)(SearchResult);