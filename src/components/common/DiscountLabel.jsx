import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles, 
  Grid,
} from '@material-ui/core';

import { useTranslation } from 'next-i18next';

const styles = (theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  discountPrice: {
    background: 'red',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '.7em',
    padding: '4px 8px',
    borderRadius: '5px',
    margin: '5px 0px',
  }
})

const DiscountLabel = React.memo(({classes, data}) => {
  const [showData, setShowData] = useState(false)

  const { t } = useTranslation(['product'])

  useEffect(() => {
    const foundDiscount = data.filter(item => item.prevRetailPrice)[0];
    if (foundDiscount) {
      setShowData(true);
    } else {
      setShowData(false);
    }
  }, [data])

  return showData && (
    <div className={classes.root}>
        <p className={classes.discountPrice}>{ t('product:on_sale') }</p>
    </div>
   );
})

DiscountLabel.protoTypes = {
  classes: T.object,
  data: T.string
}

export default withStyles(styles)(DiscountLabel);