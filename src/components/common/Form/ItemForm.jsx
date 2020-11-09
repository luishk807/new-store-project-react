import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core';
import { 
  Grid,
  Button,
} from '@material-ui/core';

import { deleteItem, getItems, getItemByFkId } from '../../../api';
import Icons from '../../../components/common/Icons';
import Snackbar from '../../../components/common/Snackbar';

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

const Index = ({classes, adminSection, userSection,  fields, id, showTitle = true}) => {
  const [items, setItems] = useState(null);
  const [section, setSection] = useState({});
  const [itemLink, setItemLink] = useState({})
  const [showData, setShowData] = useState(false);
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

  const delItem = async(id) => {
    deleteItem(section.url, id).then((data) => {
      setSnack({
        severity: 'success',
        open: true,
        text: `${section.name} Deleted`,
      })
      loadItems()
    }).catch((err) => {
      setSnack({
        severity: 'error',
        open: true,
        text: `ERROR: ${section.name} cannot be delete`,
      })
    })
  }

  const loadAddBtn = () => {
    switch(section.key) {
      case "productsvendor":
        return (
          <Link href={`add`}>
            <a>Add {section.names}</a>
          </Link>
        )
      break;
      default: 
        return id ? (
          <Link href={`add/${id}`}>
            <a>Add {section.names}</a>
          </Link>
          ) : (
            <Link href={`${section.url}/add`}>
              <a>Add {section.names}</a>
            </Link>
          )
    }
  }

  const loadItems = async() => {
    let sect = null;
    let getItemResult = null;
  
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
      switch(sect.key) {
        case 'address':
        case 'productsvendor':
          getItemResult = await getItemByFkId(sect.url, sect.key, id);
        break;
        default:
          getItemResult = await getItems(sect.url);
      }

      const itemHtml = getItemResult.map((item, index) => {
        if (sect.key === "productsvendor") {
          setItemLink({
            url: "/account/vendor",
            as: "/account/vendor",
          })
        } else {
          setItemLink({
            url: `${sect.url}/`,
            as: `${sect.url}/`,
          })
        }
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
      setShowData(true);
      setItems(itemHtml);
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
        
        const imageFields = ["img","productImages"];

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
              let src = value ? `${process.env.IMAGE_URL}/${section.url}/${value}` : `/images/no-image.jpg`;
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
            return (
              <Grid key={index} item lg={2} sm={12}>
                { 
                  value ?
                  (
                    <Link href={`${itemLink.url}/${obj.id}`}>
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
                    <Link href={`${itemLink.url}/${obj.id}`}>
                      <a>{ `${value}`}</a>
                    </Link>
                  ) : field
                }
              </Grid>
            )
          case 'address':
            return (
              <Grid key={index} item lg={2} sm={12}>
                { 
                  value ?
                  (
                    <Link href={`edit/${obj.id}`}>
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
          <Grid container>
              <Grid item lg={12} xs={12}>
                  [
                    {
                      loadAddBtn()
                    }
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
    </>
  );
}

Index.protoTypes = {
  classes: T.object,
  adminSection: T.object,
  userSection: T.object,
  fields: T.array,
  showTitle: T.bool,
  id: T.number
}

export default withStyles(styles)(Index);