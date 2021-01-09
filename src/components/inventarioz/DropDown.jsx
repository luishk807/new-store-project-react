
import PropTypes from 'prop-types'
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
}));

const DropDown = (props) => {
    const { label, items, defaultValue, onChange, textField, valueField } = props
    const [defValue, setDefValue] = useState("")
    const [menuItems, setMenuItems] = useState([])
    const classes = useStyles()

    useEffect(() => {
        const mis = []
        items.forEach(o => {
            mis.push({
                text: o[textField],
                value: o[valueField],
                object: o
            })
        })
        setMenuItems(mis)
    }, [items.length]) // Cannot use items, because react will complain about the content changing on render (stupid)

    useEffect(() => {
        if (defaultValue) {
            setDefValue(defaultValue)
        } else {
            setDefValue("")
        }
    }, [defaultValue])

    const getInputLabelId = () => {
        return 'dropdown-id-' + label.replace(/\s/g,'')
    }

    const getMenuItem = (item) => {
        return <MenuItem key={item.value} value={item.value} dense={true}>{item.text}</MenuItem>
    }

    const handleChange = (event) => {
        const value = event.target.value
        setDefValue(value) // No idea I need to do this, makes no sense
        if (onChange) {
            const option = menuItems.find(its => its.value === value)
            onChange(option.object)
        }
    }

    return (
        <FormControl className={classes.root}>
            <InputLabel id={getInputLabelId()}>{label}</InputLabel>
            <Select
                labelId={getInputLabelId()}
                id={getInputLabelId()}
                value={defValue}
                onChange={handleChange}
            >
                { menuItems.map((mi) => getMenuItem(mi)) }
            </Select>
        </FormControl>
    )
}

DropDown.propTypes = {
    onChange: PropTypes.func,
    defaultValue: PropTypes.any,
    label: PropTypes.string,
    items: PropTypes.array, // { name (field name), t (translation field name)}
    textField: PropTypes.string.isRequired,
    valueField: PropTypes.string.isRequired
}

export default DropDown