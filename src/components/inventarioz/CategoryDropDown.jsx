import PropTypes from 'prop-types'
import DropDown from './DropDown'
import { useEffect, useState } from 'react'
import { getCategories } from '../../services/inventarioz/category'

const CategoryDropDown = ({ t, onChange, selectedValue, readOnly=false }) => {
    const [categories, setCategories] = useState([])
    const [selectValue, setSelectValue] = useState(null)

    useEffect(() => {
        let mounted = true;
        getCategories().then(results => {
            if (mounted) {
                setCategories(results.data)
            }
        })

        return () => {
            mounted = false
        }
    }, [])

    useEffect(() => {
        if (categories.length) {
            setSelectValue(selectedValue)
        }
    }, [categories, selectedValue])

    const onSelectChange = (value) => {
        if (onChange) {
            onChange(value)
        }
    }

    return (
        <DropDown 
            onChange={onSelectChange}
            items={categories}
            label="Categories"
            textField="name"
            valueField="id"
            defaultValue={selectValue}
            readOnly={readOnly}
        />
    )
}

CategoryDropDown.propTypes = {
    onChange: PropTypes.func,
    selectedValue: PropTypes.any,
    readOnly: PropTypes.bool
}

export default CategoryDropDown
