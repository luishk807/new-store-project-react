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

import AdminLayoutTemplate from '@/common/Layout/AdminLayoutTemplate';
import { deleteColorById, getColorsByProductId } from '@/api/productColors';
import Snackbar from '@/common/Snackbar';
import ColorBlock from '@/common/ColorBlock';
import HeaderSub from '@/components/product/HeaderSub';

const styles = (theme) => ({
  root: {
    padding: 10,
  },
  icon: {
    width: 30,
    height: 30,
    fill: 'black'
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
  },
  colorBlock: {
    width: '10%',
    height: 20,
    background: 'red',
    border: '2px solid black',
    margin: '0px auto',
  }
});

const Index = ({classes}) => {
  const router = useRouter();
  const [colors, setColors] = useState([]);
  const [product, setProduct] = useState(null);
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

  const loadColors = async() => {
    const pid = router.query.id;
    setProduct(pid);
    if (pid) {
      const gColors = await getColorsByProductId(pid);
      setColors(gColors);
    }
  };

  const delItem = async(id) => {
    deleteColorById(id).then((data) => {
      setSnack({
        severity: 'success',
        open: true,
        text: `Color Deleted`,
      })
      loadColors()
    }).catch((err) => {
      setSnack({
        severity: 'error',
        open: true,
        text: `ERROR: Color cannot be delete`,
      })
    })
  }

  useEffect(() => {
    loadColors()
  }, []);

  return (
    <AdminLayoutTemplate>
      <HeaderSub id={product} name="colors" />
      {
        colors.length ? (
          <Grid container className={classes.mainContainer}>
            <Hidden smDown>
            <Grid item lg={12} xs={12} className={classes.mainHeader}>
              <Grid container className={classes.itemContainer}>
                <Grid item lg={1} className={classes.itemIndex}></Grid>
                <Grid item lg={4} className={classes.itemColumn}>
                  Color
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
              colors.map((color, index) => {
                return (
                  <Grid key={index} item lg={12} xs={12} className={classes.mainItems}>
                    <Grid container className={classes.itemContainer}>
                      <Grid item lg={1} xs={2} className={classes.itemIndex}>
                        {
                          index + 1
                        }
                      </Grid>
                      <Grid item lg={4} xs={6} className={classes.itemColumn}>
                        <ColorBlock classes={{colorBlock: classes.colorBlock}} color={color.color} url={`/admin/products/colors/edit/${color.id}`} />
                      </Grid>
                      <Grid item lg={3} xs={6} className={classes.itemColumn}>
                        {
                          color.colorStatus.name
                        }
                      </Grid>
                      <Grid item lg={2} xs={6} className={classes.itemColumn}>
                        {
                          moment(color.createdAt).format('YYYY-MM-DD')
                        }
                      </Grid>
                      <Hidden smDown>
                      <Grid item lg={2} className={classes.itemAction}>
                        <Button className={`smallMainButton ${classes.actionBtn}`} href={`/admin/products/colors/edit/${color.id}`}>
                          Edit
                        </Button>
                        <Button className={`smallMainButton ${classes.actionBtn}`} onClick={() => delItem(color.id)}>
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
              No colors found
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