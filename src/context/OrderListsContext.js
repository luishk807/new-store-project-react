import React, { useState, useContext } from 'react';

const OrderListsContext = React.createContext();
const UpdateOrderListContext = React.createContext();

export function useOrderListsContext() {
  return useContext(OrderListsContext);
}

export function useOrderListsUpdate() {
  return useContext(UpdateOrderListContext);
}

export function OrderListsProvider({ children }) {
  const [orderLists, setOrderLists] = useState([]);

  function updateOrderLists(newList) {
    setOrderLists(newList);
  }

  return (
    <>
      <OrderListsContext.Provider value={orderLists}>
        <UpdateOrderListContext.Provider value={updateOrderLists}>
          {children}
        </UpdateOrderListContext.Provider>
      </OrderListsContext.Provider>
    </>
  )
}