import React from 'react';
import * as T from 'prop-types';
import {
  withStyles,
} from '@material-ui/core';

const styles = (theme) => ({
  colorBlock: {
    width: '100%',
    height: 20,
    background: 'red',
    border: '2px solid black',
    margin: '0px auto',
  },
  colorUrl: {
    alignItems: 'center'
  }
});

const ColorBlock = ({classes, color, url = null}) => {
    if (url) {
      return (
        <a href={url} className={classes.colorUrl}>
          <div 
            className={`${classes.colorBlock}`} 
            style={{backgroundColor: color}}>
          </div>
        </a>
      )
    } else {
      return (
        <div 
          className={`${classes.colorBlock}`} 
          style={{backgroundColor: color}}>
        </div>
      )
    }
}
ColorBlock.protoTypes = {
  classes: T.object,
  color: T.string,
  url: T.string
} 
export default withStyles(styles)(ColorBlock);