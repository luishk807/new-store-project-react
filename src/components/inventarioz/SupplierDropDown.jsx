import PropTypes from 'prop-types'
import DropDown from './DropDown'
import { useEffect, useState } from 'react'
import { getSuppliers } from '@/services/inventarioz/supplier'

const SupplierDropDown = ({ t, onChange, selectedValue, readOnly=false }) => {
    const [suppliers, setSuppliers] = useState([])
    const [selectValue, setSelectValue] = useState(null)

    useEffect(() => {
        let mounted = true;
        getSuppliers().then(results => {
            if (mounted) {
                setSuppliers(results.data)
            }
        })

        return () => {
            mounted = false
        }
    }, [])

    useEffect(() => {
        if (suppliers.length) {
            setSelectValue(selectedValue)
        }
    }, [suppliers, selectedValue])

    const onSelectChange = (objectValue, value) => {
        console.log('onSelectChange', objectValue, value)
        if (onChange) {
            onChange(objectValue, value)
        }
    }

    return (
        <DropDown 
            onChange={onSelectChange}
            items={suppliers}
            label={ 'Suppliers' }
            textField="name"
            valueField="id"
            defaultValue={selectValue}
            readOnly={readOnly}
        />
    )
}

SupplierDropDown.propTypes = {
    onChange: PropTypes.func,
    selectedValue: PropTypes.any,
    readOnly: PropTypes.bool
}

export default SupplierDropDown
