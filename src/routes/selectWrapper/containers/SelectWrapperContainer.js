import React from 'react';
import Spinner from '../../../components/Spinner/Spinner';
import { actions, getUser, setIsMobileStatus, getSystemSettings } from '../modules/select';
import { bindActionCreators } from 'redux';
import SelectWrapperView from '../components/SelectWrapperView';
import { connect } from 'react-redux';
import { withJob } from 'react-jobs';
import RedBox from 'redbox-react';

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(actions, dispatch)
});

const mapStateToProps = (state) => ({
    selectState: state.selectState,
    accountState: state.accountState
});

const withJobComponent = withJob({
    work: async ({ dispatch, accountState: { accountInfo: { loginName } } }) => {
        await dispatch(setIsMobileStatus({ width: window.innerWidth, height: window.innerHeight }));
        //if (!loginName.length) {
            await dispatch(getUser());
            await dispatch(getSystemSettings());
        //}
    },
    LoadingComponent: () => <Spinner />,
    /* eslint-disable */ ErrorComponent: ({ error }) => __DEV__ ? <RedBox error={error} /> : null,
})(SelectWrapperView);


export default connect(mapStateToProps, mapDispatchToProps)(withJobComponent);
