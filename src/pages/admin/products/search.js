import { makeStyles } from '@material-ui/core';
import AdminLayoutTemplate from '../../../components/common/Layout/AdminLayoutTemplate';
import SearchTableComponent from '../../../components/common/SearchTableComponent';
import { search } from '../../../services/productUnified';

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

    const onSearchValue = async (value) => {
        const result = await search(value);
        const { items = [] } = result.data;
        return items;
    }

    return (
        <AdminLayoutTemplate>
            <div className={classes.root}>
                <SearchTableComponent onSearchValue={onSearchValue} dataRowUniqueIdField="productItemId" />
            </div>
        </AdminLayoutTemplate>
    )
}

export default SearchAdminProductsUnified;
