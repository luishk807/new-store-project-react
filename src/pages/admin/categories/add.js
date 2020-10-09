import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
} from '@material-ui/core';

import { 
  getCategories,
  getCategoryById,
  addCategory,
} from '../../../api/admin/categories';
import { OPTIONS_DROP } from '../../../config';
import { validateForm, loadMainOptions } from '../../../utils/form';
import AdminLayoutTemplate from '../../../components/common/Layout/AdminLayoutTemplate';
import Form from '../../../components/common/Form';

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
  const [errors, setErrors] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });
  const [form, setForm] = useState({
    name: null,
    icon: null
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
    window.location.href='/admin/categories'
  }

  const handleSubmit = async (e) => {
    let errorFound = false;
    let key = '';
    for (var i in form) {
      errorFound = await validateForm(i, form[i]);
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
        text: `Unable to Add Category, ${i} is required`
      })
    } else {
      addCategory(form).then((res) => {
        setSnack({
          severity: 'success',
          open: true,
          text: 'Category Added',
        })
        handleCancel();
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

  const loadFormOption = async() => {
    setForm({
      ...form,
    })
    setShowForm(true);
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
  }, [])
  
  return showForm && (
    <AdminLayoutTemplate>
      <div className={classes.root}>
        <Form 
          title="Category" 
          fileOnSave={handleSave} 
          fileLimit={true}
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