import * as T from 'prop-types';
import { DataGrid } from '@material-ui/data-grid';

const TableData = ({
    title,
    rows = [],
    columns = [],
    showTitle = true,
    height = '400px',
    onDataRowClick
}) => {
    const onRowClick = (gridRowParams, event) => {
        if (onDataRowClick) {
            onDataRowClick(gridRowParams)
        }
    }
    return (
        <div style={{width: '100%'}}>
            {showTitle ? (<div>{title}</div>) : (<div></div>) }
            <div style={{ height: height, width: '100%', padding: '5px' }}>
                <DataGrid rows={rows} columns={columns} pageSize={100} onRowClick={onRowClick}  />
            </div>
        </div>
    )
}

TableData.protoTypes = {
    title: T.string,
    showTitle: T.bool,
    rows: T.array,
    columns: T.array,
    height: T.string,
    onDataRowClick: T.func
}

export default TableData;

