import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { 
  withStyles,
  Grid,
} from '@material-ui/core';

import { saveItem, deleteItem } from 'src/api';
import Api from '@/services/api';
import { validateForm, loadMainOptions, handleFormResponse, checkEnforceDates } from '@/utils/form';
import Form from './Form';
import { FORM_SCHEMA } from 'config';

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
  basicParams,
  userSection, 
  hideEntry,
  children,
  allowDelete,
  customUrl = null,
  cancelUrl = null,
  successUrl = null
}) => {
  const router = useRouter()
  const [errors, setErrors] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [section, setSection] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [imageDelete, setImageDelete] = useState({})
  const [imageBoxDelete, setImageBoxDelete] = useState({})
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

  const handleImageBoxSave = async(evt, index) => {
    const current = form.imageBox;
    const idx = index ? index : 0;
    if (evt.target) {
      current[idx] = {
        ...current[idx],
        url: evt.target.value,
      }
    } else {
      current[idx] = {
        ...current[idx],
        values: evt[0],
      }
    }
    setForm({
      ...form,
      imageBox: current,
    });
  }

  const addMoreImageBox = (add, indx = 0) => {
    const current = form.imageBox;
    // substract 'saved' key
    const total =  Object.keys(current).length - 1;
    if (total && !indx) {
      indx = total;
    }
    if (add) {
      current[indx] = {
        url: '',
        values: [],
      }
    } else {
      if (current[indx]) {
        delete current[indx];
      }
    }
    setForm({
      ...form,
      imageBox: current,
    });
  }

  const handleCancel = () => {
    if (cancelUrl) {
      const url = cancelUrl ? cancelUrl : `/`;
      router.push(url);
    } else {
      router.back()
    }
  }

  const handleDelete = async (id) => {
    const confirm = await deleteItem(section.url, id)
    const resp = handleFormResponse(confirm);
    setSnack(resp);
    setTimeout(() => {
      handleCancel() 
    }, 1000);
  }

  const handleSubmit = async (e) => {
    let errorFound = false;
    let key = '';
    
    await checkEnforceDates(form, ignoreForm);

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
      const formSubmit = Object.assign({}, form);
      if ('image' in formSubmit) {
        formSubmit['saved'] = imageDelete;
        delete formSubmit.image.saved
      } else if ('imageBox' in formSubmit) {
        if ('saved' in formSubmit.imageBox) {
          delete formSubmit.imageBox.saved
        }
        let imageBox = [];
        for(const imgBox in formSubmit.imageBox) {
          imageBox.push(formSubmit.imageBox[imgBox])
        }
        formSubmit['imageBox'] = imageBox;
        formSubmit['saved'] = imageBoxDelete;
      }
      const confirm = await saveItem(section.url, id, formSubmit)
      const resp = handleFormResponse(confirm);
      setSnack(resp);
      if (confirm.data.status) {
        setTimeout(() => {
          if (successUrl) {
            router.push(successUrl);
          }
        }, 1000);
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

  const markImageBoxDelete = async(images) => {
    const index = Object.keys(imageBoxDelete).length;
    setImageBoxDelete(prevValue => ({
      ...prevValue,
      [index] : images
    }))
  }


  const loadFormOption = async() => {
    let inputs = {}
    let sect = null;
    let admin = false;
    if (userSection) {
      sect = userSection;
      setSection(userSection);
    } else if (adminSection) {
      sect = adminSection;
      admin = true;
      setIsAdmin(admin);
      setSection(adminSection);
    } else {
      return;
    }
    
    const mainOptions = basicParams && Object.keys(basicParams).length ? await loadMainOptions(admin, basicParams) : await loadMainOptions(admin);

    if (id) {
      Api.get(`${sect.url}/${id}`).then((res) => {
        let info = res;
        for(var field in form){
          let value = info[field];
          if (FORM_SCHEMA[field].type == "dropdown") {
            const value = mainOptions[field].filter((data) => 'id' in data ? data.id == info[field] : data.value == info[field])
            inputs[field] = value[0]
          } else if (FORM_SCHEMA[field].type == "file") {
            const images = 'productImages' in info ? info['productImages'] : [info['img']];
            inputs['image'] = {
              'saved': images
            }
          } else if (FORM_SCHEMA[field].type == "imgurl") {
            const images = 'productImages' in info ? info['productImages'] : [];
            inputs['imageBox'] = {
              '0': {
                url: '',
                open: false,
                values: [],
              },
              'saved': images
            }
          } else if (FORM_SCHEMA[field].type == "linkitem") {
            const items = info[sect.listItems] ? info[sect.listItems].map(item => item.product) : [];
            inputs[field] = {
              'saved': items
            }
          } else if (FORM_SCHEMA[field].type == "password") {
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
        id={id}
        allowDelete={allowDelete}
        isAdmin={isAdmin}
        hideEntry={hideEntry}
        basicParams={basicParams}
        onChange={formOnChange} 
        imageBoxOnSave={handleImageBoxSave}
        imageBoxAddMore={addMoreImageBox}
        onSubmit={handleSubmit} 
        formSubmit={handleSubmit}
        formCancel={handleCancel}
        formDelete={handleDelete}
        onImageDelete={markUserImageDelete}
        onImageBoxDelete={markImageBoxDelete}
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
  allowDelete: T.bool,
  name: T.string,
  customUrl: T.string,
  adminSection: T.object, 
  userSection: T.object, 
  cancelUrl: T.string,
  successUrl: T.string,
  basicParams: T.object,
  showTitle: T.bool,
  entryForm: T.object,
  ignoreForm: T.array,
  children: T.node
}

export default withStyles(styles)(EditForm);