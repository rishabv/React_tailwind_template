import auth from '../../../helpers/auth';
import fetch from 'isomorphic-fetch';
import _get from 'lodash/get';
import objectWithProps from '../../../helpers/objectWithProps';

import {
    setAccountInfo,
    setIsAdmin,
    setMemberStatus
} from '../../account/modules/account';

const mobileSize = {
    maxWidth: 1024,
    maxHeight: 1024
};

export const GLOBAL_SET_IS_MOBILE_STATUS = 'GLOBAL_SET_IS_MOBILE_STATUS';
// MODAL ACTIONS
export const SELECT_TOP_SET_MODAL = 'SELECT_TOP_SET_MODAL';
//
export const SELECT_TOP_SET_GET_ERR_USER_MESSAGE = 'SELECT_TOP_SET_GET_ERR_USER_MESSAGE';
export const SELECT_TOP_SET_ERR_MASQ_USER_MESSAGE = 'SELECT_TOP_SET_ERR_MASQ_USER_MESSAGE';
export const SELECT_TOP_SET_GET_ERR_SERVICE_MESSAGE = 'SELECT_TOP_SET_GET_ERR_SERVICE_MESSAGE';
export const SELECT_TOP_SET_BUSINESS_TITLES = 'SELECT_TOP_SET_BUSINESS_TITLES';
export const SELECT_TOP_SET_SELECTED_BUSINESS_TITLE = 'SELECT_TOP_SET_SELECTED_BUSINESS_TITLE';
export const SELECT_TOP_SET_SELECTED_BUSINESS_ITEM = 'SELECT_TOP_SET_SELECTED_BUSINESS_ITEM';

export const SELECT_TOP_WAITING_BUSINESS = 'SELECT_TOP_WAITING_BUSINESS';

export const SELECT_TOP_RESET_STATE = 'SELECT_TOP_RESET_STATE';
export const SELECT_NOT_MEMBER_ERROR = 'SELECT_NOT_MEMBER_ERROR';
export const SELECT_MASQ_BUTTON_STATUS = 'SELECT_MASQ_BUTTON_STATUS';
export const SELECT_MASQ_TO_USER = 'SELECT_MASQ_TO_USER';
export const SELECT_SET_SYSTEM_SETTINGS = 'SELECT_SET_SYSTEM_SETTINGS';

export function setSytemSettings (data) {
    return {
        type: SELECT_SET_SYSTEM_SETTINGS,
        payload: data
    };
}
export function setIsMobileStatus (data) {
    return {
        type: GLOBAL_SET_IS_MOBILE_STATUS,
        payload: data
    };
}
export function setMasqButtonStatus (data) {
    return {
        type: SELECT_MASQ_BUTTON_STATUS,
        payload: data
    };
}
export function setMasqToUser (data) {
    return {
        type: SELECT_MASQ_TO_USER,
        payload: data
    };
}
export function setErrMasqUserMessage (value) {
    return {
        type: SELECT_TOP_SET_ERR_MASQ_USER_MESSAGE,
        payload: value
    };
}
export function setErrGetUserMessage (value) {
    return {
        type: SELECT_TOP_SET_GET_ERR_USER_MESSAGE,
        payload: value
    };
}
export function setErrGetServiceMessage (value) {
    return {
        type: SELECT_TOP_SET_GET_ERR_SERVICE_MESSAGE,
        payload: value
    };
}
// MODAL ACTIONS CREATOR's
export function setModal (data) {
    return {
        type: SELECT_TOP_SET_MODAL,
        payload: data
    };
}
//
export function setBusinessTitles (data) {
    return {
        type: SELECT_TOP_SET_BUSINESS_TITLES,
        payload: data
    };
}

export function setSelectedBusinessTitle (title) {
    return {
        type: SELECT_TOP_SET_SELECTED_BUSINESS_TITLE,
        payload: title
    };
}

export function setSelectedBusinessItem (data) {
    return {
        type: SELECT_TOP_SET_SELECTED_BUSINESS_ITEM,
        payload: data
    };
}
export function setWaitingBusiness (value) {
    return {
        type: SELECT_TOP_WAITING_BUSINESS,
        payload: value
    };
}
export function resetState () {
    return {
        type: SELECT_TOP_RESET_STATE
    };
}

