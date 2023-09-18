import React, { useEffect, useState } from 'react'
import { getAccessToken } from '../Utility-Functions/LoginTokens'
import AudioFile from './AudioFile'
import '../CSS/ViewAudios.css'
import NavBar from './NavBar'

const ViewAudios = () => {
    const [audioFiles, setAudioFiles] = useState([])
    const [message, setMessage] = useState('')
    useEffect(() => {
        fetchData()

    }, [])

    const fetchData = async () => {
        fetch('http://127.0.0.1:3000/file/getall', {
            method: `POST`,
            headers: {
                'Authorization': `bearer ${await getAccessToken()}`
            }
        }).then(response => response.json())
            .then((res) => {
                console.log(res)
                if (res.message) {
                    setMessage(res.message)
                } else {
                    setAudioFiles(res.filter((item) => {
                        let type = item.filetype
                        return type.includes('audio')
                    }))
                }
            })
    }

    return (
        <>
            <NavBar />
            <div className='ViewAudios-Body'>
                <div className="AudioFilesCards">
                    {message !== '' || audioFiles.length === 0 ? <h1>No Files Found</h1> : null}
                    {
                        audioFiles.map((file, index) => (
                            // <div key={index}>{file.originalname}</div> 
                            <AudioFile key={index} file={file} />
                        ))
                    }

                </div>

            </div>
        </>
    )
}

export default ViewAudios
