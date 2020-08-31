import React from 'react';
import PropTypes from 'prop-types';
import './CheckBox.scss';

class Checkbox extends React.PureComponent {
    render () {
        return (
            <div className={`material-checkbox ${this.props.disable ? 'disable-checkbox' : ''}`}>
                <span className='checkbox-wrapper'>
                    <input type='checkbox' id={this.props.id} checked={!!this.props.checked}
                        onChange={() => this.props.onChange(this.props.index)} disabled={this.props.disable} />
                    <label htmlFor={this.props.id}>
                        <span className='checkbox-icon' />
                        {this.props.title}
                    </label>
                </span>
            </div>
        );
    }
}

Checkbox.propTypes = {
    id: PropTypes.string.isRequired,
    index: PropTypes.any.isRequired,
    disable: PropTypes.bool,
    checked: PropTypes.any,
    title: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

export default Checkbox;
