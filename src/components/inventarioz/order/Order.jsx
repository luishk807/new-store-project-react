import { makeStyles } from '@material-ui/core/styles'
import MaterialTable from 'material-table'
import MaterialTableIcons from '../common/MaterialTableIcons'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import {
    TextField,
    Grid,
    Button
} from '@material-ui/core'
import ClientEntryFields from '../client/ClientEntryFields'
import MessageAlert from '../MessageAlert'
import CustomDialog from '../CustomDialog'
import {
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useState } from 'react'
import ProductSearchMini from '../product/ProductSearchMini'
import ClientSearchMini from '../client/ClientSearchMini'
import { saveClient } from '../../../services/inventarioz/client'
import { convertDataToTableData } from '../../../utils/materialtable'
const useStyles = makeStyles((theme) => ({
    root: {
        padding: 0
    }
}))

/** Configures the columns and sets which one is editable */
const tableColumns = [
    { title: 'id', field: 'id', editable: 'never' }, 
    { title: 'name', field: 'name', editable: 'never' }, 
    { title: 'description', field: 'description', editable: 'onUpdate'}
]

const Order = () => {
    const [order, setOrder] = useState({})
    const [orderDate, setOrderDate] = useState(new Date())
    const [client, setClient] = useState({})
    const [orderClient, setOrderClient] = useState({})
    const [openAlert, setOpenAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState({ severity: 'error', message: 'Toasty!'} )
    const [dialogOpen, setDialogOpen] = useState(false)
    const [psDialogOpen, setPsDialogOpen] = useState(false)
    const [csDialogOpen, setCsDialogOpen] = useState(false)
    const [orderItems, setOrderItems] = useState([])
    const [orderItemsTableData, setOrderItemsTableData] = useState([])
    const classes = useStyles()

    // Order
    const updateOrder = () => {
        const orderValues = {
            ...order,
            [field]: value
        }
        setOrder(orderValues)
        outputValue(newStockEntry)
    }
    const onOrderChange = (event) => {
        updateOrder({ field: event.target.name, value: event.target.value})
    }
    const onOrderDateChange = (value) => {
        setOrderDate(value)
    }

    // Client
    const onClientEntryChange = (value) => {
        console.log('onClientEntryChange', value)
    }
    const onNewClientEntryChange = (mainFields, addresses, defaultAddress) => {
        console.log('onNewClientEntryChange', mainFields, addresses, defaultAddress)
        const submitClient = {
            first_name: mainFields.first_name,
            last_name: mainFields.last_name,
            email: mainFields.email,
            phones: mainFields.phones,
            client_address: []
        }
        let addressCounter = 1
        for (const prop in addresses) {
            const address = {
                address: addresses[prop]
            }
            if (+defaultAddress === addressCounter) {
                address.is_default = true
            }
            submitClient.client_address.push(address)
            addressCounter++
        }
        setClient(submitClient)
    }

    /** Submits the new client for saving */
    const onClientSubmit = () => {
        console.log('onClientSubmit', client)
        saveClient(client).then(result => {
            if (!result.error) {
                showAlert({ severity: 'success', message: 'Successfully added new client'})
                console.log(result)
                closeConfirmationDialog()
                setOrderClient(client)
            } else {
                showAlert({ severity: 'error', message: 'Error adding new client'})
            }
        })
    }

    // Alerts
    const onAlertClose = () => {
        setOpenAlert(false)
    }
    const showAlert = ({ severity, message }) => {
        setAlertMessage({ severity, message })
        setOpenAlert(true)
    }

    // Custom dialogs
    const closeConfirmationDialog = () => {
        setDialogOpen(false)
    }
    const onCancelClientSubmit = () => {
        setClient({})
        closeConfirmationDialog()
    }

    const onProductSearchItemClick = (value) => {
        console.log('onProductSearchItemClick', value)
        const updatedOrderItems = [
            ...orderItems
        ]
        updatedOrderItems.push(value)
        setOrderItems(updatedOrderItems)

        const tableData = convertDataToTableData(updatedOrderItems)
        console.log('tableData', tableData)
        setOrderItemsTableData(tableData.data)
    }

    /** Handles client search row click */
    const onClientSearchItemClick = (value) => {
        console.log('onClientSearchItemClick', value)
        setCsDialogOpen(false)
        setClient(value)
    }

    const onPsButtonClick = () => {
        setPsDialogOpen(true)
    }
    const onPsCloseButton = () => {
        setPsDialogOpen(false)
    }
    const onCsButtonClick = () => {
        setCsDialogOpen(true)
    }
    const onCsCloseButton = () => {
        setCsDialogOpen(false)
    }
    const onNewClientButtonClick = () => {
        setDialogOpen(true)
    }

    const onOrderItemRowClick = (orderItemRow) => {
        console.log('onOrderItemRowClick', orderItemRow)
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className={classes.root}>
            <MessageAlert open={openAlert} onClose={onAlertClose} message={alertMessage} />
            <CustomDialog 
                dialogOpenFlag={dialogOpen} 
                cancelButtonFunc={onCancelClientSubmit}
                submitButtonFunc={onClientSubmit}
                closeButtonFunc={onCancelClientSubmit}
                submitButtonText={ 'Add New Client' }
                title="Add New Client"
                useActions={true}
                contextText={ 'Add client to order?' }
            >
                <ClientEntryFields onValueChange={onNewClientEntryChange} />
            </CustomDialog>
            <CustomDialog
                dialogOpenFlag={psDialogOpen} 
                closeButtonFunc={onPsCloseButton}
                submitButtonText={ 'Select Product' }
                title="Product Selection"
                contextText={ 'Add Product to order?' }
            >
                <ProductSearchMini onItemClick={onProductSearchItemClick} />
            </CustomDialog>
            <CustomDialog
                dialogOpenFlag={csDialogOpen} 
                closeButtonFunc={onCsCloseButton}
                submitButtonText={ 'Select Client' }
                title="Client Selection"
                contextText={ 'Add existing client to order?' }
            >
                <ClientSearchMini onItemClick={onClientSearchItemClick} />
            </CustomDialog>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Button onClick={onPsButtonClick} color="primary" variant="contained">Product Search</Button>
                    <Button onClick={onNewClientButtonClick} color="secondary" variant="contained">Add Client</Button>
                    <Button onClick={onCsButtonClick} color="default" variant="contained">Client Search</Button>
                </Grid>
            </Grid>
            <Grid container direction="row-reverse" spacing={1}>
                <Grid item xs={12} md={4}>
                    <KeyboardDatePicker
                        name="order_datea"
                        margin="normal"
                        id="date-picker-dialog"
                        label="Order Date"
                        format="MM/dd/yyyy"
                        value={orderDate}
                        onChange={onOrderDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        size="small" fullWidth={true}
                    />
                </Grid>
            </Grid>
            <div>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Accordion defaultExpanded>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="client-info"
                            id="client-header"
                            >
                            Client
                        </AccordionSummary>
                        <AccordionDetails>
                            <ClientEntryFields onValueChange={onClientEntryChange} value={client} hideFields={['client_address']} />
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
            <Grid container spacing={1} justify="space-between" >
                <Grid item xs={12}>
                    <Accordion defaultExpanded>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="stock-info"
                            id="stock-header"
                            >
                            Detalles
                        </AccordionSummary>
                        <AccordionDetails>
                            {/* <div>
                            { orderItems.map((o, i) => {
                                return (
                                    <div key={`oi-${i}`}>{ JSON.stringify(o) }</div>
                                )
                            })}
                            </div> */}
                            <div style={{width: '100%'}}>
                            <MaterialTable 
                                icons={MaterialTableIcons}
                                columns={tableColumns} data={orderItemsTableData}
                                title="Search Results"
                                onRowClick={onOrderItemRowClick}
                                // onRowSelected={onOrderItemRowSelected}
                                editable={{
                                    isEditable: (rowData) => { console.log('isEditable', rowData); return true },
                                    isEditHidden: (rowData) => false,
                                    isDeletable: (rowData) => true,
                                    isDeleteHidden: (rowData) => false,
                                    onRowUpdate: (newData, oldData) => {
                                        console.log('onRowUpdate')
                                        console.log('newData', newData); console.log('oldData', oldData)
                                        return Promise.resolve()
                                    },
                                    onRowDelete: (oldData) => {
                                        console.log('onRowDelete', oldData)
                                        return Promise.resolve()
                                    }

                                }}
                            />
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
            </div>
        </div>
        </MuiPickersUtilsProvider>
    )
}

export default Order
