import React from 'react';
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
import Pagination from '@material-ui/lab/Pagination';
import Rate from '../components/common/Rate';
import Typography from '../components/common/Typography';
import LayoutTemplate from '../components/common/Layout/LayoutTemplate';
import ProductCategoryIcons from '../components/ProductCategoryIcons'

import { SearchResultSample } from '../constants/samples/SearchResultSample';

const styles = (theme) => ({
  root: {
    padding: 5,
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
  }
});

const SearchResult = ({classes}) => {
  const data = SearchResultSample;

  return (
    <LayoutTemplate>
      <div className={classes.root}>
        <Grid container>
          <Grid item lg={12}>
            <ProductCategoryIcons />
          </Grid>
          <Grid item lg={12}>
            <Typography align="left" variant="h4" component="span">Electronics</Typography>
            &nbsp;&nbsp;<Typography align="left" variant="h6" component="span">{data.length} resultsdos</Typography>
          </Grid>
          <Grid item xl={12} className={classes.pagination}>
            <Pagination count={10} variant="outlined" size="large" shape="rounded" />
          </Grid>
          <Grid item xl={12}>
            <Grid container spacing={2}>
              {
                data.map((data, index) => {
                  return (
                    <Grid key={index} item lg={3} sm={12}>
                      <Card className={classes.cardRoot} variant="outlined">
                        <CardActionArea>
                          <Link href="/product" color="inherit" underline="none">
                            <CardMedia
                              className={classes.media}
                              image={`/images/products/${data.images[0]}`}
                              title={data.name}
                              component="img"
                            />
                            <CardContent>
                              <Typography align="center" variant="h3" component="h3">US ${data.total}</Typography>
                              <Typography align="center" variant="body1" component="p">{data.desc}</Typography>
                              <Rate data={data.rate} disabled={true} />
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
          <Grid item xl={12} className={classes.pagination}>
            <Pagination count={10} variant="outlined" size="large" shape="rounded" />
          </Grid>
        </Grid>
      </div>
    </LayoutTemplate>
  );
}

SearchResult.protoTypes = {
  classes: T.object,
};

export default withStyles(styles)(SearchResult);