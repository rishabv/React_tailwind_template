import React from 'react';
import PropTypes from 'prop-types';
import './messageBoard.scss';
import pure from 'recompose/pure';

export const MessageBoard = ({ boardText, openBoardStatus, isErrModal }) => {
    const typeClass = isErrModal ? 'bg-danger' : 'bg-success';
    return (
        <div className={openBoardStatus ? `board-wrapper board-show ${typeClass}` : `board-wrapper board-hide ${typeClass}`}>
            <div className='modal-window'>
                <p className='title-modal'>{boardText}</p>
            </div>
        </div>
    );
};

MessageBoard.propTypes = {
    boardText: PropTypes.string.isRequired,
    openBoardStatus: PropTypes.bool.isRequired,
    isErrModal: PropTypes.bool
};

export default pure(MessageBoard);
