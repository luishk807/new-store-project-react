import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { 
  withStyles
} from '@material-ui/core';

import { validateForm, handleFormResponse } from '@/utils/form';
import { postItem } from 'src/api';
import Form from '@/common/Form/Form';
import SimpleCaptcha from '../../../lib/captcha'

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

const SendForm = ({
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
  const [captcha, setCaptcha] = useState(null)

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
    if (captcha.validate()) {
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
    } else {
      setSnack({
        severity: 'error',
        open: true,
        text: 'Favor introducir la respuesta de la suma'
      })
    }
  }

  const onCloseSnack = () => {
    setSnack({...snack, open: false})
  }

  const setupCaptcha = () => {
    setCaptcha(new SimpleCaptcha({
      inputElementSelector: '#captchaInput',
      captchaId: 'captchaId',
      styles: {
          width: 100,
          height: 40,
          textBaseline: 'top',
          font: '24px Times New Roman',
          textAlign: 'left',
          fillStyle: '#ddd',
          direction: 'ltr'
      }
    }))
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

  /** Setup captcha when the form is shown */
  useEffect(() => {
    if (showForm) {
      setupCaptcha()
    }
  }, [showForm])

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
      <input id="captchaInput" type="text" placeholder="Introduzca el resultado..."></input>
    </div>
  );
}

SendForm.protoTypes = {
  classes: T.object,
  formSection: T.object,
  entryForm: T.object,
  showCancel: T.bool,
  type: T.string,
  showTitle: T.bool,
  customUrl: T.string,
  ignoreForm: T.array,
}

export default withStyles(styles)(SendForm);