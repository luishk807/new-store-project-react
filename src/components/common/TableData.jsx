import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { DataGrid } from '@material-ui/data-grid';

const TableData = ({
    classes,
    fields = ['code', 'name', 'stock', 'amount', 'category', 'brand', 'model', 'description'],
    data,
    title,
    rows = [],
    columns = [],
    showTitle = true
}) => {
    return (
        <div style={{width: '100%'}}>
            {showTitle ? (<div>{title}</div>) : (<div></div>) }
            <div style={{ height: 400, width: '100%', padding: '5px' }}>
                <DataGrid rows={rows} columns={columns} pageSize={100} />
            </div>
        </div>
    )
}

TableData.protoTypes = {
    classes: T.object,
    fields: T.array,
    data: T.array,
    title: T.string,
    showTitle: T.bool,
    rows: T.array,
    columns: T.array
}

export default TableData;

