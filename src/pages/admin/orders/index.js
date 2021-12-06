import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  Hidden,
  Button,
  Checkbox,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import moment from 'moment';
import { LIMIT } from 'config';
import { ORDER_STATUS } from '@/constants/orders';
import AdminLayoutTemplate from '@/common/Layout/AdminLayoutTemplate';
import { deleteOrderById, deleteOrderByOrderNumbers, getAllOrdersWithFilter, saveOrderStatusBulk,  } from 'src/api/orders';
import Snackbar from '@/common/Snackbar';
import { loadMainOptions } from 'src/utils/form';
import Icons from '@/common/Icons';
import DialogModal from '@/common/DialogModal';
import CheckBoxLabel from '@/common/CheckBoxLabel';
import Dropdown from '@/common/dropdown/Simple';
import AdminOrderSearch from '@/common/SearchBar/AdminOrderSearch';

const styles = (theme) => ({
  root: {
    padding: 10,
  },
  icon: {
    width: 20,
    height: 20,
    fill: 'black'
  },
  actionIcon: {
    width: 20,
    height: 20,
    fill: 'rgb(248,190,21)',
  },
  actionIconBlack: {
    width: 20,
    height: 20,
    fill: 'black',
  },
  filterIcon: {
    width: 30,
    height: 30,
    fill: 'black',
    margin: 15
  },
  actionBtn: {
    margin: 2,
    '&:hover svg': {
      fill: 'white',
    }
  },
  mainContainer: {
    padding: 5,
  },
  headerTitle: {
    padding: 20,
    display: 'flex',
    justifyContent: 'start'
  },
  headerAction: {
    padding: 20,
    display: 'flex',
    justifyContent: 'end',
    [theme.breakpoints.down('sm')]: {
      padding: '20px 5px 20px 20px'
    }
  },
  headerButton: {
    padding: 20
  },
  headerContainer: {
    alignItems: 'start',
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
    padding: '0px 20px',
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
  },
  itemActionMobile: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block'
    }
  },
  paginationItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paginationContainer: {
    padding: '20px 0px',
  },
  selectStyle: {
    padding: '8px 5px',
    borderRadius: 5,
  },
  checkBoxSelectContainer: {
    padding: '15px 13px',
    display: 'flex',
    '& button:not(:first-child)': {
      marginLeft: 10,
      padding: '9px 20px !important',
    },
    '& select': {
      marginLeft: 10,
    },
    [theme.breakpoints.down('sm')]: {
      '& button': {
        padding: '10px 0px !important'
      },
      flexDirection: 'column',
      margin: 10,
      padding: 0,
      '& button:not(:first-child)': {
        marginLeft: 0,
        margin: '5px 0px',
      },
      '& select': {
        marginLeft: 0,
        textAlign: 'center'
      },
    }
  },
  checkMarkItem: {
    padding: '20px 0px',
  },
  yellowBackground: {
    backgroundColor: '#D9D902',
  },
  greenBackground: {
    backgroundColor: '#8ADF24',
  },
  blueBackground: {
    backgroundColor: '#0FC6EB',
  },
  showAllCheckbox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
  }
});

