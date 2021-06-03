import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  Hidden,
  Button,
} from '@material-ui/core';
import moment from 'moment';

import AdminLayoutTemplate from '../../../components/common/Layout/AdminLayoutTemplate';
import Snackbar from '../../../components/common/Snackbar';
import ColorBlock from '../../../components/common/ColorBlock';
import { deleteColorById, getColors } from '../../../api/colors'
import HeaderSub from '../../../components/common/HeaderSub';
import Icons from '../../../components/common/Icons';

const styles = (theme) => ({
  noData: {
    color: 'red',
    fontSize: '1.5em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 0px',
  },
  icon: {
    width: 25,
    height: 25,
    fill: 'black'
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
  itemColumnMobileHide: {
    textAlign: 'center',
    padding: 5,
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block'
    }
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
  const [colors, setColors] = useState([]);
  const [showData, setShowData] = useState(false);
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

  const loadColors = async() => {
    const gColors = await getColors();
    if (gColors) {
      setColors(gColors);
      setShowData(true);
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
      <HeaderSub name="color" />
      {
        showData ? (
          <Grid container className={classes.mainContainer}>
            <Hidden smDown>
            <Grid item lg={12} xs={12} className={classes.mainHeader}>
              <Grid container className={classes.itemContainer}>
                <Grid item lg={1} className={classes.itemIndex}></Grid>
                <Grid item lg={3} className={classes.itemColumn}>
                  Name
                </Grid>
                <Grid item lg={2} className={classes.itemColumn}>
                  Color
                </Grid>
                <Grid item lg={2} className={classes.itemColumn}>
                  Status
                </Grid>
                <Grid item lg={1} className={classes.itemColumn}>
                  Date Created
                </Grid>
                <Grid item lg={3} className={classes.itemAction}>
                  Action
                </Grid>
              </Grid>
            </Grid>
            </Hidden>
            {
              colors.map((item, index) => {
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
                      <Grid item lg={3} xs={5} className={classes.itemColumn}>
                        <a href={`colors/${item.id}`}>
                        {
                          item.name
                        }
                        </a>
                      </Grid>
                      <Grid item lg={2} xs={5} className={classes.itemColumn}>
                        <ColorBlock color={item.color} />
                      </Grid>
                      <Grid item lg={2} xs={2} className={classes.itemColumnMobileHide}>
                        <Icons name="delete" classes={{icon: `${classes.icon}`}}/>
                      </Grid>
                      <Hidden xsDown>
                        <Grid item lg={2} xs={6} className={classes.itemColumn}>
                          {
                            item.colorStatus.name
                          }
                        </Grid>
                        <Grid item lg={1} xs={6} className={classes.itemColumn}>
                          {
                            moment(item.createdAt).format('YYYY-MM-DD')
                          }
                        </Grid>
                        <Grid item lg={3} className={classes.itemAction}>
                          <Button className={`smallMainButton ${classes.actionBtn}`} href={`/admin/colors/${item.id}`}>
                            Edit
                          </Button>
                          <Button className={`smallMainButton ${classes.actionBtn}`} onClick={() => delItem(item.id)}>
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