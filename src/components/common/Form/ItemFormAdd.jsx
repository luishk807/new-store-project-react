import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core';
import { 
  Grid,
  Button,
  Checkbox,
  IconButton,
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
import { useRouter } from 'next/router';

import { addItem, getItems, getItemById, getItemByFkId } from 'src/api';
import { ADMIN_SECTIONS } from '@/constants/admin';
import { handleFormResponse, getImageUrlByType } from '@/utils/form';
import Icons from '@/common/Icons';
import ProductBox from '@/common/ProductBox';
import Typography from '@/common/Typography'
import Snackbar from '@/common/Snackbar';

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
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  formItems: {
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    margin: '20px auto 0px auto',
  },
  gridItemRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  icon: {
    color: 'black',
    width: '30%'
  },
  iconCont: {
    top: 0,
    position: 'absolute',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  gridItemList: {
    position: 'relative',
    padding: 10,
  }
});

const ItemFormAdd = ({
  classes, 
  customUrl, 
  adminSection, 
  userSection, 
  source, 
  title, 
  type,
  id, 
  showTitle = true
}) => {
  const router = useRouter();
  const [items, setItems] = useState(null);
  const [formItems, setFormItems] = useState([]);
  const [section, setSection] = useState({});
  const [formHtmlItems, setFormHtmlItems] = useState(null);
  const [formHtmlInputs, setFormHtmlInputs] = useState({});
  const [showData, setShowData] = useState(false);
  const imgMainUrl = getImageUrlByType(title);
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

  const formOnChange = ({value}) => {
    let currFormItems = formItems;
    if (currFormItems && currFormItems.length) {
      const find = currFormItems.filter(item => item.id == value.id);
      if (find && find.length) {
        return;
      }
    }
    currFormItems.push(value.id);
    setFormItems(currFormItems);
    createHtmlItem();
  }

  const onClickItemDelete = (e) => {
    let items = formItems;
    let id = null;

    items.forEach((item, key) => {
      if (item === e) {
        id = key;
      }
    })

    if (items[id]) {
      items.splice(id,1);
      setFormItems(items);
      createHtmlItem();
    }
  }

  const handleCancel = () => {
    const url =customUrl ? customUrl : `/${section.url}`
    setTimeout(()=>{
      router.push(url);
    }, 1000)
  }

  const handleSubmit = async (e) => {
    if (!formItems.length) {
      setSnack({
        severity: 'error',
        open: true,
        text: `no items`
      })
    } else {
      let sendArray = [];
      Object.keys(formItems).forEach((index) => {
        sendArray.push(Number(formItems[index]))
      })
      
      const confirm = await addItem(section.url, { id: Number(id), items: sendArray.toString()});
      const resp = handleFormResponse(confirm);
      setSnack(resp);
      setTimeout(() => {
        handleCancel() 
      }, 1000)
    }
  }
  
  const loadItems = async() => {
    let sect = null;
    let itemArray = [];
    let getItemResult = null;
    let getParentResult = null;
    let htmlInput = null;
    let parent = ADMIN_SECTIONS[adminSection.parent];

    if (source) {
      sect = source;
      setSection(adminSection);
    } else {
      return;
    }
    
    try {
      getItemResult = await getItems(sect.url);
      getParentResult = await getItemByFkId(adminSection.url, adminSection.parent, id);
      switch(type) {
        case 'image': 
        htmlInput = <h1>image</h1>
        break;
        default: 
          htmlInput = 
            <form>
              <FormControl fullWidth className={classes.margin} variant="outlined">
                <Autocomplete
                  name={title}
                  options={items}
                  onChange={(e, value) => {
                    formOnChange({ name: title, value: value})
                  }}
                  getOptionLabel={(option) => 'name' in option ? option.name : option.first_name + " " + option.last_name}
                  renderInput={(params) => <TextField {...params} label={title} variant="outlined" />}
                />
                <FormHelperText name={title}>{`Select your ${title}`}</FormHelperText>
              </FormControl>
            </form>
      }

      if (getParentResult) {
        setFormHtmlInputs(htmlInput);
        getParentResult.forEach((item) => {
          if (item[title]) {
            itemArray.push(item[title])
          }
        })
        setFormItems(itemArray)
      }
      setItems(getItemResult);
      setShowData(true);
    } catch(err) {
      console.error(err);
    }
  }

  const createHtmlItem = async() => {
    const htmlItem = formItems.map((item, index) => {
      return (
        <Grid item lg={2} key={index} className={classes.gridItemList}>
          <ProductBox  key={index} id={item} onDelete={onClickItemDelete} />
        </Grid>
      )
    })
    setFormHtmlItems(htmlItem);
  }

  useEffect(() => {
    createHtmlItem();
  }, [formItems]);

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
                <Button onClick={() => router.push(customUrl)} className={`mainButton`}>{`Back`}</Button>
              </Grid>
              <Grid item lg={3} xs={12}>
                <Button onClick={handleSubmit} className={`mainButton`}>{`Add to ${section.name}`}</Button>
              </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container className={classes.gridItemRoot}>
            {
              formHtmlItems
            }
          </Grid>
        </Grid>
        <Grid item lg={12} sm={12}>
          {
            formHtmlInputs
          }
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
  type: T.string,
  customUrl: T.string,
  title: T.string,
  showTitle: T.bool,
  id: T.number
}

export default withStyles(styles)(ItemFormAdd);