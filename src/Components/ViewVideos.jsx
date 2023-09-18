import React, { useEffect, useState } from 'react'
import { getAccessToken } from '../Utility-Functions/LoginTokens'
import VideoFile from './VideoFile'
import '../CSS/ViewVideos.css'
const ViewVideos = () => {
    const [videoFiles, setVideoFiles] = useState([])
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
                    setVideoFiles(res.filter((item) => {
                        let type = item.filetype
                        return type.includes('video')
                    }))
                }
            })
    }

    return (
        <div className='ViewVideos-Body'>
            <div className="VideoFilesCards">
                {message !== '' || videoFiles.length === 0 ? <h1>No Files Found</h1> : null}
                {
                    videoFiles.map((file, index) => (
                        <VideoFile key={index} file={file} />
                    ))
                }

            </div>

        </div>
    )
}

export default ViewVideos
