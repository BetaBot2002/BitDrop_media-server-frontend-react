import React from 'react'
import '../CSS/UploadModal.css'
import CloseButton from '../assets/CloseButton.png'

const UploadModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="upload-modal-overlay">
        <div className="upload-modal-content">
          <button className="upload-close-button" onClick={onClose}><img src={CloseButton} alt="" /></button>
        </div>
      </div>
    );
}

export default UploadModal
