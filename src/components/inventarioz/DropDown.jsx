
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
    const { label, items, defaultValue, onChange, textField, valueField, readOnly = false } = props
    const [defValue, setDefValue] = useState("")
    const [menuItems, setMenuItems] = useState([])
    const classes = useStyles()

    useEffect(() => {
        const mis = []
        if (items && items.length) {
            for (let n=0; n<items.length; ++n) {
                mis.push({
                    text: items[n][textField],
                    value: items[n][valueField],
                    object: items[n]
                })
            }
            setMenuItems(mis)
        }
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
            onChange(option.object, value)
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
                readOnly={readOnly}
            >
                { menuItems.map((mi) => getMenuItem(mi)) }
            </Select>
        </FormControl>
    )
}

DropDown.propTypes = {
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    defaultValue: PropTypes.any,
    label: PropTypes.string,
    items: PropTypes.array, // { name (field name), t (translation field name)}
    textField: PropTypes.string.isRequired,
    valueField: PropTypes.string.isRequired,
    readOnly: PropTypes.bool
}

DropDown.defaultProps = {
    items: []
}

export default DropDown