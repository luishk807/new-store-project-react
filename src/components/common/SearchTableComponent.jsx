import { makeStyles } from '@material-ui/core'
import SearchInput from '../inventarioz/SearchInput';
import TableData from './TableData';
import { capitalize } from '../../utils';
import PropTypes from 'prop-types';
import { useState } from 'react';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%'
    }
}));

const createColumnObject = (fieldName) => {
    if (fieldName) {
        return { field: fieldName, headerName: capitalize(fieldName) }
    }
    return null
}

const SearchTableComponent = ({ onSearchValue, dataRowUniqueIdField }) => {
    const classes  = useStyles();
    const [tableColumns, setTableColumns] = useState([]);
    const [tableRows, setTablerows] = useState([]);

    const setColumnsFromData = (data) => {
        if (!!data.length) {
            const columns = [];
            Object.keys(data[0]).forEach(field => {
                columns.push(createColumnObject(field));
            });
            setTableColumns(columns);
        } else {
            setTableColumns([]);
        }
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

    return (
        <div className={classes.root}>
            <SearchInput onSearchEnterKey={onSearch} onSearchIconClick={onSearch} />
            <TableData 
                columns={tableColumns}
                rows={tableRows}
            />
        </div>
    )
}

SearchTableComponent.propTypes = {
    onSearchValue: PropTypes.func.isRequired,
    dataRowUniqueIdField: PropTypes.string
}

export default SearchTableComponent;
