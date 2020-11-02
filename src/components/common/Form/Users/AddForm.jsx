import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
} from '@material-ui/core';
import { useRouter } from 'next/router';

import { addItem } from '../../../../api';
import { validateForm, loadMainOptions } from '../../../../utils/form';
import { ADMIN_SECTIONS } from '../../../../constants/admin'; 
import LayoutTemplate from '../../Layout/LayoutTemplate';
import Form from '../Form';
import { FORM_SCHEMA } from '../../../../../config';
import PrivatePage from './PrivatePage';

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

const AddForm = ({classes, name, entryForm, ignoreForm, children, customUrl = null}) => {
  const section = ADMIN_SECTIONS[name];
  const router = useRouter()
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
    const url =customUrl ? customUrl : `/${section.url}`
    setTimeout(()=>{
      router.push(url);
    }, 1000)
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
      addItem(ADMIN_SECTIONS[name].url, form).then((resp) => {
        let saveResult = null;
        const res = resp.data;
        if (res.data) {
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
          let dropValue = 0;
          if (field == "country") {
            options[field].forEach((item, key) => {
              if (item.name === entryForm[field].name) {
                dropValue = key;
              }
            });
          }
          setForm({
            ...form,
            [field]:options[field][dropValue]
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
      <LayoutTemplate>
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
            children={children}
            snack={snack}
            onCloseSnack={onCloseSnack}
          />
        </div>
      </LayoutTemplate>
    </PrivatePage>
  );
}

AddForm.protoTypes = {
  classes: T.object,
  name: T.string,
  entryForm: T.object,
  customUrl: T.string,
  ignoreFrom: T.array,
  children: T.node
}

export default withStyles(styles)(AddForm);