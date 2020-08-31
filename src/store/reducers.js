// app reducers
import selectWrapperReducer from './../routes/selectWrapper/modules/select';
import accountReducer from './../routes/account/modules/account';
import userReducer from '../routes/user/modules/user';
import contactUsReducer from './../routes/contactUs/modules/contactUs';
import authReducer from '../routes/login/modules/auth';
import error404Reducer from '../routes/Error404/modules/error';
import dashboardReducer from '../routes/dashboard/modules/dashboard';
import forgotReducer from '../routes/forgot/modules/forgot';
import resetReducer from '../routes/reset/modules/reset';
import changePasswordReducer from '../routes/changePassword/modules/changePassword';

//
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export const makeRootReducer = (asyncReducers) => {
    return combineReducers({
        router: routerReducer,
        selectState: selectWrapperReducer,
        accountState: accountReducer,
        dashboardState: dashboardReducer,
        userState: userReducer,
        contactUsState: contactUsReducer,
        auth: authReducer,
        page404: error404Reducer,
        forgotState: forgotReducer,
        resetState: resetReducer,
        changePasswordState: changePasswordReducer,
        ...asyncReducers
    });
};
export default makeRootReducer;
