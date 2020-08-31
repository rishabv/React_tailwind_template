import React from 'react';
import PropTypes from 'prop-types';
import './RadioButton.scss';
import pure from 'recompose/pure';

export const RadioButton = ({ checked, value, label, callbackChange }) => {
    return (
        <label className='radio inline'>
            <input
                type='radio'
                name='sex'
                value={value}
                checked={checked}
                onChange={() => callbackChange({ value: value, label: label })}
            />
            <span>{label}</span>
        </label>
    );
};

RadioButton.propTypes = {
    checked: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    callbackChange: PropTypes.func.isRequired
};

export default pure(RadioButton);
