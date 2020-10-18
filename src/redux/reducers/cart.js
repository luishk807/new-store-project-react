import * as t from '../types';
import HYDRATE from 'next-redux-wrapper';
// reducers are your storages
// const main = (state, action) { }
const initialValue = [
  {
    id: 151,
    name: 'test1',
    image: '',
    code: 'test',
    category: 6,
    status: 1,
    model: 'test',
    brand: 16,
    product_images: [
      {
        createdAt: "2020-10-15T17:59:14.997Z",
        id: "89",
        img_url: "54682906-4470-4e37-b15c-0706b3605ebb.jpg",
        position: "1",
        productId: "154",
        updatedAt: "2020-10-15T17:59:14.997Z",
      }
    ],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed nunc a turpis imperdiet placerat',
    stock: 2,
    vendor: 10,
    quantity: 2,
    amount: '$33.00',
  },
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
    product_images: [
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
    amount: '$343.00',
  }
]
const cart = (state = initialValue, action) => {
  // check type of action
  switch(action.type){
    case HYDRATE:
      return {
        ...state,
        ...action.payload
      }
    case t.ADD_CART:
      return {
        ...state,
          // payload is the values
          'data':action.payload,
      };
    case t.DELETE_CART:
      return {
        ...state,
          // payload is the values
          'data':action.payload,
      };
    case t.UPDATE_CART:
      return {
        ...state,
          // payload is the values
          'data':action.payload,
      };
    default:
      // nothin happens, return same
      return {...state}
  }
};

export default cart;