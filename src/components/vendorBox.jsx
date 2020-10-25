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
import { getRatingAvg } from '../utils';

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
  const [rates, setRates] = useState(0);

  const loadRates = async() => {
    const getVendor = await getItemById('vendors',id);
    setVendor(getVendor);
    const getAvg = getRatingAvg(getVendor.vendor_rates);
    setRates(getAvg);
    setShowVendor(true);
  }
  useEffect(() => {
    loadRates();
  }, [showVendor])

  return showVendor && (
    <div className={classes.root} id="vendorSection">
      <Grid container spacing={2}>
        <Grid item lg={12} xs={12} className={classes.nameSection}>
          <Typography align="left" variant="body1" component="p">{`${vendor.first_name} ${vendor.last_name}`}  [<Link href="#">Ver Mas</Link>]</Typography>
        </Grid>
        <Grid item lg={12} xs={12} className={classes.rateSection}>
          <Rate data={rates} disabled={true} />
        </Grid>
        <Grid item lg={12} xs={12} >
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