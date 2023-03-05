import PropTypes from 'prop-types'
import Alert from '@mui/material/Alert';
import { Snackbar } from '@material-ui/core'
import { useState, useEffect } from 'react'

function AlertComp(props) {
    return <Alert elevation={6} variant="filled" {...props} />;
}

const MessageAlert = ({ open, autoHideDuration, onClose, message }) => {
    const [snackOpen, setSnackOpen] = useState(false)
    const [snackMessage, setSnackMessage] = useState({msg:'', severity: 'success'})

    const snackOnClose = () => {
        if (onClose) {
            onClose()
        }
    }

    /** If the alert close button clicked, hide the snackbar */
    const alertOnClose = () => {
        setSnackOpen(false)
    }

    useEffect(() => {
        setSnackOpen(open)
        setSnackMessage({ severity: message.severity, message: message.message })
    }, [open, message])

    return (
        <Snackbar open={snackOpen} autoHideDuration={autoHideDuration} onClose={snackOnClose}>
            <AlertComp onClose={alertOnClose} severity={snackMessage.severity}><div>{ snackMessage.message }</div></AlertComp>
        </Snackbar>
    )
}

MessageAlert.propTypes = {
    open: PropTypes.bool,
    autoHideDuration: PropTypes.number,
    onClose: PropTypes.func,
    message: PropTypes.object
}

MessageAlert.defaultProps = {
    open: false,
    autoHideDuration: 5000
}

export default MessageAlert