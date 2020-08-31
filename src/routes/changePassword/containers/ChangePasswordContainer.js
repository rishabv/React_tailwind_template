import React from 'react';
import { actions, getAllForums } from '../modules/changePassword';
import { bindActionCreators } from 'redux';
import ChangePasswordView from '../components/ChangePasswordView';
import { connect } from 'react-redux';
import { withJob } from 'react-jobs';
import RedBox from 'redbox-react';

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(actions, dispatch)
});

const mapStateToProps = (state) => ({
    changePasswordState: state.changePasswordState,
    accountState: {
        accountInfo: state.accountState.accountInfo
    }
});

const withJobComponent = withJob({
    work: async ({ dispatch }) => {

    },
    /* eslint-disable */ ErrorComponent: ({ error }) => __DEV__ ? <RedBox error={error} /> : null,
})(ChangePasswordView);

export default connect(mapStateToProps, mapDispatchToProps)(withJobComponent);
