import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import BrandDropDown from '../BrandDropDown'
import DepartmentDropDown from '../DepartmentDropDown'
import CategoryDropDown from '../CategoryDropDown'
import {
    Grid,
    TextField,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
    Divider
} from '@material-ui/core'
import { useEffect } from 'react'
import { getNoVariant } from '../../../services/inventarioz/product'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    buttonSection: {
        display: 'flex',
        flexDirection: 'row-reverse'
    }
}));

const ProductBasic = ({ dataObject }) => {
    const [product, setProduct] = useState(null)
    const [category, setCategory] = useState(null)
    const [brand, setBrand] = useState(null)
    const [department, setDepartment] = useState(null)
    const [sku, setSku] = useState(null)
    const [model, setModel] = useState(null)

    const [brandValue, setBrandValue] = useState(null)
    const [categoryValue, setCategoryValue] = useState(null)
    const [departmentValue, setDepartmentValue] = useState(null)

    useEffect(() => {
        setProduct(dataObject)
        if (dataObject.brand_product.length) {
            const b = dataObject.brand_product[0]
            setBrandValue(b.brand_id)
        }
        if (dataObject.category_product.length) {
            const c = dataObject.category_product[0]
            setCategoryValue(c.category_id)
        }
        if (dataObject.department_product.length) {
            const d = dataObject.department_product[0]
            setDepartmentValue(d.department_id)
        }
        // Set the novariant SKU and Model if available
        const noVariantEntry = getNoVariant(dataObject)
        if (noVariantEntry) {
            setSku(noVariantEntry.sku)
            setModel(noVariantEntry.model)
        }
    }, [dataObject])

    const onCategoryChange = (value) => {
        setCategory(value)
    }

    const onBrandChange = (value) => {
        setBrand(value)
    }

    const onDepartmentChange = (value) => {
        setDepartment(value)
    }

    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Accordion defaultExpanded>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="product-content"
                            id="product-header"
                            >
                            { 'Product Basic Information' }
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Name"
                                        variant="filled"
                                        size="small"
                                        margin="dense"
                                        fullWidth={true}
                                        name="name"
                                        readOnly={true}
                                        value={product ? product.name : ''}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Description"
                                        variant="filled"
                                        size="small"
                                        margin="dense"
                                        fullWidth={true}
                                        name="description"
                                        readOnly={true}
                                        value={product ? product.description : ''}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="SKU"
                                        variant="filled"
                                        size="small"
                                        margin="dense"
                                        fullWidth={true}
                                        name="sku"
                                        readOnly={true}
                                        value={sku ? sku : ''}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Model"
                                        variant="filled"
                                        size="small"
                                        margin="dense"
                                        fullWidth={true}
                                        name="model"
                                        readOnly={true}
                                        value={model ? model : ''}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <BrandDropDown onChange={onBrandChange} selectedValue={brandValue} readOnly={true}/>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <CategoryDropDown onChange={onCategoryChange} selectedValue={categoryValue} readOnly={true}/>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <DepartmentDropDown onChange={onDepartmentChange} selectedValue={departmentValue} readOnly={true}/>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        </div>
    )
}

ProductBasic.propTypes = {
    // t: PropTypes.func.isRequired,
    dataObject: PropTypes.object.isRequired
}

export default ProductBasic
