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
  ignoreForm,
  disableFields,
  children,
  onSubmitAction,
  showTitle,
  resetPanamaSection,
  showCancel,
  actionButtonName,
  actionCancelButtonName,
  onCancel,
  forceRefresh,
  onFormChange,
}) => {
  const [errors, setErrors] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [section, setSection] = useState({})
  const [refresh, setRefresh] = useState({})
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });
  const [form, setForm] = useState({})

  const formOnChange = (e, edrop = null) => {
    let { name, value } = edrop ? edrop : e.target;
    if (e && FORM_SCHEMA[e.target.name].type === "checkbox") {
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
        saveErrors(name, true, `${FORM_SCHEMA[i].label} is required`)
      }
    }
    if (!errorFound) {
      setSnack({
        severity: 'error',
        open: true,
        text: `Unable to send form, ${FORM_SCHEMA[i].label} is required`
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
    let newErrors = {}
    if (forceRefresh !== refresh) {
      setForm(entryForm);
      setSection(formSection);
  
      Object.keys(entryForm).map((field, index) => {
        newErrors[field] = {
          error: false,
          text: '',
        }
      })
      setRefresh(forceRefresh)
      setErrors(newErrors);
      setShowForm(true)
    }
  }, [forceRefresh])

  
  return showForm && (
    <div className={classes.root}>
      <Form 
        title={section ? section.name : ''} 
        fields={form} 
        classes={classes}
        showTitle={showTitle}
        errors={errors} 
        type={type}
        onChange={formOnChange} 
        formSubmit={handleSubmit} 
        showCancelBtn={showCancel}
        disableFields={disableFields}
        resetPanamaSection={resetPanamaSection}
        snack={snack}
        ignoreForm={ignoreForm}
        hideEntry={hideEntry}
        cancelCustonName={actionCancelButtonName}
        submitCustomName={actionButtonName}
        formCancel={onCancel}
        onCloseSnack={onCloseSnack}
      >
      {
        children && children
      }
      </Form>
    </div>
  );
}

Add.protoTypes = {
  classes: T.object,
  formSection: T.object,
  entryForm: T.object,
  showCancel: T.bool,
  refresh: T.bool,
  actionButtonName: T.string,
  actionCancelButtonName: T.string,
  onSubmitAction: T.func,
  showTitle: T.bool,
  resetPanamaSection: T.bool,
  type: T.string,
  disableFields: T.array,
  hideEntry: T.array,
  children: T.node,
  customUrl: T.string,
  ignoreForm: T.array,
  onCancel: T.func,
  onFormChange: T.func
}

export default withStyles(styles)(Add);