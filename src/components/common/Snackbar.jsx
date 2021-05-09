import React, {useState, useEffect} from 'react';
import * as T from 'prop-types';
import { 
  Grid,
  Snackbar as Snack,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Typography from './Typography';

// Type of severity
// error, warning, info, success

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackBar = React.memo(({ severity="success", open, onClose, content}) => {
  const [doOpen, setDoOpen] = useState(false);

  useEffect(() => {
    let unmounted = false;

    if (!unmounted) {
      setDoOpen(open)
    }
    return () => { unmounted = true };
  }, [content]);

  return (
    <Snack open={doOpen} onClose={onClose} autoHideDuration={6000}>
      <Alert onClose={() => setDoOpen(false)} severity={severity}>
        {content}
      </Alert>
    </Snack>
  );
});

SnackBar.protoTypes = {
  severity: T.string,
  open: T.bool,
  onClose: T.func,
  content: T.string,
}

export default SnackBar;