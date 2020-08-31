import auth from '../helpers/auth';
import moment from 'moment';

export const checkAuthDateMiddleware = history => store => next => action => {
    const newDate = new Date();
    const oldDate = auth.getDateLogin();
    const location = store.getState().router.location;
    let diff;
    if (oldDate) {
        const formattedOld = moment(oldDate).format();
        const formattedNew = moment(newDate).format();
        diff = moment(formattedNew).diff(formattedOld, 'hours');
    };
    const diffStatus = (typeof diff === 'number');
    if (!location || (!diffStatus && (location.pathname === '/login'))) {
        next(action);
    // TODO waiting session fix on the API
    // } else if ((!diffStatus || diff >= 24) && (action && action.type !== '@@router/LOCATION_CHANGE')) {
    } else if ((!diffStatus || diff >= 24)) {
        auth.resetLoginStore();
        // store.dispatch(history.push('/login'));
        window.location.href = '/login';
    } else {
        next(action);
    }
};

export default checkAuthDateMiddleware;
