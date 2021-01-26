import PropTypes from 'prop-types'
import { withTranslation } from '../../../i18n'
import { makeStyles } from '@material-ui/core'
import CustomDialog from './CustomDialog'
import ProductOptionAdd from './ProductOptionAdd'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    AccordionActions,
    Button,
    IconButton,
    Divider
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import DeleteIcon from '@material-ui/icons/Delete';
import { useState, useEffect } from 'react'
import { getOptions, saveOption, saveOptionValue, removeOption } from '../../services/inventarioz/product'
import CustomInputs from './CustomInputs'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    table: {
        width: '100%'
    },
    tableRow: {
        hover: {
            color: '#a6d4fa',
            backgroundColor: '#a6d4fa'
        },
        selected: {
            color: '#81c784',
            backgroundColor: '#81c784'
        }
    }
}));

const ProductOptions = ({ t, data, onDataChange }) => {
    const classes = useStyles()
    const [options, setOptions] = useState(data || [])
    const [optionValues, setOptionValues] = useState([])
    const [optionAddOpen, setOptionAddOpen] = useState(false)
    const [optionValueAddOpen, setOptionValueAddOpen] = useState(false)
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
    const [confirmDialogText, setConfirmDialogText] = useState('')
    const [optionRemoveName, setOptionRemoveName] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
    let optionsDataRows = options

    useEffect(() => {
        let mounted = true
        if (mounted) {
            updateOptions(mounted)
        }
        return () => {
            mounted = false
        }
    }, [])

    const updateOptions = (mounted) => {
        getOptions()
            .then(result => {
                if (mounted) {
                    setOptions([...result.data])
                    pushData()
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    const openOptionAdd = () => {
        setOptionAddOpen(true);
    };

    const closeOptionAdd = () => {
        setOptionAddOpen(false);
    };

    const openOptionValueAdd = () => {
        if (selectedOption) {
            setOptionValueAddOpen(true)
        }
    }

    const closeOptionValueAdd = () => {
        setOptionValueAddOpen(false)
    }

    const showConfirmationDialog = (contextText) => {
        setConfirmDialogText(contextText)
        setConfirmDialogOpen(true)
    }

    const closeConfirmationDialog = () => {
        setConfirmDialogOpen(false)
    }

    const isDuplicate = (value) => {
        const results = options.filter(o => value.name === o.name)
        return results.length;
    }

    const pushData = () => {
        // Push data out
        if (onDataChange) {
            onDataChange(options)
        }
    }

    const addProductOption = (value) => {
        if (!isDuplicate(value)) {
            saveOption(value).then((result) => {
                options.push({
                    name: value.name.toString().toLowerCase(),
                    description: value.description
                })
                setOptions([...options])
                pushData()
                closeOptionAdd()
            })
            .catch(err => { console.log(err)})
            
        } else {
            closeOptionAdd()
            window.alert('Duplicate values')
        }
    }

    const addOptionValue = (value) => {
        console.log('addOptionValue', [value, selectedOption])
        
        if (value && selectedOption) {
            const optionValue = {
                value: value.name,
                option_id: selectedOption.id
            }
            saveOptionValue(optionValue).then(result => {
                const data = result.data
                const ovs = [...optionValues]
                ovs.push({
                    id: data.id, name: data.value, option_id: data.option_id
                })
                setOptionValues([...ovs])
                closeOptionValueAdd()
                updateOptions()
            })
        }
        
    }

    const confirmRemoveOption = (name) => {
        setOptionRemoveName(name)
        showConfirmationDialog('Are you sure you want to delete ' + name + ' option?')
    }

    const removeOption = () => {
        console.log('removeOption', optionRemoveName);
        console.log('NEED TO IMPLEMENT delete from database or set to inactive')
        // let foundIdx = -1
        // for (let n = 0; n < options.length; ++n) {
        //     if (options[n].name === optionRemoveName) {
        //         foundIdx = n
        //         break
        //     }
        // }
        // if (foundIdx > -1) {
        //     options.splice(foundIdx, 1)
        //     setOptions([...options])
        //     pushData()
        // }
        updateOptions()
    }

    const onOptionSelect = (option) => {
        // console.log('onOptionSelect', option)
        setSelectedOption(option)
        setOptionValues((option.option_value) ? option.option_value : [])
    }

    useEffect(() => {
        // Get the updated value to rerender
        optionsDataRows = options
    }, [options])

    useEffect(() => {
        if (selectedOption && selectedOption.option_value) {
            const ovs = []
            selectedOption.option_value.forEach(v => {
                ovs.push({
                    id: v.id, name: v.value, option_id: v.option_id
                })
            })
            setOptionValues([...ovs])
        }
    }, [selectedOption])

    return (
        <div className={classes.root}>
            <CustomDialog 
                dialogOpenFlag={optionAddOpen}
                contextText="Add new product option"
                cancelButtonFunc={closeOptionAdd} 
                // submitButtonFunc={addProductOption}
                title="New Product Option" submitButtonText="Add">
                <ProductOptionAdd onSubmit={addProductOption} />
            </CustomDialog>
            <CustomDialog
                dialogOpenFlag={confirmDialogOpen}
                contextText={confirmDialogText}
                cancelButtonFunc={closeConfirmationDialog} 
                submitButtonFunc={() => { removeOption(); closeConfirmationDialog() }}
                submitButtonText="Remove"
                title="Confirmation"
                useActions={true}
            />
            <CustomDialog
                dialogOpenFlag={optionValueAddOpen}
                cancelButtonFunc={closeOptionValueAdd}
                contextText={'Adding a Product\'s Option\'s value for ' + ((selectedOption && selectedOption.name) ? selectedOption.name.toUpperCase() : '') }
                title={'Add Option\'s Value ' + ((selectedOption && selectedOption.name) ? selectedOption.name.toUpperCase() : '') }
            >
                <CustomInputs
                    onSubmit={addOptionValue}
                    inputs={[
                        { name: 'name', t: 'name'}
                    ]}
                >
                </CustomInputs>
            </CustomDialog>

            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="basic-content"
                    id="basic-header"
                    >
                    { t('po_title') }
                </AccordionSummary>
                <AccordionDetails>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>{ t('po_name') }</TableCell>
                                    <TableCell>{ t('po_description') }</TableCell>
                                    <TableCell align="right">*</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {optionsDataRows.map((o) => (
                                <TableRow key={o.name}
                                    hover={true} 
                                    className={classes.tableRow} 
                                    onClick={() => { onOptionSelect(o) }}
                                >
                                    <TableCell component="th" scope="o">
                                        {o.name}
                                    </TableCell>
                                    <TableCell>{o.description}</TableCell>
                                    <TableCell align="right">
                                    <IconButton aria-label="delete" size="small" onClick={() => confirmRemoveOption(o.name)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </AccordionDetails>
                <Divider />
                <AccordionActions>
                    <Button onClick={openOptionAdd}>{ t('po_add_option') }</Button>
                </AccordionActions>
            </Accordion>

            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="basic-content"
                    id="basic-header"
                    >
                    { t('pov_title') } <b>&nbsp;{ ((selectedOption && selectedOption.name) ? selectedOption.name.toUpperCase() : '') }</b>
                </AccordionSummary>
                <AccordionDetails>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>{ t('po_name') }</TableCell>
                                    <TableCell align="right">*</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {optionValues.map((o) => (
                                <TableRow key={o.id} hover={true} className={classes.tableRow}>
                                    <TableCell component="th" scope="o">
                                        {o.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        {/* <IconButton aria-label="delete" size="small" onClick={() => confirmRemoveOption(o.name)}>
                                            <DeleteIcon />
                                        </IconButton> */}
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </AccordionDetails>
                <Divider />
                <AccordionActions>
                    <Button onClick={openOptionValueAdd}>{ t('pov_add_value') }</Button>
                </AccordionActions>
            </Accordion>
        </div>
    )
}

ProductOptions.getInitialOptions = async () => ({
    namespacesRequired: ['product']
})

ProductOptions.propTypes = {
    t: PropTypes.func.isRequired,
    data: PropTypes.array,
    onDataChange: PropTypes.func
}

export default withTranslation('product')(ProductOptions)