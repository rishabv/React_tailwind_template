import React from 'react';
import Dropzone from 'react-dropzone';
import './uploadImage.scss';
import PropTypes from 'prop-types';

export const handleDropRejected = (...args) => console.log('reject', args);

export class UploadImage extends React.PureComponent {
    constructor (props) {
        super(props);
        this.handleDrop = this.handleDrop.bind(this);
    }
    handleDrop (acceptedFiles) {
        this.props.changeLogo(acceptedFiles[0]);
        this.props.changePrev(acceptedFiles[0].preview);
    }
    render () {
        return (
            <section className={`img-container ${this.props.onlyView ? 'onlyView' : ''}`}>
                <Dropzone onDrop={this.handleDrop}
                    className='drop-field'
                    accept='image/jpeg,image/png,image/jpg,image/tiff,image/gif'
                    multiple={false}
                    onDropRejected={handleDropRejected}>
                    {!this.props.preview && <span className='glyphicon glyphicon-plus'>Upload Business Logo</span> }
                </Dropzone>
                { this.props.preview &&
                    <div className='prev-container'>
                        <img src={this.props.preview} alt='image preview' className='preview-img' />
                        <button className='btn btn-info edit-btn'>
                            Edit
                        </button>
                    </div>
                }
            </section>
        );
    }
}

UploadImage.propTypes = {
    preview: PropTypes.string,
    onlyView: PropTypes.bool,
    changePrev: PropTypes.func.isRequired,
    changeLogo: PropTypes.func.isRequired
};

export default UploadImage;
