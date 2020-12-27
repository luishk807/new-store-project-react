import PropTypes from 'prop-types';
import { withTranslation } from '../../../i18n'
import {
    Dialog,
    DialogActions, 
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button
} from '@material-ui/core';

const CustomDialog = ({ t, children, dialogOpenFlag, title, contextText, cancelButtonFunc, submitButtonFunc, submitButtonText, useActions }) => {
    
    const dialogActions = () => {
        if (useActions) {
            return (
                <DialogActions>
                    <Button onClick={cancelButtonFunc} color="primary">
                        { t('cancel') }
                    </Button>
                    <Button onClick={submitButtonFunc} color="primary">
                        { submitButtonText ? submitButtonText : t('submit') }
                    </Button>
                </DialogActions>
            )
        }
    }
    
    return (
        <Dialog open={dialogOpenFlag} onClose={cancelButtonFunc} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{ title }</DialogTitle>
            <DialogContent>
                <DialogContentText>{ contextText }</DialogContentText>
                { children }
            </DialogContent>
            { dialogActions() }
        </Dialog>
    )
}

CustomDialog.getInitialOptions = async () => ({
    namespacesRequired: ['custom-dialog']
})

CustomDialog.propTypes = {
    t: PropTypes.func.isRequired,
    cancelButtonFunc: PropTypes.func.isRequired,
    submitButtonFunc: PropTypes.func.isRequired,
    children: PropTypes.element,
    title: PropTypes.string,
    contextText: PropTypes.string,
    submitButtonText: PropTypes.string,
    dialogOpenFlag: PropTypes.bool,
    useActions: PropTypes.bool
}

CustomDialog.defaultProps = {
    t: () => '',
    cancelButtonFunc: () => {},
    submitButtonFunc: () => {},
    title: 'Custom Dialog',
    contextText: 'Context description', 
    submitButtonText: 'Send',
    dialogOpenFlag: false,
    useActions: false
};

export default withTranslation('custom-dialog')(CustomDialog)
