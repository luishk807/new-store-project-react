import * as t from '../types';
import HYDRATE from 'next-redux-wrapper';
// reducers are your storages
// const main = (state, action) { }
const initialValue = [
  {
    id: 154,
    name: 'test2',
    image: '',
    code: 'test',
    category: 6,
    status: 1,
    model: 'test',
    brand: 16,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed nunc a turpis imperdiet placerat',
    stock: 3,
    productImages: [
      {
        createdAt: "2020-10-15T17:59:14.997Z",
        id: "89",
        img_url: "54682906-4470-4e37-b15c-0706b3605ebb.jpg",
        position: "1",
        productId: "154",
        updatedAt: "2020-10-15T17:59:14.997Z",
      }
    ],
    vendor: 10,
    quantity: 2,
    amount: '343.00',
  }
]

const cart = (state = [], action) => {
  // check type of action
  let indexFound = null;
  let newState = {}
  switch(action.type){
    case HYDRATE:
      return {
        ...state,
        ...action.payload
      }
    case t.ADD_CART:
      return updateCurrentCart(state, action)
    case t.DELETE_CART:
      Object.keys(state).map((index) => {
        if (state[index].id == action.payload.id && !indexFound) {
          indexFound = index
        }
      })
      if (indexFound) {
        delete state[indexFound]
        let temp = {}
        let counter = 0;
        Object.keys(state).map((index) => {
          temp = {
            ...temp,
            [counter]: state[index]
          }
          counter++
        })
        saveCartLocal(temp);
        return temp
      } else {
        return {
          ...state
        };
      }
    case t.UPDATE_CART:
      let counter = 0;
      if (!Object.keys(state).length && Object.keys(action.payload).length > 0) {
        Object.keys(action.payload).forEach((index) => {
          newState = {
            ...newState,
             [counter]:action.payload[counter],
          };
          counter++;
        })
        saveCartLocal(newState);
        return newState
      } else {
        return updateCurrentCart(state, action)
      }
    default:
      // nothin happens, return same
      return {...state}
  }
};

const updateCurrentCart = (state, action) => {
  let newState = {}
  let indexFound = null;
  let length = Object.keys(state).length;
  Object.keys(state).map((index) => {
    if (state[index].id == action.payload.id && !indexFound) {
      indexFound = index
    }
  })
  if (indexFound) {
    newState = {
      ...state,
      [indexFound] : action.payload
    }
  } else {
    newState = {
      ...state,
        [length++]:action.payload,
    };
  }
  saveCartLocal(newState);
  return newState
}

const saveCartLocal = (state) => {
  if (!Object.keys(state).length) {
    localStorage.removeItem('cart');
  } else {
    localStorage.setItem('cart', JSON.stringify(state))
  }
}

export default cart;