import { withTranslation } from '../../../i18n'
import { makeStyles } from '@material-ui/core/styles'
import { useState } from 'react'
import {
    Grid,
    TextField,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
    Divider
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import CategoryDropDown from './CategoryDropDown'
import BrandDropDown from './BrandDropDown'
import CustomDialog from './CustomDialog'
import DepartmentDropDown from './DepartmentDropDown'
import { saveProductNoVariant } from '../../services/inventarioz/product'
import MessageAlert from './MessageAlert'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    buttonSection: {
        display: 'flex',
        flexDirection: 'row-reverse'
    }
}));

const ProductNoVariant = ({ t }) => {
    const router = useRouter()
    const classes = useStyles()
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [selectedBrand, setSelectedBrand] = useState(null)
    const [selectedDepartment, setSelectedDepartment] = useState(null)
    const [product, setProduct] = useState(null)
    const [dialogOpened, setDialogOpened] = useState(false)
    const [snackOpen, setSnackOpen] = useState(false)
    const [snackMessage, setSnackMessage] = useState({message:'', severity: 'success'})

    const onProductChange = (event) => {
        setProduct({
            ...product,
            [event.target.name]: event.target.value
        })
    }

    const onCategoryChange = (value) => {
        setSelectedCategory(value)
    }

    const onBrandChange = (value) => {
        setSelectedBrand(value)
    }

    const onDepartmentChange = (value) => {
        setSelectedDepartment(value)
    }

    const openConfirmationDialog = () => {
        if (validateBeforeSubmit()) {
            setDialogOpened(true)
        } else {
            showMessage('error', 'Product not ready to be saved')
        }
    }

    const closeConfirmationDialog = () => {
        setDialogOpened(false)
    }

    const onSubmit = () => {
        if (validateBeforeSubmit()) {
            saveProductNoVariant({
                name: product.name,
                description: product.description,
                sku: product.sku,
                model: product.model,
                categoryId: selectedCategory.id,
                brandId: selectedBrand.id,
                departmentId: selectedDepartment.id
            }).then(result => {
                if (result.data && result.data.id) {
                    // SAVED SUCCESFULLY, because it has an id
                    showMessage('success', 'Product ' + product.name + ' saved')
                    router.push(`/inventarioz/product/${result.data.id}`)
                }
                closeConfirmationDialog()
            }).catch(err => {
                showMessage('error', 'Product not saved. ' + err)
                closeConfirmationDialog()
            })
        }
    }

    const validateBeforeSubmit = () => {
        if (product && product.name && product.description && product.sku) {
            if (selectedCategory && selectedCategory.id && selectedCategory.name) {
                if (selectedBrand && selectedBrand.id) {
                    return true
                }
            }
        }
        return false
    }

    const showMessage = (severity, message) => {
        setSnackMessage({message: message, severity: severity})
        setSnackOpen(true)
    }

    const snackClose = () => {
        setSnackOpen(false)
    }

    return (
        <div className={classes.root}>
            <CustomDialog 
                dialogOpenFlag={dialogOpened} 
                cancelButtonFunc={closeConfirmationDialog}
                submitButtonFunc={onSubmit}
                submitButtonText={ t('add_product_novariant') }
                title="Confirm Submit"
                useActions={true}
                contextText="Are you sure you want to submit the new product?"
            />
            <MessageAlert open={snackOpen} onClose={snackClose} message={snackMessage} />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Accordion defaultExpanded>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="product-content"
                            id="product-header"
                            >
                            { t('basic') }
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <TextField
                                        label={ t('name') }
                                        variant="filled"
                                        size="small"
                                        margin="dense"
                                        fullWidth={true}
                                        name="name"
                                        onChange={onProductChange}
                                        required={true}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label={ t('description') }
                                        variant="filled"
                                        size="small"
                                        margin="dense"
                                        fullWidth={true}
                                        name="description"
                                        onChange={onProductChange}
                                        required={true}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label={ t('sku') }
                                        variant="filled"
                                        size="small"
                                        margin="dense"
                                        fullWidth={true}
                                        name="sku"
                                        onChange={onProductChange}
                                        required={true}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label={ t('model') }
                                        variant="filled"
                                        size="small"
                                        margin="dense"
                                        fullWidth={true}
                                        name="model"
                                        onChange={onProductChange}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <BrandDropDown onChange={onBrandChange}/>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <CategoryDropDown onChange={onCategoryChange}/>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <DepartmentDropDown onChange={onDepartmentChange}/>
                                </Grid>
                                <Divider/>
                                <Grid item xs={12} className={classes.buttonSection}>
                                    <Button onClick={openConfirmationDialog}>{ t('add_product_novariant') }</Button>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        </div>
    );
}

ProductNoVariant.getInitialProps = async () => ({
    namespacesRequired: ['product']
})

export default withTranslation('product')(ProductNoVariant);
