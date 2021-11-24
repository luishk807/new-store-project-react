import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  Link,
  Button
} from '@material-ui/core';
import moment from 'moment';

import AdminLayoutTemplate from '@/common/Layout/AdminLayoutTemplate';
import { getAllSweetBoxes, deleteSweetBox } from '@/api/sweetbox';
import Snackbar from '@/common/Snackbar';

const styles = (theme) => ({
  root: {
    padding: 10,
  },
  icon: {
    width: 30,
    height: 30,
    fill: 'black'
  },
  actionBtn: {

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
    textAlign: 'center'
  },
  itemIndex: {
    textAlign: 'left',
    padding: 5,
  },
  itemName: {
    textAlign: 'center',
    padding: 5,
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
  },
  itemDate: {
    textAlign: 'center',
    padding: 5,
  },
  itemAction: {
    textAlign: 'right',
    padding: 5,
  }
});

const Index = ({classes}) => {
  const [sweetBoxes, setSweetBoxes] = useState([]);
  const [showData, setShowData] = useState(false);
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

  const loadSweetBoxes = async() => {
    const gSweetBoxes = await getAllSweetBoxes();
    setSweetBoxes(gSweetBoxes);
    setShowData(true);
  };

  const delItem = async(id) => {
    deleteSweetBox(id).then((data) => {
      setSnack({
        severity: 'success',
        open: true,
        text: `SweetBox Deleted`,
      })
      loadSweetBoxes()
    }).catch((err) => {
      setSnack({
        severity: 'error',
        open: true,
        text: `ERROR: SweetBox cannot be delete`,
      })
    })
  }

  useEffect(() => {
    loadSweetBoxes();
  }, []);

  return (
    <AdminLayoutTemplate>
      <Grid container className={classes.headerContainer}>
        <Grid item className={classes.headerTitle}>
          <h3>SweetBoxes</h3>
        </Grid>
        <Grid item className={classes.headerButton}>
          <Button href="/admin/sweet-boxes/add">
            Add SweetBox
          </Button>
        </Grid>
      </Grid>
      {
        showData && (
          <Grid container className={classes.mainContainer}>
            <Grid item lg={12} xs={12} className={classes.mainHeader}>
              <Grid container className={classes.itemContainer}>
                <Grid item lg={1} className={classes.itemIndex}></Grid>
                <Grid item lg={3} className={classes.itemName}>
                  Name
                </Grid>
                <Grid item lg={1} className={classes.itemLength}>
                  Products
                </Grid>
                <Grid item lg={2} className={classes.itemType}>
                  Type
                </Grid>
                <Grid item lg={2} className={classes.itemStatus}>
                  Status
                </Grid>
                <Grid item lg={1} className={classes.itemDate}>
                  Date Created
                </Grid>
                <Grid item lg={2} className={classes.itemAction}>
                  Action
                </Grid>
              </Grid>
            </Grid>
            {
              sweetBoxes.map((sweetbox, index) => {
                return (
                  <Grid key={index} item lg={12} xs={12} className={classes.mainItems}>
                    <Grid container className={classes.itemContainer}>
                      <Grid item lg={1} className={classes.itemIndex}>
                        {
                          index + 1
                        }
                      </Grid>
                      <Grid item lg={3} className={classes.itemName}>
                        <a href={`sweet-boxes/${sweetbox.id}`}>
                        {
                          sweetbox.name
                        }
                        </a>
                      </Grid>
                      <Grid item lg={1} className={classes.itemLength}>
                        <a href={`sweet-boxes/products/${sweetbox.id}`}>
                        {
                          sweetbox.sweetBoxSweetboxProduct && sweetbox.sweetBoxSweetboxProduct.length ? sweetbox.sweetBoxSweetboxProduct.length : 0
                        }
                        </a>
                      </Grid>
                      <Grid item lg={2} className={classes.itemType}>
                        {
                          sweetbox.sweetBoxTypeSweetBox.name
                        }
                      </Grid>
                      <Grid item lg={2} className={classes.itemStatus}>
                        {
                          sweetbox.sweetboxesStatus.name
                        }
                      </Grid>
                      <Grid item lg={1} className={classes.itemDate}>
                        {
                          moment(sweetbox.createdAt).format('YYYY-MM-DD')
                        }
                      </Grid>
                      <Grid item lg={2} className={classes.itemAction}>
                        <Button className={`smallMainButton`} onClick={() => delItem(sweetbox.id)}>
                          Delete
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                )
              })
            }
          </Grid>
        )
      }
      <Snackbar open={snack.open} severity={snack.severity} onClose={() => setSnack({...snack, open: false })} content={snack.text} />
    </AdminLayoutTemplate>
  );
}

Index.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Index);