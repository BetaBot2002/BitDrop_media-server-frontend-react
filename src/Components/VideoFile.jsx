import React, { useState } from 'react'
import '../CSS/VideoFile.css'
import VideoFileIcon from '../assets/VideoFileIcon.png'
import { getDateFormat } from '../Utility-Functions/DateFunctions'
import VideoModal from './VideoModal'

import { getAccessToken } from '../Utility-Functions/LoginTokens'
import EditFile from './EditFile'
import DeleteFile from './DeleteFile'
import EditFileIcon from '../assets/EditFileIcon.png'
import '../CSS/EditFile.css'
import EditModal from './EditModal';

const VideoFile = ({ file }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(<div className="loader"></div>)

    const [editOpen, setEditOpen] = useState(false);

    const openEditModal = () => {
        setEditOpen(true);
    };

    const closeEditModal = () => {
        setEditOpen(false);
    };

    const openModal = (videoId) => {
        playVideo(videoId)
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const playVideo = async (videoId) => {
        fetch(`http://127.0.0.1:3000${file.fileurl}`, {
            method: `POST`,
            headers: {
                'Authorization': `bearer ${await getAccessToken()}`
            }
        }).then(response => {
            if (!response.ok) {
                alert('File Not Found');
            }
            return response.blob();
        })
            .then((res) => {
                const videoUrl = URL.createObjectURL(res);
                const videoData = (
                    <video controls className='VideoData'>
                        <source src={videoUrl} />
                        Your browser does not support the video element.
                    </video>
                )
                setModalContent(videoData)
            })
    }

    return (
        <div className='VideoFile-Body'>
            <div className='FileIcon'><img src={VideoFileIcon} alt="" className='VideoFileIcon' /></div>
            <div className="FileDetails">
                <h3>{`${file.originalname}.${file.extension}`}</h3>
                <h5>{`${getDateFormat(new Date(file.createdAt))}`}</h5>
                <div className="button-container">
                    <button className='PlayButton' onClick={() => openModal(file.fileid)}>Play</button>
                    <div className="edit-delete">
                        <button className='EditFileButton' onClick={openEditModal}><img src={EditFileIcon} alt="" /></button>
                        <DeleteFile fileid={file.fileid} />
                    </div>
                </div>
            </div>
            <VideoModal isOpen={isModalOpen} onClose={closeModal}>
                {modalContent}
            </VideoModal>
            <EditModal editOpen={editOpen} closeEdit={closeEditModal} fileid={file.fileid}>
            </EditModal>
        </div>
    )
}

export default VideoFile
