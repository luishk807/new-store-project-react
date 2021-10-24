import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import { useState } from 'react'
import ProductResults from '@/inventarioz/stock/ProductResults'
import SearchInput from '@/inventarioz/SearchInput'
import { searchProduct } from '@/services/inventarioz/product'
import { convertDataToTableData } from '@/utils/materialtable'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 0
    }
}))

const ProductSearchMini = ({ onItemClick }) => {
    const classes = useStyles()
    const [productResults, setProductResults] = useState({ columns: [], data: [] })

    const onSearchInputEnterKey = (value) => {
        searchProduct(value)
            .then(results => {
                const data = convertDataToTableData(results.data)
                setProductResults(data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const onResultRowClick = (value) => {
        console.log('onResultRowClick', value)
        if (onItemClick) {
            onItemClick(value)
        }
    }

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    <SearchInput onSearchEnterKey={onSearchInputEnterKey} onSearchIconClick={onSearchInputEnterKey} />
                </Grid>
                <Grid item xs={12}>
                    <ProductResults data={productResults} onResultRowClick={onResultRowClick} />
                </Grid>
            </Grid>
        </div>
    )
}

ProductSearchMini.propTypes = {
    onItemClick: PropTypes.func
}

export default ProductSearchMini
