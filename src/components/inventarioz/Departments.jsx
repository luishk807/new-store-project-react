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
import { getDepartments, saveDepartment } from '@/services/inventarioz/department'

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

const Departments = ({ t }) => {
    const classes = useStyles()
    const [departments, setDepartments] = useState([])
    const [addDialogOpen, setAddDialogOpen] = useState(false)
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
    const [confirmDialogText, setConfirmDialogText] = useState('')
    const [valueRemoveName, setValueRemoveName] = useState(null)
    const [selectedValue, setSelectedValue] = useState(null)
    let valueDataRows = departments

    useEffect(() => {
        let mounted = true
        getDepartments()
            .then(result => {
                if (mounted) {
                    setDepartments([...result.data])
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
        getDepartments()
            .then(result => {
                setDepartments([...result.data])
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
        const results = departments.filter(o => value.name === o.name)
        return results.length;
    }

    const addValue = (value) => {
        if (!isDuplicate(value)) {
            saveDepartment(value).then((result) => {
                console.log(result);
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

    const removeDepartment = () => {
        console.log('removeDepartment', valueRemoveName);
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
        valueDataRows = departments
    }, [departments])

    return (
        <div className={classes.root}>
            <CustomDialog
                dialogOpenFlag={confirmDialogOpen}
                contextText={confirmDialogText}
                cancelButtonFunc={closeConfirmationDialog} 
                submitButtonFunc={() => { removeDepartment(); closeConfirmationDialog() }}
                submitButtonText="Remove"
                title="Confirmation"
                useActions={true}
            >
            </CustomDialog>
            <CustomDialog
                dialogOpenFlag={addDialogOpen}
                cancelButtonFunc={closeAddDialog}
                contextText={"Add new department"}
                title={'Add new department'}
            >
                <CustomInputs
                    onSubmit={addValue}
                    inputs={[
                        { name: 'name', t: 'name' },
                        { description: 'description', t: 'description' }
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
                    Departments
                </AccordionSummary>
                <AccordionDetails>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell align="right">*</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {valueDataRows.map((o, i) => (
                                <TableRow key={i}
                                    hover={true} 
                                    className={classes.tableRow} 
                                    onClick={() => { onValueSelect(o) }}
                                >
                                    <TableCell component="th" scope="o">
                                        {o.name}
                                    </TableCell>
                                    <TableCell>{o.description}</TableCell>
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
                    <Button onClick={openAddDialog}>Add Department</Button>
                </AccordionActions>
            </Accordion>
        </div>
    )
}

Departments.propTypes = {
    // t: PropTypes.func.isRequired,
    data: PropTypes.array
}

export default Departments
