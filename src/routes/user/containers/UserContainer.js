import React from 'react';
import { actions, getUser } from '../modules/user';
import { bindActionCreators } from 'redux';
import UserView from '../components/UserView';
import { connect } from 'react-redux';
import { withJob } from 'react-jobs';
import RedBox from 'redbox-react';

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(actions, dispatch)
});

const mapStateToProps = (state) => ({
    userState: state.userState
});

const withJobComponent = withJob({
    work: async ({ dispatch, history: { location: { search }, push } }) => {
        if (search.length) {
            dispatch(getUser(search.replace(/\?/g, '')));
        } else {
            push.push('/dashboard');
        }
    },
    /* eslint-disable */ ErrorComponent: ({ error }) => __DEV__ ? <RedBox error={error} /> : null,
})(UserView);

export default connect(mapStateToProps, mapDispatchToProps)(withJobComponent);
