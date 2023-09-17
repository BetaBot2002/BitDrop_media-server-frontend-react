import React, { useEffect, useState } from 'react'
import { getAccessToken } from '../Utility-Functions/LoginTokens'
import ImageFile from './ImageFile'
import '../CSS/ViewImages.css'

const ViewImages = () => {
    const [imageFiles, setImageFiles] = useState([])
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
                    setImageFiles(res.filter((item) => {
                        let type = item.filetype
                        return type.includes('image')
                    }))
                }
            })
    }

    return (
        <div className='ViewImages-Body'>
            <div className="ImageFilesCards">
                {message !== '' || imageFiles.length === 0 ? <h1>No Files Found</h1> : null}
                {
                    imageFiles.map((file, index) => (
                        <ImageFile key={index} file={file} />
                    ))
                }

            </div>

        </div>
    )
}
export default ViewImages
