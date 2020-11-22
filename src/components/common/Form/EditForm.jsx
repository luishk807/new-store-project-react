import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { 
  withStyles,
  Grid,
} from '@material-ui/core';

import { saveItem } from '../../../api';
import Api from '../../../services/api';
import { validateForm, loadMainOptions, handleFormResponse } from '../../../utils/form';
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

const EditForm = ({
  classes, 
  id, 
  name, 
  entryForm, 
  ignoreForm, 
  showTitle, 
  adminSection, 
  userSection, 
  hideEntry,
  children, 
  customUrl = null
}) => {
  const router = useRouter()
  const [errors, setErrors] = useState({});
  const [section, setSection] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [imageDelete, setImageDelete] = useState({})
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
    const url = customUrl ? customUrl : `/account`;
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
      const formSubmit = form;
      if ('image' in formSubmit) {
        formSubmit['saved'] = imageDelete;
        delete formSubmit.image.saved
      }
      const confirm = await saveItem(section.url, id, formSubmit)
      const resp = handleFormResponse(confirm);
      setSnack(resp);
      setTimeout(() => {
        handleCancel() 
      }, 1000);
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
    const mainOptions = await loadMainOptions();
    if (id) {
      Api.get(`${sect.url}`,{
        id: id
      }).then((res) => {
        let info = res;
        for(var field in form){
          let value = info[field];
          if (FORM_SCHEMA[field] == "dropdown") {
            const value = mainOptions[field].filter((data) => 'id' in data ? data.id == info[field] : data.value == info[field])
            inputs[field] = value[0]
          } else if (FORM_SCHEMA[field] == "file") {
            const images = 'productImages' in info ? info['productImages'] : [info['img']];
            inputs['image'] = {
              'saved': images
            }
          } else if (FORM_SCHEMA[field] == "password") {
            inputs[field] = null
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

  }, [id, showForm])
  
  return showForm && (
    <div className={classes.root}>
      {
        children && children
      }
      <Form 
        title={section.name} 
        fileOnSave={handleSave} 
        fields={form} 
        showTitle={showTitle}
        errors={errors} 
        hideEntry={hideEntry}
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
  );
}

EditForm.protoTypes = {
  classes: T.object,
  id: T.number,
  name: T.string,
  customUrl: T.string,
  adminSection: T.object, 
  userSection: T.object, 
  showTitle: T.bool,
  entryForm: T.object,
  ignoreForm: T.array,
  children: T.node
}

export default withStyles(styles)(EditForm);