import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { Snackbar as Snack } from '@material-ui/core';
import Alert from '@mui/material/Alert';

// Type of severity
// error, warning, info, success

const AlertComp = (props) => {
  return <Alert elevation={6} variant="filled" {...props} />;
}

const SnackBar = ({ severity = "success", open, onClose, content, anchorPost = null }) => {
  const [doOpen, setDoOpen] = useState(false);
  const [anchor, setAnchor] = useState({
    vertical: 'bottom',
    horizontal: 'center'
  })
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setDoOpen(open);
      if (anchorPost === 'top') {
        setAnchor({
          ...anchor,
          vertical: 'top'
        })
      }
    }
    return () => { unmounted = true };
  }, [content, open]);

  return (
    <Snack open={doOpen} onClose={onClose} autoHideDuration={6000} anchorOrigin={anchor}>
      <AlertComp onClose={() => setDoOpen(false)} severity={severity}>
        {content}
      </AlertComp>
    </Snack>
  );
}

SnackBar.protoTypes = {
  severity: T.string,
  open: T.bool,
  onClose: T.func,
  anchorPost: T.string,
  content: T.string,
}

export default SnackBar;