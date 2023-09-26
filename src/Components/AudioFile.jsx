import React, { useState } from 'react'
import '../CSS/AudioFile.css'
import AudioFileIcon from '../assets/AudioFileIcon.png'
import { getDateFormat } from '../Utility-Functions/DateFunctions'
import AudioModal from './AudioModal'

import { getAccessToken } from '../Utility-Functions/LoginTokens'
import EditFile from './EditFile'
import DeleteFile from './DeleteFile'

const AudioFile = ({ file }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(<div className="loader"></div>)

    const openModal = (audioId) => {
        playAudio(audioId)
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const playAudio = async (audioId) => {
        fetch(`http://127.0.0.1:3000/file//getfile/${audioId}`, {
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
                const audioUrl = URL.createObjectURL(res);
                const audioData = (
                    <audio controls>
                        <source src={audioUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                )
                setModalContent(audioData)
            })
    }

    return (
        <div className='AudioFile-Body'>
            <div className='FileIcon'><img src={AudioFileIcon} alt="" className='AudioFileIcon' /></div>
            <div className="FileDetails">
                <h3>{`${file.originalname}.${file.extension}`}</h3>
                <h5>{`${getDateFormat(new Date(file.createdAt))}`}</h5>
                <button className='PlayButton' onClick={() => openModal(file.fileid)}>Play</button>
                <EditFile fileid={file.fileid}/>
                <DeleteFile fileid={file.fileid}/>
            </div>
            <AudioModal isOpen={isModalOpen} onClose={closeModal}>
                {modalContent}
            </AudioModal>
        </div>
    )
}

export default AudioFile
