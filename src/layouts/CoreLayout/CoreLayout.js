import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import { Link } from 'react-router-dom';
import auth from '../../helpers/auth';
import './CoreLayout.scss';
import '../../styles/core.scss';
import { Redirect } from 'react-router';


export const CoreLayout = ({ children, route }) => (
    <div className='wrapper'>
        { auth.isAuthenticated
            ? <div className='inner-wrapper'>
                <header className='main-header container'>
                    <div className='row'>
                        <div className='col-md-8' />
                    </div>
                </header>
                <div className='core-layout__viewport'>
                    {children}
                    {renderRoutes(route.routes)}
                </div>
            </div> : <Redirect to='/login' />}
    </div>
);

CoreLayout.propTypes = {
    children: PropTypes.element,
    route: PropTypes.object.isRequired
};

export default CoreLayout;