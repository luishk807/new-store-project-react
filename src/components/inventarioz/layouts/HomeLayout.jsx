import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer'
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { MuiThemeProvider } from '@material-ui/core/styles';
import myTheme from '../../../themes/inventarioz';
import SearchInput from '../SearchInput';
import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon
} from '@material-ui/core'
import ShowChartIcon from '@material-ui/icons/ShowChartOutlined';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartTwoTone';
import ListAltTwoToneIcon from '@material-ui/icons/ListAltTwoTone';
import Link from 'next/link'
import { useState, Fragment } from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
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
    const [drawerOpen, setDrawerOpen] = useState(false)
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setDrawerOpen(open);
    };
    const menuClick = () => {
        setDrawerOpen(true)
    }

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
                            onClick={menuClick}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography className={classes.title} variant="h6" noWrap>
                            <Link href="/inventarioz/home">InventarioZ</Link>
                        </Typography>
                        <SearchInput />
                    </Toolbar>
                </AppBar>
                <Fragment>
                    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                        <List>
                            <ListItem button key="products">
                                <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
                                <ListItemText>PRODUCTS</ListItemText>
                            </ListItem>
                            <ListItem button key="stock">
                                <ListItemIcon><ShowChartIcon /></ListItemIcon>
                                <ListItemText>STOCK</ListItemText>
                            </ListItem>
                            {/* <ListItem button key="orders">
                                <ListItemIcon><ListAltTwoToneIcon /></ListItemIcon>
                                <ListItemText>ORDERS</ListItemText>
                            </ListItem> */}
                        </List>

                    </Drawer>
                </Fragment>
                <main>
                { props.children }
                </main>
            </div>
        </MuiThemeProvider>
    )
}

export default HomeLayout
