import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {ConnectedRouter} from 'react-router-redux';
import ScrollToTop from "../components/ScrollTop/ScrollTop";

class AppContainer extends React.Component {
    static propTypes = {
        routes: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object
        ]),
        store: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        persistor: PropTypes.object.isRequired
    };

    static shouldComponentUpdate() {
        return false;
    }

    render() {
        const {routes, store, history, persistor} = this.props;
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <ConnectedRouter history={history}>
                        <ScrollToTop>
                            <div style={{height: '100%'}}>
                                {routes}
                            </div>
                        </ScrollToTop>

                    </ConnectedRouter>
                </PersistGate>
            </Provider>
        );
    }
}

export default AppContainer;