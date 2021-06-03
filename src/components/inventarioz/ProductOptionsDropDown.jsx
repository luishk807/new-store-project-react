import PropTypes from 'prop-types'
import DropDown from './DropDown'
import { useEffect, useState } from 'react'
import { getOptions } from '../../services/inventarioz/product'

const ProductOptionsDropDown = ({ onChange }) => {
    const [options, setOptions] = useState([])

    useEffect(() => {
        getOptions().then(results => {
            setOptions(results.data)
        })
    }, [])

    const optionsChange = (value) => {
        if (onChange) {
            onChange(value)
        }
     }

    return (
        <DropDown 
            onChange={optionsChange}
            items={options}
            label="Product Options"
            textField="name"
            valueField="id"
        />
    )
}

ProductOptionsDropDown.propTypes = {
    onChange: PropTypes.func,
}

export default ProductOptionsDropDown
