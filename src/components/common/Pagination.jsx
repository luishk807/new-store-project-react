import React, { useEffect, useState, useMemo } from 'react';
import * as T from 'prop-types';
import { 
  withStyles, 
  Grid,
} from '@material-ui/core';
import { LIMIT } from 'config';
import Pagination from '@mui/lab/Pagination';

const styles = (theme) => ({
  paginationItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paginationContainer: {
    padding: '20px 0px',
  },
})

const PaginationComp = ({
  classes, 
  children,
  onPageClick, 
  total,
  limit = LIMIT,
  showData,
  refresh,
  empty
}) => {
  const [page, setPage] = useState(1);

  const handlePageClick = (e, value) => {
    setPage(value)
  }

  const paginationHtml = useMemo(() => {
    return (<Grid container className={classes.paginationContainer}>
      <Grid item lg={12} xs={12} className={classes.paginationItem}>
        <Pagination 
          onChange={handlePageClick} 
          size="large" 
          showFirstButton 
          showLastButton 
          count={Math.ceil(total / limit )} 
          page={page} 
          variant="outlined" 
          shape="rounded" 
        />
      </Grid>
    </Grid>)
  },[total, page, refresh])

  
  useEffect(() => {
    onPageClick(page)
  }, [page]);

  useEffect(() => {
    setPage(1);
  }, []);

  return showData && ( 
    <Grid container>
    {
      paginationHtml && !empty && paginationHtml
    }
    {
      children
    }
    {
      paginationHtml && !empty && paginationHtml
    }
    </Grid>
   );
}
 
PaginationComp.protoTypes = {
  classes: T.object,
  children: T.node,
  onPageClick: T.func,
  total: T.number,
  limit: T.number,
  showData: T.bool,
  refresh: T.bool,
  empty: T.bool
}

export default withStyles(styles)(PaginationComp);