export function logOut (history) {
    return async (dispatch) => {
        const token = auth.getAccessToken();
        if (token) {
            document.cookie = '';
            await auth.resetLoginStore();
            await dispatch(resetState());
            await history.push('/login');
        }
    };
}

export function getUser () {
    return async (dispatch, getState) => {
        await dispatch(setErrGetUserMessage(''));
        const token = auth.getAccessToken();
        if (token) {
            try {
                let result = await fetch(`${__API__}/api/v1.1/users/me`, {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/vnd.api+json; charset=utf-8',
                        'Accept': 'application/json',
                        'access-token': token
                    }
                });
                let json = await result.json();
                if (result.status === 401) { // || result.status === 422) {
                    await dispatch(logOut());
                } else {
                    if (Object.keys(json.data[0]).length) {
                        if (json.data[0].business.length) {
                            let sbt = getState().selectState.selectedBusinessTitle;
                            if(sbt.value === 'none') {
                              console.log(sbt);
                              console.log("M here in changing business on get user");
                              await dispatch(setBusinessTitles(json.data[0].business));
                              // first load business on the dashboard
                              const selectedBusinessPostalCode = _get(json.data[0].business[0], 'postCode.postalCode', false) ? `| ${_get(json.data[0].business[0], 'postCode.postalCode')}` : '';
                              const selectedBusinessUninvoicedFees = _get(json.data[0].business[0], 'uninvoicedFees', false) ? `${_get(json.data[0].business[0], 'uninvoicedFees')}` : '';
                              await dispatch(afterChangeBusiness(
                                  {
                                      value: json.data[0].business[0].uuid,
                                      label: `${json.data[0].business[0].name} ${selectedBusinessPostalCode} | ${selectedBusinessUninvoicedFees}`
                                  }
                              ));
                          }
                        }
                        const foundMember = _get(json.data[0], 'status', '');
                        //check if only member or not
                        /*if(_get(json.data[0], 'roles', []).indexOf('member') < 0) {
                          dispatch(setErrGetUserMessage('non-member'));
                          await dispatch(logOut());
                        }*/
                        // check user is admin;
                        dispatch(setIsAdmin(_get(json.data[0], 'roles', []).indexOf('administrator') >= 0));

                        // check is test member
                        dispatch(setMemberStatus(foundMember));
                        //console.log("this is found member: "+ foundMember);
                        //
                        await dispatch(setAccountInfo(objectWithProps(
                            json.data[0], [
                                'id',
                                'accountNumber',
                                'alterTelephone',
                                'accountName',
                                'mainTelephone',
                                'firstName',
                                'lastName',
                                'uuid',
                                'mail',
                                'loginName',
                                'status',
                                'mainProfession',
                                'roles',
                                'subscribeNewsletters',
                                'balanceForThisPeriod',
                                'accountAddress',
                                'plannedContacts',
                                'upgradeAction'
                            ])
                        ));
                        // get user for add call select
                        await dispatch(getUsersSelectedByRole());
                        // get planned calls
                        dispatch(addPlannedCallCollection(json.data[0].plannedContacts));
                    } else {
                        await dispatch(setErrGetUserMessage('Can not get user info'));
                    }
                }
            } catch (e) {
                await dispatch(setErrGetUserMessage('Something went wrong'));
            }
        } else {
            await dispatch(setErrGetUserMessage('User info is not access'));
        }
    };
}

export function switchBackTheUser(history) {
  return async (dispatch, getState) => {
      const token = auth.getAccessToken();
      const refreshToken = auth.getRefreshoken();
      const adminToken = auth.getAdminAccessToken();
      const adminCSRF = auth.getAdminCSRFToken();
      const adminRefresh = auth.getAdminRefreshoken();
      const CSRF = auth.getCSRFToken();

      if(adminToken) {
        await auth.setTokens(adminToken, auth.adminRefresh, adminCSRF);
        await auth.resetAdminLoginStore();
        await dispatch(getUser());
        await dispatch(setMasqToUser(''));
        await history.push('/');
      }
  };
}

