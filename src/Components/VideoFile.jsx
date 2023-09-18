import React, { useState } from 'react'
import '../CSS/VideoFile.css'
import VideoFileIcon from '../assets/VideoFileIcon.png'
import { getDateFormat } from '../Utility-Functions/DateFunctions'
import VideoModal from './VideoModal'

import { getAccessToken } from '../Utility-Functions/LoginTokens'

const VideoFile = ({ file }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null)

    const openModal = (videoId) => {
        playVideo(videoId)
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const playVideo = async (videoId) => {
        fetch(`http://127.0.0.1:3000/file//getfile/${videoId}`, {
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
                <button className='PlayButton' onClick={() => openModal(file.fileid)}>Play</button>
            </div>
            <VideoModal isOpen={isModalOpen} onClose={closeModal}>
                {modalContent}
            </VideoModal>
        </div>
    )
}

export default VideoFile
