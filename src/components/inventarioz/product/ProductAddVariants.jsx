import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core'
import {
    Grid,
    TextField,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import DropDown from '@/inventarioz/DropDown'
import ProductOptionsDropDown from '@/inventarioz/ProductOptionsDropDown'
import MessageAlert from '@/inventarioz/MessageAlert'
import { useState } from 'react'
import { saveProductVariant } from '@/services/inventarioz/product'
import CustomDialog from '@/inventarioz/CustomDialog'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}));

const ProductAddVariants = ({ /*t,*/ dataObject, onUpdate }) => {
    const classes = useStyles()
    const [sku, setSku] = useState(null)
    const [model, setModel] = useState(null)
    const [optionValues, setOptionValues] = useState([])
    const [selectedOptionValue, setSelectedOptionValue] = useState(null)
    const [showingAlert, setShowingAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState({ severity: 'success', message: ''})
    const [dialogOpened, setDialogOpened] = useState(false)

    const onSkuChange = (event) => {
        setSku(event.target.value)
    }

    const onModelChange = (event) => {
        setModel(event.target.value)
    }

    const onOptionsChange = (value) => {
        const ovs = value.option_value
        const values = []
        if (ovs) {
            ovs.forEach(v => {
                values.push({
                    text: v.value,
                    value: v.id,
                    object: v
                })
            })
            setOptionValues(values)
        }
    }

    const onOptionValueChange = (value) => {
        setSelectedOptionValue(value)
    }

    const showMessage = (severity, message) => {
        setShowingAlert(true)
        setAlertMessage({ severity, message })
    }

    const onAlertClose = () => {
        setShowingAlert(false)
    }

    const openConfirmationDialog = () => {
        setDialogOpened(true)
    }

    const closeConfirmationDialog = () => {
        setDialogOpened(false)
    }

    const validate = () => {
        if (dataObject 
            && selectedOptionValue
            && selectedOptionValue.object
            && selectedOptionValue.object.option_id
            && selectedOptionValue.value) {
            return true
        }
        return false
    }

    /** Adds only product variant */
    const addVariant = () => {
        if (validate()) {
            openConfirmationDialog()
        } else {
            showMessage('error', 'Required fields not met')
        }
    }

    const onVariantSubmit = () => {
        if (dataObject) {
            const product = dataObject
            const optionId = selectedOptionValue.object.option_id
            const optionValueId = selectedOptionValue.value
            saveProductVariant({
                id: dataObject.id,
                sku: sku,
                model: model,
                optionId: optionId,
                optionValueId: optionValueId
            }).then(result => {
                if (result.data && result.data.id) {
                    // SAVED SUCCESFULLY, because it has an id
                    showMessage('success', 'Product ' + product.name + ' saved')
                    // router.push(`/inventarioz/product/${result.data.id}`)
                    updateOnUpdate(result.data)
                }
                closeConfirmationDialog()
            }).catch(err => {
                showMessage('error', 'Product not saved. ' + err)
                closeConfirmationDialog()
            })
        }
    }

    const updateOnUpdate = () => {
        if (onUpdate) {
            onUpdate()
        }
    }

    return (
        <div className={classes.root}>
            <MessageAlert open={showingAlert} onClose={onAlertClose} message={alertMessage} />
            <CustomDialog 
                dialogOpenFlag={dialogOpened} 
                cancelButtonFunc={closeConfirmationDialog}
                submitButtonFunc={onVariantSubmit}
                submitButtonText={ 'Add Variant' }
                title="Confirm Submit"
                useActions={true}
                contextText="Are you sure you want to submit the new product variant?"
            />
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="basic-content"
                    id="variants-header"
                    >
                    { 'Add Product Variants' }
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label={ 'SKU' }
                                name="sku"
                                variant="filled"
                                size="small"
                                margin="dense"
                                fullWidth={true}
                                onChange={onSkuChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label={ 'MODEL' }
                                name="model"
                                variant="filled"
                                size="small"
                                margin="dense"
                                fullWidth={true}
                                onChange={onModelChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <ProductOptionsDropDown onChange={onOptionsChange} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <DropDown 
                                onChange={onOptionValueChange}
                                items={optionValues}
                                label={ 'Option Values' }
                                textField="text"
                                valueField="value"
                            />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Button size="small" variant="outlined" onClick={addVariant}>{ 'Add Variant' }</Button>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

ProductAddVariants.propTypes = {
    // t: PropTypes.func.isRequired,
    dataObject: PropTypes.object.isRequired,
    onUpdate: PropTypes.func
}

export default ProductAddVariants;
