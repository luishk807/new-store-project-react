import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';

import { 
  withStyles,
  Grid,
  Hidden,
  Button,
} from '@material-ui/core';
import moment from 'moment';

import { LIMIT } from 'config';
import Pagination from '@/common/Pagination';
import Snackbar from '@/common/Snackbar';
import { deleteUserById, getAllUsersWithFilter } from '@/api/user';
import AdminLayoutTemplate from '@/common/Layout/AdminLayoutTemplate';
import HeaderSub from '@/common/HeaderSub';
import DialogModal from '@/common/DialogModal';
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
  const [users, setUsers] = useState([]);
  const [showData, setShowData] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(false)
  const [totalCounts, setTotalCounts] = useState(0)
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });
  
  const [filterList, setFilterList] = useState({
    sortBy: null,
    page: 1,
    limit: LIMIT,
  });
  
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
  const loadUsers = async(page) => {
    const sendData = {
      page: filterList.page,
      limit: filterList.limit,
      sortBy: filterList.sortBy,
    };
    const gUsers = await getAllUsersWithFilter(sendData);

    if (gUsers) {
      setUsers('rows' in gUsers ? gUsers.rows : gUsers.items);
      setTotalCounts(gUsers?.count)
    } else {
      setSnack({
        severity: 'error',
        open: true,
        text: `Users Not Found`,
      })
    }
  };

  const handleActionMenu = (e) => {
    if (typeof e === "object") {
      setDialogContent({
        ...dialogContent,
        open: true,
        title: `Deleting ${e.first_name} ${e.last_name}`,
        value: e
      })
    } else {
      router.push(e)
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
  
  const delItem = async(id) => {
    deleteUserById(id).then((data) => {
      setSnack({
        severity: 'success',
        open: true,
        text: `User Deleted`,
      })
      loadUsers()
    }).catch((err) => {
      setSnack({
        severity: 'error',
        open: true,
        text: `ERROR: User cannot be delete`,
      })
    })
  }

  const handlePaginationChange = (value) => {
    setFilterList({
      ...filterList,
      page: value
    })
    setShowData(false)
  }
  
  useEffect(() => {
    setForceUpdate(!forceUpdate)
    if (users && users.length) {
      setShowData(true);
    } else {
      setShowData(false);
    }
  }, [users]);

  const loadStatus = async() => {
    console.log("got in status")
  }

  useEffect(() => {
    loadUsers(filterList.page);
  }, [filterList.page]);

  return (
    <AdminLayoutTemplate>
      <HeaderSub name="user" />
      <Pagination 
        onPageClick={handlePaginationChange}
        onTotalChange={loadStatus}
        showData={showData}
        total={totalCounts}
        refresh={forceUpdate}
      >
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
                  Role
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
              users.map((item, index) => {
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
                        <a href={`users/${item.id}`}>
                        {
                          `${item.first_name} ${item.last_name}`
                        }
                        </a>
                      </Grid>
                      <Grid item lg={2} xs={5} className={classes.itemColumn}>
                          {
                            item.userRoles.name
                          }
                      </Grid>
                      <Grid item lg={2} xs={2} className={classes.itemColumnMobileHide}>
                        <Icons name="delete" classes={{icon: `${classes.icon}`}}/>
                      </Grid>
                      <Hidden xsDown>
                        <Grid item lg={2} xs={6} className={classes.itemColumn}>
                          {
                            item.useStatus.name
                          }
                        </Grid>
                        <Grid item lg={1} xs={6} className={classes.itemColumn}>
                          {
                            moment(item.createdAt).format('YYYY-MM-DD')
                          }
                        </Grid>
                        <Grid item lg={3} className={classes.itemAction}>
                          <Button className={`smallMainButton ${classes.actionBtn}`} href={`/admin/users/${item.id}`}>
                            Edit
                          </Button>
                          <Button className={`smallMainButton ${classes.actionBtn}`} href={`/admin/user-addresses/${item.id}`}>
                            Address
                          </Button>
                          <Button className={`smallMainButton ${classes.actionBtn}`} onClick={() => handleActionMenu(item)}>
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
              No users found
            </Grid>
          </Grid>
        )
      }
      </Pagination>
      <Snackbar open={snack.open} severity={snack.severity} onClose={() => setSnack({...snack, open: false })} content={snack.text} />
      <DialogModal open={dialogContent.open} onClick={handleDialogClick} title={dialogContent.title} content={dialogContent.content} actionLabels={dialogContent.actionLabels} />
    </AdminLayoutTemplate>
  );
}

Index.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Index);