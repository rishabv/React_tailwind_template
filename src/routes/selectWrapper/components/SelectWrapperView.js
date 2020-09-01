import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import Modal from '../../../components/Modal/Modal';
import Select from '../../../components/Select/Select';
import TechnicalSupportMessage from '../../../components/TechnicalSupportMessage/TechnicalSupportMessage';
import RadioButton from '../../../components/RadioButton/RadioButton';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import _sortBy from 'lodash/sortBy';
import './selectWrapperView.scss';
import 'react-select/dist/react-select.css';
import auth from '../../../helpers/auth';
import Spinner from '../../../components/Spinner/Spinner';
import Autocomplete from 'react-autocomplete';

const ignoreBusinessSelect = [
    /*'/dashboard/contact-us',
    '/dashboard/logos',
    '/dashboard/account',
    '/dashboard/all-users',
    '/dashboard/cpd-details',
    '/dashboard/enquiry',
    '/dashboard/services',
    '/dashboard/non-upgrade-info',
    '/dashboard/invoices',
    '/dashboard/enquiry',
    '/dashboard/business-info'*/
    '/dashboard'
];

const ignoreMemberWidgetBottom = [
    '/dashboard'
];

/*const ignoreTopTitle = [
  '/dashboard/non-upgrade-info',
  '/dashboard/manage-services',
  '/dashboard/postcode-set/',
  '/dashboard/business-details',
  '/dashboard/services',
  '/dashboard/feedback',
  '/dashboard/directory-details'
];*/
const ignoreTopTitle = [
  '/dashboard'
];
const addServicesLink = [
  '/dashboard/services',
  '/dashboard/postcode-set/'
];

const ignoreTopPartHeader = [
  '/dashboard/thanks-for-upgrading'
];
const redirectToDashboard = [
  '/user',
  '/user/login',
  '/dashboard/login'
];

/*
non-upgrade-info',
'/dashboard/direct-debit',
'/dashboard/manage-services'
*/
const professions = [
    'Architects',
    'Electricians',
    'Conveyancing',
    'Surveyors'
];

const helpUpdateHeader = `<h6 class='text-align-left update-header-modal'>How to upgrade</h6>`;
const businessModalBody = 'This is the business that you are currently viewing.'+
' To change this, please return to the home page and then select the next business that you wish to view';

