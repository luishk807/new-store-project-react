import { useState, useEffect } from 'react';
import {
  withStyles,
  Grid,
  Button,
} from '@material-ui/core';
import * as T from 'prop-types';
import Icons from '@/common/Icons';
import CheckBoxLabel from '@/common/CheckBoxLabel';
import { loadMainOptions } from 'src/utils/form';
import DialogModal from '@/common/DialogModal';
import Snackbar from '@/common/Snackbar';

const styles = (theme) => ({
  root: {
    width: '100%'
  },
  actionIconBlack: {
    width: 20,
    height: 20,
    fill: 'black',
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
  selectStyle: {
    padding: '8px 5px',
    borderRadius: 5,
  },
  showAllCheckbox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
  },
  checkMarkItem: {
    padding: '20px 0px',
  },
});

const AdminSelectItemOptions = ({
  selectedItems,
  orders,
  classes,
  onHandleDialogClick,
  showCompletedOrders,
  onCheckCancel,
  onSetAllCheckboxes,
  onHandleShowAllCheckBox,
}) => {
  const [statuses, setStatuses] = useState([])
  const [showCheckMark, setShowCheckmark] = useState(false);
  const [selectedStatusChange, setSelectedStatusChange] = useState(null);

  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
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

  useEffect(() => {
    (async() => {
      const getBasic = await loadMainOptions();
      if('orderStatus' in getBasic) {
        setStatuses(getBasic.orderStatus)
      } else {
        setStatuses([]);
      }
    })();
  }, [])

  const hideCheckMark = () => {
    console.log('ff')
    setShowCheckmark(prev => !prev);
    onCheckCancel();
  }


  
  const handleStatusChange = (event) => {
    if (!selectedItems || (selectedItems && !selectedItems.length)) {
      setSnack({
        severity: 'error',
        open: true,
        text: `You need to select an item`,
      })
      return;
    }
    setSelectedStatusChange(event.target.value)
    const order_numbers = selectedItems.map(item => {
      const order_num = orders.filter(order => Number(order.id) === item)[0]
      return order_num ? order_num.order_number : null;
    }).join(",");
    
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

  const handleDialogClick = (e) => {
    setDialogContent({
      ...dialogContent,
      open: false
    })
    if (e) {
      if (dialogContent.value && dialogContent.value.type) {
        onHandleDialogClick({
          type: dialogContent.value.type,
          ids: dialogContent.value.value,
          status: selectedStatusChange
        })
      } else {
        onHandleDialogClick({
          type: 'single',
          ids: dialogContent.value.id,
          status: selectedStatusChange
        })
      }

    }
    resetDialog();
  }

  // const handleShowAllCheckBox = async(e) => {
  //   const checkValue = !e.target.checked;
  //   setShowCompletedOrders(checkValue)

  //   setFilterList({
  //     ...filterList,
  //     showCompleted: checkValue,
  //   })

  //   const sendData = {
  //     page: filterList.page,
  //     limit: filterList.limit,
  //     sortBy: filterList.sortBy,
  //     searchValue: filterList.searchValue,
  //     searchBy: filterList.searchBy,
  //     showCompleted: checkValue,
  //   };

  //   fetchOrders(sendData)
  // }
  
  const hadleDeleteSelected = () => {
    if (!selectedItems || (selectedItems && !selectedItems.length)) {
      setSnack({
        severity: 'error',
        open: true,
        text: `You need to select an item`,
      })
      return;
    }

    const order_numbers = selectedItems.map(item => {
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

  
  // const updateBulkStatus = async(data) => {
  //   setSelectedStatusChange(null)
  //   saveOrderStatusBulk(data).then((data) => {
  //     setSnack({
  //       severity: 'success',
  //       open: true,
  //       text: `Order updated`,
  //     })
  //     handleCheckCancel();
  //     loadOrders()
  //   }).catch((err) => {
  //     setSnack({
  //       severity: 'error',
  //       open: true,
  //       text: `ERROR: Order cannot be updated`,
  //     })
  //   })
  // }

  // const deleteBulkIds = async(data) => {
  //   deleteOrderByOrderNumbers(data).then((data) => {
  //     setSnack({
  //       severity: 'success',
  //       open: true,
  //       text: `Order deleted`,
  //     })
  //     handleCheckCancel();
  //     loadOrders()
  //   }).catch((err) => {
  //     setSnack({
  //       severity: 'error',
  //       open: true,
  //       text: `ERROR: Order cannot be deleted`,
  //     })
  //   })
  // }

  // const delItem = async(id) => {
  //   deleteOrderById(id).then((data) => {
  //     setSnack({
  //       severity: 'success',
  //       open: true,
  //       text: `Order Deleted`,
  //     })
  //     const sendData = {
  //       ...filterList,
  //       page: 1
  //     };
  //     loadOrders(sendData)
  //   }).catch((err) => {
  //     setSnack({
  //       severity: 'error',
  //       open: true,
  //       text: `ERROR: Order cannot be delete`,
  //     })
  //   })
  // }

  
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


  return (
    <>
      {
        showCheckMark ? (
          <Grid container>
            <Grid item lg={10} xs={12} className={classes.checkBoxSelectContainer}>
              <Button className={`smallSecondButtonDefault`} onClick={hideCheckMark}>Cancel</Button>
              <Button className={`smallSecondButtonDefault`} onClick={() => onSetAllCheckboxes(true)}>Check All</Button>
              <Button className={`smallSecondButtonDefault`} onClick={() => onSetAllCheckboxes(false)}>Uncheck All</Button>
              <Button className={`smallSecondButtonDefault`} onClick={() => hadleDeleteSelected()}>Delete Selected</Button>
              { 
                statuses.length && (
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
              )
            }
            </Grid>
            <Grid item lg={2} xs={12} className={classes.showAllCheckbox}>
              <CheckBoxLabel 
                name="Don't show completed"
                defaultChecked={!showCompletedOrders}
                onClick={onHandleShowAllCheckBox}
                />
            </Grid>
          </Grid>
        ) : (
          <Grid container>
            <Grid item lg={10} xs={2}  className={classes.checkMarkItem}>
              <Button onClick={hideCheckMark}>
                <Icons name="goodMark" classes={{icon: classes.actionIconBlack }}/>
              </Button>
            </Grid>
            <Grid item lg={2} xs={10} className={classes.showAllCheckbox}>
              <CheckBoxLabel 
                name="Don't show completed"
                defaultChecked={!showCompletedOrders}
                onClick={onHandleShowAllCheckBox}
                />
            </Grid>
          </Grid>
        )
      }
      <Snackbar open={snack.open} severity={snack.severity} onClose={() => setSnack({...snack, open: false })} content={snack.text} />
      <DialogModal open={dialogContent.open} onClick={handleDialogClick} title={dialogContent.title} content={dialogContent.content} actionLabels={dialogContent.actionLabels} />
    </>
  ) 
}

AdminSelectItemOptions.propTypes = {
  classes: T.object,
  orders: T.array,
  onHandleDialogClick: T.func,
  selectedItems: T.array,
  selectCheckbox: T.bool,
  showCompletedOrders: T.bool,
  onCheckCancel: T.func,
  onSetAllCheckboxes: T.func,
  onHandleShowAllCheckBox: T.func,
}

export default withStyles(styles)(AdminSelectItemOptions);