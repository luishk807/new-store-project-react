import PropTypes from 'prop-types'
import DropDown from './DropDown'
import { useEffect, useState } from 'react'
import { getBrands } from '../../services/inventarioz/brand'

const BrandDropDown = ({ t, onChange, selectedValue, readOnly = false }) => {
    const [brands, setBrands] = useState([])
    const [selectValue, setSelectValue] = useState(null)

    useEffect(() => {
        let mounted = true;
        getBrands().then(results => {
            if (mounted) {
                setBrands(results.data)
            }
        })

        return () => {
            mounted = false
        }
    }, [])

    useEffect(() => {
        if (brands.length) {
            setSelectValue(selectedValue)
        }
    }, [brands, selectedValue])

    const onSelectChange = (value) => {
        if (onChange) {
            onChange(value)
        }
    }

    return (
        <DropDown 
            onChange={onSelectChange}
            items={brands}
            label="Brands"
            textField="name"
            valueField="id"
            defaultValue={selectValue}
            readOnly={readOnly}
        />
    )
}

BrandDropDown.propTypes = {
    onChange: PropTypes.func,
    selectedValue: PropTypes.any,
    readOnly: PropTypes.bool
}

export default BrandDropDown
