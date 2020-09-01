import React from 'react';
import { Link } from 'react-router-dom';
import TechnicalSupportMessage from '../../../components/TechnicalSupportMessage/TechnicalSupportMessage';
// import PropTypes from 'prop-types';
import './ContactUsView.scss';
// import FooterWidget from '../../../components/FooterWidget/FooterWidget';
import PropTypes from "prop-types";

export class ContactUsView extends React.PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            hasError: false
        };
    }
    componentDidCatch () {
        this.setState({ hasError: true });
    }

    render () {
        const {
          accountInfo
        } = this.props.accountState;
        return (
            <div className='contact-us-view'>
                {this.state.hasError
                    ? <TechnicalSupportMessage />
                    : <div className='container'>
                        <div className='home-btn-row row'>
                            <div className='col-md-12'>
                                <Link to='/dashboard' >Home</Link>
                            </div>
                        </div>
                        <div className='info-card purple-titles'>
                            <h3 className='info-card-title'>Contact us</h3>
                            <div className='row'>
                                <div className='col-md-6 right-border'>
                                    <h6 className='title'>Contact Us</h6>
                                    <p>
                                        Local Surveyors Direct is a Limited Company operating on the Internet.
                                        We are a price comparison website matching up customers with suppliers,
                                        for a range of property services. Customers run an estimate request on
                                        the website and are immediately given contact details for all the suppliers
                                        covering the area. Correspondence regarding particular customer requirements
                                        is then done directly between the customer and the supplier. To run a request,
                                        please click on the required profession from the buttons at the top of this
                                        page. Then select the service and enter your property location details.
                                    </p>
                                    <h6 className='title'>Contact the Local Surveyors Direct Office</h6>
                                    <p>
                                        Should you wish to contact Local Surveyors Direct with any other query, please use our contact details below:
                                    </p>
                                    <p>
                                        <a href='mailto:enquiries@localsurveyorsdirect.co.uk'> enquiries@localsurveyorsdirect.co.uk</a>
                                        {' '}or by telephone to <a href='tel:01962 674840' className='help-phone-number'>01962 674840</a>
                                    </p>
                                    <p>
                                        Marketing enquiries and suppliers wishing to discuss the possibility of being
                                        listed on this website can also contact us via the above or alternatively you
                                        can register your interest online, <a target='_blank' rel='noopener noreferrer' href='https://www.localsurveyorsdirect.co.uk/join-us'>click here</a>
                                    </p>
                                    <p>
                                        Our registered office address is: Local Surveyors Direct Ltd, The Stables,
                                        Rear of 60 The Avenue, Southampton,  Hampshire SO17 1XS
                                    </p>
                                    <p>
                                        Our address for postal correspondence is: Local Surveyors Direct Ltd,
                                        1 Moorcroft Close, Sutton Scotney, Winchester, Hampshire SO21 3SL
                                    </p>
                                    <p>
                                        Local Surveyors Direct Ltd is registered in England. Registration number 05182524.
                                    </p>
                                    <h6 className='title'>
                                        Contact Members of Local Surveyors Direct
                                    </h6>
                                </div>
                                <div className='col-md-6'>
                                    <p>
                                        <a
                                            target='_blank'
                                            href='https://www.localsurveyorsdirect.co.uk/directory-of-members'
                                            rel='noopener noreferrer'
                                        >
                                            Directory of our Members and the Services that they provide.
                                        </a>
                                    </p>
                                    <p>
                                        We have a Directory of Members listed in alphabetical order by company name.
                                        If you are looking for someone to supply a service in your area (eg a Surveyor
                                        for a Building Survey in Basingstoke) then this directory will only be of limited
                                        use. The easiest way to locate a potential supplier is to select the profession
                                        from the top of this page (eg Surveyor),then select the service (Building Survey)
                                        then enter the location postcode (eg RG22) and your details. The system will immediately
                                        give you full details of all the members in your area who are available to provide you with
                                        your required service. You will then be able to talk to them on the phone, discuss your
                                        requirement in more detail and proceed once you are happy with the service and price being
                                        offered.
                                    </p>
                                    <p>
                                        If you already know the company name of the supplier that you are looking for then you may
                                        be able to find them using the link above to our alphabetic directory, assuming they are listed.
                                    </p>
                                    <p>
                                        <a
                                            target='_blank'
                                            href='https://www.localsurveyorsdirect.co.uk/directory-of-members'
                                            rel='noopener noreferrer'
                                        >
                                            For our directory of members click here.
                                        </a>
                                    </p>
                                    <p>
                                        If you need any help locating a particular supplier, please call us on
                                        <a href='tel:01962 674840' className='help-phone-number'>01962 674840</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='home-btn-row row'>
                            <div className='col-md-12'>
                              <Link to='/dashboard' >Home</Link>
                            </div>
                        </div>
                    </div>
                }

                <div className='col-sm-12'>
                    <FooterWidget
                        memberData={accountInfo}
                        forFooter
                    />
                </div>
            </div>
        );
    }
}

ContactUsView.propTypes = {
  accountState: PropTypes.object.isRequired,
};

export default ContactUsView;
