import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
} from '@material-ui/core';

import { 
  getProducts,
  getProductById,
  addProduct,
} from '../../../api/admin/products';
import { CategorySample } from '../../../constants/samples/admin/categories/CategorySample';
import { BrandsSample } from '../../../constants/samples/admin/brands/BrandsSample';
import { VendorSample } from '../../../constants/samples/admin/vendors/VendorSample';
import AdminLayoutTemplate from '../../../components/common/Layout/AdminLayoutTemplate';
import Form from '../../../components/common/Form';
import Api from '../../../services/api';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    textAlign: 'center',
  },
});

const Add = ({classes}) => {
  // const categories = CategorySample;
  // const brands = BrandsSample;
  // const vendors = VendorSample;
  const [errors, setErrors] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });
  const [form, setForm] = useState({
    name: null,
    stock: null,
    amount: null,
    category: null,
    brand: null,
    model: null,
    code: null,
    description: null,
    vendor: null,
    image: {
      values: [],
      open: false,
    }
  })
  
  const formOnChange = (e, edrop = null) => {
    const { name, value } = edrop ? edrop : e.target;
    if(name in form && validateForm(name, value)){
      setForm({
        ...form,
        [name]: value,
      });
    }
  }

  const handleCancel = () => {
    console.log("cancel form")
  }

  const handleSubmit = async (e) => {
    console.log("submitting", form)
    // axios.get('http://localhost:8080/api/products').then((data) => {
    //   console.log('data', data)
    // })
    // const data = await getProductById({id: 1});
    // console.log("data", data);
    let errorFound = false;
    let key = '';
    for (var i in form) {
      errorFound = await validateForm(i, form[i]);
      key = i;
      if(!errorFound){
        break;
      }
    }
    if (!errorFound) {
      setSnack({
        severity: 'error',
        open: true,
        text: `Unable to Add Product, ${i} is required`
      })
    } else {
      const confirm = await addProduct(form)
      console.log(confirm)
      setSnack({
        severity: 'success',
        open: true,
        text: 'Product Added',
      })
    }
  }
  const saveErrors = async (key, err = false, str = '') => {
    await setErrors({
      ...errors,
      [key]: {
        error: err,
        text: str,
      }
    });
  }
  const validateForm = async(name = null, value = null) => {
    switch(name){
      case "name": 
      case "stock":
      case "model":
      case "amount":
      case "email":
      case "description":
      case "code": {
        if(value && value.length > 0){
          saveErrors(name)
          return true
        }else{
          saveErrors(name, true, `${name} is required`)
          return false;
        }
        break;
      }
      case "category": 
      case "brand": 
      case "vendor": {
        if(value && value.id){
          return true
        }
        return false;
        break;
      }
      case "image": {
        if(value.files && value.files.length){
          return true
        }
        return false;
        break;
      }
      default: {
        return false;
      }
    }
  }

  const onCloseSnack = () => {
    setSnack({...snack, open: false})
  }

  const handleSave = (files) => {
    setForm({
      ...form,
      image: {
        open: false,
        files: files,
      }
    })
  }

  useEffect(() => {
    let newErrors = {}

    Object.keys(form).map((field, index) => {
      newErrors[field] = {
        error: false,
        text: '',
      }
    })
    setErrors(newErrors);

    const loadFormOption = async() => {
      const categories = await Api.get('/categories');
      const vendors = await Api.get('/vendors');
      const brands = await Api.get('/brands');
      setForm({
        ...form,
        category: categories[0],
        brand: brands[0],
        vendor: vendors[0],
      })


      setShowForm(true);
    }
    
   loadFormOption()

 
  }, [])
  
  return showForm && (
    <AdminLayoutTemplate>
      <div className={classes.root}>
        <Form 
          title="Product" 
          fileOnSave={handleSave} 
          fields={form} 
          errors={errors} 
          onChange={formOnChange} 
          onSubmit={handleSubmit} 
          formSubmit={handleSubmit}
          formCancel={handleCancel}
          type="submit"
          snack={snack}
          onCloseSnack={onCloseSnack}
        />
      </div>
    </AdminLayoutTemplate>
  );
}

Add.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Add);