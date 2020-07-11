import React from 'react';
import T from 'prop-types';
import { 
  withStyles, 
  Grid,
} from '@material-ui/core';



const styles = (theme) => {

}
const BigCarrousel = ({classes, image}) => {
  return (
    <Grid container>
      <Grid item>
          <img className='img-fluid' src={`/images/banners/main/${image}`} alt=""/>
      </Grid>
    </Grid>
  );
}
BigCarrousel.protoTypes = {
  classes: T.object,
  image: T.object,
}

export default withStyles(styles)(BigCarrousel);