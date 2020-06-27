import React from 'react';
import T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { ShoppingCartIcon } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import CAR_WHEEL from '../svg/car_wheel.svg';


const styles = (theme) => ({
  title: {
    'color': 'red',
  }
});

const ProductCategoryIcons = ({classes, data}) => {
  
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <CAR_WHEEL width='70px' height="70px"/>
          <div className={classes.title}>
              Test
          </div>
        </div>
      </div>
    </div>
  );
}
ProductCategoryIcons.propTypes = {
  classes: T.object.isRequired,
  data: T.object,
};
export default withStyles(styles)(ProductCategoryIcons);