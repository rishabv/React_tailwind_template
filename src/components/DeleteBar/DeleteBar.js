import React from 'react';
import PropTypes from 'prop-types';
import './DeleteBar.scss';
import pure from 'recompose/pure';

export const DeleteBar = ({ open, text, acceptCallback, declineCallback }) => {
    return (
        <div className={open ? 'show delete-bar-wrapper' : 'hide delete-bar-wrapper'}>
            <div className='delete-bar'>
                {text}
            </div>
            <div className='button-group-delete'>
                <button className='btn btn-info decline-btn' onClick={() => declineCallback(false)}>No</button>
                <button className='btn btn-danger accept-btn' onClick={() => acceptCallback()}>Yes</button>
            </div>
        </div>
    );
};

DeleteBar.propTypes = {
    open: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    acceptCallback: PropTypes.func.isRequired,
    declineCallback: PropTypes.func.isRequired
};

export default pure(DeleteBar);
