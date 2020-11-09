import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
} from '@material-ui/core';
import { useRouter } from 'next/router';

import { addItem } from '../../../api';
import { validateForm, loadMainOptions } from '../../../utils/form';
import Form from './Form';
import { FORM_SCHEMA } from '../../../../config';

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

const AddForm = ({
  classes, 
  name, 
  adminSection, 
  userSection, 
  entryForm, 
  hideEntry,
  ignoreForm, 
  children, 
  customUrl = null
}) => {
  const router = useRouter()
  const [section, setSection] = useState({});
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
      addItem(section.url, form).then((resp) => {
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
    let sect = null;
    if (userSection) {
      sect = userSection;
      setSection(userSection);
    } else if (adminSection) {
      sect = adminSection;
      setSection(adminSection);
    } else {
      return;
    }

    try {
      const options = await loadMainOptions();

      Object.keys(entryForm).forEach(field => {
        if (FORM_SCHEMA[field] == "dropdown" ) {
          let dropValue = 0;
          if (field == "vendor" && entryForm[field]) {
            options[field].forEach((item, key) => {
              if(item.id == entryForm[field]) {
                dropValue = key;
              }
            })
          }
          else if (field == "country") {
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
  }, [entryForm])
  
  return showForm && (
    <div className={classes.root}>
      <Form 
        title={section.name} 
        fileOnSave={handleSave} 
        fields={form} 
        hideEntry={hideEntry}
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
  );
}

AddForm.protoTypes = {
  classes: T.object,
  name: T.string,
  adminSection: T.object,
  userSection: T.object,
  entryForm: T.object,
  customUrl: T.string,
  ignoreFrom: T.array,
  children: T.node,
  hideEntry: T.object
}

export default withStyles(styles)(AddForm);