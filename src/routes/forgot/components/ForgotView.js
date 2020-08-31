import React from 'react';
import PropTypes from 'prop-types';
import InputGroup from '../../../components/InputGroup/InputGroup';
import Spinner from '../../../components/Spinner/Spinner';
import { Link } from 'react-router-dom';
import './ForgotView.scss';
import fetch from 'isomorphic-fetch';

export class ForgotView extends React.Component {
    constructor (props) {
        super(props);
        this.changeUsername = this.changeUsername.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.state = {
            userName:'',
            isErr: false,
            msg: '',
            spin: false
        };
    }
    changeUsername (event) {
        this.setState({
            userName: event.target.value
        });
        //console.log(this.state);
    }
    async submitHandler (event) {
        event.preventDefault();
        this.setState({
          spin: true
        });
        if (!this.state.userName.length) {
            //this.props.setErrLoginMessage('Username field is required.');
            this.setState({
              spin: false,
              msg: 'Username or Email field is required.',
              isErr: 'false'
            });
        } else {
            let result = await fetch(`${__API__}/api/v1.0/verificationcode`, {
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
              isErr: json.success,
              msg: json.msg,
              spin:false
            });
            //this.props.sendVerificationCode({ ...this.state });
        }
        //this.props.sendVerificationCode({ ...this.state });
        //event.preventDefault();
    }
    render () {
        return (
            <div className={this.props.forgotState.errLoginMessage.length ? 'auth-view err-login' : 'auth-view'}>
                {this.state.msg.length && this.state.isErr === 'true'
                    ? <p className='success-message' dangerouslySetInnerHTML={{ __html: this.state.msg }} />
                    : null
                }
                {this.state.msg.length && this.state.isErr === 'false'
                    ? <p className='err-message' dangerouslySetInnerHTML={{ __html: this.state.msg }} />
                    : null
                }
                <div className='centered-container'>
                    <span className='logo'><Link to='/'>Logo</Link></span>
                    <h3 className='login-title'>Reset Password</h3>
                    <form className='login-form' onSubmit={this.submitHandler} >
                        <InputGroup
                            id='loginUsername'
                            label='Username or Email'
                            type='text'
                            placeholder=''
                            subtitle={'Enter your username or e-mail'}
                            error={this.props.forgotState.errLoginMessage.toLocaleLowerCase().indexOf('user') >= 0}
                            value={this.state.userName}
                            onChange={this.changeUsername}
                        />


                        <div className='bottom-login-part margin-bottom-15'>

                            {!this.state.spin && <button className='btn btn-default margin-r-10'>Submit</button>}
                            {this.state.spin && <Spinner />}
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
                </div>
            </div>
        );
    }
}

ForgotView.propTypes = {
    history: PropTypes.object.isRequired,
    forgotState: PropTypes.object.isRequired,
    sendVerificationCode: PropTypes.func.isRequired,
    setErrLoginMessage: PropTypes.func.isRequired
};

export default ForgotView;
