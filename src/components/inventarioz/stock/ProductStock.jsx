import PropTypes from 'prop-types'
import {
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ProductVariantsStock from './ProductVariantsStock'

const ProductStock = ({ t, product, stock }) => {
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

export default ProductStock
