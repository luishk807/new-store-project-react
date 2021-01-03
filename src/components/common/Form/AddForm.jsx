import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
} from '@material-ui/core';
import { useRouter } from 'next/router';

import { addItem } from '../../../api';
import { validateForm, loadMainOptions, handleFormResponse } from '../../../utils/form';
import { capitalize } from '../../../utils';
import Form from './Form';
import { FORM_SCHEMA } from '../../../../config';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    margin: '0px auto',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    }
  },
});

const AddForm = ({
  classes, 
  name, 
  adminSection, 
  userSection, 
  entryForm, 
  hideEntry,
  showTitle,
  fileLimit,
  ignoreForm, 
  children, 
  customUrl = null
}) => {
  const router = useRouter()
  const [section, setSection] = useState({});
  const [errors, setErrors] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
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


  const handleBannerSave = async(evt, index) => {
    const current = form.banner;
    const idx = index ? index : 0;
    if (evt.target) {
      current[idx].url = evt.target.value;
    } else {
      current[idx].values = evt[0];
    }
    setForm({
      ...form,
      banner: current,
    });
  }

  const addMoreBanner = (add, indx = 0) => {
    const current = form.banner;
    if (add) {
      current.push(
        {
          url: '',
          open: false,
          values: [],
        }
      )
    } else {
      current.splice(indx, 1);
    }
    setForm({
      ...form,
      banner: current,
    });
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
      let errorText = `Unable to Add ${capitalize(section.name)}, ${capitalize(i)} is required`;

      if (form[i] && form[i].length) {
        errorText = `Unable to Add ${capitalize(section.name)}, ${capitalize(i)} must be completed`;
      }

      setSnack({
        severity: 'error',
        open: true,
        text: errorText
      })
    } else {
      const confirm = await addItem(section.url, form);
      const resp = handleFormResponse(confirm);
      setSnack(resp);
      setTimeout(() => {
        handleCancel() 
      }, 1000)
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
    try {
      const options = await loadMainOptions(admin);
      Object.keys(entryForm).forEach(field => {
        if (FORM_SCHEMA[field] == "dropdown") {
          if (hideEntry && hideEntry.indexOf(field) !== -1) {
            setForm({
              ...form,
              [field]:entryForm[field]
            })
          } else {
            let dropValue = 0;
            if (field == "vendor" && entryForm[field]) {
              options[field].forEach((item, key) => {
                if(item.id === entryForm[field]) {
                  dropValue = key;
                }
              })
            }
            else if (field == "country") {
              options[field].forEach((item, key) => {
                if (entryForm[field] && item.name === entryForm[field].name) {
                  dropValue = key;
                }
              });
            }
            setForm({
              ...form,
              [field]:options[field][dropValue]
            }) 
          }
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
        fileLimit={fileLimit}
        fields={form} 
        classes={classes}
        hideEntry={hideEntry}
        errors={errors} 
        isAdmin={isAdmin}
        showTitle={showTitle}
        onChange={formOnChange} 
        bannerOnSave={handleBannerSave}
        bannerAddMore={addMoreBanner}
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
  fileLimit: T.bool,
  showTitle: T.bool,
  customUrl: T.string,
  ignoreForm: T.array,
  children: T.node,
  hideEntry: T.object
}

export default withStyles(styles)(AddForm);