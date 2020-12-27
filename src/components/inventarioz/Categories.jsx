import PropTypes from 'prop-types'
import { withTranslation } from '../../../i18n'
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
import { getCategories, saveCategory } from '../../services/inventarioz/category'

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

const Categories = ({ t, onDataChange }) => {
    const classes = useStyles()
    const [categories, setCategories] = useState([])
    const [addDialogOpen, setAddDialogOpen] = useState(false)
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
    const [confirmDialogText, setConfirmDialogText] = useState('')
    const [valueRemoveName, setValueRemoveName] = useState(null)
    const [selectedValue, setSelectedValue] = useState(null)
    let valueDataRows = categories

    useEffect(() => {
        updateValues()
    }, [])

    const updateValues = () => {
        getCategories()
            .then(result => {
                setCategories([...result.data])
                pushData()
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
        const results = categories.filter(o => value.name === o.name)
        return results.length;
    }

    const pushData = () => {
        // Push data out
        if (onDataChange) {
            onDataChange(categories)
        }
    }

    const addValue = (value) => {
        if (!isDuplicate(value)) {
            saveCategory(value).then((result) => {
                console.log(result);
                updateValues()
                pushData()
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
        //     pushData()
        // }
        updateValues()
    }

    const onValueSelect = (value) => {
        console.log('onValueSelect', value)
        // setSelectedValue(value)
    }

    useEffect(() => {
        // Get the updated value to rerender
        valueDataRows = categories
    }, [categories])

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
                contextText={"Add new category"}
                title={'Add new category'}
            >
                <CustomInputs
                    onSubmit={addValue}
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
                    { t('ca_title') }
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
                            {valueDataRows.map((o) => (
                                <TableRow key={o.name}
                                    hover={true} 
                                    selected={true} 
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
                    {/* <Button size="small">Cancel</Button>
                    <Button size="small" color="primary">
                        Save
                    </Button> */}
                    <Button onClick={openAddDialog}>{ t('ca_add') }</Button>
                </AccordionActions>
            </Accordion>
        </div>
    )
}

Categories.getInitialOptions = async () => ({
    namespacesRequired: ['product']
})

Categories.propTypes = {
    t: PropTypes.func.isRequired,
    data: PropTypes.array,
    onDataChange: PropTypes.func
}

export default withTranslation('product')(Categories)