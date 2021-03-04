import PropTypes from 'prop-types'
import {
    CircularProgress,
    Grid,
    Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useState, useEffect } from 'react'
import { getProduct } from '../../../services/inventarioz/product'
import { getBrand, getDepartment, getCategory, getProductVariants } from '../../../utils/helpers/product'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        padding: 5
    },
    detailGrid: {
        width: '100%'
    },
    capitalize: {
        textTransform: 'capitalize'
    },
    uppercase: {
        textRransform: 'uppercase'
    },
    detailItem: {
        marginLeft: '2px',
        marginRight: '20px'
    },
    variantContainer: {
        width: '100%',
        display: 'flex',
        flexFlow: 'row wrap',
        // justifyContent: 'space-evenly',
        alignItems: 'flex-start'
    },
    variantItem: {
        marginLeft: '2px',
        marginRight: '20px'
    }
}))

const ProductDetailPanel = ({ data, onProductVariantClick }) => {

    const [isLoading, setIsLoading] = useState(true)
    const [detail, setDetail] = useState({})

    const classes = useStyles()

    useEffect(() => {
        let mounted = true
        if (data && mounted) {
            loadDetails(data)
                .then(({ productInfo }) => {
                    setIsLoading(false)
                    if (mounted) {
                        setDetail(productInfo.data)
                    }
                })
                .catch(error => {
                    console.log(error)
                    setIsLoading(false)
                })
        }

        return () => {
            mounted = false
        }
    }, [data])

    /** Load product details and stock information */
    const loadDetails = async (data) => {
        const productInfo = await getProduct(data.id)
        return { productInfo }
    }

    const selectedProductVariant = (value) => {
        if (onProductVariantClick) {
            onProductVariantClick(value, data)
        }
    }

    const Department = () => {
        if (getDepartment(detail)) {
            return <div className={classes.detailItem}><strong>Department: </strong>{ getDepartment(detail).name }</div>
        }
        return ''
    }

    const Category = () => {
        if (getCategory(detail)) {
            return <div className={classes.detailItem}><strong>Category: </strong>{ getCategory(detail).name }</div>
        }
        return ''
    }

    const Brand = () => {
        if (getBrand(detail)) {
            return <div className={classes.detailItem}><strong>Brand: </strong>{ getBrand(detail).name }</div>
        }
        return ''
    }

    /** Returns a component if the field has any values */
    const LabelAndText = (object, field) => {
        if (object && field) {
            if (object[field]) {
                return (<div className={classes.variantItem}><strong className={classes.capitalize}>{ field }: </strong> <span className={classes.uppercase}>{ object[field] }</span></div>)
            }
        }
        return ''
    }

    const aggregateStock = (stockArray) => {
        if (Array.isArray(stockArray) && stockArray.length > 0) {
            return stockArray.reduce((accumulator, currentValue) => {
                return { ...accumulator, quantity: accumulator.quantity + currentValue.quantity }
            })
        }
        return null
    }

    const Stock = (object) => {
        if (object && Array.isArray(object)) {
            const stockAggregate = aggregateStock(object)
            if (stockAggregate) {
                return (
                    <div className={classes.variantItem}>
                        <strong>Stock: </strong>{ stockAggregate.quantity }
                    </div>
                )
            }
        }
        return ''
    }

    const ProductVariant = () => {
        if (getProductVariants(detail).length > 0) {
            const variants = getProductVariants(detail)
            return (
                <div>
                    { variants.map((v, i) => {
                        return (
                            <div key={`variant-${v.id}-${i}`} className={classes.variantContainer}>
                                { LabelAndText(v, 'model') }
                                { LabelAndText(v, 'sku') }
                                { LabelAndText(v.option, 'name') }
                                { LabelAndText(v.option_value, 'value') }
                                { Stock(v.stock) }
                                <Button onClick={() => { selectedProductVariant(v) }} color="secondary" variant="contained">Select</Button>
                            </div>
                        )
                    })}
                </div>
            )
        }
        return ''
    }

    // Render component section
    if (isLoading) {
        return (
            <CircularProgress />
        )
    } else {
        return (
            <div className={classes.root}>
                <Grid container className={classes.detailGrid}>
                    <Grid item xs={12} md={4}>
                        {/* Picture maybe? */}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid container>
                            <Grid item container xs={12} className={classes.variantContainer}>
                                { Department() }
                                { Category() }
                                { Brand() }
                            </Grid>
                            <Grid item xs={12}>
                                { ProductVariant() }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

ProductDetailPanel.propTypes = {
    data: PropTypes.object,
    onProductVariantClick: PropTypes.func
}

export default ProductDetailPanel
