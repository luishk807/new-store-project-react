import {
  withStyles,
  Grid,
  Link,
} from '@material-ui/core';
import * as T from 'prop-types';
import { getImage, getSortPriceRange } from 'src/utils';
import Rate from '@/common/Rate/Rate';
import DiscountLabel from '@/common/DiscountLabel';

const styles = (theme) => ({
  itemMain: {
    [theme.breakpoints.down('sm')]: {
      borderTop: '1px solid rgba(0,0,0,.09)',
      border: 'none',
      padding: '5px 0px',
      margin: 'auto',
    }
  },
  cardRoot: {
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      margin: 0,
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
  rateItem: {
    padding: '8px 0px'
  },
  itemTitle: {
    fontSize: '1.2em',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
      fontWeight: 'bold',
    }
  },
  itemAmount: {
    fontWeight: 'bold',
    fontSize: '1.2em',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
    }
  },
});

const ProductItem = ({classes, index, product}) => {
  const sort = getSortPriceRange(product);
  const prodImage = getImage(product);
  return (
    <Grid key={index} item lg={2} xs={12} className={classes.itemMain}>
      <Link href={`/product/${product.slug}`} color="inherit" underline="none">
        <Grid container className={classes.cardRoot} >
          <Grid item xs={5} lg={12 } className={classes.itemImg}>
            {
              prodImage
            }
          </Grid>
          <Grid item xs={7} lg={12} className={classes.itemInfo}>
            <p className={classes.itemAmount}>{sort}</p>
            <p align="center" variant="h4" component="h4" className={classes.itemTitle}>{product.name}</p>
            <Rate className={classes.rateItem} data={0} disabled={true} />
            <DiscountLabel data={product.productProductItems}/>
          </Grid>
        </Grid>
      </Link>
    </Grid> 
  )
}

ProductItem.propTypes = {
  classes: T.object,
  product: T.object,
  index: T.number
}

export default withStyles(styles)(ProductItem);