import PropTypes from 'prop-types'
import DropDown from './DropDown'
import { useEffect, useState } from 'react'
import { getDepartments } from '@/services/inventarioz/department'

const DepartmentDropDown = ({ t, onChange, selectedValue, readOnly=false }) => {
    const [departments, setDepartments] = useState([])
    const [selectValue, setSelectValue] = useState(null)

    useEffect(() => {
        let mounted = true;
        getDepartments().then(results => {
            if (mounted) {
                setDepartments(results.data)
            }
        })

        return () => {
            mounted = false
        }
    }, [])

    useEffect(() => {
        if (departments.length) {
            setSelectValue(selectedValue)
        }
    }, [departments, selectedValue])

    const onSelectChange = (value) => {
        if (onChange) {
            onChange(value)
        }
    }

    return (
        <DropDown 
            onChange={onSelectChange}
            items={departments}
            label="Departments"
            textField="name"
            valueField="id"
            defaultValue={selectValue}
            readOnly={readOnly}
        />
    )
}

DepartmentDropDown.propTypes = {
    onChange: PropTypes.func,
    selectedValue: PropTypes.any,
    readOnly: PropTypes.bool
}

export default DepartmentDropDown
