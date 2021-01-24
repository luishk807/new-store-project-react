import { withTranslation } from '../../../../i18n'
// import {
//     Accordion,
//     AccordionSummary,
//     AccordionDetails
// } from '@material-ui/core'
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useEffect, useState } from 'react'

const getStock = async () => {
    return { error: 'NEED IMPLEMENTATION' }
}

const ProductStock = ({ t, product }) => {
    const [stock, setStock] = useState(null)

    useEffect(() => {
        let mounted = true
        if (mounted) {
            if (product && (product.id || product.product_id)) { // Still to be decided what this object is, so each of those fields
                getStock({ product_id: (product.id || product.product_id) })
                    .then(result => {
                        console.log(result)
                        setStock(result.data)
                    })
                    .catch(error => {
                        console.error(error)
                    })
            }
        }

        return () => {
            mounted = false
        }
    }, [])
    return (<div>
        {/* <Accordion defaultExpanded>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="product-info"
                id="product-header"
                >
            </AccordionSummary>
            <AccordionDetails>
            </AccordionDetails>
        </Accordion> */}
        { JSON.stringify(stock) }
        SKU
        Barcode
        Stock
        Warehouse
        Reserved
        Price
        Cost
        Expiration
        Tags?
    </div>)
}

export default withTranslation('product')(ProductStock)
