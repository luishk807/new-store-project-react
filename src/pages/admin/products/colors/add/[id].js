import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { 
  Grid,
  Button,
  withStyles,
} from '@material-ui/core';
import { useRouter } from 'next/router';

import { getProductById } from 'src/api/products';
import { createColor } from 'src/api/colors';
import { createColor as createProductColor } from 'src/api/productColors';
import AdminLayoutTemplate from 'src/components/common/Layout/AdminLayoutTemplate';
import Snackbar from 'src/components/common/Snackbar';
import ColorPicker from 'src/components/product/ColorPicker';
import Typography from 'src/components/common/Typography';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    textAlign: 'center',
  },
  typography: {
    textAlign: 'inherit',
    padding: 5,
  },
  formRoot: {
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    }
  },
  formItems: {
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    margin: '20px auto 0px auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Add = ({classes}) => {
  const router = useRouter();
  const [product, setProduct] = useState({});
  const [showData, setShowData] = useState(false);
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });
  const [form, setForm] = useState({
    productId: router.query.id,
    colorId: '',
    color: '',
    name: '',
    useCustom: false,
  });

  const loadProductInfo = async() => {
    const getProduct = await getProductById(router.query.id);
    setProduct(getProduct);
    setShowData(true);
  };

  const handleColorSubmit = async() => {
    const sendForm = Object.assign({}, form);
    let saveProductColor = true;
    if (sendForm.useCustom) {
      if (sendForm.name && sendForm.color) {
        const resp = await createColor({ name: sendForm.name, color: sendForm.color});
        if (!resp.data.status) {
          saveProductColor = false;
          setSnack({
            severity: 'error',
            open: true,
            text: resp.data.message,
          })
        }
      } else {
        saveProductColor = false;
        setSnack({
          severity: 'error',
          open: true,
          text: 'Please enter name and color',
        })
      }
    }
    if (saveProductColor) {
      const resp = await createProductColor({ 
        name: sendForm.name, 
        color: sendForm.color,
        productId: router.query.id
      });
      if (resp.status) {
        setSnack({
          severity: 'success',
          open: true,
          text: 'Color saved',
        })
        setTimeout(() => {
          handleCancel() 
        }, 1000)
      } else {
        setSnack({
          severity: 'error',
          open: true,
          text: 'unable to save color',
        })
      }
    }
  }

  const formOnChange = (e) => {
    setForm(e)
  }

  const handleCancel = () => {
    router.push(`/admin/products/colors/${router.query.id}`)
  }

  useEffect(() => {
    loadProductInfo()
  }, [])

  return (
    <AdminLayoutTemplate>
      <div className={classes.root}>
        <form className={classes.formRoot}>
          <Grid container spacing={2} className={classes.formItems}>
            <Grid item lg={12} xs={12}>
  <Typography className={classes.typography} variant="h4" component="h4">Add Color to {product.name}</Typography>
            </Grid>
            <Grid item lg={12} xs={12}>
              <ColorPicker name="color" onChange={formOnChange} />
            </Grid>
            <Grid item lg={6} xs={6}>
              <Button onClick={handleCancel} className={`mainButton`}>Cancel</Button>
            </Grid>
            <Grid item lg={6} xs={6}>
              <Button onClick={handleColorSubmit} className={`mainButton`}>Add Color</Button>
            </Grid>
          </Grid>
        </form>
        <Snackbar open={snack.open} severity={snack.severity} onClose={() => setSnack(false)} content={snack.text} />
      </div>
    </AdminLayoutTemplate>
  );
}

Add.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Add);