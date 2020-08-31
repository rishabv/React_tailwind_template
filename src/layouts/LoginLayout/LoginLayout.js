import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import auth from '../../helpers/auth';
import './LoginLayout.scss';
import '../../styles/core.scss';
import { Redirect } from 'react-router';

export const LoginLayout = ({ children, route }) => (
    <div className='wrapper-login'>
        {!auth.isAuthenticated
            ? <div>
                {children}
                {renderRoutes(route.routes)}
            </div>
            : <Redirect to='/dashboard' />}
    </div>
);

LoginLayout.propTypes = {
    children: PropTypes.element,
    route: PropTypes.object.isRequired
};

export default LoginLayout;
