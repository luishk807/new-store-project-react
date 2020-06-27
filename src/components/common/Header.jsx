import React, {forwardRef} from 'react';
// import Link from 'next/link'
import T from 'prop-types';
import { 
  PermIdentityIcon,
  ShoppingCartIcon,
} from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import { 
  AppBar,
  withStyles, 
  MenuList, 
  MenuItem,
  IconButton,
  Typography,
  Toolbar,
  Paper,
  Link,
  Menu,
  Button,
  Grid,
} from '@material-ui/core';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  horizMenu:{
    '& div': {
      display: 'inline-block',
    }
  },
  title: {
    flexGrow: 1,
  },
  style: {

  }
})

const Header = ({classes, data}) => {
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title} color="inherit">
            Photos
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
    // <nav className="navbar navbar-expand-md navbar-dark fixed-top main-nav-panel">
    //   <Link href="/"><a className="navbar-brand"><img src="/images/logo-white.png" alt="" /></a></Link>
    //   <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
    //     <span className="navbar-toggler-icon"></span>
    //   </button>
    //   <div className="collapse navbar-collapse" id="navbarCollapse">
    //     <form className="form-inline my-2 my-lg-0">
    //       <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
    //       <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    //     </form>
    //     <ul className="navbar-nav mr-auto">
    //       <li className="nav-item active">
    //         <Link href="/">
    //           <a className="nav-link active">
    //             <ShoppingCartIcon color="white" style={{ fontSize: 40 }}/>
    //           </a>
    //         </Link>
    //       </li>
    //       <li className="nav-item">
    //         <Link href="/about">
    //           <a className="nav-link active">
    //             <PermIdentityIcon color="white" style={{ fontSize: 40 }} />
    //           </a>
    //         </Link>
    //       </li>
    //     </ul>
    //   </div>
    // </nav>
  );
}

Header.protoTypes = {
  classes: T.object,
  data: T.object,
}
export default withStyles(styles)(Header);