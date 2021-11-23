import { Fab } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    bottomRight: {
        marginRight: theme.spacing(1),
        position: 'fixed',
        bottom: '60px',
        right: '30px',
        zIndex: '180',
    },
    fabIcon: {
        width: '60px',
        height: '60px',
    },
    img: {
        width: '60px'
    }
}));
  
const FabActionButtons = () => {
    const classes = useStyles();

    const openNewWindow = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    const whatsappAction = () => {
        openNewWindow('https://wa.me/50767702400');
    }

    return (
        <div className={classes.bottomRight}>
            <Fab size="small" color="primary" className={classes.fabIcon} aria-label="Cont&aacute;ctenos" onClick={whatsappAction}>
                <img src="/images/social/logo-whatsapp.png" alt="Whatsapp" className={classes.img} />
            </Fab>
        </div>
    )

}

export default FabActionButtons;
