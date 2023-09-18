import React, { Children } from 'react'
import '../CSS/VideoModal.css'
import CloseButton from '../assets/CloseButton.png'

const VideoModal = ({ isOpen, onClose,children }) => {
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

export default VideoModal
