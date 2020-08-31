import { connect } from 'react-redux';
import { actions } from '../modules/reset';
import { bindActionCreators } from 'redux';
import ResetView from '../components/ResetView';

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(actions, dispatch)
});

const mapStateToProps = (state) => ({
    auth: state.auth,
    resetState:state.resetState
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetView);
