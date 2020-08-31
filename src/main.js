import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store/createStore';
import AppContainer from './containers/AppContainer';
import createHistory from './store/isomorphicHistory';
import createRoutes from './routes';
// ========================================================
// Store Instantiation
// ========================================================

const bootstrap = async (initialUrl = '') => {
    const history = createHistory(initialUrl);
    const { store, persistor } = await createStore({}, history);
    // ========================================================
    // Render Setup
    // ========================================================
    const MOUNT_NODE = document.getElementById('root');
    store.dispatch({ type: 'CLEAN_UP_STATE' });
    let render = () => {
        const routes = createRoutes();

        ReactDOM.render(
            <AppContainer store={store} history={history} routes={routes} persistor={persistor} />,
            MOUNT_NODE
        );
    };

    // This code is excluded from production bundle
    if (__DEV__) {
        if (module.hot) {
            // Development render functions
            const renderApp = render;
            const renderError = (error) => {
                const RedBox = require('redbox-react').default;

                ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
            };

            // Wrap render in try/catch
            render = () => {
                try {
                    renderApp();
                } catch (error) {
                    console.error(error);
                    renderError(error);
                }
            };

            // Setup hot module replacement
            module.hot.accept('./routes/index', () =>
                setImmediate(() => {
                    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
                    render();
                })
            );
        }
    }

    // ========================================================
    // Go!
    // ========================================================
    render();
};

export default bootstrap;

/* eslint-disable */
const time = new Date().getTime();

const debug = (...args)=> {
    try {
        eval(['c','o','nsole'].join('')).log.apply(null, args);
    } catch (e){ }
};
bootstrap().then(() => {
    if (!__TEST__) debug(__APP_VERSION__.indexOf('version') > 0 ? `App Version: ${__VERSION__}` : `App Version: ${__APP_VERSION__}`);
    const timeEnd = new Date().getTime();
    if (!__TEST__) debug('rendererd in', timeEnd - time, 'ms');
    if (!__TEST__) debug('app env ', process.env.NODE_ENV);
});
