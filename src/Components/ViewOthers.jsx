import React, { useEffect, useState } from 'react'
import { getAccessToken } from '../Utility-Functions/LoginTokens'

const ViewOthers = () => {
    const [otherFiles, setOtherFiles] = useState([])
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
                    setOtherFiles(res.filter((item) => {
                        let type = item.filetype
                        return !(type.includes('image') || type.includes('audio') || type.includes('video'))
                    }))
                }
            })
    }

    return (
        <div>
            Hello
            {message !== '' || otherFiles.length === 0 ? <div>No Files Found</div> : null}

            {
                otherFiles.map((file, index) => (
                    <div key={index}>{file.originalname}</div>
                ))
            }

        </div>
    )
}

export default ViewOthers
