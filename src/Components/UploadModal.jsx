import React, { useState } from 'react'
import '../CSS/UploadModal.css'
import CloseButton from '../assets/CloseButton.png'

const UploadModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const [selectedFileName, setSelectedFileName] = useState('No file selected');

    // Function to handle file selection
    const handleFileChange = (e) => {
        const fileInput = e.target;
        if (fileInput.files.length > 0) {
            setSelectedFileName(`Selected File: ${fileInput.files[0].name}`);
        } else {
            setSelectedFileName('No file selected');
        }
    };

    return (
        <div className="upload-modal-overlay">
            <div className="upload-modal-content">
                <button className="upload-close-button" onClick={onClose}><img src={CloseButton} alt="" /></button>
                <label htmlFor="fileInput" className="custom-file-input">
                    Choose a File
                </label>
                <p className="file-name">{selectedFileName}</p>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
            </div>
        </div>
    );
}

export default UploadModal
