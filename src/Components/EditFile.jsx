import React, { useState } from 'react'
import EditFileIcon from '../assets/EditFileIcon.png'
import '../CSS/EditFile.css'
import EditModal from './EditModal';

const EditFile = ({ fileid }) => {

  const [editOpen, setEditOpen] = useState(false);

  const openEditModal = () => {
    setEditOpen(true);
  };

  const closeEditModal = () => {
    setEditOpen(false);
  };
  return (
    <>
      <button className='EditFileButton' onClick={openEditModal}><img src={EditFileIcon} alt="" /></button>
      <EditModal editOpen={editOpen} closeEdit={closeEditModal} fileid={fileid}>
      </EditModal>
    </>
  )
}

export default EditFile