export function masqTheUser(username,history) {
  return async (dispatch, getState) => {
      await dispatch(setMasqButtonStatus(true));
      const token = auth.getAccessToken();
      console.log('username to masq is : ' + username);
      if (token) {
        const userUUID = await getState().accountState.accountInfo.uuid;
        const data = {
            to_username: username,
            my_userUUID: userUUID
        };
          try {
              let result = await fetch(`${__API__}/api/v1.2/users`, {
                  method: 'POST',
                  mode: 'cors',
                  headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json',
                      'access-token': token
                  },
                  body: JSON.stringify(data)
              });
              let json = await result.json();
              if(json.token && json.uid) {
                let resultCSRF = await fetch(`${__API__}/api/session/token`, {
                    method: 'GET',
                    mode: 'cors',
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'Accept': 'application/json',
                        'access-token': json.token
                    }
                });
                let jsonCSRF = await resultCSRF.json();
                console.log(jsonCSRF['X-CSRF-Token']);
                if(jsonCSRF['X-CSRF-Token']) {
                  await auth.setAdminTokens(auth.getAccessToken(), auth.getRefreshoken(), auth.getCSRFToken());
                  await auth.setTokens(json.token, '', jsonCSRF['X-CSRF-Token']);
                  await dispatch(setMasqToUser(json.username));
                  await dispatch(getUser());
                  await dispatch(setMasqButtonStatus(false));
                  await dispatch(setErrMasqUserMessage(''));
                  //await history.push('/');
                  //window.location.reload();
                }
              }else{
                  await dispatch(setMasqButtonStatus(false));
                  await dispatch(setErrMasqUserMessage('User does not exist.'));
              }

          } catch (e) {
              await dispatch(setErrGetUserMessage('Something went wrong'));
          }
      } else {
          await dispatch(setErrGetUserMessage('User info is not access'));
      }
  };
}

export function getSystemSettings () {
    return async (dispatch) => {
        const token = auth.getAccessToken();
        if (token) {
            try {
                let result = await fetch(`${__API__}/api/v1.0/settings`, {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/drupal.single+json; charset=utf-8',
                        'Accept': 'application/json',
                        'access-token': token
                    }
                });
                let json = await result.json();
                console.log('System Settings');
                console.log(json);
                if(json) {
                  await dispatch(setSytemSettings(json));
                }

            } catch (e) {
                await dispatch(setErrGetUserMessage('Something went wrong went wrong'));
                console.log(e);
            }
        } else {
            await dispatch(setErrGetUserMessage('Your access token is not available'));
        }
    };
}

export function getBusinessByUUID (uuid) {
    return async (dispatch) => {
        const token = auth.getAccessToken();
        if (token) {
            try {
                let result = await fetch(`${__API__}/api/v1.1/business/${uuid}`, {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/drupal.single+json; charset=utf-8',
                        'Accept': 'application/json',
                        'access-token': token
                    }
                });
                let json = await result.json();
                console.log('business details');
                console.log(json);
                if (Object.keys(json.data[0]).length) {
                    // keyInfo dashboard update
                    const selectedBusinessItem = objectWithProps(json.data[0], ['website', 'dateJoined', 'serviceLimit']);
                    dispatch(setSelectedBusinessItem(selectedBusinessItem));
                    dispatch(setServiceLimit(Number(selectedBusinessItem.serviceLimit)));
                    // update contact details
                    const businessDetails = objectWithProps(json.data[0],
                        [
                            'id',
                            'companyName',
                            'contactEmail',
                            'contactName',
                            'contactLastName',
                            'contactNumber',
                            'alternateContactNumber',
                            'smsContact',
                            'enabledSMS',
                            'address',
                            'companyDescription',
                            'personnelQualifications',
                            'specialSMS',
                            'turnaround',
                            'coRegistration',
                            'vatNumber',
                            'businessLogo',
                            'website',
                            'business_postcode_limit'
                        ]
                    );
                    dispatch(setBusinessDetailsData(businessDetails));
                    // directory details update
                    const directoryDetails = objectWithProps(json.data[0], ['companyName', 'directoryText', 'directoryImage', 'directoryType']);
                    dispatch(setDirectoryDetailsData(directoryDetails));
                    dispatch(setSelectedEmptyImage(directoryDetails.directoryImage.length));
                    if (businessDetails.businessLogo && businessDetails.businessLogo.image_styles) {
                        dispatch(setPrevLogo(businessDetails.businessLogo.image_styles.medium));
                    } else {
                        dispatch(setPrevLogo(null));
                    }
                    dispatch(setCurrentTotal(_get(json.data[0], 'invoicedFees', '£0.00') || '£0.00'));
                    dispatch(setUninvoicedFees(_get(json.data[0], 'uninvoicedFees', '0.00') || '0.00'));
                    dispatch(setUninvoicedLeads(_get(json.data[0], 'uninvoicedLeads', '£0.00') || '£0.00'));
                    dispatch(setUninvoicedDiscount(_get(json.data[0], 'uninvoicedDiscount', '0.00') || '0.00'));
                    dispatch(setInvoicedFeesAverage(_get(json.data[0], 'invoicedFeesAverage', '0.00') || '0.00'));
                    dispatch(setInvoicedFeesExvat(_get(json.data[0], 'invoicedFeesExvat', '0.00') || '0.00'));
                    dispatch(setInvoicedVat(_get(json.data[0], 'invoicedVat', '0.00') || '0.00'));
                    //dispatch(setinvoicedFeesExvatAverage(_get(json.data[0], 'invoicedFeesExvatAverage', '0.00') || '0.00'));
                } else {
                    await dispatch(setErrGetUserMessage('You does not have any business'));
                }
            } catch (e) {
                await dispatch(setErrGetUserMessage('Something went wrong went wrong'));
                console.log(e);
            }
        } else {
            await dispatch(setErrGetUserMessage('Your access token is not available'));
        }
    };
}

