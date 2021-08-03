import React from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
  Button,
  Hidden,
} from '@material-ui/core';

import { getImage, getSortPriceRange } from 'src/utils';

import TextEllipsis from '@/components/common/TextEllipsis';
import Rate from '@/components/common/Rate/Rate';

const styles = (theme) => ({
  cardBtn: {

  },
  cardSingle: {
    alignItems: 'center'
  },
  cardSingleText: {
    textAlign: 'left'
  },
  featureBtn: {
    padding: '10px 25px',
    border: '1px solid black',
    borderRadius: 5,
    display: 'block',
    margin: '10px 0px',
    fontSize: '0.8em',
    flexBasis: 'auto',
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  textCenter: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center'
  },
  plainText: {
    fontSize: '0.9em'
  },
  singleItem: {
    margin: '10px 0px'
  },
  singleLink: {
    fontSize: '1.1em',
    fontWeight: 'bold',
    color: 'black',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
});

const SweetBoxProducts = React.memo(({classes, data, type = ''}) => {
  const loadCardIcons = () => {
    const img = getImage(data);
    const priceRange = getSortPriceRange(data);
    switch(type) {
      case 'feature': {
        return (
            <Button className={classes.cardBtn}  href={`product/${data.slug}`}>
              <Grid container>
                <Grid item lg={12} xs={12} className={classes.featureBtn}>
                  Show Now
                </Grid>
                <Grid item lg={12} xs={12}>
                {
                  img
                }
                </Grid>
              </Grid>
            </Button>
        )
        break;
      }
      case 'single': {
        return (
            <Grid container className={classes.cardSingle}>
              <Grid item lg={4} md={2} xs={7}>
                <a href={`product/${data.slug}`} title={data.name}>
                {
                  img
                }
                </a>
              </Grid>
              <Grid item lg={8} md={10} xs={5} className={`${classes.cardSingleText}`}>
                <Grid container>
                  <Grid item lg={12} xs={12}>
                    <a href={`product/${data.slug}`} title={data.name} className={classes.singleLink}>{data.name}</a><br/>
                    {priceRange}
                  </Grid>
                  <Hidden only={['sm', 'lg']}>
                    <Grid item lg={12} xs={12} className={classes.singleItem}>
                      <Rate 
                        data={0} 
                        disabled={true} 
                      />
                    </Grid>
                  </Hidden>
                  <Grid item lg={12} xs={12} className={classes.singleItem}>
                    <Button href={`product/${data.slug}`} className={`smallMainButton`}>Buy Now</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
        )
        break;
      }
      case 'plain': {
          return (
            <Button className={classes.cardBtn} href={`product/${data.slug}`} title={data.name}>
              <Grid container>
                <Grid item lg={12} xs={12}>
                  {
                    img
                  }
                </Grid>
                <Hidden only={['sm', 'lg']}>
                  <Grid item lg={12} xs={12} className={`${classes.textCenter}`}>
                    <Rate 
                      data={0} 
                      disabled={true} 
                    />
                  </Grid>
                </Hidden>
                <Grid item lg={12} xs={12} className={`${classes.textCenter}`}>
                  <TextEllipsis classes={classes.plainText} limit={40} variant="body1" type="p" text={data.name} />
                </Grid>
                <Grid item lg={12} xs={12} className={`${classes.textCenter}`}>
                  {priceRange}
                </Grid>
              </Grid>
            </Button>
        )
        break;
      }
      default: {
        return (
            <Button className={classes.cardBtn} href={`product/${data.slug}`}>
              <Grid container>
                <Grid item lg={12} xs={12}>
                  {
                    img
                  }
                </Grid>
                <Grid item lg={12} xs={12} className={`${classes.textCenter}`}>
                {data.name}
                </Grid>
                <Grid item lg={12} xs={12} className={`${classes.textCenter}`}>
                  <Rate 
                    data={0} 
                    disabled={true} 
                  />
                </Grid>
                <Grid item lg={12} xs={12} className={`${classes.textCenter}`}>
                  {priceRange}
                </Grid>
              </Grid>
            </Button>
        )
      }
    }
  }

  return loadCardIcons()
})

SweetBoxProducts.protoTypes = {
  classes: T.object,
  data: T.object,
  type: T.string
}

export default withStyles(styles)(SweetBoxProducts);