let businessModalConfig = {
    modalHeaderText: '',
    modalText: businessModalBody,
    openModalStatus: true,
    modalSize: 'small',
    modalChildComponent: null
};
export class SelectWrapperView extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            hasError: false,
            addServiceComponent: '',
            masqUser: '',
            value: '',
            unitedStates: [],
            loading: false,
            udata: []
        };
        this.logOut = this.logOut.bind(this);
        this.handleChangeBusiness = this.handleChangeBusiness.bind(this);
        this.formatTitle = this.formatTitle.bind(this);
        this.showUpdatePopUp = this.showUpdatePopUp.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.updateIsMobile = this.updateIsMobile.bind(this);
        this.isShowBusinessSelect = this.isShowBusinessSelect.bind(this);
        this.isShowBackButton = this.isShowBackButton.bind(this);
        this.handleChangeRadioBusiness = this.handleChangeRadioBusiness.bind(this);
        this.isShowMemberWidgetBottom = this.isShowMemberWidgetBottom.bind(this);
        this.generateProfessionList = this.generateProfessionList.bind(this);
        this.setMasqUser = this.setMasqUser.bind(this);
        this.masqTheUser = this.masqTheUser.bind(this);
        this.switchBack = this.switchBack.bind(this);
        this.canDoMasq = this.canDoMasq.bind(this);
        this.canSeeContent = this.canSeeContent.bind(this);
        this.requestTimer = null;
    }
    componentDidCatch (error, errorInfo) {
        console.log(error, errorInfo);
        this.setState({ hasError: true });
        if (!__DEV__) {
            auth.resetLoginStore();
        }
    }
    componentDidMount () {
        this.updateIsMobile();
        window.addEventListener('resize', this.updateIsMobile);
    }
    componentWillUnmount () {
        window.removeEventListener('resize', this.updateIsMobile);
    }
    canDoMasq(roles){
      if (roles.indexOf('sales') > 0 || roles.indexOf('manager') > 0 || roles.indexOf('finance') > 0 || roles.indexOf('service') > 0 || roles.indexOf('administrator') > 0 || roles.indexOf('newbusiness') > 0) {
        return true;
      }
      return false;
    }
    canSeeContent(roles){
      if (roles.indexOf('sales') > 0) {
        return false;
      }
      return true;
    }
    handleChangeBusiness (selectedOption) {
        this.props.afterChangeBusiness(selectedOption);
    };
    handleChangeRadioBusiness (selectedOption) {
        this.props.setSelectedBusinessTitle(selectedOption);
        this.props.afterChangeBusiness(selectedOption);
    }
    closeModal () {
        this.props.setModal();
    }
    formatTitle (value) {
        if (this.props.location.search.length) {
            let string = value.split('/')[value.split('/').length - 2].replace(/-/g, ' ');
            return string.charAt(0).toUpperCase() + string.slice(1);
        } else {
            let string = value.split('/')[value.split('/').length - 1].replace(/-/g, ' ');
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    }
    logOut () {
        this.props.logOut(this.props.history);
    }
    showUpdatePopUp () {
        const bodyModal = `
        <div class='text-align-left'>
            ${this.props.accountState.accountInfo.upgradeAction.prefix}
            ${this.props.accountState.accountInfo.upgradeAction.suffix}
        </div>`;
        this.props.setModal({
            modalHeaderText: helpUpdateHeader,
            modalText: bodyModal,
            openModalStatus: true,
            modalSize: 'large',
            modalChildComponent: null
        });
    }
    updateIsMobile () {
        this.props.setIsMobileStatus({ width: window.innerWidth, height: window.innerHeight });
    }
    isShowBackButton () {
        return !!this.props.location.pathname.split('/')[2];
    }
    /*
    ignoreBusinessSelect.indexOf(this.props.location.pathname) < 0 &&
        (!isMobile ||
        (isMobile && businessTitles.length > 1)
    */
    isShowBusinessSelect (isMobile, selectedBusinessTitle, businessTitles) {
        if (!(ignoreBusinessSelect.indexOf(this.props.location.pathname) < 0) &&
            (businessTitles.length > 1)
        ) {

            businessTitles.sort(function(a, b){
             var nameA=a.label.toLowerCase(), nameB=b.label.toLowerCase();
               if (nameA < nameB) //sort string ascending
                return -1;
               if (nameA > nameB)
                return 1;
               return 0; //default return value (no sorting)
            });
            return (
                <Fragment>
                    <p className='select-title'>Select business to manage:</p>
                    <Select
                        name='form-field-name'
                        className='businessSelect'
                        value={selectedBusinessTitle}
                        onChange={this.handleChangeBusiness}
                        options={businessTitles}
                        clearable={false}
                    />
                </Fragment>
            );
        } else if (isMobile && businessTitles.length > 1 && !(ignoreBusinessSelect.indexOf(this.props.location.pathname) < 0)) {
            return (
                <Fragment>
                    <p className='select-title'>Select business to manage:</p>
                    {this.renderRadioBusiness(businessTitles, selectedBusinessTitle)}
                </Fragment>
            );
        } else {
            return null;
        }
    }
    isShowMemberWidgetBottom () {
        return !(ignoreMemberWidgetBottom.indexOf(this.props.location.pathname) < 0);
    }
    isShowServicesLink () {
        return !(addServicesLink.indexOf(this.props.location.pathname) < 0);
    }
    renderRadioBusiness (businessTitles, selectedTitle) {
        return (
            <div className='radio-group'>
                {businessTitles.map((item, index) => {
                    return (<RadioButton
                        key={index}
                        checked={selectedTitle.value === item.value}
                        value={item.value}
                        label={item.label}
                        callbackChange={this.handleChangeRadioBusiness}
                    />);
                })}
            </div>
        );
    }
    generateProfessionList () {
        const mainProfession = _get(this.props, 'accountState.accountInfo.mainProfession', '') || '';
        return professions.sort(function (a, b) {
            return mainProfession.toLowerCase() === 'conveyancing' ? b.toLowerCase() === mainProfession.toLowerCase() : b.toLowerCase() === mainProfession.toLowerCase() + 's';
        });
    }
    setMasqUser(e) {
      this.setState({
        masqUser: e
      });
    }
    masqTheUser() {
      console.log(this.state.masqUser);
      this.props.masqTheUser(this.state.masqUser,this.props.history);
    }
    switchBack() {
      this.props.switchBackTheUser(this.props.history);
    }
    render () {
        const {
            isMobile,
            selectedBusinessTitle,
            businessTitles,
            modal,
            masqbuttonstatus,
            masqtouser,
            errGetMasqUserMessage
        } = this.props.selectState;
        const { accountInfo } = this.props.accountState;
        const upgradeLink = _get(accountInfo, 'upgradeAction.data.link', '');
        const { loginName, roles } = accountInfo;
        const mainProfession = _get(this.props, 'accountState.accountInfo.mainProfession', '') || '';
        const logoClass = getSiteLogo(mainProfession.toLowerCase());
        const adminToken = auth.getAdminAccessToken();
        //console.log("error message : ");
        //console.log(errGetMasqUserMessage);

        //console.log(accountInfo);
        if (this.state.hasError) {
            return <TechnicalSupportMessage />;
        } else {
            if(mainProfession && this.canDoMasq(accountInfo.roles) !== true) {
            return (
                <div className='select-view'>
                    { loginName && loginName.length
                        ? <Modal
                            modalHeaderText={modal.modalHeaderText}
                            modalText={modal.modalText}
                            openModalStatus={modal.openModalStatus}
                            modalSize={modal.modalSize}
                            closeModal={this.closeModal}
                        /> : null
                    }
                    {ignoreTopPartHeader.indexOf(this.props.location.pathname) < 0
                     ? <div className={`top-part-dashboard ${adminToken ? 'it_is_masq_action' : ''}`}>
                          <div className='row'>
                              <div className='container'>
                                  <div className='col-md-12 nav-mobile-wrap'>
                                     {this.isShowBackButton()
                                         ? <span><Link to='/dashboard' className='back-home-link nav-item'>Home</Link>
                                           <span>
                                           {this.isShowServicesLink()
                                              ? <Link to='/dashboard/manage-services' className='back-services-link nav-item'>Services</Link>
                                              : null
                                           }
                                           </span>
                                           </span>
                                         : null
                                     }
                                     {/*<a href='javascript:void(0)' className='logout-btn nav-item' onClick={this.logOut} >Log out</a>*/}
                                      <a href='javascript:void(0)' className='logout-btn nav-item' onClick={this.logOut} >Logout</a>
                                 </div>
                              </div>
                          </div>
                          <div className='row'>
                              <div className='container'>
                                  <div className='col-md-12 top-dashboard--container'>
                                      <h3 className='title-dashboard'>
                                          <span className='first-line'>
                                          { !ignoreTopTitle.indexOf(this.props.location.pathname)
                                            ? null//'My ' + this.formatTitle(this.props.location.pathname)
                                            : this.isShowBackButton()
                                                ? <div className='desktopTopBackButton'>
                                                    <Link to='/dashboard' className='back-home-link nav-item'>Home</Link>
                                                    {this.isShowServicesLink()
                                                      ? <Link to='/dashboard/manage-services' className='back-services-link nav-item'>Manage Services</Link>
                                                      : null
                                                    }
                                                  </div>
                                                : null
                                          }

                                              <span className='logo-head' />
                                          </span>
                                      </h3>

                                      <a href='javascript:void(0)' className='logout-btn nav-item topright' onClick={this.logOut} >Logout</a>
                                  </div>
                                  <div className='col-md-9 masq-section'>
                                    {this.canDoMasq(accountInfo.roles) //loginName  === 'simon3c'
                                        ? <div className='masq-wrapper'>
                                            <label>I WANT TO MASQUERADE AS:</label><br/>
                                            <Autocomplete
                                            value={this.state.value}
                                            wrapperProps={{className: 'autocomplete-wrapper'}}
                                            inputProps={{ id: 'states-autocomplete' }}
                                            items={this.state.unitedStates}
                                            getItemValue={(item) => item.label}
                                            onSelect={(value, state) => this.setState({ value: value, masqUser: value ,unitedStates: [state] }) }
                                            onChange={(event, value) => {
                                              this.setState({ value: value, masqUser: value, loading: true, unitedStates: [] });
                                              clearTimeout(this.requestTimer);
                                              if(value.length > 0) {
                                                this.requestTimer = fetch(`${__API__}/api/v1.1/users?fields=loginName&filter[loginName][value]=${value}&filter[loginName][operator]=STARTS_WITH`, {
                                                    method: 'GET',
                                                    mode: 'cors',
                                                    headers: {
                                                        'Content-Type': 'application/drupal.single+json; charset=utf-8',
                                                        'Accept': 'application/json',
                                                        'access-token': auth.getAccessToken()
                                                    }
                                                }).then(res => res.json())
                                                  .then((json) => {
                                                    const udataItems = [];
                                                    json.data.map(async(item,index) => {
                                                        udataItems.push({
                                                          label: item.loginName
                                                        });
                                                    });
                                                    console.log(udataItems);
                                                    this.setState({ unitedStates: udataItems, loading: false });
                                                  });
                                              }
                                            }}
                                            renderItem={(item, isHighlighted) => (
                                              item.header ?
                                                <div
                                                  className="item item-header"
                                                  key={item.header}
                                                >{item.header}</div>
                                                : <div
                                                  className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                                                  key={item.label}
                                                >{item.label}</div>
                                            )}
                                            renderMenu={(items, value) => (
                                              <div className="menu">
                                                {value === '' ? (
                                                  <div className="item">start typing username...</div>
                                                ) : this.state.loading ? (
                                                  <div className="item">Loading...</div>
                                                ) : items.length === 0 ? (
                                                  <div className="item">No matches for {value}</div>
                                                ) : items}
                                              </div>
                                            )}
                                            isItemSelectable={(item) => true}
                                          />
                                          <a className='btn' onClick={this.masqTheUser} >submit</a>
                                          {masqbuttonstatus === true
                                            ? <Spinner />
                                            : null
                                          }
                                          {errGetMasqUserMessage
                                            ? <span className='masq-user-not-exist'>{errGetMasqUserMessage}</span>
                                            : null
                                          }
                                        </div>
                                      : null
                                    }
                                    {adminToken
                                      ? <p className='masq-as-wrapper'>
                                        <span className='masq-as'>Masquerading as {masqtouser}</span><br/>
                                        <span className='switch-back-masq' onClick={this.switchBack}>Switch back to Your account</span></p>
                                      : null
                                    }
                                  </div>
                                  <div className='col-md-5 text-align-right nav-wrapper'>
                                      {this.props.accountState.memberStatus === 'non-upgraded'
                                          ? <div className='item-menu update-item margin-r-20'>
                                              <a href={upgradeLink} target='_blank' rel='noopener noreferrer'>
                                                  UPGRADE
                                              </a>
                                              <span className='glyphicon glyphicon-question-sign' onClick={this.showUpdatePopUp} />
                                          </div>
                                          : null
                                      }
                                      <div className='item-menu'>
                                          <Link to='/dashboard/account'>ACCOUNT</Link>
                                      </div>
                                      <div className='item-menu'>
                                          <Link to=''>HELP</Link>
                                      </div>
                                  </div>
                                  <div className='col-md-3'>
                                     <span className={`logo logo_surveyor`}><Link to='/'>Logo</Link></span>
                                  </div>
                              </div>
                          </div>
                          <div className='row'>
                              <div className='col-md-12'>
                                  <MemberWidget
                                      memberAccountData={accountInfo}
                                      showBottomPart={this.isShowMemberWidgetBottom()}
                                      professions={this.generateProfessionList()}
                                      isMobile={isMobile}
                                      location={this.props.location}
                                  />
                              </div>
                          </div>
                          {this.canSeeContent(accountInfo.roles)
                           ? <div className='row'>
                              <div className='container'>
                                  <div className='col-xs-12 col-sm-6 col-md-6 topBusinessTitle'>
                                      {!(ignoreBusinessSelect.indexOf(this.props.location.pathname) < 0)
                                        ? this.isShowBusinessSelect(isMobile, selectedBusinessTitle, businessTitles)
                                        :
                                          ( businessTitles.length > 1
                                            ? <span><span className='businessNameOnly'>{selectedBusinessTitle.label}</span>
                                              <span
                                                  className='glyphicon glyphicon-question-sign'
                                                  onClick={() => this.props.setModal(businessModalConfig)}
                                              />
                                              </span>
                                            : null
                                          )

                                      }

                                  </div>
                                  <div className='col-sm-0 col-md-2' />
                                  <div className='col-xs-12 col-sm-6 col-md-4'>
                                      <span className='welcome-slogan'>
                                          {/*Welcome Back <span className='purple-color user-name-title'>{loginName}</span>
                                          <a href='javascript:void(0)' className='logout-btn' onClick={this.logOut} > (Logout)</a>*/}
                                      </span>
                                  </div>
                              </div>
                          </div>
                          : null
                        }
                      </div>
                      : null
                    }
                    {this.canSeeContent(accountInfo.roles)
                     ? <div>
                        {renderRoutes(this.props.route.routes)}
                      </div>
                     : null
                    }
                </div>
            );
          }else{
              if(this.canDoMasq(accountInfo.roles) === true) {
                let showBottom = false;
                return (
                  <div className='select-view'>
                  <div className='top-part-dashboard'>
                       <div className='row'>
                           <div className='container'>
                               <div className='col-md-12 top-dashboard--container'>
                                   <a href='javascript:void(0)' className='logout-btn nav-item topright' onClick={this.logOut} >Logout</a>
                               </div>
                               <div className='col-md-9 masq-section'>
                                 <div className='masq-wrapper'>
                                         <label>I WANT TO MASQUERADE AS:</label><br/>
                                         <Autocomplete
                                         value={this.state.value}
                                         wrapperProps={{className: 'autocomplete-wrapper'}}
                                         inputProps={{ id: 'states-autocomplete' }}
                                         items={this.state.unitedStates}
                                         getItemValue={(item) => item.label}
                                         onSelect={(value, state) => this.setState({ value: value, masqUser: value ,unitedStates: [state] }) }
                                         onChange={(event, value) => {
                                           this.setState({ value: value, masqUser: value, loading: true, unitedStates: [] });
                                           clearTimeout(this.requestTimer);
                                           if(value.length > 0) {
                                             this.requestTimer = fetch(`${__API__}/api/v1.1/users?fields=loginName&filter[loginName][value]=${value}&filter[loginName][operator]=STARTS_WITH`, {
                                                 method: 'GET',
                                                 mode: 'cors',
                                                 headers: {
                                                     'Content-Type': 'application/drupal.single+json; charset=utf-8',
                                                     'Accept': 'application/json',
                                                     'access-token': auth.getAccessToken()
                                                 }
                                             }).then(res => res.json())
                                               .then((json) => {
                                                 const udataItems = [];
                                                 json.data.map(async(item,index) => {
                                                     udataItems.push({
                                                       label: item.loginName
                                                     });
                                                 });
                                                 console.log(udataItems);
                                                 this.setState({ unitedStates: udataItems, loading: false });
                                               });
                                           }
                                         }}
                                         renderItem={(item, isHighlighted) => (
                                           item.header ?
                                             <div
                                               className="item item-header"
                                               key={item.header}
                                             >{item.header}</div>
                                             : <div
                                               className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                                               key={item.label}
                                             >{item.label}</div>
                                         )}
                                         renderMenu={(items, value) => (
                                           <div className="menu">
                                             {value === '' ? (
                                               <div className="item">start typing username...</div>
                                             ) : this.state.loading ? (
                                               <div className="item">Loading...</div>
                                             ) : items.length === 0 ? (
                                               <div className="item">No matches for {value}</div>
                                             ) : items}
                                           </div>
                                         )}
                                         isItemSelectable={(item) => true}
                                       />
                                       <a className='btn' onClick={this.masqTheUser} >submit</a>
                                       {masqbuttonstatus === true
                                         ? <Spinner />
                                         : null
                                       }
                                       {errGetMasqUserMessage
                                         ? <span className='masq-user-not-exist'>{errGetMasqUserMessage}</span>
                                         : null
                                       }
                                     </div>

                                 {adminToken
                                   ? <p className='masq-as-wrapper'>
                                     <span className='masq-as'>Masquerading as {masqtouser}</span><br/>
                                     <span className='switch-back-masq' onClick={this.switchBack}>Switch back to Your account</span></p>
                                   : null
                                 }
                               </div>

                               <div className='col-md-3'>
                                  <span className={`logo logo_surveyor`}><Link to='/'>Logo</Link></span>
                               </div>
                           </div>
                       </div>
                       <div className='row'>
                           <div className='col-md-12'>
                             <div className={`member-info-header header magenta-bg`}>
                                 <div className='container'>
                                   <div className={`flex-member-top ${!isMobile ? 'floatL' : null}`}>
                                       <div className='member-row'>
                                           <span className='row-title'>Member</span> : <span>{accountInfo.firstName} {accountInfo.lastName}</span>
                                       </div>
                                   </div>
                                 </div>
                             </div>
                           </div>
                       </div>
                     </div>
                     </div>
                   );
              }else{
                return (
                    <Spinner />
                );
              }
          }
        }
    }
}

SelectWrapperView.propTypes = {
    route: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    selectState: PropTypes.object.isRequired,
    accountState: PropTypes.object.isRequired,
    setIsMobileStatus: PropTypes.func.isRequired,
    //
    afterChangeBusiness: PropTypes.func.isRequired,
    setSelectedBusinessTitle: PropTypes.func.isRequired,
    // modal actions
    setModal: PropTypes.func.isRequired,
    //
    logOut: PropTypes.func.isRequired
};

export default SelectWrapperView;
