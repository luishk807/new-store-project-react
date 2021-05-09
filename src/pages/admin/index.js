import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
} from '@material-ui/core';
import { useRouter } from 'next/router';

import Login from '../../components/common/Form/Admin/Login';
import { verifyAuth } from '../../api/auth';

const styles = (theme) => ({});

const Index = ({classes}) => {
  const router = useRouter();
  useEffect(() => {
    if (verifyAuth()) {
      window.location.href ="/admin/home";
    }
  }, [])

  return (
    <Login/>
  );
}

Index.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Index);