export function getServiceByUUID (uuid) {
    return async (dispatch) => {
        const token = auth.getAccessToken();
        if (token) {
            dispatch(setWaitingBusiness(true));
            try {
                let result = await fetch(`${__API__}/api/v1.0/business/${uuid}`, {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'access-token': token
                    }
                });
                let json = await result.json();
                console.log('m i here to call as service');
                console.log(json);
                if (json.data[0].service.length) {
                    const service = _get(json, 'data[0].service', []);
                    await dispatch(setService(service));
                    // suspend for all leads block
                    dispatch(updateSuspendBlockForAll(service));
                    //
                    await dispatch(afterBusinessChangeServicesCallback(service));
                    dispatch(getDetailedServiceByServiceUUID(service[0].uuid));
                    // get postcodes by service UUID
                    dispatch(getPostcodesByService(service[0].uuid));
                    dispatch(setErrGetServiceMessage(''));
                } else {
                    dispatch(setErrGetServiceMessage('You does not have any business'));
                    dispatch(afterBusinessChangeServicesCallback([]));
                    dispatch(setService([]));
                    dispatch(afterBusinessChangeServicesCallback([]));
                }

                await dispatch(setFeedback(json.data[0].feedback.length && json.data[0].feedback ? json.data[0].feedback : []));
            } catch (e) {
                dispatch(setErrGetServiceMessage('Something went wrong went wrong'));
                dispatch(afterBusinessChangeServicesCallback([]));
                dispatch(setService([]));
                console.log(e);
            }
        } else {
            await dispatch(setErrGetServiceMessage('Your access token is not available'));
            await dispatch(afterBusinessChangeServicesCallback([]));
            await dispatch(setService([]));
        }
        await dispatch(setWaitingBusiness(false));
    };
}

export function afterChangeBusiness (selectedOption) {
    return async (dispatch, getState) => {
        const isMobile = getState().selectState.isMobile;
        const mobileRequests = () => {
            if (isMobile) {
                dispatch(getAllInvoices({ range: 5 }));
            }
        };
        let getAll = () => {
            Promise.all([
                dispatch(setSelectedBusinessTitle(selectedOption)),
                dispatch(getInvoicesCount()),
                mobileRequests(),
                dispatch(getLeadsByBusinessUUID(selectedOption.value, isMobile)),
                dispatch(getPostcodeSetsByBusinessUUID(selectedOption.value)),
                dispatch(getPostcodesBoxDataByBusinessUUID(selectedOption.value)),
                dispatch(getAllServices(selectedOption.value))
            ]);
        };
        dispatch(getBusinessByUUID(selectedOption.value));
        getAll();
        dispatch(getServiceByUUID(selectedOption.value));
    };
}

