import { useRouter } from 'next/router'
import { Menu, MenuItem, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useState } from 'react'
import LanguageIcon from '@material-ui/icons/Language';
import Cookies from 'js-cookie';

const useStyles = makeStyles(theme => ({
    langIcon: {
        color: 'white'
    },
    langButton: {
        width: 40,
        height: 40,
        fill: 'white',
        border: 'none'
    }
}));

const Locale = () => {
    const [anchorEl, setAnchorEl] = useState(null)
    const router = useRouter()
    const classes = useStyles()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    };

    const handleClose = () => {
        setAnchorEl(null)
    };

    const handleLocaleChange = (locale) => {
        Cookies.set('NEXT_LOCALE', locale)
        router.push(router.asPath, router.asPath, { locale })
        setAnchorEl(null)
    }

    return (
        <div>
            <Button className={[classes.langButton, 'd-none', 'd-sm-block'].join(' ')} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <LanguageIcon className={classes.langIcon} fontSize="large" />
            </Button>
            <Menu
                id="language-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => handleLocaleChange('es')}>
                    Espa&ntilde;ol
                </MenuItem>
                <MenuItem onClick={() => handleLocaleChange('en')}>
                    English
                </MenuItem>
            </Menu>
            
        </div>
    )
}

export default Locale