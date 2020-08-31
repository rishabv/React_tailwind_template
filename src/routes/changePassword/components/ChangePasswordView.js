import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TechnicalSupportMessage from '../../../components/TechnicalSupportMessage/TechnicalSupportMessage';
import InputGroup from '../../../components/InputGroup/InputGroup';
import './ChangePasswordView.scss';
import FooterWidget from "../../../components/FooterWidget/FooterWidget";
import Spinner from '../../../components/Spinner/Spinner';
import auth from '../../../helpers/auth';

export class ChangePasswordView extends React.Component {
    constructor (props) {
        super(props);
        this.changeNewPwd = this.changeNewPwd.bind(this);
        this.changeConfirmPwd = this.changeConfirmPwd.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.state = {
            hasError: false,
            newPassword:'',
            newCPassword:'',
            isErr: false,
            msg: '',
            spin: false,
            pageLoad: true
        };


    }
    componentDidCatch () {
        this.setState({ hasError: true });
    }
    changeNewPwd (event) {
        this.setState({
            newPassword: event.target.value
        });
    }
    changeConfirmPwd (event) {
        this.setState({
            newCPassword: event.target.value
        });
    }
    async submitHandler (event) {
        event.preventDefault();
        if (!this.state.newPassword.length) {
            this.props.setErrChangePasswordMessage('New Password field is required.');
        } else if (this.state.newPassword.length < 4) {
            this.props.setErrChangePasswordMessage('Password has to contain atleast 4 characters.');
        } else if (this.state.newPassword !== this.state.newCPassword) {
            this.props.setErrChangePasswordMessage('Password not matched. Check new password and confirm password.');
        }else {
            this.props.changePassword({...this.state}, this.props.history );
        }
    }
    render () {
        const { accountInfo } = this.props.accountState;
            return (
                <div className={this.props.changePasswordState.errChangePasswordMessage.length ? 'container cp-view err-login' : 'container cp-view'}>
                    {this.props.changePasswordState.errChangePasswordMessage.length
                        ? <p className='err-message' dangerouslySetInnerHTML={{ __html: this.props.changePasswordState.errChangePasswordMessage }} />
                        : null
                    }
                    {this.props.changePasswordState.successChangePasswordMessage.length
                        ? <p className='success-message' dangerouslySetInnerHTML={{ __html: this.props.changePasswordState.successChangePasswordMessage }} />
                        : null
                    }
                    <div className='row'>
                        <div className='col-sm-12 col-md-6'>
                          <h3 className='change-password-title'>Change Password</h3>
                          <form className='change-password-form' onSubmit={this.submitHandler} formNoValidate>
                              <InputGroup
                                  id='newPassword'
                                  label='New Password'
                                  type='password'
                                  placeholder=''
                                  subtitle={'Enter the new password.'}
                                  value={this.state.newPassword}
                                  error={this.props.changePasswordState.errChangePasswordMessage.toLocaleLowerCase().indexOf('password') >= 0}
                                  onChange={this.changeNewPwd}
                              />
                              <InputGroup
                                  id='newCPassword'
                                  label='Confirm New Password'
                                  type='password'
                                  placeholder=''
                                  subtitle={'Confirm your password.'}
                                  value={this.state.newCPassword}
                                  error={this.props.changePasswordState.errChangePasswordMessage.toLocaleLowerCase().indexOf('password') >= 0}
                                  onChange={this.changeConfirmPwd}
                              />
                              <div className='bottom-login-part margin-bottom-15'>
                                  {!this.props.changePasswordState.changePasswordSpinner && <button className='btn btn-default margin-r-10'>Change Password</button>}
                                  {this.props.changePasswordState.changePasswordSpinner && <Spinner />}
                                  <p />
                              </div>
                          </form>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12'>
                            <FooterWidget
                                memberData={accountInfo}
                                forFooter
                            />
                        </div>
                    </div>
                </div>
            );
    }
}

ChangePasswordView.propTypes = {
    accountState: PropTypes.object.isRequired
};

export default ChangePasswordView;
