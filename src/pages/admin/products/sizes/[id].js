import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  Hidden,
  Button,
} from '@material-ui/core';
import moment from 'moment';
import { useRouter } from 'next/router';

import AdminLayoutTemplate from 'src/components/common/Layout/AdminLayoutTemplate';
import { deleteSizeById, getSizesByProductId } from 'src/api/sizes';
import Snackbar from 'src/components/common/Snackbar';
import HeaderSub from 'src/components/product/HeaderSub';

const styles = (theme) => ({
  root: {
    padding: 10,
  },
  noData: {
    color: 'red',
    fontSize: '1.5em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 0px',
  },
  actionBtn: {
    margin: 2,
  },
  mainContainer: {
    padding: 5,
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
  itemColumn: {
    textAlign: 'center',
    padding: 5,
  },
  itemAction: {
    textAlign: 'right',
    padding: 5,
  }
});

const Index = ({classes}) => {
  const router = useRouter();
  const [product, setProduct] = useState(null)
  const [sizes, setSizes] = useState(null);
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

  const loadSizes = async() => {
    const pid = router.query.id;
    setProduct(pid);
    if (pid) {
      const gSizes = await getSizesByProductId(pid);
      setSizes(gSizes);
    }
  };

  const delItem = async(id) => {
    deleteSizeById(id).then((data) => {
      setSnack({
        severity: 'success',
        open: true,
        text: `Size Deleted`,
      })
      loadSizes()
    }).catch((err) => {
      setSnack({
        severity: 'error',
        open: true,
        text: `ERROR: Size cannot be delete`,
      })
    })
  }

  useEffect(() => {
    loadSizes();
  }, []);

  return (
    <AdminLayoutTemplate>
      <HeaderSub id={product} name="sizes" />
      {
        sizes ? (
          <Grid container className={classes.mainContainer}>
            <Hidden smDown>
            <Grid item lg={12} xs={12} className={classes.mainHeader}>
              <Grid container className={classes.itemContainer}>
                <Grid item lg={1} className={classes.itemIndex}></Grid>
                <Grid item lg={4} className={classes.itemColumn}>
                  Name
                </Grid>
                <Grid item lg={3} className={classes.itemColumn}>
                  Status
                </Grid>
                <Grid item lg={2} className={classes.itemColumn}>
                  Date Created
                </Grid>
                <Grid item lg={2} className={classes.itemAction}>
                  Action
                </Grid>
              </Grid>
            </Grid>
            </Hidden>
            {
              sizes.map((size, index) => {
                return (
                  <Grid key={index} item lg={12} xs={12} className={classes.mainItems}>
                    <Grid container className={classes.itemContainer}>
                      <Grid item lg={1} xs={2} className={classes.itemIndex}>
                        {
                          index + 1
                        }
                      </Grid>
                      <Grid item lg={4} xs={6} className={classes.itemColumn}>
                        <a href={`/admin/products/sizes/edit/${size.id}`}>
                        {
                          size.name
                        }
                        </a>
                      </Grid>
                      <Grid item lg={3} xs={6} className={classes.itemColumn}>
                        {
                          size.sizeStatus.name
                        }
                      </Grid>
                      <Grid item lg={2} xs={6} className={classes.itemColumn}>
                        {
                          moment(size.createdAt).format('YYYY-MM-DD')
                        }
                      </Grid>
                      <Hidden smDown>
                      <Grid item lg={2} className={classes.itemAction}>
                        <Button className={`smallMainButton ${classes.actionBtn}`} href={`/admin/products/sizes/edit/${size.id}`}>
                          Edit
                        </Button>
                        <Button className={`smallMainButton ${classes.actionBtn}`} onClick={() => delItem(size.id)}>
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
        ) : (
          <Grid container className={classes.mainContainer}>
            <Grid item lg={12} xs={12} className={classes.noData}>
              No sizes found
            </Grid>
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