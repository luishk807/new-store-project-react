import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { 
  withStyles
} from '@material-ui/core';

import { validateForm, handleFormResponse } from '@/utils/form';
import { postItem } from 'src/api';
import Form from '@/common/Form/Form';
import { FORM_SCHEMA } from 'config';
import { useTranslation } from 'next-i18next';
import ReCAPTCHA from "react-google-recaptcha";

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
  captcha: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
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
  const { t } = useTranslation(['common']);
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
    if (captcha) {
      let errorFound = false;
      let key = '';
      for (var i in form) {
        errorFound = await validateForm(i, form[i]);
        key = i;
        if (!errorFound){
          saveErrors(key)
          break;
        } else {
          saveErrors(key, true, `${key} is required`)
        }
      }
      const field_key = FORM_SCHEMA[i].label
      if (!errorFound) {
        setSnack({
          severity: 'error',
          open: true,
          text: `Unable to send form, ${field_key} is required`
        })
      } else {
        const formSubmit = form;
        const confirm = await postItem(section.url, formSubmit)
        const resp = handleFormResponse(confirm);
        setSnack(resp);
        setTimeout(() => {
          window.location.reload();
        }, 1000)
      }
    } else {
      setSnack({
        severity: 'error',
        open: true,
        text: t('common:captcha_verify')
      })
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

  function onChange(value) {
    setCaptcha(value);
  }

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
        childrenPos="bottom"
        onCloseSnack={onCloseSnack}
      >
        <div className={classes.captcha}>
          <ReCAPTCHA
            sitekey={process.env.GOOGLE_RECHAPTCHA_SITE_V2}
            onChange={onChange}
          />
        </div>
      </Form>
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