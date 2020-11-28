import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core';
import { 
  Grid,
  Button,
  Checkbox,
  TextField,
  GridList,
  GridListTile,
  GridListTileBar,
  FormControl,
  FormHelperText,
} from '@material-ui/core';
import { 
  Autocomplete,
} from '@material-ui/lab';

import { addItem, getItems, getItemByFkId } from '../../../api';
import Icons from '../../../components/common/Icons';
import Snackbar from '../../../components/common/Snackbar';
import { handleFormResponse, getImageUrlByType } from '../../../utils/form';

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
  title, 
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

  const formOnChange = ({value}) => {
    let arry = formItems;
    const find = arry.indexOf(value.id);
    if (find === -1) {
      arry.push(value);
      setFormItems(arry);
      console.log('got here',value)
    }
  }

  const handleCancel = () => {
    const url =customUrl ? customUrl : `/${section.url}`
    setTimeout(()=>{
      router.push(url);
    }, 1000)
  }

  const handleSubmit = async (e) => {
    console.log("sending",formItems)
    // if (!formItems.length) {
    //   setSnack({
    //     severity: 'error',
    //     open: true,
    //     text: `no items`
    //   })
    // } else {
    //   const confirm = await addItem(section.url, { id: id, items: formItems});
    //   const resp = handleFormResponse(confirm);
    //   setSnack(resp);
    //   setTimeout(() => {
    //     handleCancel() 
    //   }, 1000)
    // }
  }

  const imageClickHandle = (e) => {
    formItems.splice(e,1);
    formItemsCont.splice(e,1);
  }

  const imgMainUrl = getImageUrlByType(title);

  const formItemsCont = formItems && typeof formItems == "object" ? formItems.map((data, index) => {
    const imageSrc = typeof data === "object" && data ? data.img_url : data;
    return imageSrc ? (
      <GridListTile key={index} cols={1}>
        <img src={`${imgMainUrl}/${imageSrc}`} />
        <GridListTileBar
          titlePosition="top"
          actionIcon={
            <IconButton className={classes.icon} onClick={()=>imageClickHandle(index)}>
              <Icons name="delete" />
            </IconButton>
          }
          actionPosition="right"
          className={classes.titleBar}
        />
      </GridListTile>
    ) : null
  }) : [];
  
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
      setItems(getItemResult);
      setShowData(true);
    } catch(err) {}
  }
  
  useEffect(() => {
    loadItems();
  }, [showData, id])

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
        <Grid item>
          <Grid container>
            {
              formItems.map((item, key) => {
                return (
                  <GridList cellHeight={160} className={classes.gridList} cols={2}>
                  {
                    formItemsCont
                  }
                  </GridList>
                )
              })
            }
          </Grid>
        </Grid>
        <Grid item lg={12} sm={12}>
          <form>
            <FormControl fullWidth className={classes.margin} variant="outlined">
              <Autocomplete
                name={title}
                options={items}
                onChange={(e, value) => {
                  formOnChange({ name: title, value: value})
                }}
                getOptionLabel={(option) => 'name' in option ? option.name : option.first_name + " " + option.last_name}
                defaultValue={items[0]}
                renderInput={(params) => <TextField {...params} label={title} variant="outlined" />}
              />
              <FormHelperText name={title}>{`Select your ${title}`}</FormHelperText>
            </FormControl>
          </form>
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
  title: T.string,
  showTitle: T.bool,
  id: T.number
}

export default withStyles(styles)(ItemFormAdd);