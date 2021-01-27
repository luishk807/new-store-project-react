import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import SupplierDropDown from '../SupplierDropDown'
import {
    TextField,
    Grid
} from '@material-ui/core'
import { useState } from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    }

}))

const StockEntryFields = ({ onValueChange }) => {
    const classes = useStyles()
    const [stockEntry, setStockEntry] = useState({})
    const onStockEntryChange = (event) => {
        const newStockEntry = {
            ...stockEntry,
            [event.target.name]: event.target.value
        }
        setStockEntry(newStockEntry)
        if (onValueChange) {
            onValueChange(newStockEntry)
        }
    }
    const onSupplierChange = (supplier) => {
        const newStockEntry = {
            ...stockEntry,
            supplier_id: supplier.id
        }
        setStockEntry(newStockEntry)
    }
    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={12} lg={4}>
                    <TextField
                        name="quantity"
                        label="Quantity"
                        type="number"
                        onChange={onStockEntryChange} size="small" variant="filled" fullWidth={true}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <TextField
                        name="unit_cost"
                        label="Unit Cost"
                        type="number"
                        onChange={onStockEntryChange} size="small" variant="filled" fullWidth={true}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <TextField
                        name="unit_price"
                        label="Unit Price"
                        type="number"
                        onChange={onStockEntryChange} size="small" variant="filled" fullWidth={true}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <TextField
                        name="purchase_date"
                        label="Purchase Date"
                        type="date"
                        onChange={onStockEntryChange} size="small" variant="filled" fullWidth={true}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <TextField
                        name="expiration_date"
                        label="Expiration Date"
                        type="date"
                        onChange={onStockEntryChange} size="small" variant="filled" fullWidth={true}
                    />
                </Grid>
                <Grid item lg={12}>
                    <TextField
                        name="reference"
                        label="Reference"
                        type="text"
                        onChange={onStockEntryChange} size="small" variant="filled" fullWidth={true}
                    />
                </Grid>
                <Grid item lg={4}>
                    <SupplierDropDown onChange={onSupplierChange} />
                </Grid>
                <Grid item lg={4}>
                    <TextField
                        name="supplier_sku"
                        label="Supplier SKU"
                        type="text"
                        onChange={onStockEntryChange} size="small" variant="filled" fullWidth={true}
                    />
                </Grid>
                <Grid item lg={4}>
                    <TextField
                        name="supplier_invoice_ref"
                        label="Supplier Invoice Ref"
                        type="text"
                        onChange={onStockEntryChange} size="small" variant="filled" fullWidth={true}
                    />
                </Grid>
            </Grid>

            {/* SKU
                Barcode
                Stock
                Warehouse
                Reserved
                Price
                Cost
                Expiration */}
        </div>
    )
}

StockEntryFields.propTypes = {
    onValueChange: PropTypes.func
}

export default StockEntryFields
