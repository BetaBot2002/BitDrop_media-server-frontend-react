import React, { useEffect, useState } from 'react'
import { getAccessToken } from '../Utility-Functions/LoginTokens'

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
        <div>
            Hello
            {message !== '' || videoFiles.length === 0 ? <div>No Files Found</div> : null}

            {
                videoFiles.map((file, index) => (
                    <div key={index}>{file.originalname}</div>
                ))
            }

        </div>
    )
}

export default ViewVideos
