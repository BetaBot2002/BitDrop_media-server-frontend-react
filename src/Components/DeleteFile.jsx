import React from 'react'
import DeleteFileIcon from '../assets/DeleteFileIcon.png'
import '../CSS/DeleteFile.css'
import { useNavigate } from 'react-router-dom'
import { getAccessToken } from '../Utility-Functions/LoginTokens'

const DeleteFile = ({ fileid }) => {
  const navigate = useNavigate()
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      fetch('http://127.0.0.1:3000/file/delete', {
        method: `POST`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${await getAccessToken()}`
        },
        body: JSON.stringify({
          "fileid": fileid
        })
      }).then(response => response.json())
        .then((res) => {
          console.log(res)
          window.location.reload();
        })
    } else {
      alert("File not deleted.");
    }
  }

  return (
    <>
      <button className='DeleteFileButton' onClick={handleDelete}><img src={DeleteFileIcon} alt="" /></button>
    </>
  )
}

export default DeleteFile
