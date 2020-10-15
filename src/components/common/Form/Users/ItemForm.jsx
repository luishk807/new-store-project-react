import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core';
import { 
  Grid,
  Button,
} from '@material-ui/core';

import AdminLayoutTemplate from '../../../../components/common/Layout/AdminLayoutTemplate';
import { deleteItem, getItems } from '../../../../api';
import Icons from '../../../../components/common/Icons';
import PrivatePage from '../../../../components/common/Form/Admin/PrivatePage';
import Snackbar from '../../../../components/common/Snackbar';

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
  }
});

const Index = ({classes, adminSection, fields}) => {
  const [items, setItems] = useState(null);
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

  const delItem = async(id) => {
    deleteItem(adminSection.url, id).then((data) => {
      setSnack({
        severity: 'success',
        open: true,
        text: `${adminSection.name} Deleted`,
      })
      loadItems()
    }).catch((err) => {
      setSnack({
        severity: 'error',
        open: true,
        text: `ERROR: ${adminSection.name} cannot be delete`,
      })
    })
  }

  const loadItems = async() => {
    try {
      const getItemResult = await getItems(adminSection.url);
      const itemHtml = getItemResult.map((item, index) => {
  
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
                [
                  <Button onClick={()=> { delItem(item.id) }}>
                    delete
                  </Button>
                ]
              </Grid>
            </Grid>
          </Grid>
        )
      })
      setItems(itemHtml);
    } catch(err) {}
  }
  
  useEffect(() => {
    loadItems();
  }, [])

  const setChildTitle = (obj) => {
    return fields.map((field, index) => {
        if (index > 4) {
           return;
        }
        
        const imageFields = ["img","product_images"];

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
              let src = value ? `${process.env.IMAGE_URL}/${adminSection.url}/${value}` : `/images/no-image.jpg`;
              main_image = <img className={classes.mainImage} src={src} />
            }
            return (
              <Grid key={index} item lg={4} sm={12}>
                { 
                  main_image
                }
              </Grid>
            )
          case 'product_images':
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
            return (
              <Grid key={index} item lg={2} sm={12}>
                { 
                  value ?
                  (
                    <Link href={`${adminSection.url}/[id]`} as={`${adminSection.url}/${obj.id}`}>
                      <a>{ `${value} ${obj.last_name}`}</a>
                    </Link>
                  ) : field
                }
              </Grid>
            )
          case 'name':
            return (
              <Grid key={index} item lg={2} sm={12}>
                { 
                  value ?
                  (
                    <Link href={`${adminSection.url}/[id]`} as={`${adminSection.url}/${obj.id}`}>
                      <a>{ `${value}`}</a>
                    </Link>
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

  return (
    <PrivatePage>
      <AdminLayoutTemplate>
        <Snackbar open={snack.open} severity={snack.severity} onClose={() => setSnack({...snack, open: false })} content={snack.text} />
        <Grid container className={classes.root}>
          <Grid item xs={12} lg={12}>
            <h1>{adminSection.names}</h1>
          </Grid>
          <Grid item lg={12}>
            <Grid container>
                <Grid item lg={12} xs={12}>
                    [
                      <Link href={`${adminSection.url}/add`}>
                        <a>Add {adminSection.names}</a>
                      </Link>
                    ]
                </Grid>
            </Grid>
          </Grid>
          <Grid item lg={12} sm={12}>
            <Grid container>
              <Grid item lg={1} xs={12}>&nbsp;</Grid>
              {
                setChildTitle()
              }
              <Grid item lg={3} xs={12}>
                action
              </Grid>
            </Grid>
            <Grid container>
              {
                items && items
              }
            </Grid>
          </Grid>
        </Grid>
      </AdminLayoutTemplate>
    </PrivatePage>
  );
}

Index.protoTypes = {
  classes: T.object,
  adminSection: T.object,
  fields: T.array,
}

export default withStyles(styles)(Index);