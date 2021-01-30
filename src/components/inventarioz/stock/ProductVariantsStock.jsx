import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core'
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
// import DeleteIcon from '@material-ui/icons/Delete'
import { green } from '@material-ui/core/colors';
import MessageAlert from '../MessageAlert'
import CustomDialog from '../CustomDialog'
import StockEntryFields from './StockEntryFields'
import { useEffect, useState } from 'react'
import { addStockEntry } from '../../../services/inventarioz/stock'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}));

const showOption = (value) => {
    return <div>{ (value) ? value.name : '' }</div>
}

const showOptionValue = (value) => {
    return <div>{ (value) ? value.value : '' }</div>
}

const ProductVariantsStock = ({ dataObject, stock }) => {

    const classes = useStyles()
    const [productVariants, setProductVariants] = useState([])
    const [openAlert, setOpenAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState({ severity: 'error', message: 'Toasty!'} )
    const [dialogOpen, setDialogOpen] = useState(false)
    const [selectedVariant, setSelectedVariant] = useState(null)
    const [stockEntry, setStockEntry] = useState(null)

    const getVariantsStock = (variantId, stockArray) => {
        if (stockArray) {
            for (let n=0; n<stockArray.length; ++n) {
                if (stockArray[n].product_variant_id === variantId) {
                    return stockArray[n]
                }
            }
        }
        return null
    }

    /** Attaching the stock into the product_variant object as stock property */
    const unifyStocksToVariant = (product_variant, stock) => {
        if (product_variant) {
            for (let n=0; n<product_variant.length; ++n) {
                const pv = product_variant[n];
                console.log('pv.id', pv.id)
                const pvStock = getVariantsStock(pv.id, stock)
                // console.log('pvStock', pvStock)
                pv.stock = pvStock
            }
            console.log(product_variant)
        }
    }

    useEffect(() => {
        if (dataObject) {
            // Assigns the stock to the product variant as stock property
            unifyStocksToVariant(dataObject.product_variant, stock)
            setProductVariants([...dataObject.product_variant])
        }
    }, [dataObject, stock])

    const addStock = (value) => {
        setSelectedVariant(value)
        setDialogOpen(true)
    }

    const removeStock = (value) => {
        console.log('removeStock', value)
    }

    const onAlertClose = () => {
        setOpenAlert(false)
    }

    const showAlert = ({ severity, message }) => {
        setAlertMessage({ severity, message })
        setOpenAlert(true)
    }

    const closeConfirmationDialog = () => {
        setDialogOpen(false)
    }

    const onStockEntryChange = (stock) => {
        setStockEntry(stock)
    }

    const onStockEntrySubmit = () => {
        if (stockEntry && selectedVariant) {
            // Add other base information
            const stockEntryToSubmit = {
                ...stockEntry,
                product_id: +dataObject.id,
                product_variant_id: +selectedVariant.id,
                stock_id: +selectedVariant.stock.id
            }
            addStockEntry(stockEntryToSubmit)
                .then(result => {
                    console.log('addStockEntry.result', result)
                    showAlert({ severity: 'success', message: 'Stock entry successfully added'})
                    closeConfirmationDialog()
                })
                .catch(err => {
                    showAlert({ severity: 'error', message: err.error })
                })
        }
    }

    return (
        <div className={classes.root}>
            <MessageAlert open={openAlert} onClose={onAlertClose} message={alertMessage} />
            <CustomDialog 
                dialogOpenFlag={dialogOpen} 
                cancelButtonFunc={closeConfirmationDialog}
                submitButtonFunc={onStockEntrySubmit}
                submitButtonText={ 'Add Stock Entry' }
                title="Add Stock Entry"
                useActions={true}
                contextText={ 'Add new stock entry to product ' + dataObject.name + ' ?' }
            >
                <StockEntryFields onValueChange={onStockEntryChange} />
            </CustomDialog>
            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="basic-content"
                    id="variants-header"
                    >
                    Product Variants
                </AccordionSummary>
                <AccordionDetails>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>{ 'Option' }</TableCell>
                                    <TableCell>{ 'Option Value' }</TableCell>
                                    <TableCell>{ 'SKU' }</TableCell>
                                    <TableCell>{ 'Model' }</TableCell>
                                    <TableCell>{ 'Stock' }</TableCell>
                                    <TableCell align="right">*</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {productVariants.map((p) => (
                                <TableRow key={p.id}
                                    hover={true} 
                                    className={classes.tableRow} 
                                    onClick={() => { }}
                                >
                                    <TableCell>{ showOption(p.option) }</TableCell>
                                    <TableCell>{ showOptionValue(p.option_value) }</TableCell>
                                    <TableCell>{p.sku}</TableCell>
                                    <TableCell>{p.model}</TableCell>
                                    <TableCell>{p.stock ? p.stock.quantity : 0}</TableCell>
                                    <TableCell align="right">
                                        <IconButton aria-label="delete" size="small" onClick={() => { addStock(p)}}>
                                            <AddCircleIcon style={{ color: green[500] }} />
                                        </IconButton>
                                        <IconButton aria-label="delete" size="small" onClick={() => { removeStock(p)}}>
                                            <RemoveCircleIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

ProductVariantsStock.defaultProps = {
    options: [],
    optionValues: []
}

ProductVariantsStock.propTypes = {
    // t: PropTypes.func.isRequired,
    dataObject: PropTypes.object.isRequired,
    options: PropTypes.array,
    optionValues: PropTypes.array
}

export default ProductVariantsStock
