import React from 'react';
import Select from '../../../../components/Select/Select';
import TechnicalSupportMessage from '../../../../components/TechnicalSupportMessage/TechnicalSupportMessage';
import './AccountBox.scss';
import PropTypes from 'prop-types';
import _find from 'lodash/find';
const options = [{ value: 1, label: 'yes' }, { value: 0, label: 'no' }];

export class AccountBox extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            hasError: false,
            value: _find(options, { value: this.props.subscribeNewsletters }) || options[1]
        };
        this.handleChangeSubscribeLatter = this.handleChangeSubscribeLatter.bind(this);
    }
    componentDidCatch () {
        this.setState({ hasError: true });
    }
    handleChangeSubscribeLatter (selectedOption) {
        this.setState({
            value: selectedOption
        }, this.props.setSubscribeNewsletters(selectedOption.value));
    }
    render () {
        return (
            <div className='account-box'>
                {this.state.hasError
                    ? <TechnicalSupportMessage />
                    : <div className='row'>
                        <div className='col-md-8'>
                            <div className='padding-container'>
                                <span className='edit-line double-line'>
                                    <span className='edit-pre-title'>Account Contact Name:</span>
                                    <span className='double-container'>
                                        <input
                                            type='text'
                                            value={this.props.firstName}
                                            onChange={(e) => this.props.setFirstName(e.target.value)}
                                        />
                                        <input
                                            type='text'
                                            value={this.props.lastName}
                                            onChange={(e) => this.props.setLastName(e.target.value)}
                                        />
                                    </span>
                                </span>
                                <span className='edit-line'>
                                    <span className='edit-pre-title'>User Name (login):</span>
                                    <input
                                        type='text'
                                        value={this.props.loginName}
                                        onChange={(e) => this.props.setLoginName(e.target.value)}
                                    />
                                </span>
                                <span className='edit-line'>
                                    <span className='edit-pre-title'>Account Email Address:</span>
                                    <input
                                        type='text'
                                        value={this.props.mail}
                                        onChange={(e) => this.props.setUserEmail(e.target.value)}
                                    />
                                </span>
                                {
                                    this.props.isAdmin
                                        ? <span className='edit-line'>
                                            <span className='edit-pre-title'>Subscribed to newsletter?</span>
                                            <Select
                                                name='form-field-name'
                                                className='subscribe-select'
                                                value={this.state.value}
                                                onChange={this.handleChangeSubscribeLatter}
                                                options={options}
                                                openOnFocus
                                                clearable={false}
                                            />
                                        </span> : null
                                }
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='padding-container'>
                                <span className='edit-line'>
                                    <input
                                        type='text'
                                        value={this.props.street}
                                        onChange={(e) => this.props.setStreet(e.target.value)}
                                    />
                                </span>
                                <span className='edit-line'>
                                    <input
                                        type='text'
                                        value={this.props.countryName}
                                        onChange={(e) => this.props.setCountryName(e.target.value)}
                                    />
                                </span>
                                <span className='edit-line'>
                                    <input
                                        type='text'
                                        value={this.props.postalCode}
                                        onChange={(e) => this.props.setPostalCode(e.target.value)}
                                    />
                                </span>
                                <span className='edit-line statuses-box'>
                                    <span className='edit-pre-title'>Account Status:</span>
                                    <span>{this.props.status}</span>
                                </span>
                                <span className='edit-line balance-box'>
                                    <span className='edit-pre-title'>Balances for this period:</span>
                                    <span>Balance £ {this.props.balanceForThisPeriod}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

AccountBox.propTypes = {
    isAdmin: PropTypes.bool.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    loginName: PropTypes.string,
    mail: PropTypes.string.isRequired,
    status: PropTypes.string,
    street: PropTypes.string,
    countryName: PropTypes.string,
    postalCode: PropTypes.string.isRequired,
    subscribeNewsletters: PropTypes.bool,
    balanceForThisPeriod: PropTypes.number.isRequired,
    setFirstName: PropTypes.func.isRequired,
    setLastName: PropTypes.func.isRequired,
    setLoginName: PropTypes.func.isRequired,
    setUserEmail: PropTypes.func.isRequired,
    setSubscribeNewsletters: PropTypes.func.isRequired,
    setStreet: PropTypes.func.isRequired,
    setCountryName: PropTypes.func.isRequired,
    setPostalCode: PropTypes.func.isRequired
};

export default AccountBox;