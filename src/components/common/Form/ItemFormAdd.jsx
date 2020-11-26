import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core';
import { 
  Grid,
  Button,
  Checkbox,
} from '@material-ui/core';
import SearchBarSuggest from '../SearchBarSuggest';

import { addItem, getItems, getItemByFkId } from '../../../api';
import Icons from '../../../components/common/Icons';
import Snackbar from '../../../components/common/Snackbar';
import { handleFormResponse } from '../../../utils/form';

const styles = (theme) => ({
  root: {
    padding: 10,
  },
  item: {
    padding: 5
  },
  icon: {
    width: 80,
    height: 80,
    fill: '#000',
  },
  mainImage: {
    width: 150,
  },
  mainBtnCont: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 10,
  }
});

const ItemFormAdd = ({
  classes, 
  customUrl, 
  adminSection, 
  userSection, 
  source, 
  fields, 
  id, 
  showTitle = true
}) => {
  const [items, setItems] = useState(null);
  const [formItems, setFormItems] = useState([]);
  const [section, setSection] = useState({});
  const [showData, setShowData] = useState(false);
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

  // const handleCheckbox = (evt) => {
  //   const prodId = event.target.value;
  //   let arry = formItems;
  //   const find = arry.indexOf(prodId);
  //   if (find === -1) {
  //     arry.push(prodId);
  //   } else {
  //     arry.splice(find, 1);

  //   }
  //   setFormItems(arry);
  // }

  const handleCheckbox = (evt) => {
    // const prodId = event.target.value;
    // let arry = formItems;
    // const find = arry.indexOf(prodId);
    // if (find === -1) {
    //   arry.push(prodId);
    // } else {
    //   arry.splice(find, 1);

    // }
    // setFormItems(arry);
    console.log('got here',evt)
  }

  const handleCancel = () => {
    // const url =customUrl ? customUrl : `/${section.url}`
    // setTimeout(()=>{
    //   router.push(url);
    // }, 1000)
  }

  const handleSubmit = async (e) => {    
    if (!formItems.length) {
      setSnack({
        severity: 'error',
        open: true,
        text: `no items`
      })
    } else {
      const confirm = await addItem(section.url, { id: id, items: formItems});
      const resp = handleFormResponse(confirm);
      setSnack(resp);
      setTimeout(() => {
        handleCancel() 
      }, 1000)
    }
  }

  const loadItems = async() => {
    let sect = null;
    let getItemResult = null;

    if (source) {
      sect = source;
      setSection(adminSection);
    } else {
      return;
    }
    
    try {
      switch(sect.key) {
        case 'address':
        case 'productsvendor':
          getItemResult = await getItemByFkId(sect.url, sect.key, id);
        break;
        default:
          getItemResult = await getItems(sect.url);
      }
      setShowData(true);
      // setItems(getItemResult);
      setItems([1,2,3,4]);
    } catch(err) {}
  }
  
  useEffect(() => {
    loadItems();
  }, [showData, id])

  const setChildTitle = (obj) => {
    return fields.map((field, index) => {
        if (index > 4) {
           return;
        }
        
        const imageFields = ['img', 'productImages'];

        const value = obj ? obj[field] : null;
        let main_image = field;

        switch(field){
          case 'icon':
            return (
              <Grid item lg={3} xs={12}>
                { 
                  value ? 
                  (
                    <Icons name={obj[field]} classes={{icon: classes.icon}}/>
                  ) : field
                }
              </Grid>
            )
          case 'img':
            if (imageFields.indexOf(field) !== -1 && obj) {
              let src = value ? `${process.env.IMAGE_URL}/${source.url}/${value}` : `/images/no-image.jpg`;
              main_image = <img className={classes.mainImage} src={src} />
            }
            return (
              <Grid key={index} item lg={4} sm={12}>
                { 
                  main_image
                }
              </Grid>
            )
          case 'productImages':
            if (imageFields.indexOf(field) !== -1 && obj) {
              let src = value && value.length > 0 ? `${process.env.IMAGE_URL}/${value[0].img_url}` : `/images/no-image.jpg`;
              main_image = <img className={classes.mainImage} src={src} />
            }
            return (
              <Grid key={index} item lg={2} sm={12}>
                { 
                   main_image
                }
              </Grid>
            )
          case 'first_name':
          case 'name':
          case 'status':
          case 'address':
            return (
              <Grid key={index} item lg={2} sm={12}>
                { 
                  value ?
                  (
                    <a>{ `${value}`}</a>
                  ) : field
                }
              </Grid>
            )
          default:
            return (
              <Grid item key={index} lg={2} sm={12}>
                { value ? value : field }
              </Grid>
            )
        }
    })
  }

  return showData && (
    <>
      <Snackbar open={snack.open} severity={snack.severity} onClose={() => setSnack({...snack, open: false })} content={snack.text} />
      <Grid container className={classes.root}>
        {
          showTitle && (
            <Grid item xs={12} lg={12}>
              <h1>{section.names}</h1>
            </Grid>
          )
        }
        <Grid item lg={12}>
          <Grid container className={classes.mainBtnCont}>
              <Grid item lg={3} xs={12}>
                  <Button onClick={handleSubmit} className={`mainButton`}>{`Add to ${section.name}`}</Button>
              </Grid>
          </Grid>
        </Grid>
        {/* <Grid item lg={12} sm={12}>
          <Grid container>
            <Grid item lg={1} xs={12}>&nbsp;</Grid>
            {
              setChildTitle()
            }
            <Grid item lg={3} xs={12}>
              select
            </Grid>
          </Grid>
          <Grid container>
            {
              items && items.map((item, index) => {
                return (
                  <Grid item key={index} lg={12} sm={12} className={classes.item}>
                    <Grid container>
                      <Grid item lg={1} sm={12}>
                       {index + 1}
                      </Grid>
                      {
                        setChildTitle(item)
                      }
                      <Grid item lg={3} sm={12}>
                        <Checkbox value={item.id} onChange={handleCheckbox} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                      </Grid>
                    </Grid>
                  </Grid>
                )
              })
            }
          </Grid>
        </Grid> */}
        <Grid item>
          {/* <SearchBarSuggest /> */}
        </Grid>
      </Grid>
    </>
  );
}

ItemFormAdd.protoTypes = {
  classes: T.object,
  adminSection: T.object,
  userSection: T.object,
  source: T.object,
  customUrl: T.string,
  fields: T.array,
  showTitle: T.bool,
  id: T.number
}

export default withStyles(styles)(ItemFormAdd);