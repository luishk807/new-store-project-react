import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { 
  withStyles,
  Grid,
} from '@material-ui/core';

import { addItem } from '../../../../api';
import { validateForm, loadMainOptions } from '../../../../utils/form';
import { ADMIN_SECTIONS, ADMIN_URL } from '../../../../constants/admin';
import AdminLayoutTemplate from '../../Layout/AdminLayoutTemplate';
import Form from '../Form';
import PrivatePage from './PrivatePage';
import { FORM_SCHEMA } from '../../../../../config';

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

const AddForm = ({classes, name, entryForm, ignoreForm, customUrl}) => {
  const section = ADMIN_SECTIONS[name];
  const router = useRouter()
  const id = router.query.id;
  const [errors, setErrors] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });
  const [form, setForm] = useState(entryForm)
  
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
    const url = customUrl ? customUrl : `/${ADMIN_URL.index}/${section.url}`;
    router.push(url);
  }

  const handleSubmit = async (e) => {
    let errorFound = false;
    let key = '';
    for (var i in form) {
      errorFound = await validateForm(i, form[i], ignoreForm);
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
        text: `Unable to Add ${section.name}, ${i} is required`
      })
    } else {
      let sendForm = form;
      if (id) {
        sendForm = {
          ...form,
          'user': id
        }
      }
      addItem(ADMIN_SECTIONS[name].url, sendForm).then((resp) => {
        const res = resp.data;
        if (res.status) {
          setSnack({
            severity: 'success',
            open: true,
            text: `${section.name} Added`,
          })
          handleCancel();
        } else {
          setSnack({
            severity: 'error',
            open: true,
            text: `${section.name} error! ${res.message}`,
          })
        }
      }).catch((err) => {
        setSnack({
          severity: 'error',
          open: true,
          text: `${section.name} error! ${err.response.data.message}`,
        })
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
    try {
      const options = await loadMainOptions();

      Object.keys(entryForm).forEach(field => {
        if (FORM_SCHEMA[field] == "dropdown" ) {
          setForm({
            ...form,
            [field]:options[field][0]
          })
        }
      })
  
      setShowForm(true);
    } catch(err) {}
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
    <PrivatePage>
      <AdminLayoutTemplate>
        <div className={classes.root}>
          <Form 
            title={section.name} 
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
    </PrivatePage>
  );
}

AddForm.protoTypes = {
  classes: T.object,
  name: T.string,
  customUrl: T.string,
  entryForm: T.object,
  ignoreFrom: T.array,
}

export default withStyles(styles)(AddForm);