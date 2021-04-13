import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

const CheckboxList = ({ items = [], hidden = false, onCheckboxListChanges }) => {
    const [checkboxes, setCheckboxes] = useState([])
    const [isHidden, setIsHidden] = useState(false);

    const buildCheckboxes = (items) => {
        const checkboxObject = {}
        if (!!items.length) {
            items.forEach(c => {
                checkboxObject[c.name] = { label: c.label || c.name, checked: true }
            })
        }
        setCheckboxes(checkboxObject);
    }

    useEffect(() => {
        buildCheckboxes(items);
    }, [items])

    useEffect(() => {
        setIsHidden(hidden)
    }, [hidden])

    const handleCheckboxChange = (event) => {
        checkboxes[event.target.name].checked = event.target.checked
        const newState = { ...checkboxes, [event.target.name]: checkboxes[event.target.name] }
        setCheckboxes(newState)
        
        if (onCheckboxListChanges) {
            onCheckboxListChanges(newState)
        }
    }
    
    return ( isHidden ? null :
        <div>
            { Object.keys(checkboxes).map((key) => {
                return (
                    <FormControlLabel key={`f-${key}`}
                        control={<Checkbox key={`c-${key}`} checked={checkboxes[key].checked} name={key} onChange={handleCheckboxChange}/>}
                        label={checkboxes[key].label} />
                )
            }) }
        </div>
    )
}

CheckboxList.propTypes = {
    items: PropTypes.array.isRequired,
    hidden: PropTypes.bool,
    onCheckboxListChanges: PropTypes.func
}

export default CheckboxList
