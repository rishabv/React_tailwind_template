import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import auth from '../../helpers/auth';
import './ForgotLayout.scss';
import '../../styles/core.scss';
import { Redirect } from 'react-router';

export const ForgotLayout = ({ children, route }) => (
    <div className='wrapper-login'>

          <div>
                {children}
                {renderRoutes(route.routes)}
            </div>

    </div>
);

ForgotLayout.propTypes = {
    //children: PropTypes.element,
    //route: PropTypes.object.isRequired
};

export default ForgotLayout;
