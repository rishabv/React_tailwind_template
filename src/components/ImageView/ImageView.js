import React from 'react';
import PropTypes from 'prop-types';
import './ImageView.scss';
import pure from 'recompose/pure';

export const ImageView = ({ url, alt }) => {
    return (
        <div className='image-prev-dir'>
            <img className='image-item-component' src={url} alt={alt || 'image'} />
        </div>
    );
};

ImageView.propTypes = {
    url: PropTypes.string.isRequired,
    alt: PropTypes.string
};

export default pure(ImageView);
