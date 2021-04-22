import { createStore, applyMiddleware } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';

// This is so we don't have the HYDRATE in every reducer
const mainReducer = (state = {}, action) => action.type === HYDRATE ? { ...state, ...action.payload } : rootReducer(state, action);

const makeStore = (context) => {
    return createStore(mainReducer, applyMiddleware(thunk));
}

export const wrapper = createWrapper(makeStore, { debug: process.env === 'prod' ? false : true });
