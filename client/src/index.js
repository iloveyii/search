/**
 * Standard third party packages
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { BrowserRouter } from 'react-router-dom';
/**
 * Our custom components / packages
 */
import App from './App';
/**
 * Resources
 */
import './index.css';
import registerServiceWorker from './registerServiceWorker';


// # 01
/**
 * A reducer is a function that operates on the state object and then returns it
 * Please note that this function is also called during initialization of store - so any code
 * without if stmt will be executed multiple times - internal operation of store !
 * @param state - this is a misleading name - here it is not the full state but just corresponding key value
 * @param action
 * @returns {Array} - every return value is assigned to the corresponding key in allReducers
 */
import SearchReducer from './Reducers/SearchReducer';
import rootSaga from './Sagas/rootSaga';
const allReducers = combineReducers({
    user: SearchReducer,
});

// # 02
/**
 * Sagas to connect to external world - async api calls
 */
const sagaMiddleware = createSagaMiddleware();

// # 03
/**
 * Store enhancers, devToolsExtensions
 */
const allStoreEnhancers = compose(
    applyMiddleware(
        thunk,
        sagaMiddleware,
        logger),
    window.devToolsExtension && window.devToolsExtension()
);

// # 04
/**
 * Create store with allReducers which are all called one by one when there is dispatch
 * Second param is initial state of store
 * Last param is for redux debug in chrome extension
 * @type {Store<S&StateExt>&Ext}
 */
const store = createStore(
    allReducers,
    {},
    allStoreEnhancers
);
sagaMiddleware.run(rootSaga);

// # 05
/**
 * You can see the status of store - but only data and not reducers
 */
// console.log(store.getState());

// # 06
/**
 * Action is an object with format of type and payload
 * @type {{type: string, payload: {newState: string}}}
 * Dispatch action to store
 */
// store.dispatch({type: SEARCH_START});

/**
 * Render the main App Component
 */
ReactDOM.render((
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
