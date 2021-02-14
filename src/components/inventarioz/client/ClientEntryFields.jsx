import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
    TextField,
    Grid,
    Radio,
    RadioGroup,
    Button,
    Accordion, AccordionSummary, AccordionDetails
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { useState, useEffect } from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    addresses: {
        width: '100%'
    },
    addressesAccordionSummary: {
        display: 'flex',
        width: '100%',
        flexFlow: 'row',
        justifyContent: 'space-between'
    }
}))

const ClientEntryFields = ({ onValueChange, value, hideFields }) => {
    const classes = useStyles()
    const [output, setOutput] = useState({})
    const [addresses, setAddresses] = useState({})
    const [addressCount, setAddressCount] = useState(1)
    const [defaultAddress, setDefaultAddress] = useState(0)
    const [hiddenFields, setHiddenFields] = useState({})

    useEffect(() => {
        if (hideFields) { // Process fields to hide
            const toasty = {}
            hideFields.forEach(f => {
                toasty[f] = true
            })
            setHiddenFields(toasty)
        }
    }, [hideFields])

    const onOutputValueChange = (event) => {
        const newOutput = {
            ...output,
            [event.target.name]: event.target.value
        }
        setOutput(newOutput)
        if (onValueChange) {
            sendOutputValue(newOutput, addresses, defaultAddress)
        }
    }
    const onAddressesChange = (event) => {
        const address = {
            ...addresses,
            [event.target.name]: event.target.value
        }
        setAddresses(address)
        sendOutputValue(output, address, defaultAddress)
    }
    const addAddress = () => {
        setAddressCount(addressCount+1)
    }
    const onRadioChange = (event) => {
        setDefaultAddress(event.target.value)
        sendOutputValue(output, addresses, event.target.value)
    }
    const sendOutputValue = (mainFields, addresses, defaultAddr) => {
        if (onValueChange) {
            onValueChange(mainFields, addresses, defaultAddr)
        }
    }
    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                    <TextField
                        name="first_name"
                        label="First Name"
                        type="text"
                        onChange={onOutputValueChange} size="small" variant="filled" fullWidth={true}
                        value={value ? value.first_name : output.first_name }
                        hidden={hiddenFields['first_name']}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        name="last_name"
                        label="Last Name"
                        type="text"
                        onChange={onOutputValueChange} size="small" variant="filled" fullWidth={true}
                        value={value ? value.last_name : output.last_name }
                        hidden={hiddenFields['last_name']}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        name="phones"
                        label="Phones"
                        type="text"
                        onChange={onOutputValueChange} size="small" variant="filled" fullWidth={true}
                        value={value ? value.phones : output.phones }
                        hidden={hiddenFields['phones']}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        name="email"
                        label="Email"
                        type="email"
                        onChange={onOutputValueChange} size="small" variant="filled" fullWidth={true}
                        value={value ? value.email : output.email }
                        hidden={hiddenFields['email']}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Grid container>
                        <Accordion defaultExpanded className={classes.addresses} hidden={hiddenFields['client_address']}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <div className={classes.addressesAccordionSummary}>
                                Addresses <Button onClick={(event) => { event.stopPropagation(); addAddress()}}
                                            startIcon={<AddCircleIcon style={{ color: 'green'}} />}
                                            >Add Another Address</Button>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <RadioGroup aria-label="Default Address" name="default-address" value={defaultAddress} onChange={onRadioChange}>
                                    <Grid container>
                                    {Array.from(Array(addressCount), (a, i) => {
                                        return (
                                            <Grid item xs={12} key={`grid-address-radio-${i+1}`}>
                                                <Grid container>
                                                    <Grid item xs={1}>
                                                        <Radio name="default-address" value={i+1} checked={defaultAddress == i+1} key={`address-radio-${i+1}`} />Default
                                                    </Grid>
                                                    <Grid item xs={11}>
                                                    <TextField
                                                        key={`address-${i+1}`}
                                                        name={`address-${i+1}`}
                                                        label={`Address ${i+1}`}
                                                        type="text"
                                                        onChange={onAddressesChange} size="small" variant="filled" fullWidth={true} multiline={true} rows={2}
                                                    />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        )
                                    })}
                                    </Grid>
                                </RadioGroup>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

ClientEntryFields.propTypes = {
    onValueChange: PropTypes.func,
    value: PropTypes.object,
    hideFields: PropTypes.arrayOf(PropTypes.string)
}

export default ClientEntryFields
