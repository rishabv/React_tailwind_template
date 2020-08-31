import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

export const SingButton = ({ children, onClick }) => {
    return (
        <div className='sing-in-button' onClick={onClick}>
            <div className='btn-body'>
                {children}
            </div>
        </div>
    );
};

SingButton.propTypes = {
    children: PropTypes.any,
    onClick: PropTypes.func.isRequired
};

export default SingButton;
