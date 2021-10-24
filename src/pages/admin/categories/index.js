import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  Button,
  Hidden,
} from '@material-ui/core';

import AdminLayoutTemplate from '@/components/common/Layout/AdminLayoutTemplate';
import HeaderSub from '@/components/common/HeaderSub';
import { deleteCategoryById, getAllCategories, setPriority } from '@/api/categories';
import Snackbar from '@/components/common/Snackbar';
import Icons from '@/components/common/Icons';
import DialogModal from '@/components/common/DialogModal';
import ProgressBar from '@/src/components/common/ProgressBar';

const styles = (theme) => ({
  root: {
    padding: 10,
  },
  icon: {
    width: 70,
    height: 70,
    fill: 'black'
  },
  actionBtn: {
    margin: 2,
  },
  mainContainer: {
    padding: 5,
  },
  headerTitle: {
    padding: 20
  },
  headerButton: {
    padding: 20
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  mainHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  mainItems: {
    textAlign: 'center',
    borderTop: '1px solid rgba(0,0,0,.08)',
    '&:last-child': {
      borderBottom: '1px solid rgba(0,0,0,.08)',
    }
  },
  itemContainer: {
    textAlign: 'center',
    alignCenter: 'center'
  },
  itemIndex: {
    textAlign: 'left',
    padding: 5,
  },
  itemName: {
    textAlign: 'center',
    padding: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemLength: {
    textAlign: 'center',
    padding: 5,
  },
  itemType: {
    textAlign: 'center',
    padding: 5,
  },
  itemStatus: {
    textAlign: 'center',
    padding: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemAction: {
    textAlign: 'right',
    padding: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  priority: {
    fontWeight: 'bold',
    color: 'red'
  },
  itemColumnMobileHide: {
    textAlign: 'center',
    padding: 5,
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block'
    }
  },
});

const Index = ({classes}) => {
  const [categories, setCategories] = useState(null);
  const [showData, setShowData] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    open: false,
    value: null,
    title: "Deleting Item",
    content: "Are you sure, you want to delete this item?",
    actionLabels: {
      true: "Yes",
      false: "No"
    }
  })
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

  const loadOrders = async() => {
    const gCategories = await getAllCategories();
    if (gCategories) {
      setCategories(gCategories);
      setShowData(true);
    } else {
      setShowData(false);
    }
  };

  const delItem = async(id) => {
    deleteCategoryById(id).then((data) => {
      setSnack({
        severity: 'success',
        open: true,
        text: `Category Deleted`,
      })
      loadOrders()
    }).catch((err) => {
      setSnack({
        severity: 'error',
        open: true,
        text: `ERROR: Category cannot be delete`,
      })
    })
  }

  const handleActionMenu = (e) => {
    setDialogContent({
      ...dialogContent,
      open: true,
      title: `Deleting Category ${e.name}`,
      value: e
    })
  }

  const handlePriority = async(e) => {
     const resp = await setPriority(e);
     if (resp.data.status) {
       setSnack({
        severity: 'success',
        open: true,
        text: resp.data.message,
      })
      setShowData(false);
      loadOrders()
     } else {
      setSnack({
        severity: 'error',
        open: true,
        text: resp.data.message,
      })
     }
  }

  const handleDialogClick = (e) => {
    setDialogContent({
      ...dialogContent,
      open: false
    })
    if (e) {
      delItem(dialogContent.value.id)
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <AdminLayoutTemplate>
      <HeaderSub name="category" />
      {
        showData ? (
          <Grid container className={classes.mainContainer}>
            <Hidden smDown>
              <Grid item lg={12} xs={12} className={classes.mainHeader}>
                <Grid container className={classes.itemContainer}>
                  <Grid item lg={1} className={classes.itemIndex}></Grid>
                  <Grid item lg={2} className={classes.itemName}>
                    Icon
                  </Grid>
                  <Grid item lg={3} className={classes.itemName}>
                    Name
                  </Grid>
                  <Grid item lg={2} className={classes.itemStatus}>
                    Status
                  </Grid>
                  <Grid item lg={1}  className={classes.itemName}>
                    Position
                  </Grid>
                  <Grid item lg={3} className={classes.itemAction}>
                    Action
                  </Grid>
                </Grid>
              </Grid>
           </Hidden>
             {
              categories.map((category, index) => {
                return (
                  <Grid key={index} item lg={12} xs={12} className={classes.mainItems}>
                    <Grid container className={classes.itemContainer}>
                      <Hidden xsDown>
                        <Grid item lg={1} xs={2} className={classes.itemIndex}>
                          {
                            index + 1
                          }
                        </Grid>
                      </Hidden>
                      <Grid item lg={2} xs={3} className={classes.itemName}>
                        <Icons name={category.icon} classes={{icon: classes.icon}} />
                      </Grid>
                      <Grid item lg={3} xs={7} className={classes.itemName}>
                        <a href={`categories/${category.id}`}>
                        {
                          category.name
                        }
                        </a>
                      </Grid>
                      <Grid item lg={2} xs={1} className={classes.itemColumnMobileHide}>
                        <Icons name="delete" classes={{icon: `${classes.icon}`}}/>
                      </Grid>
                      <Hidden smDown>
                      <Grid item lg={2} xs={6} className={classes.itemStatus}>
                        {
                          category.categoryStatus.name
                        }
                      </Grid>
                      <Grid item lg={1} xs={6} className={classes.itemName}>
                        {
                          category.priority ? (
                            <span className={classes.priority}>Priority</span>
                          ) : (
                            <Button onClick={() => handlePriority(category.id)} className={`smallMainButton ${classes.actionBtn}`}>Make Priority</Button>
                          )
                        }

                      </Grid>
                      <Grid item lg={3} className={classes.itemAction}>
                        <Button className={`smallMainButton ${classes.actionBtn}`} href={`categories/${category.id}`}>
                          Edit
                        </Button>
                        <Button className={`smallMainButton ${classes.actionBtn}`} onClick={() => handleActionMenu(category)}>
                          Delete
                        </Button>
                      </Grid>
                      </Hidden>
                    </Grid>
                  </Grid>
                )
              })
            }
          </Grid>
        ) : !categories ? <ProgressBar /> : (
          <Grid container className={classes.mainContainer}>
            <Grid item lg={12} xs={12}>
                No Category found
            </Grid>
          </Grid>
        )
      }
      <Snackbar open={snack.open} severity={snack.severity} onClose={() => setSnack({...snack, open: false })} content={snack.text} />
      <DialogModal open={dialogContent.open} onClick={handleDialogClick} title={dialogContent.title} content={dialogContent.content} actionLabels={dialogContent.actionLabels} />
    </AdminLayoutTemplate>
  );
}

Index.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Index);