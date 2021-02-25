import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  Hidden,
  Button,
} from '@material-ui/core';

import { getProductById } from '../../api/products';
import Icons from '../common/Icons';

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  headerTitle: {
    padding: 20,
    textTransform: 'capitalize'
  },
  icon: {
    width: 30,
    height: 30,
    fill: 'black'
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },
});

const HeaderSub = ({ classes, id, name }) => {
  const [product, setProduct] = useState(null)
  const [showData, setShowData] = useState(false);

  const loadProduct = async() => {
    if (id) {
      const gProduct = await getProductById(id);
      setProduct(gProduct);
      setShowData(true);
    }
  };

  useEffect(()=> {
    loadProduct();
  }, [id]);

  return showData && (
    <Grid container className={classes.headerContainer}>
      <Grid item className={classes.headerTitle} lg={10} xs={7}>
        <h3><Button href='/admin/products'><Icons classes={{icon: classes.icon}} name="backArrow" /></Button>&nbsp; {name} for <a href={`/admin/products/${product.id}`}>{`${product.name}`}</a></h3>
      </Grid>
      <Grid item className={classes.headerTitle} lg={2} xs={5}>
        <Button className={`mainButton`} href={`/admin/products/${name}/add/${product.id}`}>Add {name}</Button>
      </Grid>
    </Grid>
  );
}

HeaderSub.propTypes = {
  classes: T.object,
  id: T.number,
  name: T.string,
}

export default withStyles(styles)(HeaderSub);