const Index = ({classes}) => {
  const [orders, setOrders] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [showData, setShowData] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);
  const [reloadCheck, setReloadCheck] = useState(false);
  const [page, setPage] = useState(1);
  const [paginationHtml, setPaginationHtml] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [selectCheckbox, setSelectCheckbox] = useState(false);
  const [selectedChecks, setSelectedChecks] = useState([])
  const [selectedStatusChange, setSelectedStatusChange] = useState(null);
  const [showCompletedOrders, setShowCompletedOrders] = useState(false)

  const [filterList, setFilterList] = useState({
    sortBy: null,
    searchValue: null,
    searchBy: null
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

  const resetDialog = () => {
    setDialogContent(
      {
        open: false,
        value: null,
        title: "Deleting Item",
        content: "Are you sure, you want to delete this item?",
        actionLabels: {
          true: "Yes",
          false: "No"
        }
      }
    )
  }

  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

  const loadOrders = async() => {
    const gOrders = await getAllOrdersWithFilter({
      page: page
    });
    
    if (gOrders) {
      setOrders('rows' in gOrders ? gOrders.rows : gOrders.items);

      setTotalCount(gOrders.count)
      if (!gOrders.count || !gOrders.rows) {
        setShowEmpty(true);
      }
    }
  };

  const delItem = async(id) => {
    deleteOrderById(id).then((data) => {
      setSnack({
        severity: 'success',
        open: true,
        text: `Order Deleted`,
      })
      loadOrders()
    }).catch((err) => {
      setSnack({
        severity: 'error',
        open: true,
        text: `ERROR: Order cannot be delete`,
      })
    })
  }

  const updateBulkStatus = async(data) => {
    setSelectedStatusChange(null)
    saveOrderStatusBulk(data).then((data) => {
      setSnack({
        severity: 'success',
        open: true,
        text: `Order updated`,
      })
      handleCheckCancel();
      loadOrders()
    }).catch((err) => {
      setSnack({
        severity: 'error',
        open: true,
        text: `ERROR: Order cannot be updated`,
      })
    })
  }

  const deleteBulkIds = async(data) => {
    deleteOrderByOrderNumbers(data).then((data) => {
      setSnack({
        severity: 'success',
        open: true,
        text: `Order deleted`,
      })
      handleCheckCancel();
      loadOrders()
    }).catch((err) => {
      setSnack({
        severity: 'error',
        open: true,
        text: `ERROR: Order cannot be deleted`,
      })
    })
  }

  const handlePaginationChange = (event, value) => {
    setPage(value);
    setShowData(false)
  }

  const loadPagination = () => {
    setPaginationHtml(
      <Grid container className={classes.paginationContainer}>
        <Grid item lg={12} xs={12} className={classes.paginationItem}>
          <Pagination onChange={handlePaginationChange} size="large" showFirstButton showLastButton count={Math.round(totalCount / LIMIT )} page={page} variant="outlined" shape="rounded" />
        </Grid>
      </Grid>
    )
  }
  
  const handleActionMenu = (e) => {
    setDialogContent({
      ...dialogContent,
      open: true,
      title: `Deleting Order No. ${e.order_number}`,
      value: e
    })
  }

  const handleDropDown = async(data) => {
    setFilterList({
      ...filterList,
      sortBy: data.value
    })
    const sendData = {
      page: page,
      sortBy: data.value,
      searchValue: filterList.searchValue,
      searchBy: filterList.searchBy,
      showCompleted: showCompletedOrders,
    };

    const gOrders = await getAllOrdersWithFilter(sendData);
    
    if (gOrders) {
      setOrders('rows' in gOrders ? gOrders.rows : gOrders.items);
      setTotalCount(gOrders.count)
      if (!gOrders.count || !gOrders.rows) {
        setShowEmpty(true);
      }
    } else {
      setSnack({
        severity: 'error',
        open: true,
        text: `Order Not Found`,
      })
    }
  }

  const handleStatusChange = (event) => {
    if (!selectedChecks || (selectedChecks && !selectedChecks.length)) {
      setSnack({
        severity: 'error',
        open: true,
        text: `You need to select an item`,
      })
      return;
    }
      setSelectedStatusChange(event.target.value)
      const order_numbers = selectedChecks.map(item => {
      const order_num = orders.filter(order => Number(order.id) === item)[0]
      return order_num ? order_num.order_number : null;
    }).join(",")
    setDialogContent({
      ...dialogContent,
      open: true,
      title: `Updating to '${event.target.options[event.target.selectedIndex].text}' the following order numbers?\r\n ${order_numbers}`,
      content: "Are you sure, you want to update the items?",
      value: {
        type: 'update_status',
        value: order_numbers
      }
    })
  };

  const onSearchIconClick = async(e) => {
    if (e) {
      setFilterList({
        ...filterList,
        searchBy: e.searchBy,
        searchValue: e.value,
        showCompleted: showCompletedOrders,
      })

      const gOrders = await getAllOrdersWithFilter({
        page: page,
        sortBy: filterList.sortBy,
        searchValue: e.value,
        searchBy: e.searchBy,
        showCompleted: showCompletedOrders,
      });
      if (gOrders) {
        setOrders('rows' in gOrders ? gOrders.rows : gOrders.items);
        setTotalCount(gOrders.count)
        if (!gOrders.count || !gOrders.rows) {
          setShowEmpty(true);
        }
      } else {
        setSnack({
          severity: 'error',
          open: true,
          text: `Order Not Found`,
        })
      }
    }
  }
  const handleDialogClick = (e) => {
    setDialogContent({
      ...dialogContent,
      open: false
    })
    if (e) {
      if (dialogContent.value && dialogContent.value.type) {
        switch(dialogContent.value.type) {
          case 'update_status': {
            updateBulkStatus({
              ids: dialogContent.value.value,
              status: selectedStatusChange
            });
            break;
          }
          case 'delete_items': {
            deleteBulkIds({
              ids: dialogContent.value.value
            });
            break;
          }
        }
      } else {
        delItem(dialogContent.value.id)
      }

    }
    resetDialog();
  }

  const setAllChekboxes = (task) => {
    let checks = [];
    if (task) {
      orders.forEach((item, index) => {
        checks.push(Number(item.id));
      })
    }
    setSelectedChecks(checks)
    setReloadCheck(!reloadCheck);
  }

  const loadStatus = async() => {
    const getBasic = await loadMainOptions();
    if (getBasic?.orderStatus) {
      setStatuses(getBasic.orderStatus);
    }
  }

  const handleCheckSelect = (id) => {
    const currChecks = selectedChecks;
    if (currChecks && currChecks.length) {
      const index = currChecks.indexOf(id);
      if (index !== -1) {
        currChecks.splice(index, 1);
      }  else {
        currChecks.push(id);
      }
    }
    else {
      currChecks.push(id);
    }
    setSelectedChecks(currChecks)
    setReloadCheck(!reloadCheck);
  }

  
  const handleCheckCancel = () => {
    setSelectedChecks([]);
    setSelectCheckbox(false)
  }

  const hadleDeleteSelected = () => {
    if (!selectedChecks || (selectedChecks && !selectedChecks.length)) {
      setSnack({
        severity: 'error',
        open: true,
        text: `You need to select an item`,
      })
      return;
    }

    const order_numbers = selectedChecks.map(item => {
      const order_num = orders.filter(order => Number(order.id) === item)[0]
      return order_num ? order_num.order_number : null;
    }).join(",");

    setDialogContent({
      ...dialogContent,
      open: true,
      title: `Deleting the following order numbers?\r\n ${order_numbers}`,
      content: "Are you sure, you want to delete the items?",
      value: {
        type: 'delete_items',
        value: order_numbers
      }
    })
  }

  const handleShowAllCheckBox = async(e) => {
    const checkValue = !e.target.checked;
    setShowCompletedOrders(checkValue)

    const sendData = {
      page: page,
      sortBy: filterList.sortBy,
      searchValue: filterList.searchValue,
      searchBy: filterList.searchBy,
      showCompleted: checkValue,
    };

    const gOrders = await getAllOrdersWithFilter(sendData);
    
    if (gOrders) {
      setOrders('rows' in gOrders ? gOrders.rows : gOrders.items);
      setTotalCount(gOrders.count)
      if (!gOrders.count || !gOrders.rows) {
        setShowEmpty(true);
      }
    } else {
      setSnack({
        severity: 'error',
        open: true,
        text: `Order Not Found`,
      })
    }

  }

  const updateColorRow = (item) => {
    if (!item || !item.id) {
      return (
        <Grid item lg={1} xs={4} className={`${classes.itemName} ${classes.blueBackground}`}>
        </Grid>
      )
    }
  
    switch(item.id) {
      case '2': {
        return (
        <Grid item lg={1} xs={4} className={`${classes.itemName} ${classes.yellowBackground}`}>
          {
            item.name ? item.name : 'N/A'
          }
        </Grid>
        )
      }
      case '3': {
        return (
        <Grid item lg={1} xs={4} className={`${classes.itemName} ${classes.greenBackground}`}>
          {
            item.name ? item.name : 'N/A'
          }
        </Grid>
        )
      }
      case '9': {
        return (
        <Grid item lg={1} xs={4} className={`${classes.itemName} ${classes.blueBackground}`}>
          {
            item.name ? item.name : 'N/A'
          }
        </Grid>
        )
      }
      default: {
        return (
          <Grid item lg={1} xs={4} className={`${classes.itemName}`}>
            {
              item.name ? item.name : 'N/A'
            }
          </Grid>
        )
      }
    }
  }
  
  useEffect(() => {
    if (orders && orders.length) {
      setShowData(true);
    }
  }, [orders]);

  useEffect(() => {
    loadOrders();
    loadPagination();
  }, [page]);

  useEffect(() => {
    loadPagination();
    loadStatus();
  }, [totalCount]);

  useEffect(() => {    
    setPage(1);
  }, []);

  return (
    <AdminLayoutTemplate>
      <Grid container className={classes.headerContainer}>
        <Grid lg={2} xs={6} md={3} item className={classes.headerTitle}>
          <h3>Orders</h3>
        </Grid>
        <Hidden smUp>
          <Grid lg={2} xs={6} md={2} item className={classes.headerAction}>
            <Dropdown 
                options={ORDER_STATUS} 
                align="right"
                onSelect={handleDropDown} 
                iconType="filter" 
              />
          </Grid>
        </Hidden>
        <Grid lg={6} xs={12} md={5} item className={classes.headerTitle}>
          <AdminOrderSearch onClick={onSearchIconClick} placeholder="Type search" />
        </Grid>
        <Hidden smDown>
          <Grid lg={2} xs={3} md={2} item className={classes.headerAction}>
            <Dropdown 
                options={ORDER_STATUS} 
                align="right"
                onSelect={handleDropDown} 
                iconType="filter" 
              />
          </Grid>
        </Hidden>
      </Grid>
      {
        paginationHtml && !showEmpty && paginationHtml
      }
      {
        selectCheckbox ? (
          <Grid container>
            <Grid item lg={10} xs={12} className={classes.checkBoxSelectContainer}>
              <Button className={`smallSecondButtonDefault`} onClick={() => handleCheckCancel()}>Cancel</Button>
              <Button className={`smallSecondButtonDefault`} onClick={() => setAllChekboxes(true)}>Check All</Button>
              <Button className={`smallSecondButtonDefault`} onClick={() => setAllChekboxes(false)}>Uncheck All</Button>
              <Button className={`smallSecondButtonDefault`} onClick={() => hadleDeleteSelected()}>Delete Selected</Button>
              <select
                onChange={handleStatusChange}
                className={classes.selectStyle}
              >
                <option value="">Select status</option>
                {
                  statuses.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>{item.name}</option>
                    )
                  })
                }
              </select>
            </Grid>
            <Grid item lg={2} xs={12} className={classes.showAllCheckbox}>
              <CheckBoxLabel 
                name="Don't show completed"
                defaultChecked={true}
                onClick={handleShowAllCheckBox}
               />
            </Grid>
          </Grid>
        ) : (
          <Grid container>
            <Grid item lg={10} xs={2}  className={classes.checkMarkItem}>
              <Button onClick={() => setSelectCheckbox(true)}>
                <Icons name="goodMark" classes={{icon: classes.actionIconBlack }}/>
              </Button>
            </Grid>
            <Grid item lg={2} xs={10} className={classes.showAllCheckbox}>
              <CheckBoxLabel 
                name="Don't show completed"
                defaultChecked={true}
                onClick={handleShowAllCheckBox}
               />
            </Grid>
          </Grid>
        )
      }
      {
        showData && (
          <Grid container className={classes.mainContainer}>
            <Hidden smDown>
              <Grid item lg={12} xs={12} className={classes.mainHeader}>
                <Grid container className={classes.itemContainer}>
                  <Grid item lg={1} className={classes.itemIndex}></Grid>
                  <Grid item lg={2} className={classes.itemName}>
                    Order Number
                  </Grid>
                  <Grid item lg={1} className={classes.itemName}>
                    Delivery
                  </Grid>
                  <Grid item lg={1} className={classes.itemLength}>
                    Products
                  </Grid>
                  <Grid item lg={2} className={classes.itemType}>
                    Total
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
            </Hidden>
            {
              orders.map((order, index) => {
                const isSelected = selectedChecks.indexOf(Number(order.id)) === -1 ? false : true;
  
                return (
                  <Grid key={index} item lg={12} xs={12} className={classes.mainItems}>
                    <Grid container className={classes.itemContainer}>
                      <Grid item lg={1} xs={2} className={classes.itemIndex}>
                        {
                          selectCheckbox ? (
                            <Checkbox 
                              onChange={() => handleCheckSelect(Number(order.id))}
                              checked={isSelected}
                            />
                          ) : (index + 1)
                        }
                      </Grid>
                      <Grid item lg={2} xs={7} className={classes.itemName}>
                        <a href={`orders/${order.id}`}>
                        {
                          order.order_number
                        }
                        </a>
                      </Grid>
                      <Grid item xs={3} className={classes.itemActionMobile}>
                        <Button className={classes.actionBtn} onClick={() => handleActionMenu(order)}>
                          <Icons name="delete" classes={{icon: classes.icon}} />
                        </Button>
                      </Grid>
                      <Hidden smDown>
                      {
                        updateColorRow(order.deliveryOrder)
                      }
                      <Grid item lg={1} xs={4} className={classes.itemLength}>
                        {
                          order.orderOrderProduct && order.orderOrderProduct.length ? order.orderOrderProduct.length : 0
                        }
                      </Grid>
                      <Grid item lg={2} xs={4} className={classes.itemType}>
                        {
                          order.grandtotal
                        }
                      </Grid>
                      <Grid item lg={2} xs={6} className={classes.itemStatus}>
                        {
                          order?.orderStatuses?.name
                        }
                      </Grid>
                      <Grid item lg={1} xs={6} className={classes.itemDate}>
                        {
                          moment(order.createdAt).format('YYYY-MM-DD')
                        }
                      </Grid>
                      <Grid item lg={2} className={classes.itemAction}>
                        <Button className={`smallMainButton ${classes.actionBtn}`} href={`orders/${order.id}`}>
                          <Icons name="edit" classes={{icon: classes.actionIcon}}/>
                        </Button>
                        <Button className={`smallMainButton ${classes.actionBtn}`} onClick={() => handleActionMenu(order)}>
                        <Icons name="delete" classes={{icon: classes.actionIcon}}/>
                        </Button>
                      </Grid>
                      </Hidden>
                    </Grid>
                  </Grid>
                )
              })
            }
          </Grid>
        )
      }
      {
        paginationHtml && !showEmpty && paginationHtml
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