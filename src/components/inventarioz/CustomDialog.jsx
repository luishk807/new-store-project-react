import PropTypes from 'prop-types'
import {
    Dialog,
    DialogActions, 
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close'

const CustomDialog = ({ children, dialogOpenFlag, title, contextText, cancelButtonFunc, submitButtonFunc, submitButtonText, useActions, closeButtonFunc }) => {
    
    const dialogActions = () => {
        if (useActions) {
            return (
                <DialogActions>
                    <Button onClick={cancelButtonFunc} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={submitButtonFunc} color="primary">
                        { submitButtonText ? submitButtonText : 'Submit' }
                    </Button>
                </DialogActions>
            )
        }
    }

    /** If internal button close is clicked */
    const onButtonClose = () => {
        if (closeButtonFunc) {
            closeButtonFunc()
        }
    }
    
    return (
        <Dialog open={dialogOpenFlag} onClose={cancelButtonFunc} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <span style={{ display: 'box'}}>{ title }</span>
                <IconButton onClick={onButtonClose}>
                    <CloseIcon />
                </IconButton>
                </div>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>{ contextText }</DialogContentText>
                { children }
            </DialogContent>
            { dialogActions() }
        </Dialog>
    )
}

CustomDialog.propTypes = {
    // t: PropTypes.func.isRequired,
    cancelButtonFunc: PropTypes.func.isRequired,
    submitButtonFunc: PropTypes.func.isRequired,
    closeButtonFunc: PropTypes.func,
    children: PropTypes.element,
    title: PropTypes.string,
    contextText: PropTypes.string,
    submitButtonText: PropTypes.string,
    dialogOpenFlag: PropTypes.bool,
    useActions: PropTypes.bool
}

CustomDialog.defaultProps = {
    // t: () => '',
    cancelButtonFunc: () => {},
    submitButtonFunc: () => {},
    closeButtonFunc: () => {},
    title: 'Custom Dialog',
    contextText: 'Context description', 
    submitButtonText: 'Send',
    dialogOpenFlag: false,
    useActions: false
};

export default CustomDialog
