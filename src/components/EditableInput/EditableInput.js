import React from 'react';
import TechnicalSupportMessage from '../TechnicalSupportMessage/TechnicalSupportMessage';
import PropTypes from 'prop-types';
import './editableInput.scss';

export class EditableInput extends React.PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            showInput: false,
            hasError: false
        };
        this.clickTitle = this.clickTitle.bind(this);
        this.blurInput = this.blurInput.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.refocus = this.refocus.bind(this);
    }
    componentDidCatch () {
        this.setState({ hasError: true });
    }
    componentWillReceiveProps (nextProps) {
        if (nextProps.onlyView !== this.props.onlyView) {
            this.setState({
                showInput: !nextProps.onlyView
            }, this.refocus(!nextProps.onlyView && this.props.blurCallback));
        }
    }
    refocus (status) {
        if (status) {
            this._input.focus();
        }
    }
    clickTitle () {
        if (!this.props.onlyView) {
            this.setState({
                showInput : true
            });
            this._input.focus();
        }
    }
    blurInput () {
        if (typeof this.props.onlyView === 'undefined') {
            this.setState({
                showInput : false
            });
        } else if (this.props.blurCallback) {
            this.props.blurCallback(this.props.index);
        }
    }
    onChangeInput (e) {
        if (this.props.isArray) {
            this.props.changeCallback(e.target.value, this.props.index);
        } else {
            this.props.changeCallback(e.target.value);
        }
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
                    <span className='editable-title' style={{ display: this.state.showInput ? 'none' : 'block' }} onClick={this.clickTitle}>{this.props.title ? this.props.title : 'none'}</span>
                    <input type='text'
                        className={this.state.showInput ? 'input-info show-input-info' : 'input-info hide-input-info'}
                        ref={(c) => { this._input = c }}
                        onChange={this.onChangeInput}
                        onBlur={this.blurInput}
                        value={this.props.title ? this.props.title : ''}
                    />
                </div>
            );
        }
    }
}

EditableInput.propTypes = {
    title: PropTypes.string,
    onlyView: PropTypes.bool,
    isArray: PropTypes.bool,
    index: PropTypes.number,
    blurCallback: PropTypes.func,
    changeCallback: PropTypes.func.isRequired
};

export default EditableInput;
