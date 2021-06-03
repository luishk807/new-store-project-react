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
const createColumnObject = (fieldName, hide = false) => {
    if (fieldName) {
        return { field: fieldName, headerName: capitalize(fieldName), width: 150, hide: hide }
    }
    return null;
}

const SearchTableComponent = ({ onSearchValue, dataRowUniqueIdField, dataGridHeight = '400px', onResultRowClick, defaultUnhiddenColumns }) => {
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
                    checked: !c.hide
                })
            })
        }
        setAllColumns(columns);
    }

    const setColumnsFromData = (data) => {
        const columns = [];
        if (!!data.length) {
            Object.keys(data[0]).forEach(field => {
                let colHidden = false;
                if (defaultUnhiddenColumns) { // If default unhidden columns array defined, then use different logic, set everything else apart from list to be hidden
                    if (!defaultUnhiddenColumns.includes(field)) {
                        colHidden = true;
                    }
                }
                columns.push(createColumnObject(field, colHidden));
            });
        }
        setFilteringColumns(columns);
        setTableColumns(columns);
    }

    const createRowsIdFromData = (data) => {
        let adjustedData = [];
        let noIdCounter = 0;
        if (dataRowUniqueIdField) {
            data.forEach(d => {
                // In case the given field does not have values, so it will create its own id
                const id = d[dataRowUniqueIdField] ? d[dataRowUniqueIdField] : `no-id-${noIdCounter++}`;
                adjustedData.push({
                    id: id, ...d
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

    const onDataRowClick = (dataRowParams) => {
        if (onResultRowClick) {
            onResultRowClick(dataRowParams)
        }
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
                onDataRowClick={onDataRowClick}
            />
        </div>
    )
}

SearchTableComponent.propTypes = {
    onSearchValue: PropTypes.func.isRequired,
    dataRowUniqueIdField: PropTypes.string,
    dataGridHeight: PropTypes.string,
    onResultRowClick: PropTypes.func,
    defaultUnhiddenColumns: PropTypes.arrayOf(PropTypes.string)
}

export default SearchTableComponent;
