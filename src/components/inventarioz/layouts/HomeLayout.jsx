import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { MuiThemeProvider } from '@material-ui/core/styles';
import myTheme from '../../../themes/inventarioz';
import { useState } from 'react'
import SearchInput from '../SearchInput';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    }
}));

const HomeLayout = (props) => {

    const classes = useStyles()

    return (
        <MuiThemeProvider theme={myTheme}>
            <div className={classes.root}>
                <AppBar position="static">
                        <Toolbar variant="dense">
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography className={classes.title} variant="h6" noWrap>
                            InventarioZ
                        </Typography>
                        <SearchInput />
                    </Toolbar>
                </AppBar>
                { props.children }
            </div>
        </MuiThemeProvider>
    )
}

export default HomeLayout
