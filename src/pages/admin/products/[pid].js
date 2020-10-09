import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { 
  withStyles,
  Grid,
} from '@material-ui/core';

import { 
  getProducts,
  getProductById,
  saveProduct,
} from '../../../api/admin/products';
import Api from '../../../services/api';
import { validateForm, loadMainOptions } from '../../../utils/form';
import AdminLayoutTemplate from '../../../components/common/Layout/AdminLayoutTemplate';
import Form from '../../../components/common/Form';
import { FORM_SCHEMA } from '../../../config';

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

const Edit = ({classes}) => {
  const router = useRouter()
  const pid = router.query.pid;
  const [errors, setErrors] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [imageDelete, setImageDelete] = useState({})
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
    window.location.href='/admin/products';
  }

  const handleSubmit = async (e) => {
    let errorFound = false;
    let key = '';
    for (var i in form) {
      errorFound = await validateForm(i, form[i], ['image']);
      key = i;
      if (!errorFound){
        saveErrors(name)
        break;
      } else {
        saveErrors(name, true, `${name} is required`)
      }
    }
    if (!errorFound) {
      setSnack({
        severity: 'error',
        open: true,
        text: `Unable to Add Product, ${i} is required`
      })
    } else {
      const formSubmit = form;
      formSubmit['saved'] = imageDelete;
      delete formSubmit.image.saved
      const confirm = await saveProduct(pid, formSubmit)
      setSnack({
        severity: confirm.data.data ? 'success' : 'error',
        open: true,
        text: confirm.data.message,
      })
      handleCancel()
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

  const onCloseSnack = () => {
    setSnack({...snack, open: false})
  }

  const handleSave = (files) => {
    setForm({
      ...form,
      image: {
        ...form.image,
        open: false,
        files: files,
      }
    })
  }
  
  const markUserImageDelete = async(images) => {
    const index = Object.keys(imageDelete).length;
    setImageDelete(prevValue => ({
      ...prevValue,
      [index] : images
    }))
  }


  const loadFormOption = async() => {
    let inputs = {}
    const mainOptions = await loadMainOptions();
    if (pid) {
      Api.get('/products',{
        id: pid
      }).then((res) => {
        let info = res[0];
        for(var field in form){
          let value = info[field];
          if (FORM_SCHEMA[field] == "dropdown") {
            const value = mainOptions[field].filter((data) => data.id == info[field])
            inputs[field] = value[0]
          } else if (FORM_SCHEMA[field] == "file") {
            const images = info['product_images'];
            inputs['image'] = {
              'saved': images
            }
          } else {
            inputs[field] = value
          }
        }
        return inputs;
      }).then((res) => {
        setForm(res)
        setShowForm(true);
      })
    }
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

   loadFormOption()

  }, [pid, showForm])
  
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
          onImageDelete={markUserImageDelete}
          type="edit"
          snack={snack}
          onCloseSnack={onCloseSnack}
        />
      </div>
    </AdminLayoutTemplate>
  );
}

Edit.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Edit);