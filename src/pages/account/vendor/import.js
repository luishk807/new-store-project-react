import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import ProductImport from 'src/components/product/Import';
import { withStyles } from '@material-ui/core';

const styles = (theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      textAlign: 'center',
    },
});

import VendorLayoutTemplate from 'src/components/common/Layout/VendorLayoutTemplate';

const ImportProducts = ({
    classes
}) => {
    return (
        <VendorLayoutTemplate>
            <div className={classes.root}>
                <ProductImport></ProductImport>
            </div>
        </VendorLayoutTemplate>
    );
}

ImportProducts.protoTypes = {
    classes: T.object
}

export default withStyles(styles)(ImportProducts);