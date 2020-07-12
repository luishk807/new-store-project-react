import React from 'react';
import T from 'prop-types';
import {
  withStyles, 
} from '@material-ui/core';

const styles = (theme) => ({
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60, /* Set the fixed height of the footer here */
    lineHeight: 60, /* Vertically center the text there */
    backgroundColor: 'f5f5f5',
  }
});

const Footer = ({classes}) => {
  return (
    <footer className="footer">
      <div className="container">
        <span className="text-muted">Place sticky footer content here.</span>
      </div>
    </footer>
  );
}

Footer.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Footer);