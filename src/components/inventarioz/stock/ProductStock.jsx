import PropTypes from 'prop-types'
import { withTranslation } from '../../../../i18n'
import {
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useEffect, useState } from 'react'
import { getStock } from '../../../services/inventarioz/stock'
import ProductVariantsStock from './ProductVariantsStock'

const ProductStock = ({ t, product, stock }) => {
    // const [stock, setStock] = useState(null)

    useEffect(() => {
        let mounted = true
        // if (mounted) {
        //     if (product && (product.id || product.product_id)) { // Still to be decided what this object is, so each of those fields
        //         getStock({ product_id: (product.id || product.product_id) })
        //             .then(result => {
        //                 console.log(result)
        //                 setStock(result.data)
        //             })
        //             .catch(error => {
        //                 console.error(error)
        //             })
        //     }
        // }

        return () => {
            mounted = false
        }
    }, [])
    return (
    <div>
        <Accordion defaultExpanded>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="stock-info"
                id="stock-header"
                >
                Stock Details
            </AccordionSummary>
            <AccordionDetails>
                <ProductVariantsStock dataObject={product} stock={stock} />
            </AccordionDetails>
        </Accordion>
    </div>
    )
}

ProductStock.propTypes = {
    product: PropTypes.object,
    stock: PropTypes.array
}

export default withTranslation('product')(ProductStock)
