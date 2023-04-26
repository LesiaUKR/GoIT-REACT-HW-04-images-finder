import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, Modalka, ModalCloseBtn } from './Modal.styled';
import { IoMdClose } from 'react-icons/io';

export const Modal = ({ onClose, children }) => {
  
  useEffect(() => {
    const handleKeyDown = evt => {
      if (evt.key === "Escape") {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown); 
  }, [onClose]);

  const handleOverlayClick = evt => {
    evt.stopPropagation();
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };
    return createPortal(
      <Overlay onClick={handleOverlayClick}>
        <Modalka>
          <ModalCloseBtn type="button" onClick={onClose}>
            <IoMdClose size="12" />
          </ModalCloseBtn>
          {children}
        </Modalka>
      </Overlay>,
      document.querySelector('#modal-root')
    );
  }

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
