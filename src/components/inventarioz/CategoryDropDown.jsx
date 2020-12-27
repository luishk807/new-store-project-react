import PropTypes from 'prop-types'
import { withTranslation } from '../../../i18n'
import DropDown from './DropDown'
import { useEffect, useState } from 'react'
import { getCategories } from '../../services/inventarioz/category'

const CategoryDropDown = ({ t, onChange }) => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategories().then(results => {
            setCategories(results.data)
        })
    }, [])

    const onSelectChange = (value) => {
        if (onChange) {
            onChange(value)
        }
     }

    return (
        <DropDown 
            onChange={onSelectChange}
            items={categories}
            label={ t('ca_title') }
            textField="name"
            valueField="id"
        />
    )
}

CategoryDropDown.getInitialOptions = async () => ({
    namespacesRequired: ['product']
})

CategoryDropDown.propTypes = {
    onChange: PropTypes.func,
}

export default withTranslation('product')(CategoryDropDown)
