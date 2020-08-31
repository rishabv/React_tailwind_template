import React from 'react';
import PropTypes from 'prop-types';
import './Tooltip.scss';
import pure from 'recompose/pure';

export const Tooltip = ({ message }) => {
    return (
        <div className='tooltip'>
            <div className='tooltip-arrow' />
            <div className='tooltip-inner'>
                {message}
            </div>
        </div>
    );
};

Tooltip.propTypes = {
    message: PropTypes.string.isRequired
};

export default pure(Tooltip);
