import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core'
import { withTranslation } from '../../../../i18n'
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
import DeleteIcon from '@material-ui/icons/Delete'
import MessageAlert from '../MessageAlert'
import CustomDialog from '../CustomDialog'
import { useEffect, useState } from 'react'
import { removeProductVariant } from '../../../services/inventarioz/product'

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

const ProductVariants = ({ t, dataObject }) => {

    const classes = useStyles()
    const [productVariants, setProductVariants] = useState([])
    const [openAlert, setOpenAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState({ severity: 'error', message: 'Toasty!'} )
    const [dialogOpen, setDialogOpen] = useState(false)
    const [variant, setVariant] = useState(null)

    useEffect(() => {
        if (dataObject) {
            setProductVariants([...dataObject.product_variant])
        }
    }, [dataObject])

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

    const removeVariant = (value) => {
        setVariant(value)
        setDialogOpen(true)
    }

    const onVariantDelete = () => {
        showAlert({ severity: 'error', message: 'Toasty'})
        removeProductVariant(variant.id)
            .then(result => {
                console.log(result)
                showAlert({ severity: 'success', message: 'Removed successful'})
                removeFromTable(variant.id)
            }).catch(err => {
                console.log(err)
                showAlert({ severity: 'error', message: err.error })
            })
        setDialogOpen(false)
    }

    const removeFromTable = (id) => {
        const newVariants = []
        productVariants.forEach(pv => {
            if (pv.id !== id) {
                newVariants.push(pv)
            }
        })
        setProductVariants(newVariants)
    }

    return (
        <div className={classes.root}>
            <MessageAlert open={openAlert} onClose={onAlertClose} message={alertMessage} />
            <CustomDialog 
                dialogOpenFlag={dialogOpen} 
                cancelButtonFunc={closeConfirmationDialog}
                submitButtonFunc={onVariantDelete}
                submitButtonText={ /*t('remove_prod_variant')*/ 'Remove Variant' }
                title="Confirm Delete"
                useActions={true}
                contextText={ /*t('pv_remove_confirmation_message')*/ 'Are you sure you want to remove this product variant?' }
            />
            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="basic-content"
                    id="variants-header"
                    >
                    { /*t('pv_title')*/ 'Product Variants' }
                </AccordionSummary>
                <AccordionDetails>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>{ /*t('pv_option')*/ 'Option' }</TableCell>
                                    <TableCell>{ /*t('pv_option_value')*/ 'Option Value' }</TableCell>
                                    <TableCell>{ t('sku').toUpperCase() }</TableCell>
                                    <TableCell>{ t('model').toUpperCase() }</TableCell>
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
                                    <TableCell align="right">
                                    <IconButton aria-label="delete" size="small" onClick={() => { removeVariant(p)}}>
                                        <DeleteIcon />
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

ProductVariants.getInitialProps = async () => ({
    namespacesRequired: ['product']
})

ProductVariants.defaultProps = {
    options: [],
    optionValues: []
}

ProductVariants.propTypes = {
    t: PropTypes.func.isRequired,
    dataObject: PropTypes.object.isRequired,
    options: PropTypes.array,
    optionValues: PropTypes.array
}

export default withTranslation('product')(ProductVariants);
