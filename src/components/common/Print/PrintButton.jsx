import React, { useEffect, useRef, useState } from 'react';
import * as T from 'prop-types';
import ReactToPrint from 'react-to-print';

import ProgressBar from '@/common/ProgressBar';
import OrderTemplate from './templates/OrderTemplate';

import { 
  withStyles, 
  Button
} from '@material-ui/core';
import Icons from '../Icons';


const styles = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'start',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      alignItems: 'center',
    }
  },
  icon: {
    width: 30,
    height: 30,
    fill: '#000',
  },
  hidePrint: {
    display: 'none'
  }
})

const PrintButton = ({classes, data}) => {
  const componentRef = useRef();
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    setShowData(true)
  }, [data]);

  return showData ? (
    <div className={classes.root}>
      <ReactToPrint
        trigger={() => <Button><Icons name="print" classes={{icon: classes.icon}}/></Button>}
        content={() => componentRef.current}
      />
      <div className={classes.hidePrint}>
        <OrderTemplate data={data} ref={componentRef} /> 
      </div>
    </div>
  ) : (
    <ProgressBar />
  );
}

PrintButton.propTypes = {
  classes: T.object,
  data: T.object,
}

export default withStyles(styles)(PrintButton)