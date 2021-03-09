import React, {useState, useEffect} from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  FormControl,
  ButtonGroup,
  Button
} from '@material-ui/core';

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  productSelectDrop: {
    minWidth: 120,
    padding: '2px 0px',
    [theme.breakpoints.down('sm')]: {
      margin: 'auto',
      width: '100%',
    }
  },
  quantityButton: {
    fontSize: '1.5em',
    lineHeight: 1,
  },
  quantityInput: {
    margin: '0px 2px',
    textAlign: 'center',
    width: '25%',
    border: '1px solid rgb(248,190,21)',
    mozAppearance: 'textfield',
    '&::-webkit-outer-spin-button': {
      WebkitAppearance: 'none',
    },
    '&::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
    },
  },
  quantityBox: {
    display: 'flex',
  },
});

const QuantitySelectorB = ({classes, data = 1, id, onChange}) => {
  const [total, setTotal] = useState(0);
  const [showData, setShowData] = useState(false);
  
  const onHandleDropDown = async(resp) => {
    let value = null;

    if (typeof resp === "boolean") {
      value = total;
      if (resp) {
        value++;
      } else {
        if (value > 1) {
          value--;
        } else {
          value = 1;
        }
      }
    } else {
      value = resp.target.value
    }

    setTotal(value);

    if (value) {
      onChange({
        id: id,
        value:value 
      })
    }
  };

  useEffect(()=> {
    setTotal(data)
    setShowData(true)
  }, [])

  return showData && ( 
    <div className={classes.root}>
      <FormControl variant="outlined" className={classes.productSelectDrop}>
          <div className={classes.quantityBox}>
            <Button className={`mainButtonNaked ${classes.quantityButton}`} onClick={ () => onHandleDropDown(false)}>-</Button>
            <input className={classes.quantityInput} onChange={onHandleDropDown} value={total} type="number" title="quant" id={id}/>
            <Button className={`mainButtonNaked ${classes.quantityButton}`} onClick={ () => onHandleDropDown(true)}>+</Button>
          </div>

      </FormControl>
    </div>
  );
}

QuantitySelectorB.protoTypes = {
  classes: T.object,
  data: T.object,
  title: T.string,
  id: T.string,
  onChange: T.func,
};

export default withStyles(styles)(QuantitySelectorB);