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
import Snackbar from '@/common/Snackbar';
import { deleteUserAddressById, getAllUserAddressesByUser } from '@/api/userAddresses';
import { getUsersAdminById } from '@/api/user';
import HeaderSub from '@/common/HeaderSub';
import Icons from '@/common/Icons';

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
  const [addresses, setAddresses] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [userId, setUserId] = useState(null);
  const [showData, setShowData] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

  const router = useRouter();

  const loadUserAddresses = async() => {
    const id = router.query.uid;
    const [gAddresses, userInfo] = await Promise.all([
      getAllUserAddressesByUser(id),
      getUsersAdminById(id)
    ])
    if (gAddresses) {
      setAddresses(gAddresses);
      setShowData(true);
    }
    if (userInfo) {
      setUserInfo(userInfo);
      setUserId(userInfo?.id);
      setShowUser(true)
    }
  };

  const delItem = async(id) => {
    deleteUserAddressById(id).then((data) => {
      setSnack({
        severity: 'success',
        open: true,
        text: `Address Deleted`,
      })
      loadUserAddresses()
    }).catch((err) => {
      setSnack({
        severity: 'error',
        open: true,
        text: `ERROR: Address cannot be delete`,
      })
    })
  }

  useEffect(() => {
    loadUserAddresses()
  }, []);

  return (
    <AdminLayoutTemplate>
      {
        showUser && (
          <HeaderSub parent={userInfo} name="user-addresses" />
        )
      }
      
      {
        showData ? (
          <Grid container className={classes.mainContainer}>
            <Hidden smDown>
            <Grid item lg={12} xs={12} className={classes.mainHeader}>
              <Grid container className={classes.itemContainer}>
                <Grid item lg={1} className={classes.itemIndex}></Grid>
                <Grid item lg={3} className={classes.itemColumn}>
                  Address
                </Grid>
                <Grid item lg={2} className={classes.itemColumn}>
                  District
                </Grid>
                <Grid item lg={2} className={classes.itemColumn}>
                  Province
                </Grid>
                <Grid item lg={2} className={classes.itemColumn}>
                  Created
                </Grid>
                <Grid item lg={2} className={classes.itemAction}>
                  Action
                </Grid>
              </Grid>
            </Grid>
            </Hidden>
            {
              addresses.map((item, index) => {
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
                      <Grid item lg={3} xs={10} className={classes.itemColumn}>
                        <a href={`edit/${item.id}/${userId}`}>
                        {
                          item.address
                        }
                        </a>
                      </Grid>
                      <Grid item lg={2} xs={2} className={classes.itemColumnMobileHide}>
                        <Icons name="delete" classes={{icon: `${classes.icon}`}}/>
                      </Grid>
                      <Hidden xsDown>
                        <Grid item lg={2} xs={6} className={classes.itemColumn}>
                          {
                            item.addressDistrict?.name
                          }
                        </Grid>
                        <Grid item lg={2} xs={6} className={classes.itemColumn}>
                          {
                            item.addressProvince?.name
                          }
                        </Grid>
                        <Grid item lg={2} xs={6} className={classes.itemColumn}>
                          {
                            moment(item.createdAt).format('YYYY-MM-DD')
                          }
                        </Grid>
                        <Grid item lg={2} className={classes.itemAction}>
                          <Button className={`smallMainButton ${classes.actionBtn}`} href={`/admin/user-addresses/edit/${item.id}/${userId}`}>
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
              No addresses found
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