import React, { useState } from 'react'
import '../CSS/UploadModal.css'
import CloseButton from '../assets/CloseButton.png'
import { getAccessToken } from '../Utility-Functions/LoginTokens';

const UploadModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const [isDragging, setIsDragging] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);

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

    const handleUpload = async () => {
        if (selectedFile) {
            let formData = new FormData();
            formData.append('file', selectedFile)
            setUploading(true)
            fetch('http://127.0.0.1:3000/file/upload', {
                method: `POST`,
                headers: {
                    'Authorization': `bearer ${await getAccessToken()}`
                },
                body: formData
            }).then(response => response.json())
                .then((res) => {
                    console.log(res)
                    alert('File Uploaded')
                    setUploading(false)
                    onClose()
                })
        }
    }

    return (
        <div className="upload-modal-overlay">
            <div className={`upload-modal-content ${isDragging && `drag`} ${uploading && `hidden`}`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}>
                <button className="upload-close-button" onClick={onClose}><img src={CloseButton} alt="" /></button>
                <label htmlFor="fileInput" className="custom-file-input">
                    {isDragging ? `Drop the file` : (selectedFile ? `Choose Different File` : `Choose a File`)}
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <p className="file-name">{selectedFile && selectedFile.name}{!selectedFile && `No File Selected`}</p>
                {selectedFile && <button className='upload-button' onClick={handleUpload}>Upload</button>}
            </div>
            {
                uploading &&
                <div className='upload-modal-content'>
                    <div class="loader"></div>
                </div>
            }
        </div>
    );
}

export default UploadModal
