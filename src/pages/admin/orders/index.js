import React, { useEffect, useState, useMemo } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  Hidden,
  Button,
  Checkbox,
} from '@material-ui/core';
import moment from 'moment';
import { LIMIT } from 'config';
import { ORDER_STATUS } from '@/constants/orders';
import Pagination from '@/common/Pagination';
import AdminLayoutTemplate from '@/common/Layout/AdminLayoutTemplate';
import { deleteOrderById, deleteOrderByOrderNumbers, getAllOrdersWithFilter, saveOrderStatusBulk,  } from 'src/api/orders';
import Snackbar from '@/common/Snackbar';
import Icons from '@/common/Icons';
import Dropdown from '@/common/dropdown/Simple';
// import AdminOrderSearch from '@/common/SearchBar/AdminOrderSearch';
import { useOrderListsContext, useOrderListsUpdate } from '@/context/OrderListsContext';
import AdminSelectItemOptions from '@/src/components/admin/orders/AdminSelectItemOptions';
import AdminOrderSearchBar from '@/src/components/admin/orders/AdminOrderSearchBar';

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
  yellowBackground: {
    backgroundColor: '#D9D902',
  },
  greenBackground: {
    backgroundColor: '#8ADF24',
  },
  blueBackground: {
    backgroundColor: '#0FC6EB',
  },
});

const Index = ({classes}) => {
  const [orders, setOrders] = useState([]);
  const [showData, setShowData] = useState(false);
  const [reloadCheck, setReloadCheck] = useState(false);
  const [selectCheckbox, setSelectCheckbox] = useState(false);
  const [selectedChecks, setSelectedChecks] = useState([])
  const [showCompletedOrders, setShowCompletedOrders] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(false)
  const [totalCounts, setTotalCounts] = useState(0)
  const orderList = useOrderListsContext();

  const [filterList, setFilterList] = useState({
    sortBy: null,
    page: 1,
    limit: LIMIT,
    searchValue: null,
    searchBy: null,
    showCompleted: null
  });

  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

  const loadOrders = async(page) => {
    const sendData = {
      ...filterList,
      page: page
    };

    fetchOrders(sendData);
  };

  const delItem = async(id) => {
    deleteOrderById(id).then((data) => {
      setSnack({
        severity: 'success',
        open: true,
        text: `Order Deleted`,
      })
      const sendData = {
        ...filterList,
        page: 1
      };
      loadOrders(sendData)
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

  const handlePaginationChange = (value) => {
    setFilterList({
      ...filterList,
      page: value
    })
    setShowData(false)
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
      page: filterList.page,
      limit: filterList.limit,
      sortBy: data.value,
      searchValue: filterList.searchValue,
      searchBy: filterList.searchBy,
      showCompleted: showCompletedOrders,
    };

    fetchOrders(sendData)
  }

  const onSearchIconClick = async(e) => {
    if (e) {
      setFilterList({
        ...filterList,
        searchBy: e.searchBy,
        searchValue: e.value,
        showCompleted: showCompletedOrders,
      })

      const dataToSend = {
        page: filterList.page,
        limit: filterList.limit,
        sortBy: filterList.sortBy,
        searchValue: e.value,
        searchBy: e.searchBy,
        showCompleted: showCompletedOrders,
      }

      fetchOrders(dataToSend)
    }
  }
  const handleDialogClick = (data) => {
    if (e) {
      if (data.value && data.value.type) {
        switch(data.value.type) {
          case 'update_status': {
            updateBulkStatus({
              ids: data.value.value,
              status: selectedStatusChange
            });
            break;
          }
          case 'delete_items': {
            deleteBulkIds({
              ids: data.value.value
            });
            break;
          }
          case 'single': {
            delItem(data.value.id)
            break;
          }
        }
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
    setSelectCheckbox(prev => !prev)
  }

  const handleShowAllCheckBox = async(e) => {
    const checkValue = !e.target.checked;
    setShowCompletedOrders(checkValue)

    setFilterList({
      ...filterList,
      showCompleted: checkValue,
    })

    const sendData = {
      page: filterList.page,
      limit: filterList.limit,
      sortBy: filterList.sortBy,
      searchValue: filterList.searchValue,
      searchBy: filterList.searchBy,
      showCompleted: checkValue,
    };

    fetchOrders(sendData)
  }

  const fetchOrders = async(params) => {
    const [gOrders, activeOrders] = await Promise.all([
      getAllOrdersWithFilter(params), 
      getAllOrdersWithFilter({
        newOrdersOnly: true,
      })
    ]);

    if (gOrders) {
      setOrders('rows' in gOrders ? gOrders.rows : gOrders.items);
      setTotalCounts(gOrders?.count)
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
    setForceUpdate(!forceUpdate)
    if (orders && orders.length) {
      setShowData(true);
    } else {
      setShowData(false);
    }
  }, [orders]);

  console.log("htest", orderList)
  useEffect(() => {
    loadOrders(filterList.page);
  }, [filterList.page]);

  return (
    <AdminLayoutTemplate>
      <Grid container className={classes.headerContainer}>
        <Grid lg={2} xs={6} md={3} item className={classes.headerTitle}>
          <h3>Orders</h3>
        </Grid>
        <Grid lg={9} xs={12} md={8} item className={classes.headerAction}>
          <AdminOrderSearchBar 
            onDropDownChange={handleDropDown}
            onButtonClick={onSearchIconClick}
          />
        </Grid>
        <Hidden smDown>
          <Grid lg={1} xs={3} md={2} item className={classes.headerAction}>
            <Dropdown 
                options={ORDER_STATUS} 
                align="right"
                onSelect={handleDropDown} 
                iconType="filter" 
              />
          </Grid>
        </Hidden>
      </Grid>
      <Pagination 
        onPageClick={handlePaginationChange}
        showData={showData}
        total={totalCounts}
        refresh={forceUpdate}
      >
      <AdminSelectItemOptions 
        selectedItems={selectedChecks}
        onHandleDialogClick={handleDialogClick}
        orders={orders}
        onCheckCancel={handleCheckCancel}
        onSetAllCheckboxes={setAllChekboxes}
        showCompletedOrders={showCompletedOrders}
        onHandleShowAllCheckBox={handleShowAllCheckBox}
      />
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
                    Shipping Name
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
                  <Grid item lg={1} className={classes.itemAction}>
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
                      <Grid item lg={1} className={classes.itemName}>
                        {
                          order.shipping_name
                        }
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
                      <Grid item lg={1} className={classes.itemAction}>
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
      </Pagination>
      <Snackbar open={snack.open} severity={snack.severity} onClose={() => setSnack({...snack, open: false })} content={snack.text} />
    </AdminLayoutTemplate>
  );
}

Index.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Index);