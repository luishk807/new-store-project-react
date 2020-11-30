import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import TableData from '../../../components/common/TableData';
import FileUploader from '../../../components/common/FileUploader';
import { Button, FormControl, Snackbar } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import Papa from 'papaparse';
import { importProducts } from '../../../api/products';

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

import VendorLayoutTemplate from '../../../components/common/Layout/VendorLayoutTemplate';

const tableColumns = [
    { field: 'code', headerName: 'Code'},
    { field: 'name', headerName: 'Name'},
    { field: 'stock', headerName: 'Stock'},
    { field: 'amount', headerName: 'Amount'},
    { field: 'category', headerName: 'Category'},
    { field: 'brand', headerName: 'Brand'},
    { field: 'model', headerName: 'Model'},
    { field: 'description', headerName: 'Description'}
];

const transformData = (csvArrayData) => {
    const fields = tableColumns.map(c => c.field);
    const rowsData = [];
    csvArrayData.forEach((row, idx) => {
        if (idx !== 0) { // Skip first header row and only process data
            const rowData = {};
            fields.forEach((field, fIdx) => {
                rowData[field] = row[fIdx];
            });
            rowsData.push({ id: idx, ...rowData});
        }
    });
    return rowsData;
}

const ImportProducts = ({
    classes
}) => {
    const [tableRows, setTableRows] = useState([]);
    const [snack, setSnack] = useState({
        severity: 'success',
        open: false,
        text: '',
    });
    const acceptedTypes = [
        '.csv',
        'text/csv',
        'application/csv'
    ];
    const onSave = (files) => {
        if (files.length === 1) {
            Papa.parse(files[0], {
                complete: function(results) {
                    console.log("Finished:", results.data);
                    const rowData = transformData(results.data);
                    setTableRows(rowData);
                }
            });
        }
    }
    const handleSubmit = () => {
        if (tableRows.length > 0) {
            importProducts(tableRows).then((result) => {
                setSnack({ open: true, text: 'Products were imported successfully', severity: 'success'});
            }).catch((err) => {
                console.log(err);
                setSnack({ open: true, text: 'Errors on importing products, please check error on console', severity: 'error'});
            });
        }
    }
    const snackClose = () => {
        setSnack({ ...snack, open: false });
    }
    return (
        <VendorLayoutTemplate>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                textAlign: 'center',
                alignSelf: 'center',
                padding: '5px',
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignSelf: 'center',
                    width: '100%',
                    }}>
                    <FileUploader onSave={onSave} buttonText="Import Products" acceptedMimeTypes={acceptedTypes} style={{width: '100px'}}></FileUploader>
                    <FormControl fullWidth className={classes.margin}>
                        <Button onClick={handleSubmit} className={'mainButton'}>Save Products</Button>
                    </FormControl>
                </div>
                <TableData rows={tableRows} columns={tableColumns}></TableData>
            </div>
            <Snackbar open={snack.open} autoHideDuration={5000} severity={snack.severity} onClose={snackClose} message={snack.text} />
        </VendorLayoutTemplate>
    );
}

ImportProducts.protoTypes = {
    classes: T.object
}

export default withStyles(styles)(ImportProducts);