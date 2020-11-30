import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';

const logger = ({ getState }) => {
    return next => action => {
        console.log('will dispatch', action);

        const returnValue = next(action);

        console.log('state after dispatch', getState());

        return returnValue;
    }
}

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;
