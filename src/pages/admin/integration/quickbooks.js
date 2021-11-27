import { config } from '@/config';
import { makeStyles } from '@material-ui/core/styles'
import { useEffect, useState } from 'react'
import { getQuickbooksAuthUri, getQuickbooksStatus, disconnectQuickbooks } from '../../../services/integration'
import QuickbooksLogo from '../../../../public/images/integration/quickbooks/qb-logo-horizontal-preferred.svg'
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    clickableImage: {
        cursor: 'pointer'
    }
}));

const QuickbooksConnect = () => {
    const classes = useStyles()
    const [qbStatus, setQbStatus] = useState(null)
    const [qbAuthUri, setQbAuthUri] = useState(null)
    const [hideQbConnectButton, setHideQbConnectButton] = useState(false)
    const [qbConnectionDetails, setQbConnectionDetails] = useState('')

    /** Loads quickbooks authorization URI and its status */
    const loadQuickbooksIntegrationData = () => {
        getQuickbooksAuthUri()
            .then(result => {
                setQbAuthUri(result.data)
            })
            .catch(error => {
                console.log(error)
            })
        loadQuickbooksStatus()
    }

    /** Loads quickbooks connection status */
    const loadQuickbooksStatus = () => {
        getQuickbooksStatus()
            .then(result => {
                setQbStatus(result)
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        loadQuickbooksIntegrationData()
    }, [])

    useEffect(() => {
        if (!qbStatus) {
            setHideQbConnectButton(false)
        } else {
            console.log('qbStatus', qbStatus)
            const refreshToken = qbStatus && qbStatus.data && qbStatus.data.refreshToken
            let qbConnDetails = ''
            if (refreshToken) {
                if (refreshToken.expires) {
                    const future = moment(refreshToken.expires)
                    const today = moment()
                    qbConnDetails = `Refresh token expires in ${future.diff(today, 'days')} days (${refreshToken.expires}).`
                }
                const accessToken = qbStatus && qbStatus.data && qbStatus.data.accessToken
                if (accessToken) {
                    qbConnDetails += ` Access token currently ${(accessToken.expired) ? 'expired' : 'not expired'}`
                }
                setQbConnectionDetails(qbConnDetails)
                if (refreshToken.expired) {
                    setHideQbConnectButton(false)
                } else {
                    setHideQbConnectButton(true)
                }
            } else {
                setHideQbConnectButton(false)
            }
        }
    }, [qbStatus])

    const authenticateQuickbooks = () => {
        if (qbAuthUri) {
            // Opens an authentication window
            const handle = window.open(qbAuthUri.url, '_blank', 'toolbar=no,location=no,status=no,menubar=no')
            const handlePopupMessage = (event) => {
                if (event.origin !== config.backEndUrl) { // Ignore if message is not from backend window
                    return;
                } else { // Only process when the message is from the backend window
                    if (event.data && event.data.status === 1) {
                        handle.close();
                        loadQuickbooksStatus();
                        // Remove the event listener, no longer needed
                        window.removeEventListener('message', handlePopupMessage, false);
                    }
                }
            }
            // Listens to messages
            window.addEventListener('message', handlePopupMessage, false);
        }
    }

    const disconnectFromQuickbooks = () => {
        disconnectQuickbooks()
            .then(result => {
                console.log('Disconnected from Quickbooks', result);
                loadQuickbooksStatus()
            })
            .catch(error => {
                console.log('Error disconnecting from Quickbooks', error)
                loadQuickbooksStatus()
            })
    }

    return (
        <div>
            { !hideQbConnectButton &&
            <img src="/images/integration/quickbooks/C2QB_green_btn_med_default.png" alt="Connect to Quickbooks" onClick={authenticateQuickbooks} className={classes.clickableImage} />
            }
            { hideQbConnectButton && <QuickbooksLogo /> }
            <div>
                { qbConnectionDetails } (<a href="#" onClick={authenticateQuickbooks} >Force Re-authentication</a>)
                &nbsp; 
                { hideQbConnectButton &&
                (<a href="#" onClick={disconnectFromQuickbooks}>Disconnect</a>)
                }
            </div>
        </div>

    )
}

export default QuickbooksConnect
