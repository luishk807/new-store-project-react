import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
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
    const [purchaseDate, setPurchaseDate] = useState(new Date())
    const [expirationDate, setExpirationDate] = useState(null)

    const updateStockEntry = ({ field, value }) => {
        const newStockEntry = {
            ...stockEntry,
            [field]: value,
            purchase_date: purchaseDate
        }
        setStockEntry(newStockEntry)
        outputValue(newStockEntry)
    }
    const onStockEntryChange = (event) => {
        updateStockEntry({ field: event.target.name, value: event.target.value})
    }
    const onSupplierChange = (supplier, value) => {
        updateStockEntry({ field: 'supplier_id', value: supplier.id })
    }
    const onPurchaseDateChange = (value) => {
        setPurchaseDate(value)
        updateStockEntry({ field: 'purchase_date', value: value })
    }
    const onExpirationDateChange = (value) => {
        setExpirationDate(value)
        updateStockEntry({ field: 'expiration_date', value: value })
    }
    /** Sends the value to the onValueChange function */
    const outputValue = (value) => {
        if (onValueChange) {
            onValueChange(value)
        }
    }
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                    {/* <TextField
                        name="purchase_date"
                        label="Purchase Date"
                        type="date"
                        defaultValue={currentDate}
                        onChange={onStockEntryChange} size="small" variant="filled" fullWidth={true}
                    /> */}
                    
                    <KeyboardDatePicker
                        name="purchase_date"
                        margin="normal"
                        id="date-picker-dialog"
                        label="Purchase Date"
                        format="MM/dd/yyyy"
                        value={purchaseDate}
                        onChange={onPurchaseDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        size="small" fullWidth={true}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    {/* <TextField
                        name="expiration_date"
                        label="Expiration Date"
                        type="date"
                        onChange={onStockEntryChange} size="small" variant="filled" fullWidth={true}
                    /> */}
                    <KeyboardDatePicker
                        name="expiration_date"
                        margin="normal"
                        label="Expiration Date"
                        format="MM/dd/yyyy"
                        value={expirationDate}
                        onChange={onExpirationDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        size="small" fullWidth={true}
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
        </MuiPickersUtilsProvider>
    )
}

StockEntryFields.propTypes = {
    onValueChange: PropTypes.func
}

export default StockEntryFields
