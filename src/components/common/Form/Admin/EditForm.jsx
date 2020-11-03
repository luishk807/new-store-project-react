import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { 
  withStyles,
  Grid,
  Link,
} from '@material-ui/core';

import { saveItem } from '../../../../api';
import Api from '../../../../services/api';
import { validateForm, loadMainOptions } from '../../../../utils/form';
import AdminLayoutTemplate from '../../../../components/common/Layout/AdminLayoutTemplate';
// import Form from '../../../../components/common/Form/Admin/Form';
import Form from '../Form';
import PrivatePage from '../../../../components/common/Form/Admin/PrivatePage';
import { ADMIN_SECTIONS } from '../../../../constants/admin';
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

const EditForm = ({classes, id, name, customUrl, entryForm, ignoreForm, showTitle}) => {
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
    const url = customUrl ? customUrl : `/admin/${ADMIN_SECTIONS[name].url}`;
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
          severity: confirm.data.status ? 'success' : 'error',
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
      Api.get(`${ADMIN_SECTIONS[name].url}`,{
        id: id
      }).then((res) => {
        console.log("info", res)
        let info = res;
        for(var field in form){
          let value = info[field];
          if (FORM_SCHEMA[field] == "dropdown") {
            const value = mainOptions[field].filter((data) => 'id' in data ? data.id == info[field] : data.value == info[field])
            if (field == 'country') {

            }
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
    <PrivatePage>
      <AdminLayoutTemplate>
        <div className={classes.root}>
          <Form 
            title={ADMIN_SECTIONS[name].name} 
            fileOnSave={handleSave} 
            fields={form} 
            showTitle={showTitle}
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
  showTitle: T.bool,
  customUrl: T.string,
  name: T.string,
  entryForm: T.object,
  ignoreForm: T.array,
}

export default withStyles(styles)(EditForm);