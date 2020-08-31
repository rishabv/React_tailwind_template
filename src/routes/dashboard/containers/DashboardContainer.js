import React from 'react';
import {
    actions
} from '../modules/dashboard';

import { bindActionCreators } from 'redux';
import DashboardView from '../components/DashboardView';
import { connect } from 'react-redux';
import { withJob } from 'react-jobs';
import RedBox from 'redbox-react';

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(actions, dispatch)
});

const mapStateToProps = (state) => ({
    selectState: {
        isMobile: state.selectState.isMobile
    },
    dashboardState: state.dashboardState,
});

const withJobComponent = withJob({
    work: async ({ dispatch }) => {
        //dispatch(getUser());
    },
    /* eslint-disable */ ErrorComponent: ({ error }) => __DEV__ ? <RedBox error={error} /> : null,
})(DashboardView);

export default connect(mapStateToProps, mapDispatchToProps)(withJobComponent);
