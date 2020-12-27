import PropTypes from 'prop-types'
import { withTranslation } from '../../../i18n'
import DropDown from './DropDown'
import { useEffect, useState } from 'react'
import { getOptions } from '../../services/inventarioz/product'

const ProductOptionsDropDown = ({ t, onChange }) => {
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
            label={ t('po_title') }
            textField="name"
            valueField="id"
        />
    )
}

ProductOptionsDropDown.propTypes = {
    onChange: PropTypes.func,
}

export default withTranslation('product')(ProductOptionsDropDown)
