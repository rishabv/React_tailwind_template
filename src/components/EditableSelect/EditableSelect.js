import React from 'react';
import PropTypes from 'prop-types';
import Select from '../Select/Select';
import TechnicalSupportMessage from '../TechnicalSupportMessage/TechnicalSupportMessage';
import 'react-select/dist/react-select.css';
import './editableSelect.scss';
import _find from 'lodash/find';

const options = [{ value: true, label: 'Enabled' }, { value: false, label: 'Disabled' }];

export class EditableSelect extends React.PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            showInput: false,
            hasError: false,
            value: { label: 'none', value: 'none' },
            options: this.props.options ? this.props.options : options,
            statusTrue: '',
            statusFalse: ''
        };
        this.clickTitle = this.clickTitle.bind(this);
        this.blurSelect = this.blurSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidCatch () {
        this.setState({ hasError: true });
    }
    componentDidMount () {
        this.setState({
            value: _find(this.state.options, { value: this.props.status }),
            statusTrue: _find(this.state.options, { value: this.props.valueTrue }).label,
            statusFalse: _find(this.state.options, { value: this.props.valueFalse }).label
        });
    }
    componentWillReceiveProps (nextProps) {
        if (nextProps.onlyView !== this.props.onlyView) {
            this.setState({
                showInput: !nextProps.onlyView
            });
        }
    }
    clickTitle () {
        if (!this.props.onlyView) {
            this.setState({
                showInput : true
            });
            this._select.focus();
        }
    }
    blurSelect () {
        if (typeof this.props.onlyView === 'undefined') {
            this.setState({
                showInput : false
            });
        }
    }
    handleChange (selectedOption) {
        this.setState({
            value: selectedOption
        });
        this.props.changeCallback(selectedOption.value);
    }
    render () {
        if (this.state.hasError) {
            return (
                <div className='editable-input-container'>
                    <TechnicalSupportMessage />
                </div>
            );
        } else {
            return (
                <div className='editable-input-container'>
                    <span className='editable-title' style={{ display: this.state.showInput ? 'none' : 'block' }} onClick={this.clickTitle}>{this.props.status ? this.state.statusTrue : this.state.statusFalse}</span>
                    <Select
                        ref={(c) => { this._select = c }}
                        name='form-field-name'
                        className={this.state.showInput ? 'select-info show-select-info' : 'select-info hide-select-info'}
                        value={this.state.value}
                        onChange={this.handleChange}
                        onBlur={this.blurSelect}
                        options={this.state.options}
                        openOnFocus
                        clearable={false}
                    />
                </div>
            );
        }
    }
}

EditableSelect.propTypes = {
    status: PropTypes.bool,
    onlyView: PropTypes.bool,
    options: PropTypes.array,
    valueTrue: PropTypes.any.isRequired,
    valueFalse: PropTypes.any.isRequired,
    changeCallback: PropTypes.func.isRequired
};

export default EditableSelect;
