import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core';
import { 
  Grid,
  Button,
  Hidden
} from '@material-ui/core';
import NumberFormat from 'react-number-format';

import { noImageUrl } from 'config'; 
import { deleteItem, getItems, getItemByFkId } from 'src/api';
import Icons from '@/common/Icons';
import Snackbar from '@/common/Snackbar';
import { ADMIN_SECTIONS } from '@/constants/admin';

const styles = (theme) => ({
  root: {
    padding: 10,
  },
  itemTitle: {
    textTransform: 'capitalize',
  },
  item: {
    borderTop: '1px solid rgba(0,0,0, .09)',
    padding: '20px 0px',
  },
  icon: {
    width: 80,
    height: 80,
    fill: '#000',
  },
  deleteIcon: {
    fill: '#000',
    width: 30,
    height: 30,
  },
  mainImage: {
    width: 150,
  },
  importBtn: {
    width: '15%',
    color: 'white',
    '& svg': {
      fill: 'white'
    },
    [theme.breakpoints.down('sm')]: {
      width: '45%',
    }
  },
  addBtn: {
    width: '15%',
    color: 'white',
    '& svg': {
      fill: 'white'
    },
    [theme.breakpoints.down('sm')]: {
      width: '45%',
    }
  },
  addIconBtn: {
    width: 37,
    height: 37,
    fill: '#000',
  },
  importIconBtn: {
    width: 37,
    height: 37,
    fill: '#000',
  },
  buttonItemSub: {
    display: 'flex',
    margin: '20px 0px',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-evenly',
    }
  }
});

const ItemForm = ({classes, adminSection, userSection,  fields, id, showTitle = true}) => {
  const [items, setItems] = useState(null);
  const [section, setSection] = useState({});
  const [itemLink, setItemLink] = useState({})
  const [showData, setShowData] = useState(false);
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });
  const PRODUCTS_VENDOR = 'productsvendor';

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
      case PRODUCTS_VENDOR:
        return (
          <Button href={`add`} className={`AppBarBackColor ${classes.addBtn}`}>
              <Icons name="add" classes={{icon: classes.addIconBtn}}/>&nbsp;
              Add {section.names}
          </Button>          
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

  const loadImportBtn = () => {
    switch(section.key) {
      case ADMIN_SECTIONS.product.key:
        return (
          <Button href={`products/import`} className={`AppBarBackColor ${classes.importBtn}`}>
            <Icons name="import" classes={{icon: classes.importIconBtn}}/>&nbsp;
            <a>Import {section.names}</a>
          </Button>
        )
      case PRODUCTS_VENDOR:
        return (
          <Button href={`import`} className={`AppBarBackColor ${classes.importBtn}`}>
            <Icons name="import" classes={{icon: classes.importIconBtn}}/>&nbsp;
            <a>Import {section.names}</a>
          </Button>
        )
    }
  }

  const loadItems = async() => {
    let sect = null;
    let getItemResult = null;
  
    if (userSection) {
      sect = userSection;
      await setSection(userSection);
    } else if (adminSection) {
      sect = adminSection;
      await setSection(adminSection);
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
            url: `${sect.url}`,
            as: `${sect.url}`,
          })
        }
        return (
          <Grid item key={index} lg={12} xs={12} className={classes.item}>
            <Grid container>
              <Grid item lg={1} xs={12}>
               {index + 1}
              </Grid>
              {
                setChildTitle(item)
              }
              <Grid item lg={3} xs={1}>
                <Button onClick={()=> { delItem(item.id) }}>
                  <Icons name="delete" classes={{icon: classes.deleteIcon}} />
                </Button>
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
        
        const imageFields = ['img', 'productImages'];

        let value = obj ? obj[field] : null;

        let main_image = field;

        switch(field){
          case 'icon':
            return (
              <Grid key={index}  item lg={3} xs={12}>
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
              let src = value ? `${process.env.IMAGE_URL}/${section.url}/${value}` : noImageUrl.img;
              main_image = <img className={classes.mainImage} src={src} />
            } else {
              main_image = null;
            }
            return (
              <Grid key={index} item lg={4} xs={12}>
                { 
                  main_image && main_image
                }
              </Grid>
            )
          case 'productImages':
            if (imageFields.indexOf(field) !== -1 && obj) {
              let src = value && value.length > 0 ? `${process.env.IMAGE_URL}/${value[0].img_url}` : noImageUrl.img;
              main_image = <img className={`img-fluid ${classes.mainImage}`} src={src} />
            } else {
              main_image = null;
            }
            return (
              <Grid key={index} item lg={2} xs={12}>
                { 
                   main_image && main_image
                }
              </Grid>
            )
          case 'first_name':
            return (
              <Grid key={index} item lg={2} xs={12}>
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
              <Grid key={index} item lg={2} xs={12}>
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
          case 'status':
            return (
              <Grid key={index} item lg={2} xs={12}>
                { 
                  value ? value: field
                }
              </Grid>
            )
          case 'address':
            return (
              <Grid key={index} item lg={2} xs={12}>
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
          case 'amount':
            return (
              <Grid key={index} item lg={2} xs={12}>
                { 
                  value ?
                  (
                    <NumberFormat value={value} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                  ) : field
                }
              </Grid>
            )
          default:
            return (
              <Grid item key={index} lg={2} xs={12}>
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
        <Grid item lg={12} xs={12}>
          <Grid container>
              <Grid item lg={12} xs={12} className={classes.buttonItemSub}>
                {
                  loadAddBtn()
                }
                &nbsp;
                { 
                  loadImportBtn() 
                }
              </Grid>
          </Grid>
        </Grid>
        <Grid item lg={12} xs={12}>
          <Hidden xsDown>
            <Grid container className={classes.itemTitle}>
              <Grid item lg={1} xs={12}>&nbsp;</Grid>
              {
                setChildTitle()
              }
              <Grid item lg={3} xs={12}>
                action
              </Grid>
            </Grid>
          </Hidden>
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

ItemForm.protoTypes = {
  classes: T.object,
  adminSection: T.object,
  userSection: T.object,
  fields: T.array,
  showTitle: T.bool,
  id: T.number
}

export default withStyles(styles)(ItemForm);