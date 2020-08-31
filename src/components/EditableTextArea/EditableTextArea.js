import React from 'react';
import TechnicalSupportMessage from '../TechnicalSupportMessage/TechnicalSupportMessage';
import PropTypes from 'prop-types';
import './editableTextArea.scss';

export class EditableTextArea extends React.PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            showTextArea: false,
            hasError: false
        };
        this.clickTitle = this.clickTitle.bind(this);
        this.blurInput = this.blurInput.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
    }
    componentDidCatch () {
        this.setState({ hasError: true });
    }
    componentWillReceiveProps (nextProps) {
        if (nextProps.onlyView !== this.props.onlyView) {
            this.setState({
                showTextArea: !nextProps.onlyView
            });
        }
    }
    clickTitle () {
        if (!this.props.onlyView) {
            this.setState({
                showTextArea : true
            });
            this._input.focus();
        }
    }
    blurInput () {
        if (typeof this.props.onlyView === 'undefined') {
            this.setState({
                showTextArea : false
            });
        }
    }
    onChangeInput (e) {
        this.props.changeCallback(e.target.value);
    }
    render () {
        if (this.state.hasError) {
            return (
                <TechnicalSupportMessage />
            );
        } else {
            return (
                <div className={this.state.showTextArea ? 'editable-input-container active' : 'editable-input-container'}>
                    <span className='editable-title' style={{ display: this.state.showTextArea ? 'none' : 'block' }} onClick={this.clickTitle}>{this.props.title ? this.props.title : 'none'}</span>
                    <textarea
                        className={this.state.showTextArea ? 'text-area-info show-text-area-info' : 'text-area-info hide-text-area-info'}
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

EditableTextArea.propTypes = {
    title: PropTypes.string,
    onlyView: PropTypes.bool,
    changeCallback: PropTypes.func.isRequired
};

export default EditableTextArea;
