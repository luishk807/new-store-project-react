import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { 
  withStyles,
  Grid,
} from '@material-ui/core';

import { saveItem } from '../../../api';
import Api from '../../../services/api';
import { validateForm, loadMainOptions } from '../../../utils/form';
import AdminLayoutTemplate from '../../../components/common/Layout/AdminLayoutTemplate';
import Form from '../../../components/common/Form';
import PrivatePage from '../../../components/common/Form/PrivatePage';
import { ADMIN_SECTIONS } from '../../../constants/admin';
import { FORM_SCHEMA } from '../../../config';
import { verifyAuth } from '../../../api/auth';

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

const EditForm = ({classes, id, name, entryForm, ignoreForm}) => {
  const router = useRouter()
  const [errors, setErrors] = useState({});
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
    window.location.href=`/admin/${ADMIN_SECTIONS[name].url}`;
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
        text: `Unable to Add ${ADMIN_SECTIONS[name].name}, ${i} is required`
      })
    } else {
      const formSubmit = form;
      if ('image' in formSubmit) {
        formSubmit['saved'] = imageDelete;
        delete formSubmit.image.saved
      }
      try{
        const confirm = await saveItem(ADMIN_SECTIONS[name].url, id, formSubmit)
        setSnack({
          severity: confirm.data.data ? 'success' : 'error',
          open: true,
          text: confirm.data.message,
        })
        handleCancel() 
      } catch(err) {
        setSnack({
          severity: 'error',
          open: true,
          text: err.response.data.message,
        })
      }
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
    const mainOptions = await loadMainOptions();
    if (id) {
      Api.get(`/${ADMIN_SECTIONS[name].url}`,{
        id: id
      }).then((res) => {
        let info = res[0];
        for(var field in form){
          let value = info[field];
          if (FORM_SCHEMA[field] == "dropdown") {
            const value = mainOptions[field].filter((data) => 'id' in data ? data.id == info[field] : data.value == info[field])
            if (field == 'country') {

            }
            inputs[field] = value[0]
          } else if (FORM_SCHEMA[field] == "file") {
            const images = 'product_images' in info ? info['product_images'] : [info['img']];
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
    <PrivatePage>
      <AdminLayoutTemplate>
        <div className={classes.root}>
          <Form 
            title={ADMIN_SECTIONS[name].name} 
            fileOnSave={handleSave} 
            fields={form} 
            errors={errors} 
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
      </AdminLayoutTemplate>
    </PrivatePage>
  );
}

EditForm.protoTypes = {
  classes: T.object,
  id: T.number,
  name: T.string,
  entryForm: T.object,
  ignoreForm: T.array,
}

export default withStyles(styles)(EditForm);