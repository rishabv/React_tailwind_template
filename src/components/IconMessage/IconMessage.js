import React from 'react';
import PropTypes from 'prop-types';
import './IconMessage.scss';

export const IconMessage = ({ errType }) => {
    return (
        <div className={errType ? 'icon-message-container err-icon' : 'icon-message-container'}>
            {errType
                ? <svg version='1.1' viewBox='0 0 130.2 130.2'>
                    <circle className='path circle' cx='65.1' cy='65.1' fill='none' r='62.1' stroke='#D06079' strokeWidth='6' />
                    <line className='path line' fill='none' stroke='#D06079' strokeLinecap='round' strokeWidth='6' x1='34.4' x2='95.8' y1='37.9' y2='92.3' />
                    <line className='path line' fill='none' stroke='#D06079' strokeLinecap='round' strokeWidth='6' x1='95.8' x2='34.4' y1='38' y2='92.2' />
                </svg>
                : <svg version='1.1' viewBox='0 0 130.2 130.2'>
                    <circle className='path circle' cx='65.1' cy='65.1' fill='none' r='62.1' stroke='#73AF55' strokeWidth='6' />
                    <polyline className='path check' fill='none' points='100.2,40.2 51.5,88.8 29.8,67.5 ' stroke='#73AF55' strokeLinecap='round' strokeWidth='6' />
                </svg>
            }
        </div>
    );
};

IconMessage.propTypes = {
    errType: PropTypes.bool
};

export default IconMessage;
