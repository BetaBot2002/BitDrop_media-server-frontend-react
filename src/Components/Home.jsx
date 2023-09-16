import React from 'react'
import Logout from './Logout'
import { getAccessToken, getAnyAccessToken, getNewAccessToken } from '../Utility-Functions/LoginTokens'
import '../CSS/Home.css'
import BitDrop from '../assets/BitDrop.png'
import { Link } from 'react-router-dom'
const Home = () => {


    const token = getAnyAccessToken()

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
                <div className="option">
                    <label for="fileInput" class="custom-file-input">Upload File</label>
                    <input id='fileInput' type='file' />
                    <p className='info'>Click or Drop a file here</p>
                </div>
            </div>
            {/* <button onClick={handleFetch}>Fetch</button> */}
            <Logout />
        </div>
    )
}

export default Home
