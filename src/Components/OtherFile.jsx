import React, { useState } from 'react'
import '../CSS/OtherFile.css'
import OtherFileIcon from '../assets/OtherFileIcon.png'
import OtherFileDownloadIcon from '../assets/OtherFileDownloadIcon.png'
import { getDateFormat } from '../Utility-Functions/DateFunctions'
import OtherModal from './OtherModal'

import { getAccessToken } from '../Utility-Functions/LoginTokens'
import EditFile from './EditFile'
import DeleteFile from './DeleteFile'

const OtherFile = ({ file }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(<div className="loader"></div>)

    const openModal = (otherId) => {
        playOther(otherId)
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const playOther = async (otherId) => {
        fetch(`http://127.0.0.1:3000/file//getfile/${otherId}`, {
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
                const otherUrl = URL.createObjectURL(res);
                const otherData = (
                    <>
                        <h2>This file cannot be viewed</h2>
                        <a href={otherUrl} download={`${file.originalname}.${file.extension}`} title={`Download:${file.originalname}.${file.extension}`}>
                            <img src={OtherFileDownloadIcon} alt="" className='Download-Icon' />
                        </a>
                        <h2>Download it by clicking on the above icon ⬆️</h2>
                    </>

                )
                setModalContent(otherData)
            })
    }

    return (
        <div className='OtherFile-Body'>
            <div className='FileIcon'><img src={OtherFileIcon} alt="" className='OtherFileIcon' /></div>
            <div className="FileDetails">
                <h3>{`${file.originalname}.${file.extension}`}</h3>
                <h5>{`${getDateFormat(new Date(file.createdAt))}`}</h5>
                <button className='PlayButton' onClick={() => openModal(file.fileid)}>View</button>
                <EditFile fileid={file.fileid}/>
                <DeleteFile fileid={file.fileid}/>
            </div>
            <OtherModal isOpen={isModalOpen} onClose={closeModal}>
                {modalContent}
            </OtherModal>
        </div>
    )
}

export default OtherFile
