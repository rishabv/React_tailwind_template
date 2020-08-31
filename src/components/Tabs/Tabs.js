import React from 'react';
// import { IndexLink, Link } from 'react-router';
import { NavLink } from 'react-router-dom';
import './Tabs.scss';

export const Tabs = (props) => {
    return <div className='tab-container'>
        <NavLink to='/admin/responses' activeClassName='route--active'>
            Responses
        </NavLink>
        <NavLink to='/admin/invitations' activeClassName='route--active'>
            Invitations
        </NavLink>
        <NavLink to='/admin/config' activeClassName='route--active'>
            Configuration
        </NavLink>
    </div>;
};

export default Tabs;
