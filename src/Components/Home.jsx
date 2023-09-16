import React, { useState } from 'react'
import Logout from './Logout'
import { getAccessToken, getAnyAccessToken, getNewAccessToken } from '../Utility-Functions/LoginTokens'
import '../CSS/Home.css'
import BitDrop from '../assets/BitDrop.png'
import { Link } from 'react-router-dom'
import UploadModal from './UploadModal'
const Home = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleFetch = async () => {
        fetch('http://127.0.0.1:3000/file/getall', {
            method: `POST`,
            headers: {
                'Authorization': `bearer ${await getAccessToken()}`
            }
        }).then(response => response.json())
            .then((res) => {
                console.log(res)
            })
    }
    return (
        <div className='Home-Body'>
            <div className='title'><img src={BitDrop} height={'100px'} /></div>
            <div className="main">
                <div className="option"><Link to='view-files' className='link'>View Files</Link></div>
                <div className="option"><div onClick={()=> openModal()} className='link'>Upload File</div></div>
            </div>
            {/* <button onClick={handleFetch}>Fetch</button> */}
            <UploadModal isOpen={isModalOpen} onClose={closeModal} />
            <Logout />
        </div>
    )
}

export default Home
