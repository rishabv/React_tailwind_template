import { connect } from 'react-redux';
import { actions } from '../modules/forgot';
import { bindActionCreators } from 'redux';
import ForgotView from '../components/ForgotView';

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(actions, dispatch)
});

const mapStateToProps = (state) => ({
    forgotState: state.forgotState
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotView);
