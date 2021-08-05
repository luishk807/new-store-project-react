import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
} from '@material-ui/core';
import { useRouter } from 'next/router';

import { validateForm, handleFormResponse } from '@/utils/form';
import { capitalize } from 'src/utils';
import { postItem } from 'src/api';
import Form from './Form';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    margin: '0px auto',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    }
  },
});

const AddForm = ({
  classes, 
  formSection, 
  entryForm, 
  hideEntry,
  type,
  showTitle,
  ignoreForm, 
  showCancel
}) => {
  const [errors, setErrors] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [section, setSection] = useState({})
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });
  const [form, setForm] = useState({})

  const formOnChange = (e, edrop = null) => {
    const { name, value } = edrop ? edrop : e.target;
    if(name in form && validateForm(name, value)){
      setForm({
        ...form,
        [name]: value,
      });
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
        text: `Unable to send form, ${i} is required`
      })
    } else {
      const formSubmit = form;
      const confirm = await postItem(section.url, formSubmit)
      const resp = handleFormResponse(confirm);
      setSnack(resp);
    }
  }

  const onCloseSnack = () => {
    setSnack({...snack, open: false})
  }

  useEffect(() => {
    let newErrors = {}
    setForm(entryForm);
    setSection(formSection);

    Object.keys(entryForm).map((field, index) => {
      newErrors[field] = {
        error: false,
        text: '',
      }
    })
    setErrors(newErrors);
    setShowForm(true)
  }, [entryForm])

  
  return showForm && (
    <div className={classes.root}>
      <Form 
        title={section.name} 
        fields={form} 
        errors={errors} 
        onChange={formOnChange} 
        formSubmit={handleSubmit} 
        showCancelBtn={showCancel}
        snack={snack}
        type={type}
        onCloseSnack={onCloseSnack}
      />
    </div>
  );
}

AddForm.protoTypes = {
  classes: T.object,
  formSection: T.object,
  entryForm: T.object,
  showCancel: T.bool,
  type: T.string,
  showTitle: T.bool,
  customUrl: T.string,
  ignoreForm: T.array,
}

export default withStyles(styles)(AddForm);