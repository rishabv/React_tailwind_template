import { actions } from '../modules/contactUs';
import { bindActionCreators } from 'redux';
import ContactUsView from '../components/ContactUsView';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(actions, dispatch)
});

const mapStateToProps = (state) => ({
    contactUsState: state.contactUsState,
    accountState: {
      accountInfo: state.accountState.accountInfo
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactUsView);
