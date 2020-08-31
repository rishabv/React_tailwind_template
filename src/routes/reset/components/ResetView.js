import React from 'react';
import PropTypes from 'prop-types';
import InputGroup from '../../../components/InputGroup/InputGroup';
import Spinner from '../../../components/Spinner/Spinner';
import { Link } from 'react-router-dom';
import './ResetView.scss';
import fetch from 'isomorphic-fetch';

export class ResetView extends React.Component {
    constructor (props) {
        super(props);
        this.changeVerificationPwd = this.changeVerificationPwd.bind(this);
        this.changeNewPwd = this.changeNewPwd.bind(this);
        this.changeConfirmPwd = this.changeConfirmPwd.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.state = {
            verificationPassword:'',
            newPassword:'',
            newCPassword:'',
            isErr: false,
            msg: '',
            spin: false,
            pageLoad: true
        };
    }
    componentDidMount() {
      let search = new URLSearchParams(this.props.history.location.search); //this.getUrlParams().toString();
      let c = search.get('c');
      if(c) {
        this.setState({ verificationPassword: search.get('c') });
      }else{
        this.setState({ pageLoad: false });
      }
      //this.setState({ search: search });
    }
    changeVerificationPwd (event) {
        this.setState({
            verificationPassword: event.target.value
        });
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
        this.setState({
          spin: true
        });
        if (!this.state.verificationPassword.length) {
            this.setState({
              spin: false,
              msg: 'Verification code field is required.',
              isErr: true
            });
        } else if (!this.state.newPassword.length) {
            this.setState({
              spin: false,
              msg: 'New Password field is required.',
              isErr: true
            });
        } else if (this.state.newPassword.length < 4) {
            this.setState({
              spin: false,
              msg: 'Password has to contain at least 4 characters.',
              isErr: true
            });
        } else if (this.state.newPassword !== this.state.newCPassword) {
            this.setState({
              spin: false,
              msg: 'Password does not match. Please retype both fields.',
              isErr: true
            });
        }else {
            //this.props.changePassword({ ...this.state, history: this.props.history });

            let result = await fetch(`${__API__}/api/v1.1/verificationcode`, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json'

                },
                body: JSON.stringify({...this.state}).replace(/\s*\u0022\s*/g, '"')
            });
            //console.log(result);
            let json = await result.json();
            console.log(json);
            this.setState({
              isErr: !json.success,
              msg: json.msg,
              spin:false
            });
            if(json.success === true) {
              this.setState({
                msg: json.msg + ' Redirecting to login page in 3 seconds.'
              })
              await setTimeout(() => {
                  this.props.history.push('/');
              }, 3000);
            }

        }
    }
    render () {
        return (
            <div className={this.props.resetState.errLoginMessage.length ? 'auth-view err-login' : 'auth-view'}>
                {this.state.msg.length && this.state.isErr === true
                    ? <p className='err-message' dangerouslySetInnerHTML={{ __html: this.state.msg }} />
                    : null
                }
                {this.state.msg.length && this.state.isErr === false
                    ? <p className='success-message' dangerouslySetInnerHTML={{ __html: this.state.msg }} />
                    : null
                }
                <div className='centered-container'>
                    {this.state.pageLoad === true
                     ? <span><span className='logo'><Link to='/'>Logo</Link></span>
                    <h3 className='login-title'>Reset Password</h3>
                    <form className='login-form' onSubmit={this.submitHandler} formNoValidate>
                        {/*<InputGroup
                            id='verificationPassword'
                            label='Verification Code'
                            type='password'
                            placeholder=''
                            subtitle={'Enter the verification code you have recieved in your email.'}
                            value={this.state.verificationPassword}
                            error={this.props.resetState.errLoginMessage.toLocaleLowerCase().indexOf('password') >= 0}
                            onChange={this.changeVerificationPwd}
                        />*/}
                        <InputGroup
                            id='newPassword'
                            label='New Password'
                            type='password'
                            placeholder=''
                            subtitle={'Enter the new password.'}
                            value={this.state.newPassword}
                            error={this.props.resetState.errLoginMessage.toLocaleLowerCase().indexOf('password') >= 0}
                            onChange={this.changeNewPwd}
                        />
                        <InputGroup
                            id='newCPassword'
                            label='Confirm New Password'
                            type='password'
                            placeholder=''
                            subtitle={'Confirm your password.'}
                            value={this.state.newCPassword}
                            error={this.props.resetState.errLoginMessage.toLocaleLowerCase().indexOf('password') >= 0}
                            onChange={this.changeConfirmPwd}
                        />
                        <div className='bottom-login-part margin-bottom-15'>
                            <button className='btn btn-default margin-r-10'>Reset</button>
                            {this.props.resetState.logInSpinner && <Spinner />}
                            <p />
                        </div>
                        <p className='login-info'>
                          <Link to='/login'>Return to Login</Link>
                        </p>
                        <p className='login-info'>
                            If you need any help logging in or resetting password, please contact our enquiry line on <a href='tel:01962 674840'>01962 674840</a> or email:<a href='mailto:example@email.com'>enquiries@localsurveyorsdirect.co.uk</a>
                        </p>
                        <p>
                          Return to main website <a href='https://www.localsurveyorsdirect.co.uk'>www.localsurveyorsdirect.co.uk</a>
                        </p>
                    </form>
                    </span>
                    : <div>
                        <p>The page you are trying to access is not correct. Please try and click on the link in the password reset email you have got.</p>
                      </div>
                  }
                </div>
            </div>
        );
    }
}

ResetView.propTypes = {
    history: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    changePassword: PropTypes.func.isRequired,
    setErrLoginMessage: PropTypes.func.isRequired
};

export default ResetView;
