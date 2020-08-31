import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';

export const CustomSelect = ({ name, value, className, onChange, options, openOnFocus, clearable }) => {
    return (
        <Select
            name={name}
            value={value}
            className={className}
            onChange={onChange}
            options={options}
            openOnFocus={openOnFocus}
            clearable={clearable}
        />
    );
};

CustomSelect.propTypes = {
    name: PropTypes.string,
    value: PropTypes.object,
    className: PropTypes.string,
    options: PropTypes.array.isRequired,
    openOnFocus: PropTypes.bool,
    clearable: PropTypes.bool,
    onChange: PropTypes.func.isRequired
};

export default pure(CustomSelect);
