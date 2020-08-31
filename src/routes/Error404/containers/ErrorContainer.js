import { actions } from '../modules/error';
import { bindActionCreators } from 'redux';
import ErrorView from '../components/ErrorView';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(actions, dispatch)
});

const mapStateToProps = (state) => ({
    page404: state.page404
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorView);
