import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import { routerMiddleware } from 'react-router-redux';
import checkAuthDateMiddleware from '../middlewares/checkAuthDateMiddleware';
import makeRootReducer from './reducers';
import storage from 'redux-persist/lib/storage';
// import * as utils from './../utils';

const persistConfig = {
    key: 'dummy',
    storage,
    whitelist: [
        //'selectState',
        //'dashboardState',
        //'accountState',
    ],
    blacklist: ['routing']
};

export default async (initialState = {}, history) => {
    // ======================================================
    // Middleware Configuration
    // ======================================================
    const router = routerMiddleware(history);
    const createAuthMiddleware = checkAuthDateMiddleware(history);
    const middleware = [createAuthMiddleware, thunk, router];

    // ======================================================
    // Store Enhancers
    // ======================================================
    let composeEnhancers = compose;

    const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if (typeof composeWithDevToolsExtension === 'function') {
        composeEnhancers = composeWithDevToolsExtension;
    }

    // ======================================================
    // Store Instantiation and HMR Setup
    // ======================================================
    const persistedReducer = persistReducer(persistConfig, makeRootReducer([]));
    const store = createStore(
        persistedReducer,
        initialState,
        composeEnhancers(
            applyMiddleware(...middleware)
        )
    );
    store.asyncReducers = {};

    const persistor = persistStore(store);

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const reducers = require('./reducers').default;
            store.replaceReducer(reducers(store.asyncReducers));
        });
    }
    return { store, persistor };
};
