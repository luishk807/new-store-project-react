import { Button, makeStyles } from '@material-ui/core'
import SearchInput from '../inventarioz/SearchInput';
import TableData from './TableData';
import CheckboxList from '../common/CheckboxList';
import { capitalize } from '../../utils';
import PropTypes from 'prop-types';
import { useState } from 'react';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%'
    }
}));

/** Creates a Material-UI DataGrid column object */
const createColumnObject = (fieldName) => {
    if (fieldName) {
        return { field: fieldName, headerName: capitalize(fieldName), hide: false }
    }
    return null;
}

const SearchTableComponent = ({ onSearchValue, dataRowUniqueIdField, dataGridHeight = '400px' }) => {
    const classes  = useStyles();
    const [allColumns, setAllColumns] = useState([]);
    const [tableColumns, setTableColumns] = useState([]);
    const [tableRows, setTablerows] = useState([]);
    const [hideFilterColumns, setHideFilterColumns] = useState(true);

    const setFilteringColumns = (data) => {
        const columns = [];
        if (!!data.length) {
            data.forEach(c => {
                columns.push({
                    name: c.field,
                    label: c.headerName,
                    checked: true
                })
            })
        }
        setAllColumns(columns);
    }

    const setColumnsFromData = (data) => {
        const columns = [];
        if (!!data.length) {
            Object.keys(data[0]).forEach(field => {
                columns.push(createColumnObject(field));
            });
        }
        setFilteringColumns(columns);
        setTableColumns(columns);
    }

    const createRowsIdFromData = (data) => {
        let adjustedData = [];
        if (dataRowUniqueIdField) {
            data.forEach(d => {
                adjustedData.push({
                    id: d[dataRowUniqueIdField], ...d
                })
            });
        } else {
            adjustedData = data;
        }
        return adjustedData;
    }

    /** Searches results for the given value */
    const onSearch = (value) => {
        onSearchValue(value)
            .then(results => {
                setColumnsFromData(results);
                const dataRows = createRowsIdFromData(results)
                setTablerows(dataRows);
            })
            .catch(err => {
                console.log(`Error searching for ${value}`, err);
            })
    };

    const showOrHideColumns = (checkboxes) => {
        const newColumnsState = [];
        tableColumns.forEach(column => {
            // Table column has hide=true if you want to hide, but you have it checked in checkbox if you want to show
            if (checkboxes[column.field].checked === column.hide) {
                column.hide = !column.hide
            }
            newColumnsState.push(column)
        })
        setTableColumns(newColumnsState)
    }

    /** Filters out columns from the DataGrid */
    const onCheckboxListChanges = (checkboxes) => {
        showOrHideColumns(checkboxes)
    }

    /** Shows/Hide columns from the results for filtering purposes */
    const onFilterColumnsClicked = () => {
        setHideFilterColumns(!hideFilterColumns)
    }

    return (
        <div className={classes.root}>
            <div>
                <SearchInput onSearchEnterKey={onSearch} onSearchIconClick={onSearch} />
                <Button onClick={onFilterColumnsClicked}>Filter Columns</Button>
                <CheckboxList items={allColumns} hidden={hideFilterColumns} onCheckboxListChanges={onCheckboxListChanges} />
            </div>
            <TableData 
                columns={tableColumns}
                rows={tableRows}
                height={dataGridHeight}
            />
        </div>
    )
}

SearchTableComponent.propTypes = {
    onSearchValue: PropTypes.func.isRequired,
    dataRowUniqueIdField: PropTypes.string,
    dataGridHeight: PropTypes.string
}

export default SearchTableComponent;
