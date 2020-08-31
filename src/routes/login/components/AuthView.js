import React from 'react';
import PropTypes from 'prop-types';
import InputGroup from '../../../components/InputGroup/InputGroup';
import Spinner from '../../../components/Spinner/Spinner';
import { Link } from 'react-router-dom';
import './AuthView.scss';

export class AuthView extends React.Component {
    constructor (props) {
        super(props);
        this.changeUsername = this.changeUsername.bind(this);
        this.changePwd = this.changePwd.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.state = {
            userName:'',
            loginPassword:''
        };
    }
    changeUsername (event) {
        this.setState({
            userName: event.target.value
        });
    }
    changePwd (event) {
        this.setState({
            loginPassword: event.target.value
        });
    }
    submitHandler (event) {
        event.preventDefault();
        if (!this.state.userName.length && !this.state.loginPassword.length) {
            this.props.setErrLoginMessage('Username and password fields are required');
        } else if (!this.state.userName.length) {
            this.props.setErrLoginMessage('Username field is required.');
        } else if (!this.state.loginPassword.length) {
            this.props.setErrLoginMessage('Password field is required.');
        } else {
            this.props.logIn({ ...this.state, history: this.props.history });
        }
    }
    render () {
        const {errGetUserMessage} =  this.props.selectState;
        return (
            <div className={this.props.auth.errLoginMessage.length ? 'auth-view err-login' : 'auth-view'}>
                {this.props.auth.errLoginMessage.length
                    ? <p className='err-message' dangerouslySetInnerHTML={{ __html: this.props.auth.errLoginMessage }} />
                    : null
                }
                <div className='centered-container'>
                    <span className='logo'><Link to='/'>Logo</Link></span>
                    <h3 className='login-title'>User login</h3>
					{ process.env.NODE_ENV !== 'production'
						? <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
						: null
					}
					
                    <form className='login-form' onSubmit={this.submitHandler} formNoValidate>
                        <InputGroup
                            id='loginUsername'
                            label='Username or e-mail address'
                            type='text'
                            placeholder=''
                            subtitle={'You may login with either your assigned username or your e-mail address.'}
                            error={this.props.auth.errLoginMessage.toLocaleLowerCase().indexOf('user') >= 0}
                            value={this.state.userName}
                            onChange={this.changeUsername}
                        />

                        <InputGroup
                            id='loginPassword'
                            label='Password'
                            type='password'
                            placeholder=''
                            subtitle={'The password field is case sensitive.'}
                            value={this.state.loginPassword}
                            error={this.props.auth.errLoginMessage.toLocaleLowerCase().indexOf('password') >= 0}
                            onChange={this.changePwd}
                        />
                        <div className='bottom-login-part margin-bottom-15'>
                            <button className='btn btn-default margin-r-10'>Login</button>
                            {this.props.auth.logInSpinner && <Spinner />}
                            <p />
                        </div>
                        {errGetUserMessage === 'non-member'
                          ? <p className='non-member-message'>
                            This control panel is for members. For administrators, managers and API users, please click <a href='https://www.localsurveyorsdirect.co.uk/user'>here to log in.</a></p>
                          : null
                        }
                        <p className='login-info'>
                          <Link to='/forgot-password'>Reset Password</Link>
                        </p>
                        <p className='login-info'>
                            If you need any help logging in, please contact our enquiry line on <a href='tel:01962 674840'>01962 674840</a> or email:<a href='mailto:example@email.com'>enquiries@localsurveyorsdirect.co.uk</a>
                        </p>
                        <p>
                          Return to main website <a href='https://www.localsurveyorsdirect.co.uk'>www.localsurveyorsdirect.co.uk</a>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}

AuthView.propTypes = {
    history: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    logIn: PropTypes.func.isRequired,
    setErrLoginMessage: PropTypes.func.isRequired
};

export default AuthView;
