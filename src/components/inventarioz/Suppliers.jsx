import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core'
import CustomDialog from './CustomDialog'
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
import CustomInputs from './CustomInputs'
import { getSuppliers, addSupplier } from '@/services/inventarioz/supplier'

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

const Suppliers = ({ t }) => {
    const classes = useStyles()
    const [suppliers, setSuppliers] = useState([])
    const [addDialogOpen, setAddDialogOpen] = useState(false)
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
    const [confirmDialogText, setConfirmDialogText] = useState('')
    const [valueRemoveName, setValueRemoveName] = useState(null)
    let valueDataRows = suppliers

    useEffect(() => {
        let mounted = true
        getSuppliers()
            .then(result => {
                if (mounted) {
                    setSuppliers([...result.data])
                }
            })
            .catch(error => {
                console.log(error)
            })
        return () => {
            mounted = false
        }
    }, [])

    // This is repeated from top mount controlled value set, but it is also used after save, so can't delete it
    const updateValues = () => {
        getSuppliers()
            .then(result => {
                setSuppliers([...result.data])
            })
            .catch(error => {
                console.log(error)
            })
    }

    const openAddDialog = () => {
        setAddDialogOpen(true);
    };

    const closeAddDialog = () => {
        setAddDialogOpen(false);
    };

    const showConfirmationDialog = (contextText) => {
        setConfirmDialogText(contextText)
        setConfirmDialogOpen(true)
    }

    const closeConfirmationDialog = () => {
        setConfirmDialogOpen(false)
    }

    const isDuplicate = (value) => {
        const results = suppliers.filter(o => value.name === o.name)
        return results.length;
    }

    const addValue = (value) => {
        if (!isDuplicate(value)) {
            addSupplier(value).then((result) => {
                updateValues()
                closeAddDialog()
            })
            .catch(err => { console.log(err)})
            
        } else {
            closeAddDialog()
            window.alert('Duplicate values')
        }
    }

    const confirmRemoveValue = (name) => {
        setValueRemoveName(name)
        showConfirmationDialog('Are you sure you want to delete ' + name + ' ?')
    }

    const removeOption = () => {
        console.log('removeOption', valueRemoveName);
        console.log('NEED TO IMPLEMENT delete from database or set to inactive')
        // let foundIdx = -1
        // for (let n = 0; n < options.length; ++n) {
        //     if (options[n].name === valueRemoveName) {
        //         foundIdx = n
        //         break
        //     }
        // }
        // if (foundIdx > -1) {
        //     options.splice(foundIdx, 1)
        //     setOptions([...options])
        // }
        updateValues()
    }

    const onValueSelect = (value) => {
        console.log('onValueSelect', value)
        // setSelectedValue(value)
    }

    useEffect(() => {
        // Get the updated value to rerender
        valueDataRows = suppliers
    }, [suppliers])

    return (
        <div className={classes.root}>
            <CustomDialog
                dialogOpenFlag={confirmDialogOpen}
                contextText={confirmDialogText}
                cancelButtonFunc={closeConfirmationDialog} 
                submitButtonFunc={() => { removeOption(); closeConfirmationDialog() }}
                submitButtonText="Remove"
                title="Confirmation"
                useActions={true}
            >
            </CustomDialog>
            <CustomDialog
                dialogOpenFlag={addDialogOpen}
                cancelButtonFunc={closeAddDialog}
                contextText={"Add new supplier"}
                title={'Add new supplier'}
            >
                <CustomInputs
                    onSubmit={addValue}
                    inputs={[
                        { name: 'name', t: 'name'},
                        { name: 'address', t: 'address'},
                        { name: 'phone', t: 'phone' }
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
                    { 'Suppliers' }
                </AccordionSummary>
                <AccordionDetails>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>{ 'Name' }</TableCell>
                                    <TableCell>{ 'Address' }</TableCell>
                                    <TableCell>{ 'Home' }</TableCell>
                                    <TableCell align="right">*</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {valueDataRows.map((o) => (
                                <TableRow key={o.name}
                                    hover={true} 
                                    className={classes.tableRow} 
                                    onClick={() => { onValueSelect(o) }}
                                >
                                    <TableCell component="th" scope="o">
                                        {o.name}
                                    </TableCell>
                                    <TableCell>{o.address}</TableCell>
                                    <TableCell>{o.phone}</TableCell>
                                    <TableCell align="right">
                                    <IconButton aria-label="delete" size="small" onClick={() => confirmRemoveValue(o.name)}>
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
                    <Button onClick={openAddDialog}>{ 'Add Supplier' }</Button>
                </AccordionActions>
            </Accordion>
        </div>
    )
}

Suppliers.getInitialOptions = async () => ({
    namespacesRequired: ['product']
})

Suppliers.propTypes = {
    // t: PropTypes.func.isRequired,
    data: PropTypes.array
}

export default Suppliers
