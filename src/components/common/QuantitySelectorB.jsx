import React, {useState, useEffect} from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  FormControl,
  ButtonGroup,
  Button
} from '@material-ui/core';
import { useTranslation } from 'next-i18next'

import { isOutOfStock } from 'src/utils/products';
import Snackbar from './Snackbar';
import { createProductItem } from '@/api/productItems';

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

const QuantitySelectorB = React.memo(({refresh, data = 1, jump = 0, stock, classes, id, onChange, cart = null, product = null}) => {
  const [total, setTotal] = useState(0);
  const [currectRefresh, setCurrentRefresh] = useState(null)
  const [showData, setShowData] = useState(false);
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });
  const { t } = useTranslation(['common'])

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

    let totalCheck = jump ? Number(value) * Number(jump) : Number(value);


    let isOutStock = totalCheck > stock;

    if (product && cart) {
      const newProd = JSON.parse(JSON.stringify(product));
      newProd.quantity = value;
      const getStockResult = isOutOfStock(newProd, cart, true);
      isOutStock = getStockResult > stock;
    }

    if (stock && isOutStock) {
      setSnack({
        severity: 'error',
        open: true,
        text: t('max_amount_reached'),
      })
    } else {
      setTotal(value);
      if (value) {
        onChange({
          id: id,
          value:value 
        })
      }
    }
  };

  useEffect(() => {
    if (data !== total) {
      setTotal(data)
    }
    setShowData(true);
  }, [data])
  
  useEffect(()=> {
    let unmounted = false;
    if (!unmounted) {
      if (currectRefresh !== refresh) {
        setCurrentRefresh(refresh)
        setTotal(data)
      }
      setShowData(true);
    }
    return () => { unmounted = true };
  }, [refresh])

  return showData && ( 
    <div className={classes.root}>
      <FormControl variant="outlined" className={classes.productSelectDrop}>
          <div className={classes.quantityBox}>
            <Button className={`mainButtonNaked ${classes.quantityButton}`} onClick={ () => onHandleDropDown(false)}>-</Button>
            <input className={classes.quantityInput} onFocus={(event) => event.target.select()} onChange={onHandleDropDown} value={total} type="number" title="quant" id={id}/>
            <Button className={`mainButtonNaked ${classes.quantityButton}`} onClick={ () => onHandleDropDown(true)}>+</Button>
          </div>

      </FormControl>
      <Snackbar open={snack.open} severity={snack.severity} onClose={()=>{
        setSnack(
          {
            ...snack,
            open:false
          }
        )
      }
      } content={snack.text} />
    </div>
  );
})

QuantitySelectorB.protoTypes = {
  classes: T.object,
  title: T.string,
  stock: T.number,
  refresh: T.bool,
  data: T.number,
  id: T.string,
  jump: T.number,
  onChange: T.func,
  cart: T.object,
  product: T.object
};

export default withStyles(styles)(QuantitySelectorB);