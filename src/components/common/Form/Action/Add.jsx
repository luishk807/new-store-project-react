import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
} from '@material-ui/core';
import { useRouter } from 'next/router';

import { validateForm, handleFormResponse } from '../../../../utils/form';
import { FORM_SCHEMA } from '../../../../../config';
import { capitalize } from '../../../../utils';
import { postItem } from '../../../../api';
import Form from '../Form';

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

const Add = ({
  classes, 
  formSection, 
  entryForm, 
  type,
  hideEntry,
  onSubmitAction,
  showTitle,
  ignoreForm, 
  showCancel,
  onCancel,
  onFormChange,
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
    let { name, value } = edrop ? edrop : e.target;
    if (e && FORM_SCHEMA[e.target.name] === "checkbox") {
      name = e.target.name;
      value = e.target.checked
      setForm({
        ...form,
        [name]: value,
      });
    } else {
      if(name in form && validateForm(name, value)){
        setForm({
          ...form,
          [name]: value,
        });
      }
    }
    if (onFormChange) {
      onFormChange({
        key: name,
        val: value
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
      errorFound = await validateForm(i, form[i],ignoreForm);
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
      onSubmitAction(formSubmit)
    }
  }

  const onCloseSnack = () => {
    setSnack({...snack, open: false})
  }

  useEffect(() => {
    console.log("form", form)
    let newErrors = {}
    if (entryForm) {
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
    }
  }, [entryForm])

  
  return showForm && (
    <div className={classes.root}>
      <Form 
        title={section.name} 
        fields={form} 
        showTitle={showTitle}
        errors={errors} 
        type={type}
        onChange={formOnChange} 
        formSubmit={handleSubmit} 
        showCancelBtn={showCancel}
        snack={snack}
        formCancel={onCancel}
        onCloseSnack={onCloseSnack}
      />
    </div>
  );
}

Add.protoTypes = {
  classes: T.object,
  formSection: T.object,
  entryForm: T.object,
  showCancel: T.bool,
  onSubmitAction: T.func,
  showTitle: T.bool,
  type: T.string,
  customUrl: T.string,
  ignoreForm: T.array,
  onCancel: T.func,
  onFormChange: T.func
}

export default withStyles(styles)(Add);