export function firstLoadBusiness (selectedOption) {
    return async (dispatch, getState) => {
        const isMobile = getState().selectState.isMobile;
        const mobileRequests = () => {
            if (isMobile) {
                dispatch(getAllInvoices({ range: 5 }));
            }
        };
        let getAll = () => {
            Promise.all([
                dispatch(setSelectedBusinessTitle(selectedOption)),
                dispatch(getInvoicesCount()),
                mobileRequests(),
                dispatch(getLeadsByBusinessUUID(selectedOption.value, isMobile)),
                dispatch(getPostcodeSetsByBusinessUUID(selectedOption.value)),
                dispatch(getPostcodesBoxDataByBusinessUUID(selectedOption.value)),
                dispatch(getAllServices(selectedOption.value))
            ]);
        };
        dispatch(getBusinessByUUID(selectedOption.value));
        getAll();
        dispatch(getServiceByUUID(selectedOption.value));
    };
}

export const actions = {
    setIsMobileStatus,
    setSelectedBusinessTitle,
    //
    logOut,
    // modal actions
    setModal,
    //
    afterChangeBusiness,
    masqTheUser,
    switchBackTheUser,
    getSystemSettings
};

const ACTION_HANDLERS = {
    [SELECT_SET_SYSTEM_SETTINGS]: (state, action) => {
        return {
            ...state,
            systemSettings: action.payload
        };
    },
    [SELECT_MASQ_BUTTON_STATUS]: (state, action) => {
        return {
            ...state,
            masqbuttonstatus: action.payload
        };
    },
    [SELECT_MASQ_TO_USER]: (state, action) => {
        return {
            ...state,
            masqtouser: action.payload
        };
    },
    [GLOBAL_SET_IS_MOBILE_STATUS]: (state, action) => {
        return {
            ...state,
            isMobile: action.payload.width <= mobileSize.maxWidth
        };
    },
    [SELECT_TOP_SET_GET_ERR_USER_MESSAGE]: (state, action) => {
        return {
            ...state,
            errGetUserMessage: action.payload
        };
    },
    [SELECT_TOP_SET_ERR_MASQ_USER_MESSAGE]: (state, action) => {
        return {
            ...state,
            errGetMasqUserMessage: action.payload
        };
    },
    [SELECT_TOP_SET_GET_ERR_SERVICE_MESSAGE]: (state, action) => {
        return {
            ...state,
            errGetServiceMessage: action.payload
        };
    },
    // MODAL REDUCER's
    [SELECT_TOP_SET_MODAL]: (state, action) => {
        return {
            ...state,
            modal: {
                ...initialState.modal,
                ...action.payload
            }
        };
    },
    //
    [SELECT_TOP_SET_BUSINESS_TITLES]: (state, action) => {
        let newBusinessTitles = action.payload.map(function (item) {
            const postalCode = _get(item, 'postCode.postalCode', false) ? `| ${_get(item, 'postCode.postalCode')}` : '';
            const uninvoicedFees = _get(item, 'uninvoicedFees', false) ? `${_get(item, 'uninvoicedFees')}` : '';
            return {
                value: item.uuid,
                label: `${item.name} ${postalCode} | ${uninvoicedFees}` //
            };
        });
        return {
            ...state,
            businessTitles: newBusinessTitles
        };
    },
    [SELECT_TOP_SET_SELECTED_BUSINESS_TITLE]: (state, action) => {
        return {
            ...state,
            selectedBusinessTitle: action.payload
        };
    },
    [SELECT_TOP_SET_SELECTED_BUSINESS_ITEM]: (state, action) => {
        return {
            ...state,
            selectedBusinessItem: action.payload
        };
    },
    [SELECT_TOP_WAITING_BUSINESS]: (state, action) => {
        return {
            ...state,
            waitingBusiness: action.payload
        };
    },
    [SELECT_TOP_RESET_STATE]: () => {
        return {
            ...initialState
        };
    }
};

const initialState = {
    isMobile: false,
    businessTitles:[{ value: 'none', label: 'none' }],
    selectedBusinessTitle:{ value: 'none', label: 'none' },
    selectedBusinessItem: {
        website : {
            url: null
        },
        dataJoined: null
    },
    errGetServiceMessage: '',
    errGetUserMessage: '',
    modal: {
        modalHeaderText: '',
        modalText: '',
        openModalStatus: false,
        modalSize: 'small',
        modalChildComponent: null
    },
    waitingBusiness: false,
    masqbuttonstatus: false,
    masqtouser: '',
    errGetMasqUserMessage: ''
};

export default function selectReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
