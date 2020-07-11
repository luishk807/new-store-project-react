import React from 'react';
import T from 'prop-types';

import { 
  withStyles, 
  Link,
  Button,
  Grid,
  Fade,
  Backdrop,
  Paper,
} from '@material-ui/core';

import MaterialModal from '@material-ui/core/Modal';


const styles = (theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

const Modal = ({classes, title, children, onClose: closeModal, onOpen}) => {
  return ( 
    <MaterialModal 
      open={onOpen} 
      onClose={closeModal}
      className={classes.modal}
      aria-labelledby="simple-modal-title" 
      aria-describedby="simple-modal-description"
      closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
    >
      <Fade in={onOpen}>
        <Paper elevation={3}>
          {children}
        </Paper>
      </Fade>
    </MaterialModal>
   );
}
 
Modal.protoTypes = {
  classes: T.object,
  title: T.oneOfType([T.node, T.string]),
  children: T.oneOfType([
    T.arrayOf(T.node),
    T.node,
  ]),
  onOpen: T.bool.isRequired,
  onClose: T.func.isRequired,
}

export default withStyles(styles)(Modal);