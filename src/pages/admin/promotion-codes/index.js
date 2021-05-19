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
import { deletePromotionCodeById, getActivePromotionCodes } from '../../../api/promotionCodes'
import HeaderSub from '../../../components/common/HeaderSub';

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
  const [promotionCodes, setPromotionCodes] = useState([]);
  const [showData, setShowData] = useState(false);
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

  const loadItems = async() => {
    const items = await getActivePromotionCodes();
    if (items && items.count) {
      setPromotionCodes(items.rows);
    }
  };

  const delItem = async(id) => {
    deletePromotionCodeById(id).then((data) => {
      setSnack({
        severity: 'success',
        open: true,
        text: `Promotion Code Deleted`,
      })
      loadItems()
    }).catch((err) => {
      setSnack({
        severity: 'error',
        open: true,
        text: `ERROR: Promotion Code cannot be delete`,
      })
    })
  }

  useEffect(() => {
    if (promotionCodes && promotionCodes.length) {
      setShowData(true);
    }
  }, [promotionCodes]);

  useEffect(() => {
    loadItems()
  }, []);

  return (
    <AdminLayoutTemplate>
      <HeaderSub name="promotion-code" />
      {
        showData ? (
          <Grid container className={classes.mainContainer}>
            <Hidden smDown>
            <Grid item lg={12} xs={12} className={classes.mainHeader}>
              <Grid container className={classes.itemContainer}>
                <Grid item lg={1} className={classes.itemIndex}></Grid>
                <Grid item lg={3} className={classes.itemColumn}>
                  Code
                </Grid>
                <Grid item lg={2} className={classes.itemColumn}>
                  Name
                </Grid>
                <Grid item lg={1} className={classes.itemColumn}>
                  Percetage
                </Grid>
                <Grid item lg={1} className={classes.itemColumn}>
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
              promotionCodes.map((item, index) => {
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
                        <a href={`promotion-codes/${item.id}`}>
                        {
                          item.promoCode
                        }
                        </a>
                      </Grid>
                      <Grid item lg={2} xs={5} className={classes.itemColumn}>
                        {
                          item.name
                        }
                      </Grid>
                      <Grid item lg={1} xs={5} className={classes.itemColumn}>
                        {`${item.percentage}%`}
                      </Grid>
                      <Hidden xsDown>
                        <Grid item lg={1} xs={6} className={classes.itemColumn}>
                          {
                            item.promotionCodeStatus.name
                          }
                        </Grid>
                        <Grid item lg={1} xs={6} className={classes.itemColumn}>
                          {
                            moment(item.createdAt).format('YYYY-MM-DD')
                          }
                        </Grid>
                        <Grid item lg={3} className={classes.itemAction}>
                          <Button className={`smallMainButton ${classes.actionBtn}`} href={`/admin/promotion-codes/${item.id}`}>
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
              No promotional code found
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