import React, { useState } from 'react'
import { getAccessToken } from '../Utility-Functions/LoginTokens';
import '../CSS/ImageFile.css'
import ImageFileIcon from '../assets/ImageFileIcon.png'
import { getDateFormat } from '../Utility-Functions/DateFunctions'
import ImageModal from './ImageModal';

const ImageFile = ({file}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(<div class="loader"></div>)

    const openModal = (imageId) => {
        playImage(imageId)
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const playImage = async (imageId) => {
        fetch(`http://127.0.0.1:3000/file//getfile/${imageId}`, {
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
                const imageUrl = URL.createObjectURL(res);
                const imageData = (
                    <img src={imageUrl} className='ImageData' alt="" />
                )
                setModalContent(imageData)
            })
    }

    return (
        <div className='ImageFile-Body'>
            <div className='FileIcon'><img src={ImageFileIcon} alt="" className='ImageFileIcon' /></div>
            <div className="FileDetails">
                <h3>{`${file.originalname}.${file.extension}`}</h3>
                <h5>{`${getDateFormat(new Date(file.createdAt))}`}</h5>
                <button className='PlayButton' onClick={() => openModal(file.fileid)}>View</button>
            </div>
            <ImageModal isOpen={isModalOpen} onClose={closeModal}>
                {modalContent}
            </ImageModal>
        </div>
    )
}

export default ImageFile
