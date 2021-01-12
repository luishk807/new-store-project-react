import { createStore, applyMiddleware } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';

const makeStore = (context) => {
    return createStore(rootReducer, applyMiddleware(thunk));
}

export const wrapper = createWrapper(makeStore, { debug: true });
