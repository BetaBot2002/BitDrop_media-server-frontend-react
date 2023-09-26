import React, { useState } from 'react'
import CloseButton from '../assets/CloseButton.png'
import '../CSS/EditModal.css'
import { getAccessToken } from '../Utility-Functions/LoginTokens'

const EditModal = ({ editOpen, closeEdit, fileid }) => {
    const [newName, setNewName] = useState(``)
    const editFileFetch = async() => {
        console.log(fileid, newName)
        if(newName===''){
            alert('New Name Cannot Empty')
            return
        }
        fetch('http://127.0.0.1:3000/file/update', {
        method: `POST`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${await getAccessToken()}`
        },
        body: JSON.stringify({
          "fileid": fileid,
          "newname":newName
        })
      }).then(response => response.json())
        .then((res) => {
          console.log(res)
          window.location.reload();
        })
    }
    if (!editOpen) return null;
    return (
        <div className="edit-modal-overlay">
            <div className="edit-modal-content">
                <button className="edit-close-button" onClick={closeEdit}><img src={CloseButton} alt="" /></button>
                <div className='edit-container'>
                    <input type="text" onChange={(e) => setNewName(e.target.value)} value={newName} placeholder='Enter the new name'/>
                    <button onClick={editFileFetch}>Update</button>
                </div>
            </div>
        </div>
    )
}

export default EditModal
