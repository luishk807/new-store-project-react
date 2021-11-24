import { makeStyles } from '@material-ui/core';
import AdminLayoutTemplate from '@/common/Layout/AdminLayoutTemplate';
import SearchTableComponent from '@/common/SearchTableComponent';
import { search } from '@/services/productUnified';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        textAlign: 'center',
    },
}));

const SearchAdminProductsUnified = () => {
    const classes = useStyles();
    let prevClickObject = null;
    let prevClickTime = null;
    const defaultUnhiddenColumns = [
        'name', 'stock', 'categoryName', 'brandName', 'productItemStock', 'productItemModel',
        'unitCost', 'unitPrice', 'productItemSku', 'productColorName', 'productSizeName'
    ]

    const onSearchValue = async (value) => {
        const result = await search(value);
        const { items = [] } = result.data;
        return items;
    }

    const openNewWindow = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    const onResultRowClick = (params) => {
        if (params && params.data && params.data.productId) {
            // Use between click ms to identify double click on the same row object
            const currentTime = new Date().getTime();
            const msBetweenClick = currentTime - prevClickTime;
            if (prevClickObject === params.data.productId && msBetweenClick <= 1000) {
                openNewWindow(`/admin/products/${params.data.productId}`)
            }
            prevClickObject = params.data.productId
            prevClickTime = new Date().getTime();
        }
    }

    return (
        <AdminLayoutTemplate>
            <div className={classes.root}>
                <SearchTableComponent
                    onSearchValue={onSearchValue}
                    dataRowUniqueIdField="productItemId"
                    dataGridHeight="600px"
                    onResultRowClick={onResultRowClick}
                    defaultUnhiddenColumns={defaultUnhiddenColumns}
                    />
            </div>
        </AdminLayoutTemplate>
    )
}

export default SearchAdminProductsUnified;
