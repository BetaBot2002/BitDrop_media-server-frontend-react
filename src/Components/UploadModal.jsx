import React, { useState } from 'react'
import '../CSS/UploadModal.css'
import CloseButton from '../assets/CloseButton.png'

const UploadModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const [isDragging, setIsDragging] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);

    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        setSelectedFile(file);
    };

    // Function to handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    return (
        <div className="upload-modal-overlay">
            <div className={`upload-modal-content ${isDragging && `drag`}`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}>
                <button className="upload-close-button" onClick={onClose}><img src={CloseButton} alt="" /></button>
                <label htmlFor="fileInput" className="custom-file-input">
                    {isDragging?`Drop the file`:(selectedFile?`Choose Different File`:`Choose a File`)}
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <p className="file-name">{selectedFile && selectedFile.name}{!selectedFile && `No File Selected`}</p>
                {selectedFile && <button className='upload-button'>Upload</button>}
            </div>
        </div>
    );
}

export default UploadModal
