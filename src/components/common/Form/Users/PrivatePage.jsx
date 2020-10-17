import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  TextField,
  Button,  
} from '@material-ui/core';
import { connect } from 'react-redux';

import { verifyUser } from '../../../../api/auth'
import LayoutTemplate from '../../Layout/LayoutTemplate';
import Login from './Login';

const styles = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    textAlign: 'center',
    height: '100%',
    padding: 5,
  },
  formItems: {
    marginTop: 50,
    display: 'flex',
    justifyContent: 'center',
    width: '50%%',
    '& div': {
      width: '100%',
    }
  },
});

const PrivatePage = ({classes, children, userInfo}) => {
  const [hasAccess, setHasAccess] = useState(true);
  const [status, setStatus] = useState({
    severity: '',
    open: false,
    text: ``,
  })
  useEffect(() => {
    setHasAccess(verifyUser());
  }, [])


  return !hasAccess ? (
  <LayoutTemplate>
    <Login inStatus={hasAccess}/>
  </LayoutTemplate>
  ) : children
}

PrivatePage.protoTypes = {
  classes: T.object,
  children: T.node,
}

const mapStateToProps = state => ({
  userInfo: state.user
}) // add reducer access to props

export default connect(mapStateToProps)(withStyles(styles)(PrivatePage));