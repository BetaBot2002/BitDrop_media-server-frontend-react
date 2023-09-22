import React, { Children } from 'react'
import '../CSS/OtherModal.css'
import CloseButton from '../assets/CloseButton.png'

const OtherModal =  ({ isOpen, onClose,children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}><img src={CloseButton} alt="" /></button>
        {children}
      </div>
    </div>
  );
}

export default OtherModal

