import React from "react";
import PropTypes from "prop-types";
import AccountBox from "./AccountBox/AccountBox";
import MessageBoard from "../../../components/MessageBoard/MessageBoard";
import TechnicalSupportMessage from "../../../components/TechnicalSupportMessage/TechnicalSupportMessage";
import { Link } from "react-router-dom";
import "./AccountView.scss";

const mocAddress = {
    street: "",
    countryName: "",
    postalCode: "",
};

export class AccountView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
        };
        this.saveDetails = this.saveDetails.bind(this);
    }
    componentDidCatch() {
        this.setState({ hasError: true });
    }
    saveDetails() {
        this.props.sendChangedAccountSettings();
    }
    render() {
        const {
            sendMessage,
            isErrMessage,
            isAdmin,
            accountInfo,
        } = this.props.accountState;
        const {
            firstName,
            lastName,
            mail,
            loginName,
            status,
            subscribeNewsletters,
            balanceForThisPeriod,
            accountAddress,
        } = this.props.accountState.accountInfo;
        const { street, countryName, postalCode } =
            accountAddress || mocAddress;
        return (
            <div className="account-details-view">
                {this.state.hasError ? (
                    <TechnicalSupportMessage />
                ) : (
                    <div className="container">
                        <div className="home-btn-row row">
                            <div className="col-md-12">
                                <Link to="/dashboard">Home</Link>
                            </div>
                        </div>
                        <div className="info-card row">
                            <div className="col-md-12">
                                <h3 className="info-card-title">
                                    Account details
                                </h3>
                                <AccountBox
                                    isAdmin={isAdmin}
                                    firstName={firstName}
                                    lastName={lastName}
                                    mail={mail}
                                    loginName={loginName}
                                    status={status}
                                    street={street}
                                    countryName={countryName}
                                    postalCode={postalCode}
                                    subscribeNewsletters={subscribeNewsletters}
                                    balanceForThisPeriod={balanceForThisPeriod}
                                    setFirstName={this.props.setFirstName}
                                    setLastName={this.props.setLastName}
                                    setLoginName={this.props.setLoginName}
                                    setUserEmail={this.props.setUserEmail}
                                    setSubscribeNewsletters={
                                        this.props.setSubscribeNewsletters
                                    }
                                    setStreet={this.props.setStreet}
                                    setCountryName={this.props.setCountryName}
                                    setPostalCode={this.props.setPostalCode}
                                />
                            </div>
                        </div>
                        <div className="row save-container">
                            <div className="col-md-12">
                                <button
                                    className="btn btn-default save-button"
                                    onClick={this.saveDetails}
                                >
                                    SAVE ACCOUNT SETTINGS
                                </button>
                                <MessageBoard
                                    boardText={sendMessage}
                                    openBoardStatus={sendMessage.length > 0}
                                    isErrModal={isErrMessage}
                                />
                            </div>
                        </div>
                    </div>
                )}
                <div className="col-sm-12">
                    <FooterWidget memberData={accountInfo} forFooter />
                </div>
            </div>
        );
    }
}

AccountView.propTypes = {
    accountState: PropTypes.object.isRequired,
    setFirstName: PropTypes.func.isRequired,
    setLastName: PropTypes.func.isRequired,
    setLoginName: PropTypes.func.isRequired,
    setUserEmail: PropTypes.func.isRequired,
    setSubscribeNewsletters: PropTypes.func.isRequired,
    setStreet: PropTypes.func.isRequired,
    setCountryName: PropTypes.func.isRequired,
    setPostalCode: PropTypes.func.isRequired,
    sendChangedAccountSettings: PropTypes.func.isRequired,
};

export default AccountView;
