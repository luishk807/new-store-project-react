import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
  Link,
} from '@material-ui/core';

import { getAllProductRatesById } from '../api/rate';
import Typography from './common/Typography';
import Rate from './common/Rate/Rate';
import { getItemById } from '../api';

const styles = (theme) => ({
  nameSection: {
    padding: '8px 8px !important',
  },
  rateSection: {
    padding: '0px 8px !important',
  },
});

const VendorBox = ({classes, id}) => {
  const [vendor, setVendor] = useState({});
  const [showVendor, setShowVendor] = useState(false);

  const loadRates = async() => {
    const getVendor = await getItemById('vendors',id);
    setVendor(getVendor);
    console.log("vendor", getVendor)
    setShowVendor(true);
  }
  useEffect(() => {
    loadRates();
  }, [showVendor])

  return showVendor && (
    <div className={classes.root} id="vendorSection">
      <Grid container spacing={2}>
        <Grid item lg={12} className={classes.nameSection}>
          <Typography align="left" variant="body1" component="p">{`${vendor.first_name} ${vendor.last_name}`}  [<Link href="#">Ver Mas</Link>]</Typography>
        </Grid>
        <Grid item lg={12} className={classes.rateSection}>
          <Rate data={4} disabled={true} />
        </Grid>
        <Grid item lg={12}>
          <Typography align="left" variant="body1" component="p">{vendor.description}</Typography>
        </Grid>
      </Grid>
    </div>
  );
}

VendorBox.protoTypes = {
  classes: T.object,
  id: T.object,
}
export default withStyles(styles)(VendorBox);