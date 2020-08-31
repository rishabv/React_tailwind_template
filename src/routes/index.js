// We only need to import the modules necessary for initial render
import React from 'react';
import CoreLayout from './../layouts/CoreLayout';
import LoginLayout from './../layouts/LoginLayout';
import ForgotLayout from './../layouts/ForgotLayout';
import SelectWrapper from './selectWrapper';
import Account from './account';
import Dashboard from './dashboard';
import ContactUs from './contactUs';
import Login from './login';
import Forgot from './forgot';
import Reset from './reset';
import Error404 from './Error404';
import { renderRoutes } from 'react-router-config';
import { Root } from './../layouts/Root';
import { Redirect } from 'react-router';
//import ChangePassword from './changePassword';

export const redirectRoute = () => (<Redirect to='/dashboard' />);
export const routes = [
    {
        component: Root,
        routes: [
            {
                path: '/',
                exact: true,
                component: redirectRoute
            },
            {
                path: '/dashboard',
                component: CoreLayout,
                routes: [
                    {
                        path: '/dashboard',
                        component: SelectWrapper,
                        routes: [
                            {
                                path: '/dashboard',
                                exact: true,
                                component: Dashboard
                            },
                            {
                                path: '/dashboard/contact-us',
                                exact: true,
                                component: ContactUs
                            },
                            {
                                path: '/dashboard/account',
                                exact: true,
                                component: Account
                            },
                            /*{
                                path: '/dashboard/change-password',
                                exact: true,
                                component: ChangePassword
                            },*/
                            {
                                path: '/dashboard/*',
                                component: Error404
                            }

                        ]
                    }
                ]
            },
            {
                path: '/login',
                component: LoginLayout,
                routes: [
                    {
                        path: '/login',
                        exact: true,
                        component: Login
                    },
                    {
                        path: '/login/:errorType',
                        component: Login
                    }
                ]
            },
            {
                path: '/forgot-password',
                component: ForgotLayout,
                routes: [
                    {
                        path: '/forgot-password',
                        exact: true,
                        component: Forgot
                    },
                    {
                        path: '/forgot-password/:errorType',
                        component: Forgot
                    }
                ]
            },
            {
                path: '/reset-password',
                component: ForgotLayout,
                routes: [
                    {
                        path: '/reset-password',
                        exact: true,
                        component: Reset
                    },
                    {
                        path: '/reset-password/:errorType',
                        component: Reset
                    }
                ]
            },
            {
                path: '*',
                component: CoreLayout,
                routes: [
                    {
                        path: '*',
                        component: Error404
                    }
                ]
            }
        ]
    }
];

/*  Note: Instead of using JSX, we recommend using react-router
 PlainRoute objects to build route definitions. */

export const createRoutes = () => {
    return renderRoutes(routes);
};

export default createRoutes;
