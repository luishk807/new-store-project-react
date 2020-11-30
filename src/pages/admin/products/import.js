import ProductImport from '../../../components/product/ProductImport';
import { withStyles } from '@material-ui/core';
import * as T from 'prop-types';
import AdminLayoutTemplate from '../../../components/common/Layout/AdminLayoutTemplate'

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

const ImportAdminProducts = ({
    classes
}) => {
    return (
        <AdminLayoutTemplate>
            <div className={classes.root}>
                <ProductImport classes={classes}></ProductImport>
            </div>
        </AdminLayoutTemplate>
    )
}

ImportAdminProducts.protoTypes = {
    classes: T.object
}

export default withStyles(styles)(ImportAdminProducts);
