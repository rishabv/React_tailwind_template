import React from 'react';
import { actions } from '../modules/account';
import { getUser } from '../../selectWrapper/modules/select';
import { bindActionCreators } from 'redux';
import AccountView from '../components/AccountView';
import { connect } from 'react-redux';
import { withJob } from 'react-jobs';
import RedBox from 'redbox-react';

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(actions, dispatch)
});

const mapStateToProps = (state) => ({
    accountState: state.accountState
});

const withJobComponent = withJob({
    work: async ({ dispatch }) => {
        dispatch(getUser());
    },
    /* eslint-disable */ ErrorComponent: ({ error }) => __DEV__ ? <RedBox error={error} /> : null,
})(AccountView);

export default connect(mapStateToProps, mapDispatchToProps)(withJobComponent);
