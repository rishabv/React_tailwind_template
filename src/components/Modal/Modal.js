import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import './Modal.scss';

export const Modal = ({ modalText, modalHeaderText, openModalStatus, modalSize, closeModal, children }) => {
    return (
        <div className={`modal-wrapper ${modalSize} ${openModalStatus ? 'modal-show' : 'modal-hide'}`}>
            <div className='modal-window'>
                <span className='glyphicon glyphicon-remove' onClick={() => closeModal(false)} />
                <div className='modal-header' dangerouslySetInnerHTML={{ __html: modalHeaderText }} />
                <div className='title-modal' dangerouslySetInnerHTML={{ __html: modalText }} />
                {children}
            </div>
        </div>
    );
};

Modal.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    modalHeaderText: PropTypes.string.isRequired,
    modalText: PropTypes.string.isRequired,
    openModalStatus: PropTypes.bool.isRequired,
    modalSize: PropTypes.string,
    closeModal: PropTypes.func.isRequired
};

export default pure(Modal);
