import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  Link,
  Button
} from '@material-ui/core';
import moment from 'moment'

import { ADMIN_SECTIONS } from 'src/constants/admin';
import ItemForm from 'src/components/common/Form/ItemForm';
import AdminLayoutTemplate from 'src/components/common/Layout/AdminLayoutTemplate';
import { getImageBoxes, deleteImageBox } from 'src/api/imageBoxes';
import Snackbar from 'src/components/common/Snackbar';

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
  const [imageBoxes, setImageBoxes] = useState([]);
  const [showData, setShowData] = useState(false);
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });
  
  const loadImageBoxes = async() => {
    const gImageBox = await getImageBoxes();
    setImageBoxes(gImageBox);
    setShowData(true);
  };

  const delItem = async(id) => {
    deleteImageBox(id).then((data) => {
      setSnack({
        severity: 'success',
        open: true,
        text: `Image Box Deleted`,
      })
      loadImageBoxes()
    }).catch((err) => {
      setSnack({
        severity: 'error',
        open: true,
        text: `ERROR: Image Box cannot be delete`,
      })
    })
  }

  useEffect(() => {
    loadImageBoxes();
  }, []);

  return (
    <AdminLayoutTemplate>
      <Grid container className={classes.headerContainer}>
        <Grid item className={classes.headerTitle}>
          <h3>Image Boxes</h3>
        </Grid>
        <Grid item className={classes.headerButton}>
          <Button href="/admin/image-boxes/add">
            Add Image Box
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
                  Images
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
              imageBoxes.map((imageBox, index) => {
                return (
                  <Grid key={index} item lg={12} xs={12} className={classes.mainItems}>
                    <Grid container className={classes.itemContainer}>
                      <Grid item lg={1} className={classes.itemIndex}>
                        {
                          index + 1
                        }
                      </Grid>
                      <Grid item lg={3} className={classes.itemName}>
                        <a href={`image-boxes/${imageBox.id}`}>
                        {
                          imageBox.name
                        }
                        </a>
                      </Grid>
                      <Grid item lg={1} className={classes.itemLength}>
                        {
                          imageBox.productImages && imageBox.productImages.length ? imageBox.productImages.length : 0
                        }
                      </Grid>
                      <Grid item lg={2} className={classes.itemType}>
                        {
                          imageBox.imageBoxImageBoxType.name
                        }
                      </Grid>
                      <Grid item lg={2} className={classes.itemStatus}>
                        {
                          imageBox.imageBoxStatus.name
                        }
                      </Grid>
                      <Grid item lg={1} className={classes.itemDate}>
                        {
                          moment(imageBox.createdAt).format('YYYY-MM-DD')
                        }
                      </Grid>
                      <Grid item lg={2} className={classes.itemAction}>
                        <Button className={`smallMainButton`} onClick={() => delItem(imageBox.id)}>
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