import React, { useState } from 'react'
import Logout from './Logout'
import { getAccessToken, getAnyAccessToken, getNewAccessToken } from '../Utility-Functions/LoginTokens'
import '../CSS/Home.css'
import BitDrop from '../assets/BitDrop.png'
import { Link } from 'react-router-dom'
import UploadModal from './UploadModal'
import NavBar from './NavBar'
const Home = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <NavBar />
            <div className='Home-Body'>

                <div className='title'><img src={BitDrop} height={'100px'} /></div>
                <div className="main">
                    <div className="option"><Link to='view-files' className='link'>View Files</Link></div>
                    <div className="option"><div onClick={() => openModal()} className='link'>Upload File</div></div>
                </div>
                {/* <button onClick={handleFetch}>Fetch</button> */}
                <UploadModal isOpen={isModalOpen} onClose={closeModal} />
            </div>
        </>

    )
}

export default Home
