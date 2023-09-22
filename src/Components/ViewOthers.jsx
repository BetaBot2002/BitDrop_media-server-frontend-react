import React, { useEffect, useState } from 'react'
import { getAccessToken } from '../Utility-Functions/LoginTokens'
import '../CSS/ViewOthers.css'
import NavBar from './NavBar'
import OtherFile from './OtherFile'

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
        <>
            <NavBar />
            <div className='ViewOthers-Body'>
                <div className="OtherFilesCards">
                    {message !== '' || otherFiles.length === 0 ? <h1>No Files Found</h1> : null}
                    {
                        otherFiles.map((file, index) => (
                            <OtherFile key={index} file={file} />
                        ))
                    }

                </div>

            </div>
        </>
    )
}

export default ViewOthers
