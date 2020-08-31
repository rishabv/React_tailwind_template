import { connect } from 'react-redux';
import { actions } from '../modules/auth';
import { bindActionCreators } from 'redux';
import AuthView from '../components/AuthView';

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(actions, dispatch)
});

const mapStateToProps = (state) => ({
    auth: state.auth,
    selectState: state.selectState
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthView);
